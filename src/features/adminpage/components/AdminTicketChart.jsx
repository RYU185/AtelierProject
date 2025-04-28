// AdminTicketChart.jsx

import React, { useState, useEffect } from 'react';

import AdminTicketMenubar from './AdminTicketMenubar';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  LineController,
  PointElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import styled from 'styled-components';
import axios from 'axios';
import { addDays, subDays, startOfMonth } from 'date-fns';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  LineController,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const AdminTicketChartWrapper = styled.div`
  flex: 1;
  padding: 20px 40px;
  display: flex;
  flex-direction: column;
  color: white;
 margin-top: -60px;
`;


const AdminGoodsMenubarWrapper = styled.div`

`;

const ChartWrapper = styled.div`
  width: 100%;
  margin-left: -100px;
  padding: 40px;
  margin-top: -50px;
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




const FilterSelect = styled.select`
  top: 30px;
  margin-left: 1140px;
  font-size: 16px;
  padding: 5px 10px;
  width: 100px;
  height: 30px;
  border-radius: 6px;
  border: 1px solid #ccc;
  cursor: pointer;
  background-color: #fff;
  position: relative;

  &:hover {
    border-color: #888;
  }
`;

const NavButton = styled.button`
  padding: 5px 10px;
  margin: 0 10px;
  font-size: 18px;
  cursor: pointer;
  background: #eee;
  border: 1px solid #ccc;
  border-radius: 6px;

  &:hover {
    background: #ddd;
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

function AdminTicketChart() {
  const [filterType, setFilterType] = useState('daily');
  const [fullData, setFullData] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const visibleRange = 7;

  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (filterType === 'daily') {
          const countRes = await axios.get('api/reservation/admin/statistics/count/by-date');
          const trendRes = await axios.get('api/reservation/admin/statistics/trend/by-date');

          const countRaw = Array.isArray(countRes.data) ? countRes.data : countRes.data?.data || [];
          const trendRaw = Array.isArray(trendRes.data) ? trendRes.data : trendRes.data?.data || [];

          const countMap = countRaw.reduce((acc, item) => {
            acc[item.label] = item.totalHeadcount;
            return acc;
          }, {});
          const trendMap = trendRaw.reduce((acc, item) => {
            acc[item.label] = item.cumulativeHeadcount;
            return acc;
          }, {});

          const today = new Date();
          const start = subDays(today, 6);
          const end = addDays(today, 7);
          const range = [];

          let current = new Date(start);
          while (current <= end) {
            const label = current.toISOString().split('T')[0];
            range.push({
              label,
              totalHeadcount: countMap[label] || 0,
              trend: trendMap[label] || 0
            });
            current.setDate(current.getDate() + 1);
          }

          setFullData(range);
          setStartIndex(0);
        } else if (filterType === 'weekly') {
          const countRes = await axios.get('api/reservation/admin/statistics/count/by-week');
          const trendRes = await axios.get('api/reservation/admin/statistics/trend/by-week');

          const countRaw = Array.isArray(countRes.data) ? countRes.data : countRes.data?.data || [];
          const trendRaw = Array.isArray(trendRes.data) ? trendRes.data : trendRes.data?.data || [];

          const countMap = countRaw.reduce((acc, item) => {
            acc[item.label] = item.totalHeadcount;
            return acc;
          }, {});
          const trendMap = trendRaw.reduce((acc, item) => {
            acc[item.label] = item.cumulativeHeadcount;
            return acc;
          }, {});

          const labels = [];
          const countData = [];
          const trendData = [];

          const now = new Date();
          const base = startOfMonth(now);

          for (let i = 0; i < 4; i++) {
            const weekLabel = `${base.getMonth() + 1}월/${i + 1}주차`;

            labels.push(weekLabel);
            countData.push(countMap[weekLabel] || 0);
            trendData.push(trendMap[weekLabel] || 0);
          }

          setChartData({
            labels,
            datasets: [
              {
                type: 'bar',
                label: '주별 티켓 판매량',
                data: countData,
                backgroundColor: 'rgba(128, 128, 255, 0.5)',
              },
              {
                type: 'line',
                label: '판매 추세',
                data: trendData,
                borderColor: '#E24A4A',
                backgroundColor: '#E24A4A',
                tension: 0.3,
                fill: false
              }
            ]
          });
        } else if (filterType === 'monthly') {
          const countRes = await axios.get('api/reservation/admin/statistics/count/by-month');
          const trendRes = await axios.get('api/reservation/admin/statistics/trend/by-month');

          const countRaw = Array.isArray(countRes.data) ? countRes.data : countRes.data?.data || [];
          const trendRaw = Array.isArray(trendRes.data) ? trendRes.data : trendRes.data?.data || [];

          const countMap = countRaw.reduce((acc, item) => {
            acc[item.label] = item.totalHeadcount;
            return acc;
          }, {});
          const trendMap = trendRaw.reduce((acc, item) => {
            acc[item.label] = item.cumulativeHeadcount;
            return acc;
          }, {});

          const labels = [];
          const countData = [];
          const trendData = [];

          for (let i = 1; i <= 12; i++) {
            const monthLabel = `${i}월`;
            labels.push(monthLabel);
            countData.push(countMap[monthLabel] || 0);
            trendData.push(trendMap[monthLabel] || 0);
          }

          setChartData({
            labels,
            datasets: [
              {
                type: 'bar',
                label: '월별 티켓 판매량',
                data: countData,
                backgroundColor: 'rgba(128, 128, 255, 0.5)',
              },
              {
                type: 'line',
                label: '판매 추세',
                data: trendData,
                borderColor: '#E24A4A',
                backgroundColor: '#E24A4A',
                tension: 0.3,
                fill: false
              }
            ]
          });
        }
      } catch (err) {
        console.error('데이터 오류:', err);
      }
    };

    fetchData();
  }, [filterType]);

  useEffect(() => {
    if (filterType === 'daily') {
      const slice = fullData.slice(startIndex, startIndex + visibleRange);
      const labels = slice.map(i => i.label);
      const count = slice.map(i => i.totalHeadcount);
      const trend = slice.map(i => i.trend);

      setChartData({
        labels,
        datasets: [
          {
            type: 'bar',
            label: '티켓 판매량',
            data: count,
            backgroundColor: 'rgba(128, 128, 255, 0.5)'
          },
          {
            type: 'line',
            label: '판매 추세',
            data: trend,
            borderColor: '#E24A4A',
            backgroundColor: '#E24A4A',
            tension: 0.3,
            fill: false
          }
        ]
      });
    }
  }, [fullData, startIndex]);

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      tooltip: { mode: 'index', intersect: false },
    },
    scales: {
      x: { grid: { display: false } },
      y: { beginAtZero: true }
    }
  };



  return (
    <>
      <AdminTicketChartWrapper>

        <TitleWrapper>
          {filterType === 'daily' ? '날짜별' : filterType === 'weekly' ? '주별' : '월별'} 티켓 판매량
        </TitleWrapper>
        <AdminGoodsMenubarWrapper>
          <AdminTicketMenubar />
        </AdminGoodsMenubarWrapper>
        <FilterSelect value={filterType} onChange={(e) => setFilterType(e.target.value)}>
          <option value="daily">날짜별</option>
          <option value="weekly">주별</option>
          <option value="monthly">월별</option>
        </FilterSelect>

       




        <ChartWrapper>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {filterType === 'daily' && (
              <NavButton onClick={() => setStartIndex(prev => Math.max(prev - 1, 0))} disabled={startIndex === 0}>
                ←
              </NavButton>
            )}

            <InnerChart>
              <Bar data={chartData} options={options} />
            </InnerChart>

            {filterType === 'daily' && (
              <NavButton
                onClick={() => setStartIndex(prev => Math.min(prev + 1, fullData.length - visibleRange))}
                disabled={startIndex + visibleRange >= fullData.length}
              >
                →
              </NavButton>
            )}
          </div>
        </ChartWrapper>

      </AdminTicketChartWrapper>

    </>
  );
}

export default AdminTicketChart;
