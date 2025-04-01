import React, { useState } from "react";
import styled from "styled-components";
import Header from "../../Header";
import Footer from "../../Footer";

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 60px 20px;
`;

const Title = styled.h2`
  text-align: center;
  font-size: 28px;
  color: #000;
  margin-bottom: 30px;
  font-weight: 500;
`;

const Divider = styled.div`
  height: 2px;
  background-color: #000;
  margin-bottom: 60px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 32px;
  max-width: 600px;
  margin: 0 auto;
`;

const FormGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 40px;
`;

const Label = styled.label`
  width: 80px;
  font-size: 16px;
  color: #000;
  flex-shrink: 0;
`;

const Input = styled.input`
  flex: 1;
  padding: 12px 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  color: #333;

  &:disabled {
    background-color: #f5f5f5;
    color: #666;
  }

  &::placeholder {
    color: #999;
  }
`;

const BirthGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;

  input {
    flex: 1;
    text-align: center;
    padding: 12px 0;
  }
`;

const Separator = styled.span`
  color: #999;
  font-size: 16px;
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
  margin-top: 60px;
`;

const SubmitButton = styled.button`
  padding: 12px 48px;
  background-color: #007aff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const EmailGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
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

const EditProfile = ({ userInfo, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    id: userInfo?.id || "",
    password: "",
    phone: userInfo?.phone || "",
    name: userInfo?.name || "",
    birth: userInfo?.birth || "",
    emailId: userInfo?.email ? userInfo.email.split("@")[0] : "",
    emailDomain: userInfo?.email ? userInfo.email.split("@")[1] : "",
    address: userInfo?.address || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      // 숫자만 추출
      const numbers = value.replace(/[^0-9]/g, "");

      // 하이픈 추가
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
    } else if (name === "email") {
      // @ 기호가 없는 경우에만 처리
      if (!value.includes("@")) {
        const emailParts = value.split(/\s+/); // 공백으로 분리
        if (emailParts.length >= 2) {
          // 두 부분으로 나뉘어 있으면 @ 추가
          const formattedEmail = `${emailParts[0]}@${emailParts[1]}`;
          setFormData((prev) => ({
            ...prev,
            [name]: formattedEmail,
          }));
        } else {
          setFormData((prev) => ({
            ...prev,
            [name]: value,
          }));
        }
      } else {
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const submissionData = {
      ...formData,
      email: `${formData.emailId}@${formData.emailDomain}`,
    };
    onSubmit(submissionData);
  };

  return (
    <>
      <Header />
      <Container>
        <Title>회원정보 수정</Title>
        <Divider />
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>아이디</Label>
            <Input
              type="text"
              name="id"
              value={formData.id}
              onChange={handleChange}
              disabled
            />
          </FormGroup>

          <FormGroup>
            <Label>비밀번호</Label>
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="비밀번호 변경"
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
            <Label>이름</Label>
            <Input
              type="text"
              name="name"
              value={formData.name}
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
                placeholder="이메일"
              />
              <EmailSeparator>@</EmailSeparator>
              <Input
                type="text"
                name="emailDomain"
                value={formData.emailDomain}
                onChange={handleChange}
                placeholder="도메인"
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
                <RadioInput type="radio" name="gender" value="male" />
                남자
              </RadioLabel>
              <RadioLabel>
                <RadioInput type="radio" name="gender" value="female" />
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
