import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../../Header';
import Footer from '../../Footer';
import AdminMenu from './AdminMenu';
import AdminTicketMenubar from './AdminTicketMenubar';

const initialTickets = [
  {
    id: 1,
    title: '현대 산업디자인展',
    dateRange: '2025.04.12 - 2025.04.25',
    image: '/src/assets/ArtIMG/1.jpg',
    visitors: 15,
    reservationLimit: 50,
    deadline: '2025-04-20',
    reservations: [
      { id: 101, name: '홍길동', status: 'reserved', reservedCount: 2 },
      { id: 102, name: '김민지', status: 'confirmed', reservedCount: 1 },
      { id: 101, name: '홍길동', status: 'reserved', reservedCount: 2 },
      { id: 102, name: '김민지', status: 'confirmed', reservedCount: 1 },
      { id: 101, name: '홍길동', status: 'reserved', reservedCount: 2 },
      { id: 102, name: '김민지', status: 'confirmed', reservedCount: 1 },
      { id: 101, name: '홍길동', status: 'reserved', reservedCount: 2 },
      { id: 102, name: '김민지', status: 'confirmed', reservedCount: 1 },
    ],
  },
  {
    id: 2,
    title: '현대 산업디자인展',
    dateRange: '2025.04.12 - 2025.04.25',
    image: '/src/assets/ArtIMG/2.jpg',
    visitors: 21,
    reservationLimit: 70,
    deadline: '2025-04-21',
    reservations: [
      { id: 201, name: '박서준', status: 'reserved', reservedCount: 3 },
    ],
  },
];

const Container = styled.div`
  display: flex;
  padding: 20px;
  margin-left: 23px;
  position: relative;
`;

const AdminGoodsMenubarWrapper = styled.div`
  position: relative;
  top: 100px;
  left: 45px;
  z-index: 10;
  margin-left: -85px;
`;

const AdminMenuWrapper = styled.div`
  position: relative;
  top: -30px;
  margin-left: 13px;
`;

const MainContent = styled.div`
  flex: 1;
  padding: 20px;
  margin-top: -60px;
  margin-left: 30px;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 30px;
`;

const Table = styled.table`
  width: 100%;
  max-width: 1300px;
  border-collapse: collapse;
  margin-top: 90px;
  font-size: 16px;
  text-align: center;
`;

const Th = styled.th`
  background: #f0f0f0;
  padding: 12px;
  border: 1px solid #ddd;
`;

const Td = styled.td`
  padding: 12px;
  border: 1px solid #ddd;
`;

const Thumbnail = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 5px;
  cursor: pointer;
`;

const ReservationTable = styled.table`
  margin-top: 10px;
  border-collapse: collapse;
  width: 100%;
  font-size: 14px;

  th, td {
    border: 1px solid #ccc;
    padding: 8px;
  }

  th {
    background-color: #f9f9f9;
  }
`;

const ScrollableWrapper = styled.div`
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid #ccc;
  margin-top: 10px;
`;

const ActionButton = styled.button`
  padding: 6px 12px;
  margin: 2px;
  font-size: 14px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  color: #333;
  background-color: ${props =>
    props.variant === 'edit' ? '#a4d4f3' :
    props.variant === 'delete' ? '#f7b6b6' : '#d6ccf7'};

  &:hover {
    background-color: ${props =>
      props.variant === 'edit' ? '#7dc5f3' :
      props.variant === 'delete' ? '#f48c8c' : '#c4b8f0'};
  }
`;

const AdminTicketManagement = () => {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState(initialTickets);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ deadline: '' });
  const [visibleReservations, setVisibleReservations] = useState(null);

  const handleThumbnailClick = (id) => {
    navigate(`/gallery/artistgallery/${id}`);
  };

  const handleEditClick = (ticket) => {
    setEditingId(ticket.id);
    setFormData({ deadline: ticket.deadline });
  };

  const handleSave = (id) => {
    setTickets(prev =>
      prev.map(ticket =>
        ticket.id === id ? { ...ticket, deadline: formData.deadline } : ticket
      )
    );
    setEditingId(null);
  };

  const handleDelete = (id) => {
    setTickets(prev => prev.filter(ticket => ticket.id !== id));
  };

  const toggleReservationList = (id) => {
    setVisibleReservations(visibleReservations === id ? null : id);
  };

  return (
    <>
      <Header />
      <AdminGoodsMenubarWrapper>
        <AdminTicketMenubar />
      </AdminGoodsMenubarWrapper>
      <Container>
        <AdminMenuWrapper>
          <AdminMenu />
        </AdminMenuWrapper>

        <MainContent>
          <Title>티켓 판매 내역 및 마감일 관리</Title>

          <Table>
            <thead>
              <tr>
                <Th>전시 이미지</Th>
                <Th>전시명</Th>
                <Th>기간</Th>
                <Th>누적 관람객</Th>
                <Th>예약 가능 수량</Th>
                <Th>예약 마감일</Th>
                <Th>관리</Th>
              </tr>
            </thead>
            <tbody>
              {tickets.map(ticket => (
                <React.Fragment key={ticket.id}>
                  <tr>
                    <Td>
                      <Thumbnail
                        src={ticket.image}
                        alt="전시 이미지"
                        onClick={() => handleThumbnailClick(ticket.id)}
                      />
                    </Td>
                    <Td>{ticket.title}</Td>
                    <Td>{ticket.dateRange}</Td>
                    <Td>{ticket.visitors} 명</Td>
                    <Td>{ticket.reservationLimit}</Td>
                    <Td>
                      {editingId === ticket.id ? (
                        <input
                          type="date"
                          value={formData.deadline}
                          onChange={(e) =>
                            setFormData({ ...formData, deadline: e.target.value })
                          }
                        />
                      ) : (
                        ticket.deadline
                      )}
                    </Td>
                    <Td>
                      {editingId === ticket.id ? (
                        <ActionButton variant="edit" onClick={() => handleSave(ticket.id)}>저장</ActionButton>
                      ) : (
                        <ActionButton variant="edit" onClick={() => handleEditClick(ticket)}>수정</ActionButton>
                      )}
                      <ActionButton variant="delete" onClick={() => handleDelete(ticket.id)}>삭제</ActionButton>
                      <ActionButton onClick={() => toggleReservationList(ticket.id)}>
                        {visibleReservations === ticket.id ? '숨기기' : '예약자 보기'}
                      </ActionButton>
                    </Td>
                  </tr>

                  {visibleReservations === ticket.id && ticket.reservations.length > 0 && (
                    <tr>
                      <Td colSpan="7">
                        <ScrollableWrapper>
                          <ReservationTable>
                            <thead>
                              <tr>
                                <th>이름</th>
                                <th>예약 수량</th>
                                <th>상태</th>
                              </tr>
                            </thead>
                            <tbody>
                              {ticket.reservations.map((res) => (
                                <tr key={res.id}>
                                  <td>{res.name}</td>
                                  <td>{res.reservedCount}</td>
                                  <td>{res.status === 'reserved' ? '예약' : '구매 확정'}</td>
                                </tr>
                              ))}
                            </tbody>
                          </ReservationTable>
                        </ScrollableWrapper>
                      </Td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </Table>
        </MainContent>
      </Container>
      <Footer />
    </>
  );
};

export default AdminTicketManagement
