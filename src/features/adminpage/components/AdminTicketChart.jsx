import React from 'react';
import Header from '../../Header';
import Footer from '../../Footer';
import AdminMenu from './AdminMenu';
import AdminTicketMenubar from './AdminTicketMenubar';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import styled from 'styled-components';

// Chart.js 필수 요소 등록
ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);

const Container = styled.div`
  display: flex;
  padding: 10px;
  margin-left: 30px;
  margin-top: -20px;
`;

const ChartWrapper = styled.div`
  width: 60%;
  margin-left: 80px;
  padding: 40px;
`;

const TitleWrapper = styled.div`
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  margin-top: 30px;
  margin-bottom: 10px; /* ✅ 메뉴바와 간격 조정 */
`;

const MenubarWrapper = styled.div`
  position: relative;
  margin-top: -20px; /* ✅ AdminTicketMenubar 위치 조정 */
  margin-left: 43px;
`;

const AdminMenuWrapper = styled.div`
  position: relative;
  top: -30px;
  margin-left: 16px;
`;

function AdminTicketChart() {
  // 차트 데이터
  const data = {
    labels: ['2024.10', '2024.11', '2024.12', '2025.01', '2025.02', '2025.03', '2025.04'],
    datasets: [
      {
        type: 'bar',
        label: '티켓 판매량',
        data: [500, 700, 800, 850, 900, 920, 1000],
        backgroundColor: 'rgba(128, 128, 255, 0.5)', // 연한 파란색
        borderColor: 'rgba(128, 128, 255, 1)',
        borderWidth: 1,
      },
      {
        type: 'line',
        label: '판매 추세',
        data: [520, 680, 750, 780, 810, 860, 950],
        borderColor: '#E24A4A', // 빨간색
        backgroundColor: '#E24A4A',
        pointBackgroundColor: '#E24A4A',
        pointBorderColor: '#fff',
        borderWidth: 2,
        tension: 0.3, // 부드러운 곡선 효과
      },
    ],
  };

  // 차트 옵션
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <>
      <Header />
      <TitleWrapper>전체 티켓 판매량 통계</TitleWrapper> {/* ✅ 제목 위치 고정 */}
      <MenubarWrapper>
        <AdminTicketMenubar />
      </MenubarWrapper>
      <Container>
        <AdminMenuWrapper>
          <AdminMenu />
        </AdminMenuWrapper>
        <ChartWrapper>
          <Bar data={data} options={options} />
        </ChartWrapper>
      </Container>
      <Footer />
    </>
  );
}

export default AdminTicketChart;
