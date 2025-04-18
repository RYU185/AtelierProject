import React, { useState, useEffect } from "react";
import axios from "../../../api/axiosInstance";
import { useAuth } from "../../../components/AuthContext";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
`;

const LeftSection = styled.div`
  flex: 1;
  background-image: url("/images/museum.jpg");
  background-size: cover;
  background-position: center;
`;

const RightSection = styled.div`
  flex: 1;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative; /* Added for positioning the home link */
`;

const HomeLink = styled(Link)`
  position: absolute;
  top: 40px;
  right: 50px;
  font-size: 18px;
  color: #333;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
    color: #007aff;
  }
`;

const FormWrapper = styled.div`
  width: 320px;
  text-align: center;
`;

const Logo = styled.h1`
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Subtitle = styled.p`
  font-size: 18px;
  color: #333;
  margin-bottom: 30px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;

  &:focus {
    border-color: #007aff;
    outline: none;
  }
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  font-size: 14px;
  margin-bottom: 16px;

  input {
    margin-right: 6px;
  }
`;

const LoginButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #0038a8;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #002c85;
  }
`;

const Links = styled.div`
  margin-top: 20px;
  font-size: 14px;
  color: #555;

  a {
    color: #333;
    text-decoration: none;
    margin: 0 6px;

    &:hover {
      text-decoration: underline;
      color: #007aff;
    }
  }
`;

const Divider = styled.span`
  color: #aaa;
  margin: 0 6px;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
  margin-top: 12px;
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
      // ✅ 이전 로그인 정보 초기화
      localStorage.removeItem("accessToken");
      localStorage.removeItem("username");
      localStorage.removeItem("role");

      const response = await axios.post("/user/login", {
        userId,
        password,
      });

      const { token, role } = response.data;

      // ✅ 새 로그인 정보 저장
      localStorage.setItem("accessToken", token);
      localStorage.setItem("username", userId);
      localStorage.setItem("role", role);

      login({ username: userId, role });

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
      <RightSection>
        <HomeLink to="/">홈페이지로 이동 &#8594; </HomeLink>
        <FormWrapper>
          <Logo>LOGO</Logo>
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
    </Container>
  );
};

export default Login;
