import React from "react";
import styled from "styled-components";

const ReviewListWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const ReviewList = styled.div`
  margin-top: 20px;
`;

const ReviewItem = styled.div`
  padding: 15px;
  border: 1px solid #ddd;
  margin-bottom: 10px;
  position: relative;
`;

const ReviewerName = styled.div`
  font-weight: bold;
`;

const ReviewDate = styled.div`
  color: #666;
  font-size: 14px;
`;

const ReviewContent = styled.div`
  margin-top: 10px;
`;

const MoreButton = styled.button`
  position: absolute;
  right: 10px;
  top: 10px;
  border: none;
  background: none;
  cursor: pointer;
`;

const ReviewInputContainer = styled.div`
  margin-top: 20px;
`;

const ReviewInputTextarea = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 10px;
  margin-bottom: 10px;
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
            <ReviewItem>
              <ReviewerName>홍길동</ReviewerName>
              <ReviewDate>{new Date().toLocaleString()}</ReviewDate>
              <ReviewContent>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                Ipsum has been the industry's standard dummy text ever since the 1500s,
              </ReviewContent>
              <MoreButton>⋮</MoreButton>
            </ReviewItem>

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
