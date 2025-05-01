import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";

const MenuContainer = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const TabButton = styled.button`
  width: 220px;
  padding: 10px 30px;
  font-size: 14px;
  border: 1px solid #bbb;
  border-radius: 10px;
  background: ${(props) => (props.active ? "#6ea8fe" : "rgba(255, 255, 255, 0.07);")};
  color: ${(props) => (props.active ? "#fff" : "#e1e1e1")};
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

const ChartTabButton = styled(TabButton)`
  top: 30px;
`;

function AdminTicketMenubar({ className }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <MenuContainer>
      {className === "chart-menubar" ? (
        <>
          <ChartTabButton
            active={location.pathname === "/AdminTicketManagement"}
            onClick={() => navigate("/AdminTicketManagement")}
          >
            전시회 별 현황
          </ChartTabButton>
          <ChartTabButton
            active={location.pathname === "/AdminTicketChart"}
            onClick={() => navigate("/AdminTicketChart")}
          >
            전시회 분석
          </ChartTabButton>
        </>
      ) : (
        <>
          <TabButton
            active={location.pathname === "/AdminTicketManagement"}
            onClick={() => navigate("/AdminTicketManagement")}
          >
            전시회 별 현황
          </TabButton>
          <TabButton
            active={location.pathname === "/AdminTicketChart"}
            onClick={() => navigate("/AdminTicketChart")}
          >
            전시회 분석
          </TabButton>
        </>
      )}

      {/* ✅ 티켓 추가 버튼은 조건 없이 항상 보이도록 마지막에 추가 */}
      <TabButton
        active={location.pathname === "/AdminTicketAdd"}
        onClick={() => navigate("/AdminTicketAdd")}
      >
        티켓 추가
      </TabButton>
    </MenuContainer>
  );
}

export default AdminTicketMenubar;
