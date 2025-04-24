import React, { useEffect, useState } from 'react';


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

const AdminGoodsChartWrapper = styled.div`
  flex: 1;
  padding: 20px 40px;
  display: flex;
  flex-direction: column;
  color: white;
`;

const ChartWrapper = styled.div`
  width: 100%;
  margin-left: -50px;
  padding: 40px;
  margin-top: -90px;
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
  top: -100px;
  margin-left: -475px;
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
  
  <AdminGoodsChartWrapper>
      <TitleWrapper>월별 굿즈 판매량</TitleWrapper>

      <MenubarWrapper>
        <AdminGoodsMenubar />
      </MenubarWrapper>

     
     

        <ChartWrapper>
          <InnerChart>
            <Bar data={chartData} options={options} />
          </InnerChart>
        </ChartWrapper>
    
        </AdminGoodsChartWrapper>
 
    </>
  );
}

export default AdminGoodsChart;
