import React, { useState, useEffect } from "react";
import axios from "../../../api/axiosInstance";
import { useAuth } from "../../../components/AuthContext";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import LogoIconFinal from "../../LogoIconFinal";

const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
`;

const LeftSection = styled.div`
  flex: 3;
  background-image: url("/images/museum.jpg");
  background-size: cover;
  background-position: center;
`;

const GradientBackground = styled.div`
  flex: 2;
  background: radial-gradient(ellipse at 0% 0%, rgb(0, 0, 0), rgb(1, 9, 26) 40%, #000000 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const RightSection = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const HomeLink = styled(Link)`
  position: absolute;
  top: 2.5rem;
  right: 3.125rem;
  font-size: 1.125rem;
  color: #ffffff;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
    color: #007aff;
  }
`;

const FormWrapper = styled.div`
  width: 20rem;
  text-align: center;
  margin-top: -7.5rem;
`;

const Logo = styled.div`
height: 10.625rem;

`;

const Subtitle = styled.p`
  font-size: 1.125rem;
  color: #e1e1e1;
  margin-bottom: 1.875rem;
`;

const Input = styled.input`
  width: 100%;
  padding: .75rem;
  margin-bottom: 1rem;
  border: .0625rem solid #ccc;
  border-radius: .25rem;
  font-size: .875rem;

  &:focus {
    border-color: #007aff;
    outline: none;
  }
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  font-size: .875rem;
  margin-bottom: 1rem;

  input {
    margin-right: .375rem;
  }
`;

const LoginButton = styled.button`
  width: 100%;
  padding: .75rem;
  background-color: #0038a8;
  color: white;
  font-size: 1rem;
  border: none;
  border-radius: .25rem;
  cursor: pointer;

  &:hover {
    background-color: #002c85;
  }
`;

const Links = styled.div`
  margin-top: 1.25rem;
  font-size: .875rem;
  color: #555;

  a {
    color: #e1e1e1;
    text-decoration: none;
    margin: 0 .375rem;

    &:hover {
      text-decoration: underline;
      color: #007aff;
    }
  }
`;

const Divider = styled.span`
  color: #aaa;
  margin: 0 .375rem;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: .875rem;
  margin-top: .75rem;
`;

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [autoLogin, setAutoLogin] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!userId.trim() || !password.trim()) {
      setError("아이디와 비밀번호를 모두 입력해주세요.");
      return;
    }

    try {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("username");
      localStorage.removeItem("role");

      const response = await axios.post("/user/login", {
        userId,
        password,
      });

      const token = response.data.token;
      const role = response.data.role;
      const isArtist = response.data.isArtist;
      const nickname = response.data.nickname;

      console.log("nickname 응답값:", response.data.nickname);

      localStorage.setItem("accessToken", token);
      localStorage.setItem("username", userId);
      localStorage.setItem("role", role);
      localStorage.setItem("nickname", nickname);

      const loginPayload = {
        username: userId,
        role,
        isArtist,
        nickname,
        authToken: token,
      };

      if (typeof isArtist !== "undefined") {
        loginPayload.isArtist = isArtist;
      }

      login(loginPayload);

      if (autoLogin) {
        localStorage.setItem("autoLogin", "true");
      } else {
        localStorage.removeItem("autoLogin");
      }

      setError("");
      alert("로그인이 완료되었습니다.");
      navigate("/");
    } catch (err) {
      console.error("로그인 에러:", err);
      setError("아이디 또는 비밀번호를 다시 확인해주세요.");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <Container>
      <LeftSection />
      <GradientBackground>
        <HomeLink to="/">홈페이지로 이동 &#8594; </HomeLink>
        <RightSection>
          <FormWrapper>
            <Logo>
              <LogoIconFinal />
            </Logo>
            <Subtitle>로그인</Subtitle>
            <Input
              type="text"
              placeholder="아이디"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <Input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <CheckboxLabel>
              <input
                type="checkbox"
                checked={autoLogin}
                onChange={(e) => setAutoLogin(e.target.checked)}
              />
              자동 로그인
            </CheckboxLabel>
            <LoginButton onClick={handleLogin}>로그인</LoginButton>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <Links>
              <Link to="/find-id">아이디 찾기</Link>
              <Divider />
              <Link to="/find-password">비밀번호 찾기</Link>
              <Divider />
              <Link to="/join">회원가입</Link>
            </Links>
          </FormWrapper>
        </RightSection>
      </GradientBackground>
    </Container>
  );
};

export default Login;
