import React from "react";
import { useNavigate, useLocation, Link } from "react-router-dom"; // ✅ useLocation 추가
import styled from "styled-components";

const MenuContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ButtonWrapper = styled.div`
  display: flex;
`;

const TabButton = styled.button`
  width: 220px;
  padding: 10px 30px;
  font-size: 14px;
  border: 1px solid #bbb;
  border-radius: 10px 10px 10px 10px;
  background: ${(props) => (props.active ? "#6ea8fe" : "rgba(255, 255, 255, 0.07)")};
  color: ${(props) => (props.active ? "#fff" : "#e1e1e1")};
  cursor: pointer;
  transition: background 0.2s;
  margin-right: 5px;
  text-align: center;

  &:hover {
    background: #3381f7;
    color: #fff;
  }

  &:active {
    transform: scale(0.98);
  }
`;

const AddButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
 
`;

const AddButton = styled.button`
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.07);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: 0.3s ease-in-out;
  text-align: center;
  &:hover {
    background: #3381f7;
  }
`;

function AdminGoodsMenubar() {
  const navigate = useNavigate();
  const location = useLocation(); 

  return (
    <MenuContainer>
      <ButtonWrapper>
        <TabButton
          active={location.pathname === "/AdminGoods"} // ✅ 현재 URL이 /AdminGoods면 활성화
          onClick={() => navigate("/AdminGoods")}
        >
          굿즈 판매내역 관리
        </TabButton>
        <TabButton
          active={location.pathname === "/AdminGoodsChart"} // ✅ 현재 URL이 /AdminGoodsChart면 활성화
          onClick={() => navigate("/AdminGoodsChart")}
        >
          통계 관리
        </TabButton>
      </ButtonWrapper>

      <AddButtonWrapper>
        <Link to="/AdminGoodsAdd" style={{ textDecoration: "none" }}>
          <AddButton>굿즈 추가</AddButton>
        </Link>
      </AddButtonWrapper>
    </MenuContainer>
  );
}

export default AdminGoodsMenubar;
