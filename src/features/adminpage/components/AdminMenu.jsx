import React from 'react';
import styled from 'styled-components';

const Sidebar = styled.div`
  width: 240px;
  height: 500px;
  padding: 20px;
  background: #e9ecef;
  border-radius: 8px;
`;

const AdminInfo = styled.div`
  padding: 16px;
  background: #dee2e6;
  text-align: center;
  border-radius: 6px;
  font-size: 18px;
  color: #3DA9FC;
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
  background: ${({ active }) => (active ? '#3DA9FC' : 'transparent')};
  color: ${({ active }) => (active ? 'white' : '#333')};
  font-weight: bold;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background: ${({ active }) => (active ? '#3da0e5' : '#ccc')};
  }
`;

const AdminMenu = ({ tab, setTab }) => {
  return (
    <Sidebar>
      <AdminInfo>관리자 김동근님 <br /> 어서오세요</AdminInfo>
      <MenuList>
        <MenuItem active={tab === 'check'} onClick={() => setTab('check')}>
          작품 조회
        </MenuItem>
        <MenuItem active={tab === 'goods'} onClick={() => setTab('goods')}>
          굿즈 판매 내역
        </MenuItem>
        <MenuItem active={tab === 'tickets'} onClick={() => setTab('tickets')}>
          티켓 판매 내역
        </MenuItem>
        <MenuItem active={tab === 'users'} onClick={() => setTab('users')}>
          유저 관리
        </MenuItem>
      </MenuList>
    </Sidebar>
  );
};

export default AdminMenu;
