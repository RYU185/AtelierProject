import React from "react";
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

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    // TODO: 로그인 로직 (API 연결 시 여기에 추가)
    navigate("/"); // ✅ 홈으로 이동
  };

  return (
    <Container>
      <LeftSection />
      <RightSection>
        <FormWrapper>
          <Logo>LOGO</Logo>
          <Subtitle>로그인</Subtitle>
          <Input type="text" placeholder="아이디" />
          <Input type="password" placeholder="비밀번호" />
          <LoginButton onClick={handleLogin}>로그인</LoginButton>
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
