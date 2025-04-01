import React from 'react'
import Header from '../../Header'
import Footer from '../../Footer'
import AdminMenu from './AdminMenu'
import styled from 'styled-components'

const Container = styled.div`
  
`;

function AdminTicketList() {
  return (
    <>
    <Header />
    <Container>
      <AdminMenu/>
    <h1>티켓판매내역</h1>
    </Container>
    <Footer />
    </>
  )
}

export default AdminTicketList
