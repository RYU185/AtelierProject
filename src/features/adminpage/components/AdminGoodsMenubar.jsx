import React, { useState } from 'react';
import styled from 'styled-components';

const MenuContainer = styled.div`
  display: flex;
  justify-content: flex-start; /* 왼쪽 정렬 유지 */

  margin-bottom: -30px; /* 버튼과 상품 간격 확보 */
  margin-top: 20px; /* 헤더와의 간격 조정 */
  padding-left: 990px; /* ✅ 왼쪽 여백 추가해서 버튼을 살짝 오른쪽으로 이동 */
`;
const TabButton = styled.button`
  padding: 10px 20px; /* ✅ 버튼 크기 유지 */
  font-size: 14px;
  border: 1px solid #bbb;
  border-radius: 10px 10px 0 0;
  background: ${(props) => (props.active ? '#6ea8fe' : '#f1f1f1')};
  color: ${(props) => (props.active ? '#fff' : '#666')};
  cursor: pointer;
  transition: background 0.3s;
  margin-right: 5px; /* ✅ 버튼 사이 간격 */
  cursor: pointer;
  
  text-align: center;

  &:hover {
    background: #6ea8fe;
    color: #fff;
  }
`;

function AdminGoodsMenubar() {
  const [activeTab, setActiveTab] = useState('goods');

  return (
    <MenuContainer>
      <TabButton active={activeTab === 'goods'} onClick={() => setActiveTab('goods')}>
        굿즈 판매내역 관리
      </TabButton>
      <TabButton active={activeTab === 'stats'} onClick={() => setActiveTab('stats')}>
        통계 관리
      </TabButton>
    </MenuContainer>
  );
}

export default AdminGoodsMenubar;
