import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // ✅ useLocation 추가
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
  border-radius: 10px 10px 10px 10px;
  background: ${(props) => (props.active ? '#6ea8fe' : '#f1f1f1')};
  color: ${(props) => (props.active ? '#fff' : '#666')};
  cursor: pointer;
  transition: background 0.2s;
  margin-right: 5px;
  text-align: center;

  position: relative; /* ✅ 버튼 위치 조정 가능하게 설정 */
  top: 30px; /* ✅ 버튼을 아래로 내림 */

  &:hover {
    background: #6ea8fe;
    color: #fff;
  }

  &:active {
    transform: scale(0.98);
  }
`;

function AdminTicketMenubar() {
  const navigate = useNavigate();  
  const location = useLocation(); // ✅ 현재 URL 가져오기

  return (
    <MenuContainer>
      <TabButton 
        active={location.pathname === '/AdminTicketList'} // ✅ 현재 URL이 /AdminGoods면 활성화
        onClick={() => navigate('/AdminTicketList')}
      >
        전시회 별 현황
      </TabButton>
      <TabButton 
        active={location.pathname === '/AdminTicketChart'} // ✅ 현재 URL이 /AdminGoodsChart면 활성화
        onClick={() => navigate('/AdminTicketChart')}
      >
        전시회 분석
      </TabButton>
    </MenuContainer>
  );
}

export default AdminTicketMenubar;
