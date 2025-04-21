import React, { useState, useEffect } from 'react';
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
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import styled from 'styled-components';
import axios from 'axios';
import { format, subDays } from 'date-fns';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Styled Components
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
  width: 100px;
  height: 30px;
  border-radius: 6px;
  border: 1px solid #ccc;
  cursor: pointer;
  background-color: #fff;

  &:hover {
    border-color: #888;
  }
`;

function AdminTicketChart() {
  const [filterType, setFilterType] = useState('daily');
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: []
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        let countResponse;
        let trendResponse = null;

        if (filterType === 'daily') {
          countResponse = await axios.get('api/reservation/admin/statistics/count/by-date');
        } else if (filterType === 'weekday') {
          countResponse = await axios.get('api/reservation/admin/statistics/count/by-weekday');
        } else {
          countResponse = await axios.get('api/reservation/admin/statistics/count/by-month');
          trendResponse = await axios.get('api/reservation/admin/statistics/trend/by-month');
        }

        const countDataRaw = Array.isArray(countResponse.data)
          ? countResponse.data
          : Array.isArray(countResponse.data?.data)
            ? countResponse.data.data
            : [];

        const trendDataRaw = trendResponse
          ? (Array.isArray(trendResponse.data)
              ? trendResponse.data
              : Array.isArray(trendResponse.data?.data)
                ? trendResponse.data.data
                : [] )
          : [];

        let labels = [];
        let countData = [];
        let trendData = [];

        if (filterType === 'daily') {
          const dataMap = countDataRaw.reduce((map, item) => {
            map[item.label] = item.totalHeadcount;
            return map;
          }, {});

          const today = new Date();
          const start = subDays(today, 6);  // 오늘로부터 7일 전
          const end = today;  // 오늘 날짜

          let currentStart = new Date(start);
          const days = [];

          while (currentStart <= end) {
            const dateStr = currentStart.toISOString().split('T')[0]; // yyyy-mm-dd 형식
            days.push(dateStr);

            // 해당 날짜의 예약 데이터
            const totalHeadcount = dataMap[dateStr] || 0;

            labels.push(dateStr);
            countData.push(totalHeadcount);

            currentStart.setDate(currentStart.getDate() + 1);
          }
        } else if (filterType === 'weekday') {
          const weekdayKoreanMap = {
            Monday: '월요일',
            Tuesday: '화요일',
            Wednesday: '수요일',
            Thursday: '목요일',
            Friday: '금요일',
            Saturday: '토요일',
            Sunday: '일요일',
          };
          labels = countDataRaw.map(item => weekdayKoreanMap[item.label] || item.label);
          countData = countDataRaw.map(item => item.totalHeadcount);
        } else {
          labels = countDataRaw.map(item => item.label);
          countData = countDataRaw.map(item => item.totalHeadcount);
          trendData = trendDataRaw.map(item => item.cumulativeHeadcount);
        }

        const datasets = [
          {
            type: 'bar',
            label: '티켓 판매량',
            data: countData,
            backgroundColor: 'rgba(128, 128, 255, 0.5)',
          }
        ];

        if (trendData.length > 0) {
          datasets.push({
            type: 'line',
            label: '판매 추세',
            data: trendData,
            borderColor: '#E24A4A',
            backgroundColor: '#E24A4A',
            tension: 0.3,
          });
        }

        setChartData({ labels, datasets });
      } catch (error) {
        console.error('데이터를 불러오는 중 오류 발생:', error);
      }
    };

    fetchData();
  }, [filterType]);

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
      <TitleWrapper>최근 7일간의 티켓 판매량</TitleWrapper>

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
          <Bar data={chartData} options={options} />
        </ChartWrapper>
      </Container>

      <Footer />
    </>
  );
}

export default AdminTicketChart;
