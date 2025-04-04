import React from "react";
import styled from "styled-components";
import Header from "../../Header";
import BirthInput from "@components/BirthInput";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  padding: 80px 20px;
  max-width: 600px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 28px;
  text-align: center;
  margin-bottom: 40px;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormItem = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 8px;

  span {
    color: red;
    margin-left: 4px;
  }
`;

const Input = styled.input`
  padding: 12px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const RadioGroup = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 6px;
`;

const SubmitButton = styled.button`
  margin-top: 30px;
  padding: 14px;
  font-size: 16px;
  background-color: #0099ff;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color: #007acc;
  }
`;
const SuggestionBox = styled.div`
  border: 1px solid #ccc;
  border-top: none;
  border-radius: 0 0 6px 6px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
  background-color: white;
`;

const SuggestionItem = styled.div`
  padding: 10px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: #f2f2f2;
  }
`;

const Join = () => {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    // TODO: 유효성 검사, 백엔드 연동 후
    // 성공하면 로그인 페이지로 이동
    navigate("/login");
  };
  const [email, setEmail] = React.useState("");
  const [showSuggestions, setShowSuggestions] = React.useState(false);
  const domainSuggestions = ["naver.com", "gmail.com", "kakao.com"];
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setShowSuggestions(!e.target.value.includes("@"));
  };

  const handleSuggestionClick = (domain) => {
    const idPart = email.split("@")[0];
    setEmail(`${idPart}@${domain}`);
    setShowSuggestions(false);
  };

  return (
    <>
      <Header />
      <Wrapper>
        <Title>회원가입</Title>
        <Form>
          <FormItem>
            <Label>
              아이디<span>*</span>
            </Label>
            <Input type="text" placeholder="아이디를 입력해주세요" />
          </FormItem>
          <FormItem>
            <Label>
              비밀번호<span>*</span>
            </Label>
            <Input type="password" placeholder="비밀번호를 입력해주세요" />
          </FormItem>
          <FormItem>
            <Label>
              비밀번호 확인<span>*</span>
            </Label>
            <Input type="password" placeholder="비밀번호를 다시 입력해주세요" />
          </FormItem>
          <FormItem>
            <Label>이름</Label>
            <Input type="text" placeholder="이름을 입력해주세요" />
          </FormItem>
          <FormItem>
            <Label>
              닉네임<span>*</span>
            </Label>
            <Input type="text" placeholder="닉네임을 입력해주세요" />
          </FormItem>
          <FormItem>
            <Label>
              이메일<span>*</span>
            </Label>
            <Input
              type="text"
              placeholder="이메일을 입력해주세요"
              value={email}
              onChange={handleEmailChange}
            />
            {showSuggestions && (
              <SuggestionBox>
                {domainSuggestions.map((domain) => (
                  <SuggestionItem
                    key={domain}
                    onClick={() => handleSuggestionClick(domain)}
                  >
                    {email.split("@")[0]}@{domain}
                  </SuggestionItem>
                ))}
              </SuggestionBox>
            )}
          </FormItem>
          <FormItem>
            <Label>주소</Label>
            <Input type="text" placeholder="주소를 입력해주세요" />
          </FormItem>
          <FormItem>
            <Label>성별</Label>
            <RadioGroup>
              <label>
                <input type="radio" name="gender" value="male" /> 남자
              </label>
              <label>
                <input type="radio" name="gender" value="female" /> 여자
              </label>
            </RadioGroup>
          </FormItem>
          <FormItem>
            <Label>
              생년월일<span>*</span>
            </Label>
            <BirthInput />
          </FormItem>
          <SubmitButton onClick={handleSubmit}>가입하기</SubmitButton>
        </Form>
      </Wrapper>
    </>
  );
};

export default Join;
