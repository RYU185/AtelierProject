import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

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
  background: rgba(255, 255, 255, 0.07);
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
  background: ${({ active }) => (active ? "#238cdd" : "transparent")};
  color: ${({ active }) => (active ? "#ffffff" : "#e1e1e1")};
  font-weight: bold;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background: ${({ active }) => (active ? "#949494" : "#ccc")};
    color: ${({ active }) => (active ? "#161616ff" : "#000000")};
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: block;
  width: 100%;
  height: 100%;
`;

const AdminMenu = ({ tab }) => {
  return (
    <Container>
      <Title>관리자 페이지</Title>
      <Sidebar>
        <AdminInfo>
          관리자님 <br /> 어서오세요
        </AdminInfo>
        <MenuList>
          <MenuItem active={["art", "artAdd"].includes(tab)}>
            <StyledLink to="/AdminPage?tab=art">작품 조회</StyledLink>
          </MenuItem>
          <MenuItem active={["goods", "goodsAdd", "goodsChart"].includes(tab)}>
            <StyledLink to="/AdminPage?tab=goods">굿즈 판매 내역</StyledLink>
          </MenuItem>
          <MenuItem
            active={["ticket", "ticketAdd", "ticketChart"].includes(tab)}
          >
            <StyledLink to="/AdminPage?tab=ticket">티켓 관리</StyledLink>
          </MenuItem>
          <MenuItem active={tab === "contact"}>
            <StyledLink to="/AdminPage?tab=contact">문의 관리</StyledLink>
          </MenuItem>
          <MenuItem active={tab === "user"}>
            <StyledLink to="/AdminPage?tab=user">유저 관리</StyledLink>
          </MenuItem>
          <MenuItem active={["artist", "artistAdd"].includes(tab)}>
            <StyledLink to="/AdminPage?tab=artist">작가 관리</StyledLink>
          </MenuItem>
        </MenuList>
      </Sidebar>
    </Container>
  );
};

export default AdminMenu;
