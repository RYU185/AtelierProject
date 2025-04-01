import React from 'react'
import Header from '../../Header'
import Footer from '../../Footer'
import styled from 'styled-components'
import AdminMenu from './AdminMenu';

const Container = styled.div`
  
`;

function AdminUser() {
  return (
    <>
    <Header />
    <Container>
      <AdminMenu/>
    <h1>유저 관리</h1>
    </Container>
    <Footer />
    </>
  )
}

export default AdminUser
