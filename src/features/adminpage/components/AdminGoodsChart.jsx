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
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import styled from 'styled-components';
import axios from 'axios';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Container = styled.div`
  display: flex;
  padding: 10px;
  margin-left: 30px;
  margin-top: -50px;
`;

const ChartWrapper = styled.div`
  width: 100%;
  margin-left: 10px;
  padding: 40px;
  margin-top: 30px;
`;

const InnerChart = styled.div`
  width: 100%;
`;

const TitleWrapper = styled.div`
  text-align: center;
  font-size: 25px;
  font-weight: bold;
  margin-top: 30px;
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

function AdminGoodsChart() {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/api/purchase/admin/statistics/goods-count/by-month');

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
              label: '월별 굿즈 판매량',
              data,
              backgroundColor: 'rgba(128, 128, 255, 0.5)'
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
      tooltip: { mode: 'index', intersect: false }
    },
    scales: {
      x: { grid: { display: false } },
      y: { beginAtZero: true }
    }
  };

  return (
    <>
      <Header />
      <TitleWrapper>월별 굿즈 판매량</TitleWrapper>

      <MenubarWrapper>
        <AdminGoodsMenubar />
      </MenubarWrapper>

      <Container>
        <AdminMenuWrapper>
          <AdminMenu />
        </AdminMenuWrapper>

        <ChartWrapper>
          <InnerChart>
            <Bar data={chartData} options={options} />
          </InnerChart>
        </ChartWrapper>
      </Container>

      <Footer />
    </>
  );
}

export default AdminGoodsChart;
