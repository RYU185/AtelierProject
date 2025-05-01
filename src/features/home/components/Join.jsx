import axiosInstance from "../../../api/axiosInstance";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Header from "../../Header";
import Footer from "../../Footer";

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
const ConfirmButton = styled.button`
  padding: 10px 16px;
  background-color: #0099ff;
  color: white;
  font-size: 14px;
  font-weight: bold;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  white-space: nowrap;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #007acc;
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

const Join = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userId: "",
    password: "",
    confirmPassword: "",
    realName: "",
    nickName: "",
    phone: "",
    gender: "",
    address: "",
    email: "",
    birthYear: "",
    birthMonth: "",
    birthDay: "",
  });
  const [idChecked, setIdChecked] = useState(false);
  const [emailChecked, setEmailChecked] = useState(false);
  const [terms, setTerms] = useState({
    all: false,
    service: false,
    privacy: false,
    marketing: false,
  });
  const [errors, setErrors] = useState({});

  const formatPhoneNumberInput = (value) => {
    const onlyNums = value.replace(/[^0-9]/g, "");
    if (onlyNums.length < 4) return onlyNums;
    if (onlyNums.length < 8)
      return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3)}`;
    return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3, 7)}-${onlyNums.slice(
      7,
      11
    )}`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;
    if (name === "phone") newValue = formatPhoneNumberInput(value);
    setFormData((prev) => ({ ...prev, [name]: newValue }));
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
    const next = { ...terms, [name]: checked };
    next.all = next.service && next.privacy && next.marketing;
    setTerms(next);
  };

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidPassword = (pw) =>
    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/.test(pw);
  const isValidPhone = (phone) => /^010\d{8}$/.test(phone.replace(/-/g, ""));
  const checkIdDuplicate = async () => {
    if (!formData.userId) return alert("아이디를 입력해주세요.");

    try {
      const res = await axiosInstance.get(
        `/user/check-id?userId=${formData.userId}`
      );
      if (res.data.exists) {
        alert("이미 사용 중인 아이디입니다.");
        setIdChecked(false);
      } else {
        alert("사용 가능한 아이디입니다!");
        setIdChecked(true);
      }
    } catch (err) {
      console.error("❌ 중복 확인 실패:", err.response?.data || err.message);
      alert("아이디 중복 확인 중 오류 발생");
      setIdChecked(false);
    }
  };

  const checkEmailDuplicate = async () => {
    if (!formData.email) return alert("이메일을 입력해주세요.");
    try {
      const res = await axiosInstance.get(
        `/user/check-email?email=${formData.email}`
      );
      if (res.data.exists) {
        alert("이미 사용 중인 이메일입니다.");
        setEmailChecked(false);
      } else {
        alert("사용 가능한 이메일입니다!");
        setEmailChecked(true);
      }
    } catch (err) {
      alert("이메일 중복 확인 중 오류 발생");
      setEmailChecked(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      userId,
      password,
      confirmPassword,
      realName,
      nickName,
      email,
      birthYear,
      birthMonth,
      birthDay,
      address,
      gender,
      phone,
    } = formData;

    const birthday = `${birthYear}-${birthMonth}-${birthDay}`;

    if (!idChecked) return alert("아이디 중복 확인을 해주세요.");
    if (!emailChecked) return alert("이메일 중복 확인을 해주세요.");

    const newErrors = {};
    if (!isValidEmail(email)) newErrors.email = "이메일 형식 오류";
    if (!isValidPassword(password)) newErrors.password = "비밀번호 조건 오류";
    if (password !== confirmPassword)
      newErrors.confirmPassword = "비밀번호 불일치";
    if (!isValidPhone(phone)) newErrors.phone = "전화번호 형식 오류";
    if (!terms.service || !terms.privacy)
      return alert("필수 약관에 동의해주세요");
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const payload = {
      userId,
      password,
      nickName,
      realName,
      email,
      birthday,
      address,
      gender: gender.toUpperCase(),
      point: 0,
      enrolmentDate: new Date().toISOString().split("T")[0],
      phone: phone.replace(/-/g, ""),
    };

    try {
      await axiosInstance.post("/user/register", payload);
      alert("회원가입 성공! 로그인 페이지로 이동합니다.");
      navigate("/login");
    } catch (err) {
      alert("회원가입 실패: " + (err.response?.data?.message || err.message));
    }
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
            <div style={{ display: "flex", gap: "8px" }}>
              <Input
                name="userId"
                value={formData.userId}
                onChange={(e) => {
                  handleChange(e);
                  setIdChecked(false);
                }}
                required
              />
              <ConfirmButton type="button" onClick={checkIdDuplicate}>
                중복 확인
              </ConfirmButton>
            </div>
          </FormItem>

          <FormItem>
            <Label>
              비밀번호<span>*</span>
            </Label>
            <Input
              name="password"
              type="password"
              onChange={handleChange}
              required
            />
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
              required
            />
            {errors.confirmPassword && (
              <SmallError>{errors.confirmPassword}</SmallError>
            )}
          </FormItem>

          <FormItem>
            <Label>
              이름<span>*</span>
            </Label>
            <Input name="realName" onChange={handleChange} required />
          </FormItem>

          <FormItem>
            <Label>
              닉네임<span>*</span>
            </Label>
            <Input name="nickName" onChange={handleChange} required />
          </FormItem>

          <FormItem>
            <Label>
              이메일<span>*</span>
            </Label>
            <div style={{ display: "flex", gap: "8px" }}>
              <Input
                name="email"
                value={formData.email}
                onChange={(e) => {
                  handleChange(e);
                  setEmailChecked(false);
                }}
                required
              />
              <ConfirmButton type="button" onClick={checkEmailDuplicate}>
                중복 확인
              </ConfirmButton>
            </div>
            {errors.email && <SmallError>{errors.email}</SmallError>}
          </FormItem>

          <FormItem>
            <Label>
              생년월일<span>*</span>
            </Label>
            <div style={{ display: "flex", gap: "8px" }}>
              <Select
                name="birthYear"
                value={formData.birthYear}
                onChange={handleChange}
                required
              >
                <option value="">년</option>
                {[...Array(85)].map((_, i) => {
                  const year = new Date().getFullYear() - i;
                  return (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  );
                })}
              </Select>

              <Select
                name="birthMonth"
                value={formData.birthMonth}
                onChange={handleChange}
                required
              >
                <option value="">월</option>
                {[...Array(12)].map((_, i) => {
                  const month = String(i + 1).padStart(2, "0");
                  return (
                    <option key={month} value={month}>
                      {month}
                    </option>
                  );
                })}
              </Select>

              <Select
                name="birthDay"
                value={formData.birthDay}
                onChange={handleChange}
                required
              >
                <option value="">일</option>
                {[...Array(31)].map((_, i) => {
                  const day = String(i + 1).padStart(2, "0");
                  return (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  );
                })}
              </Select>
            </div>
          </FormItem>

          <FormItem>
            <Label>
              전화번호<span>*</span>
            </Label>
            <Input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            {errors.phone && <SmallError>{errors.phone}</SmallError>}
          </FormItem>

          <FormItem>
            <Label>
              주소<span>*</span>
            </Label>
            <Input name="address" onChange={handleChange} required />
          </FormItem>

          <FormItem>
            <Label>
              성별<span>*</span>
            </Label>
            <RadioGroup>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="MALE"
                  onChange={handleChange}
                  required
                />{" "}
                남자
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="FEMALE"
                  onChange={handleChange}
                  required
                />{" "}
                여자
              </label>
            </RadioGroup>
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
      <Footer />
    </>
  );
};

export default Join;
