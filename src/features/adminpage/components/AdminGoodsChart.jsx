import React from 'react';
import Header from '../../Header';
import Footer from '../../Footer';
import AdminMenu from './AdminMenu';
import AdminGoodsMenubar from './AdminGoodsMenubar';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import styled from 'styled-components';

// Chart.js에 필요한 요소 등록
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
  margin-top: -27px; /* ✅ AdminGoodsMenubar를 위로 올림 */
  margin-left: 30px;
`;

const AdminMenuWrapper = styled.div`
  position: relative;  /* ✅ AdminMenu만 이동 */
  top: -30px;          /* ✅ 원하는 만큼 조절 */
  margin-left: 16px;
`;
function AdminGoodsChart() {
  // 차트 데이터
  const data = {
    labels: ['2024.10', '2024.11', '2024.12', '2025.01', '2025.02', '2025.03', '2025.04'],
    datasets: [
      {
        type: 'bar',
        label: '굿즈 판매량',
        data: [300, 400, 420, 500, 520, 540, 600], // 막대 그래프 데이터
        backgroundColor: 'rgba(128, 128, 128, 0.5)', // 회색
        borderColor: 'rgba(128, 128, 128, 1)',
        borderWidth: 1,
      },
      {
        type: 'line',
        label: '판매 추세',
        data: [300, 350, 380, 370, 360, 320, 350], // 꺾은선 그래프 데이터
        borderColor: '#4A90E2', // 파란색
        backgroundColor: '#4A90E2',
        pointBackgroundColor: '#4A90E2',
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
          display: false, // X축 눈금선 제거
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
      <TitleWrapper>전체 굿즈 판매량 통계</TitleWrapper> {/* ✅ 제목을 메뉴 위로 이동 */}
      <MenubarWrapper> {/* ✅ 여기에 감싸서 위치 조정 */}
        <AdminGoodsMenubar />
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

export default AdminGoodsChart;
