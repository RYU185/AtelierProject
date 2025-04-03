import React from 'react';
import Header from '../../Header';
import Footer from '../../Footer';
import AdminMenu from './AdminMenu';
import AdminGoodsMenubar from './AdminGoodsMenubar';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  padding: 23px;
  margin-left: 23px;
  position: relative; /* ✅ AddButton absolute 위치 적용을 위해 추가 */
`;

const AdminMenuWrapper = styled.div`
  position: relative;
  top: -58px;
  margin-left: 13px;
`;

/* ✅ 버튼을 감싸는 새로운 Wrapper 추가 */
const AddButtonWrapper = styled.div`
  position: absolute;
  top: 10px;
  right: 100px; /* 오른쪽 정렬 */
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
  top: 30px;
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
  pointer-events: auto; /* ✅ 이미지만 클릭 가능 */

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
  pointer-events: auto; /* ✅ 텍스트 클릭 가능 */
`;


const GoodsData = [
  { id: 1, image: 'goods1.jpg', name: '전통 부채', price: 20000, stock: 137, sold: 145 },
  { id: 2, image: 'goods1.jpg', name: '우산', price: 20000, stock: 26, sold: 87 },
  { id: 3, image: 'goods1.jpg', name: '가방', price: 20000, stock: 45, sold: 31 },
  { id: 4, image: 'goods1.jpg', name: '다기 세트', price: 20000, stock: 63, sold: 24 },
  { id: 5, image: 'goods1.jpg', name: '검정 부채', price: 20000, stock: 5, sold: 101 },
];

function AdminGoods() {
  return (
    <>
      <Header />
      <TitleWrapper>전체 굿즈 판매량 통계</TitleWrapper>
      <AdminGoodsMenubarWrapper>
        <AdminGoodsMenubar />
      </AdminGoodsMenubarWrapper>

      <Container>
        <AdminMenuWrapper>
          <AdminMenu />
        </AdminMenuWrapper>

        {/* ✅ AddButton을 별도 Wrapper에 감싸 위치 조정 */}
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
              {GoodsData.map((item) => (
                <ProductRow key={item.id}>
                  <ProductCell>
                    {/* ✅ 이미지에만 링크 적용 */}
                    <Link to={`/goods/${item.id}`} style={{ display: 'inline-block' }}>
                      <ProductImage src={`/images/${item.image}`} alt={item.name} />
                    </Link>
                    <ProductInfo>
                      <strong style={{ fontSize: '16px' }}>{item.name}</strong>
                      <span style={{ color: '#666', fontSize: '13px' }}>
                        {item.price.toLocaleString()}원
                      </span>
                    </ProductInfo>
                  </ProductCell>

                  <Td>{item.stock}</Td>
                  <TdLast>{item.sold}</TdLast>
                </ProductRow>
              ))}
            </tbody>
          </Table>
        </ContentWrapper>
      </Container>
      <Footer />
    </>
  );
}

export default AdminGoods;
