import React, { useState } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import styled from 'styled-components';
import AdminMenu from './components/AdminMenu';
import AdminArtList from './components/AdminArtList';
import AdminGoods from './components/AdminGoods';


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



const AdminPage = () => {
    const [tab, setTab] = useState('check');

    return (
        <>
            <Header />
            <Container>
                
                <Wrapper>
                    <AdminMenu tab={tab} setTab={setTab} />
                <AdminArtList />
                <AdminGoods />
                </Wrapper>
            </Container>
            <Footer />
        </>
    );
};


export default AdminPage;
