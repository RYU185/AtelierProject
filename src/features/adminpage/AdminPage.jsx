import React, { useState } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import styled from 'styled-components';
import AdminMenu from './components/AdminMenu';
import AdminArtList from './components/AdminArtList';


const Container = styled.div`
  display: flex;
  flex-direction: column; /* 세로 배치 */
  padding: 40px 60px;
  min-height: 80vh;
  background: #f8f9fa;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: flex-start; /* 사이드바와 컨텐츠 정렬 */
  margin-top: 20px;
`;



const Title = styled.h1`
  font-size: 30px;
  margin-bottom: 20px;
    margin-left: 10px;
`;


const AdminPage = () => {
    const [tab, setTab] = useState('check');

    return (
        <>
            <Header />
            <Container>
                <Title>관리자 페이지</Title>
                <Wrapper>
                    <AdminMenu tab={tab} setTab={setTab} />
                <AdminArtList />
                </Wrapper>
            </Container>
            <Footer />
        </>
    );
};


export default AdminPage;
