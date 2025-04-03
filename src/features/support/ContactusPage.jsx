import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Header from "../Header";

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const Title = styled.h1`
  font-size: 48px;
  color: #333;
  margin-bottom: 40px;
  text-align: center;
  position: relative;

  &::after {
    content: "CONTACT";
    position: absolute;
    top: -20px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 80px;
    color: rgba(0, 0, 0, 0.05);
    z-index: -1;
  }
`;

const MenuContainer = styled.div`
  display: flex;
  border-bottom: 1px solid #ddd;
  margin-bottom: 30px;
`;

const MenuItem = styled.button`
  padding: 15px 30px;
  font-size: 18px;
  background: none;
  border: none;
  color: ${(props) => (props.active ? "#007AFF" : "#666")};
  cursor: pointer;
  position: relative;

  ${(props) =>
    props.active &&
    `
    &::after {
      content: '';
      position: absolute;
      bottom: -1px;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: #007AFF;
    }
  `}

  &:hover {
    color: #007aff;
  }
`;

const FormContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  background: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 16px;
  color: #333;
  font-weight: 500;
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;

  &:focus {
    outline: none;
    border-color: #007aff;
  }
`;

const Select = styled.select`
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  background: white;

  &:focus {
    outline: none;
    border-color: #007aff;
  }
`;

const TextArea = styled.textarea`
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  min-height: 200px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #007aff;
  }
`;

const FileInput = styled.input`
  display: none;
`;

const FileInputLabel = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 12px 20px;
  background: #f8f9fa;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  color: #666;

  &:hover {
    background: #e9ecef;
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

const FileList = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const FileItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  background: #f8f9fa;
  border-radius: 4px;
  font-size: 14px;
  color: #666;
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  color: #dc3545;
  cursor: pointer;
  padding: 4px;

  &:hover {
    color: #bd2130;
  }
`;

const SubmitButton = styled.button`
  padding: 15px 30px;
  background: #007aff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s ease;
  margin-top: 20px;

  &:hover {
    background: #0056b3;
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const ContactusPage = () => {
  const [activeMenu, setActiveMenu] = useState("문의하기");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    category: "",
    title: "",
    content: "",
  });
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();

  const menus = [
    { name: "공지사항", path: "/support/notice" },
    { name: "시설 안내", path: "/support/guide" },
    { name: "오시는 길", path: "/support/location" },
    { name: "문의하기", path: "/support/contact" },
  ];

  const handleMenuClick = (menu) => {
    setActiveMenu(menu.name);
    navigate(menu.path);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    setFiles((prev) => [...prev, ...newFiles]);
  };

  const handleFileDelete = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: API 연동
    console.log("Submit:", { ...formData, files });
  };

  return (
    <>
      <Header />
      <Container>
        <Title>문의하기</Title>

        <MenuContainer>
          {menus.map((menu) => (
            <MenuItem
              key={menu.name}
              active={activeMenu === menu.name}
              onClick={() => handleMenuClick(menu)}
            >
              {menu.name}
            </MenuItem>
          ))}
        </MenuContainer>

        <FormContainer>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label>이름 *</Label>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label>이메일 *</Label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label>연락처 *</Label>
              <Input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label>문의 유형 *</Label>
              <Select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">선택해주세요</option>
                <option value="general">일반 문의</option>
                <option value="program">프로그램 문의</option>
                <option value="facility">시설 문의</option>
                <option value="other">기타 문의</option>
              </Select>
            </FormGroup>

            <FormGroup>
              <Label>제목 *</Label>
              <Input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label>내용 *</Label>
              <TextArea
                name="content"
                value={formData.content}
                onChange={handleChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label>첨부파일</Label>
              <FileInputLabel>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                  />
                </svg>
                파일 선택
                <FileInput type="file" multiple onChange={handleFileChange} />
              </FileInputLabel>
              <FileList>
                {files.map((file, index) => (
                  <FileItem key={index}>
                    {file.name}
                    <DeleteButton onClick={() => handleFileDelete(index)}>
                      ×
                    </DeleteButton>
                  </FileItem>
                ))}
              </FileList>
            </FormGroup>

            <SubmitButton type="submit">문의하기</SubmitButton>
          </Form>
        </FormContainer>
      </Container>
    </>
  );
};

export default ContactusPage;
