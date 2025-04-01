import React from 'react'
import Header from '../../Header'
import Footer from '../../Footer'
import AdminMenu from './AdminMenu'
import styled from 'styled-components'

const Container = styled.div`
  
`;

function AdminGoods() {
  return (
    <>
    <Header />
    <Container>
      <AdminMenu />
    <h1>굿즈 판매 내역</h1>
    </Container>
    <Footer />
    </>
  )
}

export default AdminGoods
