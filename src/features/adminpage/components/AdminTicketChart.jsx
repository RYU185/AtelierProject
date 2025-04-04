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
  margin-top: 10px;
`;

const ChartWrapper = styled.div`
  width: 60%;
  margin-left: 30px;
  padding: 40px;
  margin-top: 30px;
  position: relative;
`;

const TitleWrapper = styled.div`
  text-align: center;
  font-size: 25px;
  font-weight: bold;
  margin-top: 30px;
  margin-right: 800px;
  margin-bottom: 10px;
`;

const MenubarWrapper = styled.div`
  position: relative;
  margin-left: -20px;
`;

const AdminMenuWrapper = styled.div`
  position: relative;
  top: -80px;
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
        backgroundColor: 'rgba(128, 128, 255, 0.5)',
        borderColor: 'rgba(128, 128, 255, 1)',
        borderWidth: 1,
      },
      {
        type: 'line',
        label: '판매 추세',
        data: [520, 680, 750, 780, 810, 860, 950],
        borderColor: '#E24A4A',
        backgroundColor: '#E24A4A',
        pointBackgroundColor: '#E24A4A',
        pointBorderColor: '#fff',
        borderWidth: 2,
        tension: 0.3,
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
      <TitleWrapper>전체 티켓 판매량 통계</TitleWrapper>
      <MenubarWrapper>
        {/* ✅ className 추가하여 특정 스타일 적용 가능 */}
        <AdminTicketMenubar className="chart-menubar" />
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
