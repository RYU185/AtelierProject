import React from 'react'
import Header from '../../Header'
import Footer from '../../Footer'
import AdminMenu from './AdminMenu'
import AdminGoodsMenubar from './AdminGoodsMenubar'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
`;

const ContentWrapper = styled.div`
  flex: 1;
  padding: 20px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  font-size: 16px; /* ✅ 기본 폰트 키우기 */
  text-align: left;
  table-layout: fixed;
`;

const Th = styled.th`
  background: #ddd;
  padding: 14px;
  text-align: center;
  font-weight: bold;
  border: 1px solid #bbb;
  font-size: 18px;
`;

const Td = styled.td`
  padding: 12px;
  border: 1px solid #bbb;
  font-size: 16px;
  vertical-align: middle;
  text-align: center;
`;

const ProductRow = styled.tr`
  height: 160px; /* ✅ 행 높이 조정 */
`;

const ProductCell = styled.td`
  display: flex;
  align-items: center;
  gap: 10px; /* ✅ 이미지와 텍스트 사이 간격 줄이기 */
  padding: 8px;
  width: 25%; /* ✅ 상품 정보 칸 폭 줄이기 */
  min-width: 200px; /* ✅ 최소 너비 줄이기 */
`;

const ProductImage = styled.img`
  width: 200px;
  height: 150px;
  object-fit: cover;
  border-radius: 5px;
  flex-shrink: 0; /* ✅ 이미지 크기를 유지하면서 텍스트가 눌리지 않도록 설정 */
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 16px;
  text-align: left;
  flex: 1;
  word-break: keep-all;
  min-width: 120px; /* ✅ 텍스트 영역 최소 크기 축소 */
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
      <Container>
        <AdminMenu />
        <ContentWrapper>
          <AdminGoodsMenubar />
          
          <Table>
            <thead>
              <tr>
                <Th>상품 정보</Th>
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
                      <strong style={{ fontSize: '18px' }}>{item.name}</strong>
                      <span style={{ color: '#666', fontSize: '15px' }}>
                        가격: {item.price.toLocaleString()}원
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
