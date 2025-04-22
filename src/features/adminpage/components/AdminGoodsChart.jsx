import React, { useEffect, useState } from 'react';
import Header from '../../Header';
import Footer from '../../Footer';
import AdminMenu from './AdminMenu';
import AdminGoodsMenubar from './AdminGoodsMenubar';
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
import axios from 'axios';

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
  margin-bottom: 10px;
`;

const MenubarWrapper = styled.div`
  position: relative;
  margin-top: -27px;
  margin-left: 30px;
`;

const AdminMenuWrapper = styled.div`
  position: relative;
  top: -30px;
  margin-left: 16px;
`;

function AdminGoodsChart() {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token'); // ✔️ 토큰 가져오기

        const res = await axios.get('/api/purchase/goods/admin/statistics/monthly', {
          headers: {
            Authorization: `Bearer ${token}` // ✔️ 토큰 포함
          }
        });

        const raw = Array.isArray(res.data) ? res.data : res.data?.data || [];

        const map = raw.reduce((acc, item) => {
          acc[item.label] = item.totalQuantity;
          return acc;
        }, {});

        const labels = [];
        const data = [];

        for (let i = 1; i <= 12; i++) {
          const label = `${i}월`;
          labels.push(label);
          data.push(map[label] || 0);
        }

        setChartData({
          labels,
          datasets: [
            {
              type: 'bar',
              label: '굿즈 판매량',
              data,
              backgroundColor: 'rgba(128, 128, 128, 0.5)',
              borderColor: 'rgba(128, 128, 128, 1)',
              borderWidth: 1,
            }
          ]
        });
      } catch (err) {
        console.error('굿즈 차트 데이터 오류:', err);
      }
    };

    fetchData();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      tooltip: { mode: 'index', intersect: false },
    },
    scales: {
      x: { grid: { display: false } },
      y: { beginAtZero: true },
    },
  };

  return (
    <>
      <Header />
      <TitleWrapper>전체 굿즈 판매량 통계</TitleWrapper>
      <MenubarWrapper>
        <AdminGoodsMenubar />
      </MenubarWrapper>
      <Container>
        <AdminMenuWrapper>
          <AdminMenu />
        </AdminMenuWrapper>
        <ChartWrapper>
          <Bar data={chartData} options={options} />
        </ChartWrapper>
      </Container>
      <Footer />
    </>
  );
}

export default AdminGoodsChart;
