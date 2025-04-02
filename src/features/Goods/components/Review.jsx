import React from "react";
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
  cursor: pointer;
`;

function Review() {
  return (
    <>
      <div>
        <ReviewListWrapper>
          <h2>상품평</h2>

          <ReviewList>
            <ReviewBlock />
            <ReviewBlock />
            <ReviewBlock />
            <ReviewInputContainer>
              <ReviewInputTextarea />
              <ReviewInputButton>리뷰 등록</ReviewInputButton>
            </ReviewInputContainer>
          </ReviewList>
        </ReviewListWrapper>
      </div>
    </>
  );
}

export default Review;
