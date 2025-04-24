import React, { useEffect, useState } from 'react';
import Header from '../../Header';
import Footer from '../../Footer';
import AdminMenu from './AdminMenu';
import AdminGoodsMenubar from './AdminGoodsMenubar';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import axios from '../../../api/axiosInstance';

// ✅ 정적 이미지 불러오기 (public/images/GoodsListIMG)
const goodsImages = import.meta.glob("/public/images/goods-images/*", {
  eager: true,
});

// ✅ 이미지 경로 처리 함수
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
const GradientBackground = styled.div`
  min-height: 100vh;
  background: radial-gradient(ellipse at 0% 0%, rgb(0, 0, 0), rgb(1, 9, 26) 40%, #000000 100%);
`;
// 스타일 컴포넌트 정의
const Container = styled.div`
  display: flex;
  padding: 23px;
  margin-left: 23px;
  position: relative;
`;

const AdminMenuWrapper = styled.div`
  position: relative;
  top: -58px;
  margin-left: 13px;
`;

const AddButtonWrapper = styled.div`
  position: absolute;
  top: 10px;
  right: 115px;
  z-index: 10;
  margin-top: 16px;
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

const TitleWrapper = styled.div`
  position: relative;
  top: 40px;
  margin-left: 480px;
  color: #222;
  border-radius: 6px;
  font-size: 25px;
  font-weight: bold;
`;

const AdminGoodsMenubarWrapper = styled.div`
  position: relative;
  top: 20px;
  left: 21px;
  z-index: 10;
`;

const ContentWrapper = styled.div`
  flex: 1;
  padding: 20px;
  display: flex;
  justify-content: center;
`;

const Table = styled.table`
  width: 100%;
  max-width: 1300px;
  border-collapse: collapse;
  margin-top: 20px;
  margin-right: -17px;
  font-size: 16px;
  text-align: center;
  table-layout: fixed;
`;

const Th = styled.th`
  padding: 12px;
  font-weight: bold;
  border-top: 3px solid #bbb;
  border-bottom: 2px solid #bbb;
  font-size: 16px;
  border-right: 1px solid #bbb;
`;

const ThLast = styled.th`
  padding: 12px;
  font-weight: bold;
  border-top: 3px solid #bbb;
  border-bottom: 2px solid #bbb;
  font-size: 16px;
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
  flex-shrink: 0;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
  pointer-events: auto;
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
  flex: 1;
  min-width: 110px;
  word-break: keep-all;
  pointer-events: auto;
`;

function AdminGoods() {
  const [goodsData, setGoodsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGoods = async () => {
      try {
        const response = await axios.get('/goods/admin');
        setGoodsData(response.data);
      } catch (error) {
        console.error('굿즈 데이터를 불러오는 중 오류 발생:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGoods();
  }, []);

  if (loading) return <div>굿즈 데이터를 불러오는 중...</div>;

  return (
    <>
    <GradientBackground>
      <Header />
      <TitleWrapper>전체 굿즈 판매량 통계</TitleWrapper>
      <AdminGoodsMenubarWrapper>
        <AdminGoodsMenubar />
      </AdminGoodsMenubarWrapper>

      <Container>
        <AdminMenuWrapper>
          <AdminMenu />
        </AdminMenuWrapper>

        <AddButtonWrapper>
          <Link to="/AdminGoodsAdd" style={{ textDecoration: 'none' }}>
            <AddButton>굿즈 추가</AddButton>
          </Link>
        </AddButtonWrapper>

        <ContentWrapper>
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
        </ContentWrapper>
      </Container>
      <Footer />
      </GradientBackground>
    </>
  );
}

export default AdminGoods;
