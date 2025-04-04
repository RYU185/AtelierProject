import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const MenuContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: -10px;
  margin-top: 20px;
  padding-left: 469px;
`;

const TabButton = styled.button`
  width: 220px;
  padding: 10px 30px;
  font-size: 14px;
  border: 1px solid #bbb;
  border-radius: 10px;
  background: ${(props) => (props.active ? '#6ea8fe' : '#f1f1f1')};
  color: ${(props) => (props.active ? '#fff' : '#666')};
  cursor: pointer;
  transition: background 0.2s;
  margin-right: 5px;
  text-align: center;
  position: relative;

  &:hover {
    background: #6ea8fe;
    color: #fff;
  }

  &:active {
    transform: scale(0.98);
  }
`;

// ✅ `AdminTicketChart`에서만 적용될 추가 스타일
const ChartTabButton = styled(TabButton)`
  top: 30px;
  
`;

function AdminTicketMenubar({ className }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <MenuContainer>
      {className === 'chart-menubar' ? (
        <>
          <ChartTabButton
            active={location.pathname === '/AdminTicketList'}
            onClick={() => navigate('/AdminTicketList')}
          >
            전시회 별 현황
          </ChartTabButton>
          <ChartTabButton
            active={location.pathname === '/AdminTicketChart'}
            onClick={() => navigate('/AdminTicketChart')}
          >
            전시회 분석
          </ChartTabButton>
        </>
      ) : (
        <>
          <TabButton
            active={location.pathname === '/AdminTicketList'}
            onClick={() => navigate('/AdminTicketList')}
          >
            전시회 별 현황
          </TabButton>
          <TabButton
            active={location.pathname === '/AdminTicketChart'}
            onClick={() => navigate('/AdminTicketChart')}
          >
            전시회 분석
          </TabButton>
        </>
      )}
    </MenuContainer>
  );
}

export default AdminTicketMenubar;
