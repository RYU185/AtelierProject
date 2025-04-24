import React, { useEffect, useState } from 'react';
import AdminGoodsMenubar from './AdminGoodsMenubar';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import axios from '../../../api/axiosInstance';

// 정적 이미지 불러오기
const goodsImages = import.meta.glob("/public/images/goods-images/*", { eager: true });

const getGoodsImageUrl = (filename) => {
  if (!filename) return '/default.jpg';
  const matched = Object.entries(goodsImages).find(([path]) =>
    path.endsWith(filename)
  );
  if (matched) {
    return matched[1].default;
  }
  return `http://localhost:8081/uploads/${filename.replace(/^\/uploads\//, '')}`;
};

// 👇 AdminPage 기준 Wrapper
const AdminGoodsWrapper = styled.div`
  flex: 1;
  padding: 20px 40px;
  display: flex;
  flex-direction: column;
  color: white;
 margin-top: -60px;
`;

const TitleWrapper = styled.div`
  margin-bottom: 10px;
  font-size: 25px;
  font-weight: bold;
  text-align: center;
`;

const AdminGoodsMenubarWrapper = styled.div`
  margin-bottom: 10px;
  margin-left: -470px;
`;

const AddButtonWrapper = styled.div`
  align-self: flex-end;
  margin-bottom: 16px;
position: relative;
right: 90px;
`;

const AddButton = styled.button`
  padding: 8px 16px;
  background: #3da9fc;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-align: center;
  &:hover {
    background: #3da0e5;
  }
`;

const Table = styled.table`
  width: 100%;
  max-width: 1300px;
  border-collapse: collapse;
  font-size: 16px;
  text-align: center;
  table-layout: fixed;
`;

const Th = styled.th`
  padding: 12px;
  font-weight: bold;
  border-top: 3px solid #bbb;
  border-bottom: 2px solid #bbb;
  border-right: 1px solid #bbb;
`;

const ThLast = styled.th`
  padding: 12px;
  font-weight: bold;
  border-top: 3px solid #bbb;
  border-bottom: 2px solid #bbb;
  border-right: none;
`;

const Td = styled.td`
  padding: 10px;
  font-size: 16px;
  vertical-align: middle;
  border-right: 1px solid #bbb;
  border-bottom: 1px solid #bbb;
`;

const TdLast = styled.td`
  padding: 10px;
  font-size: 16px;
  vertical-align: middle;
  border-right: none;
  border-bottom: 1px solid #bbb;
`;

const ProductRow = styled.tr`
  height: 140px;
`;

const ProductCell = styled.td`
  display: flex;
  align-items: center;
  gap: 30px;
  padding: 6px;
  border-right: 1px solid #bbb;
  border-bottom: 1px solid #bbb;
`;

const ProductImage = styled.img`
  width: 180px;
  height: 130px;
  object-fit: cover;
  border-radius: 5px;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
  &:hover {
    transform: scale(1.05);
  }
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 14px;
  text-align: left;
  min-width: 110px;
`;

function AdminGoods() {
  const [goodsData, setGoodsData] = useState([]);


  useEffect(() => {
    const fetchGoods = async () => {
      try {
        const response = await axios.get('/goods/admin');
        setGoodsData(response.data);
      } catch (error) {
        console.error('굿즈 데이터를 불러오는 중 오류 발생:', error);
      }
    };

    fetchGoods();
  }, []);


  return (
    <AdminGoodsWrapper>
      <TitleWrapper>전체 굿즈 판매량 통계</TitleWrapper>
      <AdminGoodsMenubarWrapper>
        <AdminGoodsMenubar />
      </AdminGoodsMenubarWrapper>

      <AddButtonWrapper>
        <Link to="/AdminGoodsAdd" style={{ textDecoration: 'none' }}>
          <AddButton>굿즈 추가</AddButton>
        </Link>
      </AddButtonWrapper>

      <Table>
        <thead>
          <tr>
            <Th>상품정보</Th>
            <Th>재고량</Th>
            <ThLast>누적 판매량</ThLast>
          </tr>
        </thead>
        <tbody>
          {goodsData.map((item) => (
            <ProductRow key={item.id}>
              <ProductCell>
                <Link to={`/goods/${item.id}`} style={{ display: 'inline-block' }}>
                  <ProductImage
                    src={getGoodsImageUrl(item.imgUrlList?.[0])}
                    alt={item.name}
                  />
                </Link>
                <ProductInfo>
                  <strong style={{ fontSize: '16px' }}>{item.name}</strong>
                </ProductInfo>
              </ProductCell>
              <Td>{item.stock}</Td>
              <TdLast>{item.totalSales}</TdLast>
            </ProductRow>
          ))}
        </tbody>
      </Table>
    </AdminGoodsWrapper>
  );
}

export default AdminGoods;
