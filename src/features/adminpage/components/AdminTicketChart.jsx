import React, { useState } from 'react';
import Header from '../../Header';
import Footer from '../../Footer';
import AdminMenu from './AdminMenu';
import AdminTicketMenubar from './AdminTicketMenubar';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import styled from 'styled-components';

// Chart.js 필수 요소 등록
ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);

// 🔧 Styled Components
const Container = styled.div`
  display: flex;
  padding: 10px;
  margin-left: 30px;
  margin-top: -50px;
 
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
  top: -30px;
  margin-left: -20px;
`;

const AdminMenuWrapper = styled.div`
  position: relative;
  top: -80px;
  margin-left: 16px;
`;

const FilterSelect = styled.select`

top: 40px;
  margin-left: 1380px;
  font-size: 16px;
  padding: 5px 10px;
  width: 100px; /* 넓이 증가 */
  height: 30px; /* 높이 증가 */
  border-radius: 6px;
  border: 1px solid #ccc;
  cursor: pointer;
  background-color: #fff;

  &:hover {
    border-color: #888;
  }
`;

function AdminTicketChart() {
  const [filterType, setFilterType] = useState('monthly');

  // 📊 필터에 따른 차트 데이터
  const getChartData = () => {
    if (filterType === 'daily') {
      return {
        labels: ['04.01', '04.02', '04.03', '04.04', '04.05', '04.06', '04.07'],
        datasets: [
          {
            type: 'bar',
            label: '티켓 판매량',
            data: [120, 90, 150, 130, 180, 200, 160],
            backgroundColor: 'rgba(128, 128, 255, 0.5)',
          },
          {
            type: 'line',
            label: '판매 추세',
            data: [110, 100, 140, 135, 170, 210, 165],
            borderColor: '#E24A4A',
            backgroundColor: '#E24A4A',
            tension: 0.3,
          },
        ],
      };
    } else if (filterType === 'weekday') {
      return {
        labels: ['월', '화', '수', '목', '금', '토', '일'],
        datasets: [
          {
            type: 'bar',
            label: '티켓 판매량',
            data: [400, 420, 450, 470, 600, 700, 650],
            backgroundColor: 'rgba(128, 128, 255, 0.5)',
          },
          {
            type: 'line',
            label: '판매 추세',
            data: [380, 430, 460, 490, 620, 690, 640],
            borderColor: '#E24A4A',
            backgroundColor: '#E24A4A',
            tension: 0.3,
          },
        ],
      };
    } else {
      return {
        labels: ['2024.10', '2024.11', '2024.12', '2025.01', '2025.02', '2025.03', '2025.04'],
        datasets: [
          {
            type: 'bar',
            label: '티켓 판매량',
            data: [500, 700, 800, 850, 900, 920, 1000],
            backgroundColor: 'rgba(128, 128, 255, 0.5)',
          },
          {
            type: 'line',
            label: '판매 추세',
            data: [520, 680, 750, 780, 810, 860, 950],
            borderColor: '#E24A4A',
            backgroundColor: '#E24A4A',
            tension: 0.3,
          },
        ],
      };
    }
  };

  // 📐 차트 옵션
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
        grid: { display: false },
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

      <FilterSelect value={filterType} onChange={(e) => setFilterType(e.target.value)}>
        <option value="daily">날짜별</option>
        <option value="weekday">요일별</option>
        <option value="monthly">월별</option>
      </FilterSelect>

      <MenubarWrapper>
        <AdminTicketMenubar className="chart-menubar" />
      </MenubarWrapper>

      <Container>
        <AdminMenuWrapper>
          <AdminMenu />
        </AdminMenuWrapper>

        <ChartWrapper>
          <Bar data={getChartData()} options={options} />
        </ChartWrapper>
      </Container>

      <Footer />
    </>
  );
}

export default AdminTicketChart;
