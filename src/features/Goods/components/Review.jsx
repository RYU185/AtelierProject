import React, { useEffect, useState } from "react";
import axiosInstance from "../../../api/axiosInstance";
import styled from "styled-components";
import ReviewBlock from "./ReviewBlock";
import { useParams } from "react-router-dom";

const ReviewListWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 50px;
`;

const ReviewH2 = styled.h2`
  color: #e1e1e1;
`;

const ReviewList = styled.div`
  margin-top: 20px;
`;

const ReviewInputContainer = styled.div`
  margin-top: 20px;
`;

const ReviewInputTextarea = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 10px;
  margin-bottom: 10px;
  resize: none;
`;

const ReviewInputButton = styled.button`
  padding: 8px 16px;
  background: #0068ca;
  color: white;
  border: none;
  border-radius: 5px;
  margin-left: auto;
  display: block;
  cursor: pointer;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
`;

const PageButton = styled.button`
  padding: 8px 12px;
  border: 1px solid #ddd;
  background: ${(props) => (props.active ? "#0068ca" : "white")};
  color: ${(props) => (props.active ? "white" : "#333")};
  cursor: pointer;
  &:disabled {
    background: #f5f5f5;
    color: #999;
    cursor: not-allowed;
  }
`;

function Review() {
  const [reviewText, setReviewText] = useState("");
  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 10;
  const { id: goodsId } = useParams();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axiosInstance.get(`/review/goods/${goodsId}`);
        const sorted = res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setReviews(res.data);
      } catch (err) {
        console.error("리뷰 불러오기 실패:", err);
      }
    };
    fetchReviews();
  }, [goodsId]);

  const handleSubmit = async () => {
    if (!reviewText.trim()) return;
    try {
      const res = await axiosInstance.post(`/review/add/${goodsId}`, {
        text: reviewText,
      });
      setReviews([res.data, ...reviews]);
      setReviewText("");
      setCurrentPage(1);
    } catch (err) {
      console.error("리뷰 등록 실패:", err);
    }
  };

  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

  return (
    <ReviewListWrapper>
      <ReviewH2>상품평</ReviewH2>
      <ReviewList>
        {currentReviews.map((review, index) => (
          <ReviewBlock
            key={review.id || `${review.user}-${review.createdAt}-${index}`} // fallback 키
            review={review}
            setReviews={setReviews}
          />
        ))}
        <ReviewInputContainer>
          <ReviewInputTextarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="상품평을 작성해주세요..."
          />
          <ReviewInputButton onClick={handleSubmit}>리뷰 등록</ReviewInputButton>
        </ReviewInputContainer>
      </ReviewList>
      <PaginationContainer>
        {[...Array(totalPages)].map((_, index) => (
          <PageButton
            key={index + 1}
            active={currentPage === index + 1}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </PageButton>
        ))}
      </PaginationContainer>
    </ReviewListWrapper>
  );
}

export default Review;
