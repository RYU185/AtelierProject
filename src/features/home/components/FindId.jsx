import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "../../../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaEnvelope, FaArrowLeft } from "react-icons/fa";

// ✅ 스타일 컴포넌트
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

  &:disabled {
    background: #aaa;
    cursor: not-allowed;
    box-shadow: none;
  }
`;

const ProgressBarWrapper = styled.div`
  width: 100%;
  height: 8px;
  background-color: #e0e0e0;
  border-radius: 4px;
  margin-top: 10px;
  overflow: hidden;
`;

const MotionProgress = styled(motion.div)`
  height: 100%;
  background-color: #0038a8;
  border-radius: 4px;
`;

const Result = styled.p`
  margin-top: 18px;
  color: ${({ $success }) => ($success ? "green" : "red")};
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

// ✅ 메인 컴포넌트
const FindId = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(3);
  const [progress, setProgress] = useState(0);
  const [hasFoundId, setHasFoundId] = useState(false);

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  useEffect(() => {
    if (!hasFoundId) return;

    setCountdown(5);
    setProgress(0);

    const interval = 100;
    const duration = 3000;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + (100 * interval) / duration;
        return next >= 100 ? 100 : next;
      });

      setCountdown((prev) => {
        if (prev <= 0.1) {
          clearInterval(timer);
          navigate("/login");
        }
        return prev - 0.1;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [hasFoundId, navigate]);

  const handleFindId = async () => {
    if (!isValidEmail(email)) {
      setMessage("이메일 형식이 올바르지 않습니다.");
      setIsSuccess(false);
      setHasFoundId(false);
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post("/user/findid", { email }); // ✅ response 정의됨

      if (response.data.status === "success") {
        setMessage(`찾은 아이디는 ${response.data.data.userId} 입니다!`);
        setIsSuccess(true);
        setHasFoundId(true); // 이동 트리거
      } else {
        setMessage(`❌ ${response.data.message}`);
        setIsSuccess(false);
        setHasFoundId(false);
      }
    } catch (error) {
      const errorMsg =
        error?.response?.data?.message || "❌ 서버 오류가 발생했습니다.";
      setMessage(`❌ ${errorMsg}`);
      setIsSuccess(false);
      setHasFoundId(false);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleFindId();
  };

  useEffect(() => {
    if (!email) {
      setMessage("");
      setIsSuccess(null);
    }
  }, [email]);

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
            onKeyDown={handleKeyDown}
          />
        </InputWrapper>
        <Button onClick={handleFindId} disabled={loading}>
          {loading ? "처리 중..." : "아이디 찾기"}
        </Button>
        {message && (
          <>
            <Result $success={isSuccess}>{message}</Result>

            {hasFoundId && (
              <>
                <ProgressBarWrapper>
                  <MotionProgress
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 5, ease: "easeInOut" }}
                  />
                </ProgressBarWrapper>
                <p
                  style={{ fontSize: "13px", marginTop: "8px", color: "#666" }}
                >
                  로그인 화면으로 이동 중... ({Math.ceil(countdown)}초)
                </p>
                <BackButton onClick={() => navigate("/login")}>
                  <FaArrowLeft />
                  로그인으로 돌아가기
                </BackButton>
              </>
            )}
          </>
        )}
      </GlassCard>
    </PageWrapper>
  );
};

export default FindId;
