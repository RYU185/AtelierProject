import React from 'react';
import styled from 'styled-components';

const CustomerSupportContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 2rem;
  color: #333;
`;

const SupportInfo = styled.div`
  background-color: #f5f5f5;
  padding: 2rem;
  border-radius: 10px;
  margin-bottom: 2rem;
`;

const ContactInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const ContactItem = styled.div`
  padding: 1.5rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ContactTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: #333;
`;

const ContactDetail = styled.p`
  color: #666;
  line-height: 1.6;
`;

const CustomerSupport = () => {
  return (
    <CustomerSupportContainer>
      <Title>고객센터</Title>
      <SupportInfo>
        <ContactTitle>고객센터 운영 안내</ContactTitle>
        <ContactInfo>
          <ContactItem>
            <ContactTitle>전화 상담</ContactTitle>
            <ContactDetail>
              전화번호: 1234-5678<br />
              운영시간: 평일 09:00 - 18:00<br />
              점심시간: 12:00 - 13:00
            </ContactDetail>
          </ContactItem>
          <ContactItem>
            <ContactTitle>이메일 문의</ContactTitle>
            <ContactDetail>
              이메일: support@example.com<br />
              응답시간: 24시간 이내
            </ContactDetail>
          </ContactItem>
          <ContactItem>
            <ContactTitle>카카오톡 상담</ContactTitle>
            <ContactDetail>
              카카오톡 ID: @support<br />
              운영시간: 24시간
            </ContactDetail>
          </ContactItem>
        </ContactInfo>
      </SupportInfo>
    </CustomerSupportContainer>
  );
};

export default CustomerSupport; 