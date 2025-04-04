import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaEnvelope } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";

const PageWrapper = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #d2e0f0, #f2f8fc);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  background-image: url("/images/bg-pattern.svg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`;

const GlassCard = styled(motion.div)`
  width: 100%;
  max-width: 420px;
  padding: 40px 30px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  text-align: center;
`;

const Title = styled.h2`
  font-size: 26px;
  font-weight: bold;
  color: #0038a8;
  margin-bottom: 30px;
`;

const InputWrapper = styled.div`
  position: relative;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 12px 12px 38px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 15px;
`;

const Icon = styled(FaEnvelope)`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #888;
`;

const Button = styled.button`
  width: 100%;
  margin-top: 10px;
  padding: 14px;
  background: #0038a8;
  color: white;
  font-size: 15px;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 0 0 12px #0038a8a0;
  transition: all 0.3s ease;

  &:hover {
    background: #002c85;
    transform: scale(1.03);
    box-shadow: 0 0 20px #0038a8c0;
  }
`;

const Result = styled.p`
  margin-top: 18px;
  color: ${({ success }) => (success ? "green" : "red")};
  font-weight: bold;
`;

const TextLink = styled.button`
  background: none;
  border: none;
  margin-top: 20px;
  color: #007aff;
  cursor: pointer;
  font-size: 14px;
  text-decoration: underline;

  &:hover {
    color: #0056b3;
  }
`;
const BackButton = styled.button`
  margin-top: 24px;
  display: inline-flex;
  align-items: center;
  background: none;
  border: none;
  font-size: 15px;
  color: #007aff;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;

  svg {
    margin-right: 8px;
    transition: transform 0.3s ease;
  }

  &:hover {
    color: #0056b3;

    svg {
      transform: translateX(-4px);
    }
  }
`;

const FindId = () => {
  const [email, setEmail] = useState("");
  const [result, setResult] = useState("");
  const navigate = useNavigate();

  const handleFindId = () => {
    if (email.includes("@")) {
      setResult("✅ 찾은 아이디는 user123 입니다!");
    } else {
      setResult("❌ 이메일 형식이 올바르지 않습니다.");
    }
  };

  return (
    <PageWrapper>
      <GlassCard
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Title>🔍 아이디 찾기</Title>
        <InputWrapper>
          <Icon />
          <Input
            type="email"
            placeholder="가입한 이메일을 입력하세요"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </InputWrapper>
        <Button onClick={handleFindId}>아이디 찾기</Button>
        {result && <Result success={result.includes("✅")}>{result}</Result>}
        <BackButton onClick={() => navigate("/login")}>
          <FaArrowLeft />
          로그인으로 돌아가기
        </BackButton>
      </GlassCard>
    </PageWrapper>
  );
};

export default FindId;
