import React from 'react'
import Header from '../../Header'
import Footer from '../../Footer'
import AdminMenu from './AdminMenu'
import AdminGoodsMenubar from './AdminGoodsMenubar'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  padding: 23px;

  
  
  margin-left: 23px
`;

const ContentWrapper = styled.div`
  flex: 1;
  padding: 20px;
  display: flex;
  justify-content: center;
`;

const Table = styled.table`
  width: 100%; /* ✅ 테이블 크기 조정 */
  max-width: 1300px;
  border-collapse: collapse;
  margin-top: 20px;
  font-size: 16px;
  text-align: center;
  table-layout: fixed;
`;

const Th = styled.th`
  background: #ddd;
  padding: 12px;
  font-weight: bold;
  border: 1px solid #bbb;
  font-size: 16px; /* ✅ 글자 크기 조정 */
`;

const Td = styled.td`
  padding: 10px;
  border: 1px solid #bbb;
  font-size: 16px;
  vertical-align: middle;
`;

const ProductRow = styled.tr`
  height: 140px; /* ✅ 행 높이 줄이기 */
`;

const ProductCell = styled.td`
  display: flex;
  align-items: center;
  gap: 30px;
  padding: 6px;
 
`;

const ProductImage = styled.img`
  width: 180px;
  height: 130px;
  object-fit: cover;
  border-radius: 5px;
  flex-shrink: 0;
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
      <AdminGoodsMenubar /> {/* ✅ 헤더 아래로 이동 */}
      <Container>
        <AdminMenu />
        <ContentWrapper>
          <Table>
            <thead>
              <tr>
                <Th>상품정보</Th>
                <Th>재고량</Th>
                <Th>누적 판매량</Th>
              </tr>
            </thead>
            <tbody>
              {GoodsData.map((item) => (
                <ProductRow key={item.id}>
                  <ProductCell>
                    <ProductImage src={`/images/${item.image}`} alt={item.name} />
                    <ProductInfo>
                      <strong style={{ fontSize: '16px' }}>{item.name}</strong>
                      <span style={{ color: '#666', fontSize: '13px' }}>
                        {item.price.toLocaleString()}원
                      </span>
                    </ProductInfo>
                  </ProductCell>
                  <Td>{item.stock}</Td>
                  <Td>{item.sold}</Td>
                </ProductRow>
              ))}
            </tbody>
          </Table>
        </ContentWrapper>
      </Container>
      <Footer />
    </>
  )
}
export default AdminGoods;
