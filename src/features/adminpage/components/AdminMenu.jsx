import React from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 40px 60px;
  min-height: 80vh;
`;

const Title = styled.h1`
  font-size: 35px;
  margin-bottom: 30px;
  margin-left: -20px;
`;

const Sidebar = styled.div`
  width: 240px;
  height: 500px;
  margin-left: -40px;
  padding: 20px;
  background: #e9ecef;
  border-radius: 8px;
`;

const AdminInfo = styled.div`
  padding: 16px;
  text-align: center;
  border-radius: 6px;
  font-size: 18px;
  color: #3da9fc;
  font-weight: bold;
  margin-bottom: 20px;
`;

const MenuList = styled.ul`
  list-style: none;
  padding: 0;
`;

const MenuItem = styled.li`
  padding: 10px 12px;
  margin: 6px 0;
  background: ${({ active }) => (active ? "#3DA9FC" : "transparent")};
  color: ${({ active }) => (active ? "white" : "#333")};
  font-weight: bold;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background: ${({ active }) => (active ? "#3da0e5" : "#ccc")};
  }
`;

const AdminMenu = () => {
  const location = useLocation();

  return (
    <Container>
      <Title>관리자 페이지</Title>
      <Sidebar>
        <AdminInfo>
          관리자 김동근님 <br /> 어서오세요
        </AdminInfo>
        <MenuList>
          {/* ✅ '/AdminPage' 또는 '/AdminArtAdd'일 때 작품 조회 버튼 활성화 */}
          <MenuItem
            active={
              location.pathname.includes("/AdminPage") || location.pathname.includes("/AdminArtAdd")
            }
          >
            <Link
              to="/AdminPage"
              style={{
                textDecoration: "none",
                color: "inherit",
                display: "block",
                width: "100%",
                height: "100%",
              }}
            >
              작품 조회
            </Link>
          </MenuItem>
          <MenuItem active={location.pathname.includes("/AdminGoods")}>
            <Link
              to="/AdminGoods"
              style={{
                textDecoration: "none",
                color: "inherit",
                display: "block",
                width: "100%",
                height: "100%",
              }}
            >
              굿즈 판매 내역
            </Link>
          </MenuItem>
          <MenuItem active={location.pathname === "/AdminTicketManagement"}>
            <Link
              to="/AdminTicketManagement"
              style={{
                textDecoration: "none",
                color: "inherit",
                display: "block",
                width: "100%",
                height: "100%",
              }}
            >
              티켓 관리
            </Link>
          </MenuItem>
          <MenuItem
            active={
              location.pathname.includes("/AdminContact") ||
              location.pathname.includes("/AdminContact")
            }
          >
            <Link
              to="/AdminContact"
              style={{
                textDecoration: "none",
                color: "inherit",
                display: "block",
                width: "100%",
                height: "100%",
              }}
            >
              문의 관리
            </Link>
          </MenuItem>
          <MenuItem active={location.pathname === "/AdminUser"}>
            <Link
              to="/AdminUser"
              style={{
                textDecoration: "none",
                color: "inherit",
                display: "block",
                width: "100%",
                height: "100%",
              }}
            >
              유저 관리
            </Link>
          </MenuItem>
        </MenuList>
      </Sidebar>
    </Container>
  );
};

export default AdminMenu;
