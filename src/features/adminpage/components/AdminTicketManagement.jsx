import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import AdminTicketMenubar from "./AdminTicketMenubar";

const artImages = import.meta.glob("/public/images/ArtistGalleryIMG/*", { eager: true });
const getImageUrl = (filename) => {
  if (!filename) return "/images/default-image.png";
  const matched = Object.entries(artImages).find(([path]) => path.endsWith(filename));
  return matched ? matched[1].default : "/images/default-image.png";
};
const AdminTicketWrapper = styled.div`
  flex: 1;
  flex-direction: column;
  color: white;
`;

const AdminGoodsMenubarWrapper = styled.div`

`;

const MainContent = styled.div`
  flex: 1;
`;
const Title = styled.h1`
  font-size: 30px;
  color: #3da9fc;
  margin-top: 43px;
  margin-bottom: 24px;
  font-weight: 500;
  `
  const Table = styled.table`
  width: 100%;
  max-width: 1300px;
  border-collapse: collapse;
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
const ActionButton = styled.button`
  padding: 6px 12px;
  margin: 2px;
  font-size: 14px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  color: #333;
  background-color: ${(props) =>
    props.variant === "edit" ? "#a4d4f3" : props.variant === "delete" ? "#f7b6b6" : "#d6ccf7"};

  &:hover {
    background-color: ${(props) =>
      props.variant === "edit" ? "#7dc5f3" : props.variant === "delete" ? "#f48c8c" : "#c4b8f0"};
  }
`;

const AdminTicketManagement = () => {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ deadline: "" });

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");

      try {
        const res = await fetch("/api/reservation/admin/summary/gallery/all", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("데이터 불러오기 실패");

        const summary = await res.json();
        const formatted = summary.map(formatTicket);
        setTickets(formatted);
      } catch (error) {
        console.error("데이터 로딩 오류:", error);
      }
    };

    fetchData();
  }, []);

  const formatTicket = (data) => ({
    id: data.galleryId,
    title: data.title,
    dateRange: `${data.startDate} - ${data.endDate}`,
    image: getImageUrl(data.posterUrl),
    visitors: data.totalReserved,
    reservationLimit: data.capacity,
    remaining: data.capacity - data.totalReserved,
    deadline: data.deadline,
  });

  const handleThumbnailClick = (id) => {
    navigate(`/gallery/artistgallery/${id}`);
  };

  const handleEditClick = (ticket) => {
    setEditingId(ticket.id);
    setFormData({ deadline: ticket.deadline });
  };

  const handleSave = async (id) => {
    try {
      const response = await fetch(`/api/artistgallery/deadline/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ deadline: formData.deadline }),
      });

      if (!response.ok) throw new Error("마감일 수정 실패");

      alert(await response.text());

      setTickets((prev) =>
        prev.map((ticket) =>
          ticket.id === id ? { ...ticket, deadline: formData.deadline } : ticket
        )
      );

      setEditingId(null);
    } catch (error) {
      console.error("마감일 수정 오류:", error);
      alert("수정 중 오류 발생");
    }
  };

  const handleDelete = (id) => {
    setTickets((prev) => prev.filter((ticket) => ticket.id !== id));
  };

  return (
    <>
      <AdminTicketWrapper>
        <Title>티켓 판매 내역 및 마감일 관리</Title>
        <AdminGoodsMenubarWrapper>
          <AdminTicketMenubar />
        </AdminGoodsMenubarWrapper>
        <MainContent>
          <Table>
            <thead>
              <tr>
                <Th>전시 이미지</Th>
                <Th>전시명</Th>
                <Th>기간</Th>
                <Th>예약 가능 수량</Th>
                <Th>예약자 수</Th>
                <Th>남은 수량</Th>
                <Th>예약 마감일</Th>
                <Th>관리</Th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket) => (
                <tr key={ticket.id}>
                  <Td>
                    <Thumbnail
                      src={ticket.image}
                      alt="전시 이미지"
                      onClick={() => handleThumbnailClick(ticket.id)}
                    />
                  </Td>
                  <Td>{ticket.title}</Td>
                  <Td>{ticket.dateRange}</Td>
                  <Td>{ticket.reservationLimit}</Td>
                  <Td>{ticket.visitors}</Td>
                  <Td
                    style={{
                      color:
                        ticket.remaining === 0
                          ? "red"
                          : ticket.remaining <= 10
                          ? "orange"
                          : "inherit",
                    }}
                  >
                    {ticket.remaining === 0 ? "마감" : ticket.remaining}
                  </Td>
                  <Td>
                    {editingId === ticket.id ? (
                      <input
                        type="date"
                        value={formData.deadline}
                        onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                      />
                    ) : (
                      ticket.deadline
                    )}
                  </Td>
                  <Td>
                    {editingId === ticket.id ? (
                      <ActionButton variant="edit" onClick={() => handleSave(ticket.id)}>
                        저장
                      </ActionButton>
                    ) : (
                      <ActionButton variant="edit" onClick={() => handleEditClick(ticket)}>
                        수정
                      </ActionButton>
                    )}
                    <ActionButton variant="delete" onClick={() => handleDelete(ticket.id)}>
                      삭제
                    </ActionButton>
                  </Td>
                </tr>
              ))}
            </tbody>
          </Table>
        </MainContent>
      </AdminTicketWrapper>
    </>
  );
};

export default AdminTicketManagement;
