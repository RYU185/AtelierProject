import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../../api/axiosInstance";
import styled from "styled-components";
import Header from "../../Header";
import Footer from "../../Footer";

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px 40px 40px;
`;

const Title = styled.h2`
  font-size: 32px;
  font-weight: 600;
  color: #333;
  margin-bottom: 32px;
`;

const Divider = styled.div`
  height: 2px;
  background-color: #000;
  margin-bottom: 40px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const FormGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 40px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Label = styled.label`
  width: 160px;
  font-size: 16px;
  font-weight: 500;
  color: #333;
`;

const Input = styled.input`
  flex: 1;
  padding: 12px 16px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  color: #333;

  &:disabled {
    background-color: #f5f5f5;
    color: #666;
  }

  &::placeholder {
    color: #aaa;
  }
`;

const EmailGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  flex: 1;

  input {
    flex: 1;
  }
`;

const EmailSeparator = styled.span`
  color: #333;
  font-size: 16px;
  padding: 0 4px;
`;

const GenderGroup = styled.div`
  display: flex;
  gap: 40px;
`;

const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  color: #000;
  font-size: 16px;
`;

const RadioInput = styled.input`
  width: 20px;
  height: 20px;
  margin: 0;
  cursor: pointer;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40px;
`;

const SubmitButton = styled.button`
  padding: 12px 48px;
  font-size: 16px;
  font-weight: 500;
  background-color: #4199ff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #1a7de3;
  }
`;

const PasswordError = styled.p`
  color: red;
  font-size: 14px;
  margin-top: 4px;
`;

const PasswordMatch = styled.p`
  color: green;
  font-size: 14px;
  margin-top: 4px;
`;

const EditProfile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    id: "",
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
    phone: "",
    name: "",
    birth: "",
    emailId: "",
    emailDomain: "",
    address: "",
    gender: "male",
    nickName: "",
  });

  const [passwordMatchError, setPasswordMatchError] = useState("");
  const [passwordMatchSuccess, setPasswordMatchSuccess] = useState("");

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          navigate("/login");
          return;
        }

        // axiosInstance에 Authorization 헤더 명시적으로 설정
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        const res = await axios.get("/user/me");
        const user = res.data;

        setFormData((prev) => ({
          ...prev,
          id: user.id,
          phone: user.phone,
          name: user.realName,
          birth: user.birth,
          emailId: user.email?.split("@")[0],
          emailDomain: user.email?.split("@")[1],
          address: user.address,
          gender: user.gender?.toLowerCase() || "male",
          nickName: user.nickName,
        }));
      } catch (err) {
        console.error("회원 정보 불러오기 실패:", err);
        // API 호출 실패 시에도 로그인 페이지로 이동하지 않도록 주석 처리 또는 제거
        // navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, [navigate]);

  useEffect(() => {
    if (formData.newPassword && formData.confirmNewPassword) {
      if (formData.newPassword === formData.confirmNewPassword) {
        setPasswordMatchError("");
        setPasswordMatchSuccess("새 비밀번호가 일치합니다.");
      } else {
        setPasswordMatchSuccess("");
        setPasswordMatchError("새 비밀번호가 일치하지 않습니다.");
      }
    } else {
      setPasswordMatchError("");
      setPasswordMatchSuccess("");
    }
  }, [formData.newPassword, formData.confirmNewPassword]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      const numbers = value.replace(/[^0-9]/g, "");
      let formattedNumber = "";
      if (numbers.length <= 3) {
        formattedNumber = numbers;
      } else if (numbers.length <= 7) {
        formattedNumber = `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
      } else {
        formattedNumber = `${numbers.slice(0, 3)}-${numbers.slice(
          3,
          7
        )}-${numbers.slice(7, 11)}`;
      }

      setFormData((prev) => ({
        ...prev,
        [name]: formattedNumber,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      formData.newPassword &&
      formData.newPassword !== formData.confirmNewPassword
    ) {
      return;
    }

    const payload = {
      currentPassword: formData.currentPassword || undefined,
      password: formData.newPassword || undefined,
      realName: formData.name,
      phone: formData.phone.replace(/-/g, ""),
      email: `${formData.emailId}@${formData.emailDomain}`,
      address: formData.address,
      gender: formData.gender?.toUpperCase() || "MALE",
      nickName: formData.nickName,
    };

    try {
      await axios.put("/user/me", payload);
      alert("회원 정보가 수정되었습니다.");
      navigate("/mypage");
    } catch (error) {
      console.error("❌ 회원정보 수정 실패:", error);
      alert(
        "회원 정보 수정에 실패했습니다. 입력하신 정보를 다시 확인해주세요."
      );
      return;
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <Container>
          <Title>회원정보 수정</Title>
          <Divider />
          <p>정보를 불러오는 중입니다...</p>
        </Container>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <Container>
        <Title>회원정보 수정</Title>
        <Divider />
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>아이디</Label>
            <Input type="text" name="id" value={formData.id} disabled />
          </FormGroup>
          <FormGroup>
            <Label>현재 비밀번호</Label>
            <Input
              type="password"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              placeholder="현재 비밀번호"
            />
          </FormGroup>
          <FormGroup>
            <Label>새 비밀번호</Label>
            <Input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              placeholder="새 비밀번호"
            />
          </FormGroup>
          <FormGroup>
            <Label>비밀번호 확인</Label>
            <Input
              type="password"
              name="confirmNewPassword"
              value={formData.confirmNewPassword}
              onChange={handleChange}
              placeholder="비밀번호 확인"
            />
          </FormGroup>
          {passwordMatchError && (
            <PasswordError>{passwordMatchError}</PasswordError>
          )}
          {passwordMatchSuccess && (
            <PasswordMatch>{passwordMatchSuccess}</PasswordMatch>
          )}
          <FormGroup>
            <Label>이름</Label>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label>연락처</Label>
            <Input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="010-0000-0000"
            />
          </FormGroup>
          <FormGroup>
            <Label>닉네임</Label>
            <Input
              type="text"
              name="nickName"
              value={formData.nickName}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label>이메일</Label>
            <EmailGroup>
              <Input
                type="text"
                name="emailId"
                value={formData.emailId}
                onChange={handleChange}
              />
              <EmailSeparator>@</EmailSeparator>
              <Input
                type="text"
                name="emailDomain"
                value={formData.emailDomain}
                onChange={handleChange}
              />
            </EmailGroup>
          </FormGroup>
          <FormGroup>
            <Label>주소</Label>
            <Input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="시/군/구"
            />
          </FormGroup>
          <FormGroup>
            <Label>성별</Label>
            <GenderGroup>
              <RadioLabel>
                <RadioInput
                  type="radio"
                  name="gender"
                  value="male"
                  checked={formData.gender === "male"}
                  onChange={handleChange}
                />
                남자
              </RadioLabel>
              <RadioLabel>
                <RadioInput
                  type="radio"
                  name="gender"
                  value="female"
                  checked={formData.gender === "female"}
                  onChange={handleChange}
                />
                여자
              </RadioLabel>
            </GenderGroup>
          </FormGroup>
          <ButtonGroup>
            <SubmitButton type="submit">수정 완료</SubmitButton>
          </ButtonGroup>
        </Form>
      </Container>
      <Footer />
    </>
  );
};

export default EditProfile;
