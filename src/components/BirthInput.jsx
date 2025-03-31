import React, { useState } from "react";
import styled from "styled-components";

const StyledInput = styled.input`
  padding: 12px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;

  &:focus {
    outline: none;
    border-color: #007aff;
  }
`;

const BirthInput = () => {
  const [birth, setBirth] = useState("");

  const handleBirthChange = (e) => {
    let input = e.target.value.replace(/\D/g, ""); // 숫자만 남기기
    if (input.length > 8) input = input.slice(0, 8); // 최대 8자리

    let formatted = input;
    if (input.length >= 5) {
      formatted = `${input.slice(0, 4)}-${input.slice(4, 6)}-${input.slice(6)}`;
    } else if (input.length >= 4) {
      formatted = `${input.slice(0, 4)}-${input.slice(4)}`;
    }

    setBirth(formatted);
  };

  return (
    <StyledInput
      type="text"
      value={birth}
      onChange={handleBirthChange}
      placeholder="YYYY-MM-DD"
      maxLength={10}
    />
  );
};

export default BirthInput;
