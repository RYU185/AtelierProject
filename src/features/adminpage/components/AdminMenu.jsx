import React from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";

const Container = styled.div`
  margin: 40px 90px;
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 35px;
  color: #e1e1e1;
  text-align: center;
  margin-bottom: 20px;
`;

const Sidebar = styled.div`
  width: 270px;
  height: 500px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.07) ;
  border-radius: 8px;
  text-align: center;
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
  background: ${({ active }) => (active ? "#949494" : "transparent")};
  color: ${({ active }) => (active ? "#161616ff" : "#e1e1e1")};
  font-weight: bold;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background: ${({ active }) => (active ? "#3da0e5" : "#ccc")};
    color: ${({ active }) => (active ? "#e1e1e1" : "#000000")};;
  }
`;

const AdminMenu = () => {
  const location = useLocation();

  return (
    <Container>
      <Title>관리자 페이지</Title>
      <Sidebar>
        <AdminInfo>
          관리자님 <br /> 어서오세요
        </AdminInfo>
        <MenuList>
          {/* '/AdminPage' 또는 '/AdminArtAdd'일 때 작품 조회 버튼 활성화 */}
          <MenuItem
            active={
              location.pathname.includes("/AdminArtList") ||
              location.pathname.includes("/AdminArtAdd")
            }
          >
            <Link
              to="/AdminArtList"
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
          <MenuItem active={location.pathname.includes("/AdminContact")}>
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

          <MenuItem active={location.pathname === "/AdminArtist"}>
            <Link
              to="/AdminArtist"
              style={{
                textDecoration: "none",
                color: "inherit",
                display: "block",
                width: "100%",
                height: "100%",
              }}
            >
              작가 관리
            </Link>
          </MenuItem>
        </MenuList>
      </Sidebar>
    </Container>
  );
};

export default AdminMenu;
