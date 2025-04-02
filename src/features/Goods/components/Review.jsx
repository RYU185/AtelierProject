import React, { useState } from "react";
import styled from "styled-components";
import ReviewBlock from "./ReviewBlock";

const ReviewListWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 50px;
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
  resize: none; // 크기조정 불가능
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
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const reviewsPerPage = 10; // 한 페이지에 보여줄 리뷰 갯수

  const handleReviewChange = (e) => {
    setReviewText(e.target.value);
  };

  const handleReviewSubmit = () => {
    if (reviewText.trim()) {
      setReviews([{ content: reviewText, createdAt: new Date().toISOString() }, ...reviews]); // 새 리뷰 등록
      setReviewText("");
      setCurrentPage(1); // 새 리뷰 작성 시 첫 페이지로 이동
    }
  };

  // 현재 페이지의 리뷰만 보여주기
  const indexOfLastReview = currentPage * reviewsPerPage; // 마지막 리뷰 인덱스
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage; // 첫 번째 리뷰 인덱스
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview); // 현재 페이지 리뷰
  // slice(마지막 리뷰인덱스 , 첫번째 리뷰인덱스)의 동작방식
  // 마지막 리뷰인덱스 부터 첫번째 리뷰인덱스 까지 잘라서 배열로 반환한다
  // ex) 마지막 리뷰인덱스 10, 첫번째 리뷰인덱스 0 -> 10부터 0까지 잘라서 배열로 반환할거임
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);
  // 총 리뷰 갯수 / 한 페이지에 보여줄 리뷰 갯수 = 총 페이지 수
  // ceil() 작동방식 *처음 보는 메서드
  // 10 / 3 = 3.33333....
  // 3.33333.... -> 4
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div>
        <ReviewListWrapper>
          <h2>상품평</h2>
          <ReviewList>
            {currentReviews.map((review, index) => (
              // review를 주면 ReviewBlock에서 렌더링
              // 렌더링 된 리뷰들을 배열로 반환
              <ReviewBlock key={index} review={review} />
            ))}
            <ReviewInputContainer>
              <ReviewInputTextarea
                value={reviewText}
                onChange={handleReviewChange}
                placeholder="상품평을 작성해주세요..."
              />
              <ReviewInputButton onClick={handleReviewSubmit}>리뷰 등록</ReviewInputButton>
            </ReviewInputContainer>
          </ReviewList>
          <PaginationContainer>
            {[...Array(totalPages)].map((item, index) => (
              <PageButton
                key={index + 1}
                active={currentPage === index + 1}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </PageButton>
            ))}
          </PaginationContainer>
        </ReviewListWrapper>
      </div>
    </>
  );
}

export default Review;
