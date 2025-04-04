import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaArrowLeft, FaLock } from "react-icons/fa";

// === 스타일 컴포넌트 ===
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

const Icon = styled.div`
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

// === 컴포넌트 ===
const FindPassword = () => {
  const navigate = useNavigate();
  const DUMMY_CODE = "123456";

  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [authSent, setAuthSent] = useState(false);
  const [authCode, setAuthCode] = useState("");
  const [authVerified, setAuthVerified] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [result, setResult] = useState("");

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidPassword = (pw) =>
    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/.test(pw);

  const handleSendAuthCode = () => {
    if (userId.trim() === "" || !isValidEmail(email)) {
      setResult("❌ 아이디와 이메일을 정확히 입력해주세요.");
      return;
    }
    setAuthSent(true);
    setResult("📧 인증코드를 전송했습니다. (더미: 123456)");
  };

  const handleVerifyCode = () => {
    if (authCode === DUMMY_CODE) {
      setAuthVerified(true);
      setResult("✅ 인증 성공! 새 비밀번호를 설정하세요.");
    } else {
      setResult("❌ 인증코드가 일치하지 않습니다.");
    }
  };

  const handleResetPassword = () => {
    if (!isValidPassword(password)) {
      setResult("❌ 비밀번호는 영문+숫자 포함 8자 이상이어야 합니다.");
      return;
    }
    if (password !== confirmPassword) {
      setResult("❌ 비밀번호가 일치하지 않습니다.");
      return;
    }
    setResult("✅ 비밀번호가 성공적으로 재설정되었습니다!");
  };

  return (
    <PageWrapper>
      <GlassCard
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Title>🔒 비밀번호 찾기</Title>

        <InputWrapper>
          <Icon>
            <FaUser />
          </Icon>
          <Input
            type="text"
            placeholder="아이디를 입력하세요"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" && !authSent && handleSendAuthCode()
            }
          />
        </InputWrapper>

        <InputWrapper>
          <Icon>
            <FaEnvelope />
          </Icon>
          <Input
            type="email"
            placeholder="가입한 이메일을 입력하세요"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" && !authSent && handleSendAuthCode()
            }
          />
        </InputWrapper>

        {!authSent && (
          <Button onClick={handleSendAuthCode}>인증코드 전송</Button>
        )}

        {authSent && !authVerified && (
          <>
            <InputWrapper>
              <Icon>
                <FaEnvelope />
              </Icon>
              <Input
                type="text"
                placeholder="인증코드를 입력하세요"
                value={authCode}
                onChange={(e) => setAuthCode(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && !authVerified && handleVerifyCode()
                }
              />
            </InputWrapper>
            <Button onClick={handleVerifyCode}>인증코드 확인</Button>
          </>
        )}

        {authVerified && (
          <>
            <InputWrapper>
              <Icon>
                <FaLock />
              </Icon>
              <Input
                type="password"
                placeholder="새 비밀번호 입력"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleResetPassword()}
              />
            </InputWrapper>
            <InputWrapper>
              <Icon>
                <FaLock />
              </Icon>
              <Input
                type="password"
                placeholder="비밀번호 확인"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleResetPassword()}
              />
            </InputWrapper>
            <Button onClick={handleResetPassword}>비밀번호 재설정</Button>
          </>
        )}

        {result && <Result success={result.includes("✅")}>{result}</Result>}

        <BackButton onClick={() => navigate("/login")}>
          <FaArrowLeft />
          로그인으로 돌아가기
        </BackButton>
      </GlassCard>
    </PageWrapper>
  );
};

export default FindPassword;
