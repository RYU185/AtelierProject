import React, { useState } from 'react';
import styled from 'styled-components';

const MenuContainer = styled.div`
  display: flex;
  border-bottom: 2px solid #ddd;
  margin-bottom: 15px;
`;

const TabButton = styled.button`
  flex: 1;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #bbb;
  border-radius: 10px 10px 0 0; /* ✅ 모서리 둥글게 */
  background: ${(props) => (props.active ? '#6ea8fe' : '#f1f1f1')};
  color: ${(props) => (props.active ? '#fff' : '#666')};
  cursor: pointer;
  transition: background 0.3s;
  margin-right: 5px; /* ✅ 버튼 사이 간격 */

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
