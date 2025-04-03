import React from "react";
import styled from "styled-components";

const FooterWrapper = styled.footer`
  height: 120px;
  display: flex;
  justify-content: space-between;
  padding: 20px 70px;
  background: #111;
  color: #969696;
  font-size: 15px;
  flex-wrap: wrap;
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;

`;

const Right = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  text-align: right;
`;

const Footer = () => {
  return (
    <FooterWrapper>
      <Left>
        <p>TEAM.Project</p>
        <p>DW ACADEMY</p>
      </Left>
      <Right>
        <p>개인정보처리방침</p>
        <p>Copyright © TEAM All Rights Reserved.</p>
      </Right>
    </FooterWrapper>
  );
};

export default Footer;
