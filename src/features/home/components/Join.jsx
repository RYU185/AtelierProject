// Join.jsx
import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Header from "../../Header";
import BirthInput from "@components/BirthInput";

// 스타일 정의
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
const Form = styled.form`
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
  flex: 1;
  &:focus {
    outline: none;
    border-color: #0099ff;
  }
`;
const Select = styled.select`
  padding: 10px;
  border-radius: 4px;
  flex: 1;
  border: 1px solid #ccc;
  font-size: 14px;
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
const CheckButton = styled.button`
  padding: 10px 16px;
  background-color: #0099ff;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  white-space: nowrap;
  &:hover {
    background-color: #007acc;
  }
`;
const SmallError = styled.div`
  color: red;
  font-size: 13px;
  margin-top: 4px;
`;
const CheckboxGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const dummyEmails = ["test@naver.com"];
const dummyNicknames = ["nickname1"];
const authCodeDummy = "123456";

const Join = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userId: "",
    password: "",
    confirmPassword: "",
    name: "",
    nickname: "",
    phone: "",
    gender: "",
    address: "",
  });

  const [emailId, setEmailId] = useState("");
  const [emailDomain, setEmailDomain] = useState("");
  const [customDomain, setCustomDomain] = useState("");
  const [isCustomDomain, setIsCustomDomain] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [authCodeSent, setAuthCodeSent] = useState(false);
  const [authCodeInput, setAuthCodeInput] = useState("");

  const [terms, setTerms] = useState({
    all: false,
    service: false,
    privacy: false,
    marketing: false,
  });

  const [errors, setErrors] = useState({
    email: "",
    nickname: "",
    password: "",
    phone: "",
    auth: "",
  });
  const domainList = ["naver.com", "gmail.com", "직접 입력"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckAll = (e) => {
    const checked = e.target.checked;
    setTerms({
      all: checked,
      service: checked,
      privacy: checked,
      marketing: checked,
    });
  };

  const handleCheckSingle = (e) => {
    const { name, checked } = e.target;
    setTerms((prev) => {
      const next = { ...prev, [name]: checked };
      next.all = next.service && next.privacy && next.marketing;
      return next;
    });
  };

  const getFullEmail = () => {
    const domain = isCustomDomain ? customDomain : emailDomain;
    return `${emailId}@${domain}`;
  };

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidPassword = (pw) =>
    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/.test(pw);
  const isValidPhone = (phone) => /^010\d{8}$/.test(phone);
  const checkEmailDuplicate = (email) => dummyEmails.includes(email);
  const checkNicknameDuplicate = (nick) => dummyNicknames.includes(nick);

  const handleCheckEmail = () => {
    const email = getFullEmail();
    if (!isValidEmail(email))
      return setErrors((prev) => ({ ...prev, email: "이메일 형식이 잘못됨" }));
    if (checkEmailDuplicate(email))
      return setErrors((prev) => ({ ...prev, email: "이미 사용 중인 이메일" }));
    setErrors((prev) => ({ ...prev, email: "" }));
    setAuthCodeSent(true);
    alert("인증코드를 이메일로 보냈습니다 (더미: 123456)");
  };

  const handleVerifyCode = () => {
    if (authCodeInput === authCodeDummy) {
      setEmailVerified(true);
      setErrors((prev) => ({ ...prev, auth: "" }));
      alert("✅ 이메일 인증 완료");
    } else {
      setErrors((prev) => ({ ...prev, auth: "인증코드가 일치하지 않습니다" }));
    }
  };

  const handleAddressSearch = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        setFormData((prev) => ({ ...prev, address: data.address }));
      },
    }).open();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = getFullEmail();
    const { password, confirmPassword, nickname, phone } = formData;

    if (!isValidEmail(email)) return alert("이메일 형식 오류");
    if (!emailVerified) return alert("이메일 인증 필요");
    if (!isValidPassword(password))
      return setErrors((prev) => ({ ...prev, password: "비밀번호 조건 오류" }));
    if (password !== confirmPassword)
      return setErrors((prev) => ({ ...prev, password: "비밀번호 불일치" }));
    if (!isValidPhone(phone))
      return setErrors((prev) => ({ ...prev, phone: "전화번호 형식 오류" }));
    if (!terms.service || !terms.privacy)
      return alert("필수 약관에 동의해주세요");

    console.log("🎉 가입 완료:", { ...formData, email });
    navigate("/login");
  };

  return (
    <>
      <Header />
      <Wrapper>
        <Title>회원가입</Title>
        <Form onSubmit={handleSubmit}>
          <FormItem>
            <Label>
              아이디<span>*</span>
            </Label>
            <Input name="userId" onChange={handleChange} />
          </FormItem>

          <FormItem>
            <Label>
              비밀번호<span>*</span>
            </Label>
            <Input name="password" type="password" onChange={handleChange} />
            {errors.password && <SmallError>{errors.password}</SmallError>}
          </FormItem>

          <FormItem>
            <Label>
              비밀번호 확인<span>*</span>
            </Label>
            <Input
              name="confirmPassword"
              type="password"
              onChange={handleChange}
            />
          </FormItem>

          <FormItem>
            <Label>
              이메일<span>*</span>
            </Label>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <Input
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
              />
              <span>@</span>
              {!isCustomDomain ? (
                <Select
                  value={emailDomain}
                  onChange={(e) => {
                    const val = e.target.value;
                    setIsCustomDomain(val === "직접 입력");
                    setEmailDomain(val !== "직접 입력" ? val : "");
                    setCustomDomain("");
                  }}
                >
                  <option value="">도메인 선택</option>
                  {domainList.map((d) => (
                    <option key={d}>{d}</option>
                  ))}
                </Select>
              ) : (
                <Input
                  value={customDomain}
                  onChange={(e) => setCustomDomain(e.target.value)}
                />
              )}
              <CheckButton type="button" onClick={handleCheckEmail}>
                인증 요청
              </CheckButton>
            </div>
            {errors.email && <SmallError>{errors.email}</SmallError>}
          </FormItem>

          {authCodeSent && !emailVerified && (
            <FormItem>
              <Label>인증코드 입력</Label>
              <div style={{ display: "flex", gap: 8 }}>
                <Input
                  value={authCodeInput}
                  onChange={(e) => setAuthCodeInput(e.target.value)}
                />
                <CheckButton type="button" onClick={handleVerifyCode}>
                  확인
                </CheckButton>
              </div>
              {errors.auth && <SmallError>{errors.auth}</SmallError>}
            </FormItem>
          )}

          <FormItem>
            <Label>
              닉네임<span>*</span>
            </Label>
            <Input name="nickname" onChange={handleChange} />
          </FormItem>

          <FormItem>
            <Label>전화번호</Label>
            <Input name="phone" onChange={handleChange} />
            {errors.phone && <SmallError>{errors.phone}</SmallError>}
          </FormItem>

          <FormItem>
            <Label>주소</Label>
            <div style={{ display: "flex", gap: 8 }}>
              <Input value={formData.address} readOnly />
              <CheckButton type="button" onClick={handleAddressSearch}>
                주소 검색
              </CheckButton>
            </div>
          </FormItem>

          <FormItem>
            <Label>성별</Label>
            <RadioGroup>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  onChange={handleChange}
                />{" "}
                남자
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  onChange={handleChange}
                />{" "}
                여자
              </label>
            </RadioGroup>
          </FormItem>

          <FormItem>
            <Label>
              생년월일<span>*</span>
            </Label>
            <BirthInput />
          </FormItem>

          <FormItem>
            <Label>
              약관 동의<span>*</span>
            </Label>
            <CheckboxGroup>
              <label>
                <input
                  type="checkbox"
                  checked={terms.all}
                  onChange={handleCheckAll}
                />{" "}
                전체 동의
              </label>
              <label>
                <input
                  type="checkbox"
                  name="service"
                  checked={terms.service}
                  onChange={handleCheckSingle}
                />{" "}
                (필수) 서비스 이용약관
              </label>
              <label>
                <input
                  type="checkbox"
                  name="privacy"
                  checked={terms.privacy}
                  onChange={handleCheckSingle}
                />{" "}
                (필수) 개인정보 수집
              </label>
              <label>
                <input
                  type="checkbox"
                  name="marketing"
                  checked={terms.marketing}
                  onChange={handleCheckSingle}
                />{" "}
                (선택) 마케팅 수신
              </label>
            </CheckboxGroup>
          </FormItem>

          <SubmitButton type="submit">가입하기</SubmitButton>
        </Form>
      </Wrapper>
    </>
  );
};

export default Join;
