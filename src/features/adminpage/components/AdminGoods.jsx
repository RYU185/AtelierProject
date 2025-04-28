import React, { useEffect, useState } from "react";
import AdminGoodsMenubar from "./AdminGoodsMenubar";
import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "../../../api/axiosInstance";

// 정적 이미지 불러오기
const goodsImages = import.meta.glob("/public/images/goods-images/*", {
  eager: true,
});

const getGoodsImageUrl = (filename) => {
  if (!filename) return "/default.jpg";
  const matched = Object.entries(goodsImages).find(([path]) => path.endsWith(filename));
  if (matched) {
    return matched[1].default;
  }
  return `/uploads/${filename.replace(/^\/uploads\//, "")}`;
};

const AdminGoodsWrapper = styled.div``;

const TitleWrapper = styled.div`
  font-size: 30px;
  color: #3da9fc;
  margin-top: 43px;
  margin-bottom: 24px;
  font-weight: 500;
`;

const AdminGoodsMenubarWrapper = styled.div`
  margin-bottom: 24px;
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
  color: #e1e1e1;
  padding: 9px 0;
  font-weight: bold;
  border-top: 3px solid #bbb;
  border-bottom: 2px solid #bbb;
  border-right: 1px solid #bbb;
`;

const ThLast = styled.th`
  color: #e1e1e1;
  padding: 9px 0;
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
        const response = await axios.get("/goods/admin");
        setGoodsData(response.data);
      } catch (error) {
        console.error("굿즈 데이터를 불러오는 중 오류 발생:", error);
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
                <Link to={`/goods/${item.id}`} style={{ display: "inline-block" }}>
                  <ProductImage src={getGoodsImageUrl(item.imgUrlList?.[0])} alt={item.name} />
                </Link>
                <ProductInfo>
                  <strong style={{ fontSize: "16px" }}>{item.name}</strong>
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
