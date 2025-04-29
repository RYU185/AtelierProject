import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Header from "../Header";
import Footer from "../Footer";
import Review from "./components/Review";
import TopButton from "../TopButton";
import axiosInstance from "../../api/axiosInstance";
import { useAuth } from "../../components/AuthContext";

const GradientBackground = styled.div`
  min-height: 100vh;
  background: radial-gradient(
    ellipse at 0% 0%,
    rgb(0, 0, 0),
    rgb(1, 9, 26) 40%,
    #000000 100%
  );
`;

const TitleContainer = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 7.25rem;
  padding-bottom: 2.25rem;
`;

const BackTitle = styled.h1`
  font-size: 180px;
  text-align: center;
  color: #8d8d8d26;
  padding: 0;
  margin: 0;
  position: absolute;
  z-index: 1;
`;

const Title = styled.h1`
  font-size: 50px;
  text-align: center;
  margin: 0;
  position: relative;
  z-index: 2;
  color: #f0f0f0;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 80px 20px;
  position: relative;
`;

const ProductContainer = styled.div`
  display: flex;
  gap: 40px;
  margin-top: 40px;
  position: relative;
`;

const ImageSection = styled.div`
  flex: 1;
  position: relative;
`;

const MainImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
  margin-bottom: 20px;
  cursor: zoom-in;
`;

const ZoomedImage = styled.div`
  position: absolute;
  left: 105%;
  top: 0;
  width: 400px;
  height: 400px;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  opacity: ${(props) => (props.$isVisible ? 1 : 0)};
  transition: opacity 0.3s ease;
  z-index: 100;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  pointer-events: none;
`;

const ZoomedImageContent = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform-origin: center center;
`;

const ThumbnailContainer = styled.div`
  display: flex;
  gap: 10px;
  overflow-x: auto;
  padding: 10px 0;
`;

const ThumbnailImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
  cursor: pointer;
  border: 2px solid ${(props) => (props.$active ? "#0068ca" : "transparent")};

  &:hover {
    opacity: 0.8;
  }
`;

const InfoSection = styled.div`
  flex: 1;
  padding: 20px;
  position: sticky;
  // position: sticky
  // 스크롤이 해당 위치에 도달했을때부터 고정을 시작하겠다고 설정

  top: 160px;
  height: fit-content;
  background: #1111111a;
  border-radius: 8px;
  border: 1px solid #c9c9c9;
  margin-left: 40px;
  margin-top: 10px;
`;

const CountText = styled.p`
  font-size: 19px;
  font-weight: 400;
  color: #e1e1e1;
`;

const ProductTitle = styled.h1`
  font-size: 24px;
  font-weight: bold;
  color: #e1e1e1;
  margin-bottom: 20px;
`;

const ProductPrice = styled.div`
  font-size: 20px;
  color: #e1e1e1;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const ProductDescription = styled.div`
  font-size: 16px;
  line-height: 1.6;
  color: #e1e1e1;
  margin: 20px 0 30px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  position: relative;
`;

const GoToCartButton = styled.button`
  width: 100%;
  height: 60px;
  padding: 15px;
  background-color: #fafafa;
  color: #0068ca;
  border: 2px solid #0068ca;
  border-radius: 4px;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: #e2e2e2;
  }
`;

const PurchaseButton = styled.button`
  width: 100%;
  height: 60px;
  padding: 15px;
  background-color: #0068ca;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #004483;
  }
`;

const CounterWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const CounterButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
`;

const CounterButton = styled.button`
  width: 30px;
  height: 30px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  background-color: #00000018;
  color: #ffffff;
`;

const CounterInput = styled.input`
  width: 40px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  text-align: center;
  outline: none;
  margin-left: 10px;
  padding-left: 2px;
  background-color: #00000022;
  color: #ffffff;
`;

const Stock = styled.div`
  margin-bottom: 20px;
  display: ${({ stockWarning }) => (stockWarning ? "block" : "none")};
`;

const StockText = styled.div`
  font-size: 16px;
`;

const StockWarning = styled.div`
  color: red;
  font-size: 14px;
  margin-top: 5px;
`;

const AmountCountContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  margin-top: 20px;
`;

const AmountCount = styled.div`
  font-size: 24px;
  color: #e1e1e1;
`;

const AmountCountText = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #0068ca;
`;

const ReviewHR = styled.hr`
  margin: 0 auto;
  width: 73rem;
  border: 2px solid #c9c9c9;
`;

const CartNotification = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  margin-top: 10px;
  padding: 15px;
  background-color: white;
  border: 1px solid #0068ca;
  border-radius: 4px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 10;
`;

const NotificationText = styled.div`
  color: #0068ca;
  font-size: 14px;
  margin-bottom: 10px;
`;

const GoToCartLink = styled.button`
  width: 100%;
  padding: 8px 16px;
  background-color: #0068ca;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.2s;
  &:hover {
    background-color: #004483;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
  text-align: center;
`;

const ModalTitle = styled.h2`
  margin-bottom: 20px;
  color: #333;
`;

const ModalButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
`;

const ModalButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.2s;

  &:first-child {
    background-color: #0068ca;
    color: white;
    &:hover {
      background-color: #004483;
    }
  }

  &:last-child {
    background-color: #f0f0f0;
    color: #333;
    &:hover {
      background-color: #e0e0e0;
    }
  }
`;

function GoodsDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, token } = useAuth(); // AuthContext 사용

  const [quantity, setQuantity] = useState(1);
  const [stock, setStock] = useState(10);
  const [stockWarning, setStockWarning] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [goods, setGoods] = useState(null);
  const [loading, setLoading] = useState(true);

  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showCartNotice, setshowCartNotice] = useState(false);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);

  useEffect(() => {
    const fetchGoodsDetail = async () => {
      try {
        const res = await axiosInstance.get(`/goods/id/${id}`);
        setGoods(res.data);
        setStock(res.data.stock);
      } catch (err) {
        console.error("굿즈 상세 조회 실패:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGoodsDetail();
  }, [id]);

  const handleIncrease = () => {
    if (stock > 0) {
      setQuantity((prev) => prev + 1);
      setStock((prev) => prev - 1);
      if (stock <= stock * 0.2) {
        setStockWarning(true);
      }
    }
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
      setStock((prev) => prev + 1);
      if (stock > 2) {
        setStockWarning(false);
      }
    }
  };

  const handleMouseEnter = () => setIsZoomed(true);
  const handleMouseLeave = () => setIsZoomed(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const relativeX = (x / rect.width) * 100;
    const relativeY = (y / rect.height) * 100;
    let centeredX = relativeX - 50;
    let centeredY = relativeY - 50;
    const maxOffset = 25;
    centeredX = Math.max(Math.min(centeredX, maxOffset), -maxOffset);
    centeredY = Math.max(Math.min(centeredY, maxOffset), -maxOffset);

    setMousePosition({ x: centeredX, y: centeredY });
  };

  const handleAddToCart = async () => {
    try {
      const userId = localStorage.getItem("username");
      if (!userId) {
        alert("로그인이 필요합니다.");
        navigate("/login");
        return;
      }

      const dto = {
        amount: quantity,
        sum: goods.price * quantity,
        goodsId: goods.id,
        userId: userId,
      };

      await axiosInstance.post("/cart", dto);
      setshowCartNotice(true);
    } catch (err) {
      console.error("장바구니 담기 실패:", err);
      alert("장바구니 담기에 실패했습니다.");
    }
  };
  const handleGoToCart = () => {
    setshowCartNotice(false);
    navigate("/cart");
  };

  const handleTitleClick = () => navigate("/goods");

  const handlePurchase = () => setShowPurchaseModal(true);

  const handlePurchaseConfirm = async () => {
    try {
      if (!user) {
        // 여기 수정됨! ✅
        alert("로그인이 필요합니다.");
        navigate("/login");
        return;
      }

      const safeThumbnail =
        currentProductImages?.[selectedImage] || currentProductImages?.[0];
      
      const dto = {
        quantity: quantity,
        sum: goods.price * quantity,
        goodsId: goods.id,
        userId: user.username,
        thumbnailUrl: safeThumbnail, // 여기 수정됨! ✅
      };

      

      await axiosInstance.post("/purchase/buy-now", dto, {
        headers: {
          Authorization: `Bearer ${token}`, // 여기 수정됨! ✅
        },
      });

      setShowPurchaseModal(false);
      navigate("/purchase-complete", {
        state: {
          items: [
            {
              goodsName: goods.name,
              price: goods.price,
              quantity: quantity,
              thumbnailUrl: safeThumbnail,
            },
          ],
          totalPrice: goods.price * quantity,
        },
      });
    } catch (err) {
      console.error("구매 실패:", err);
      alert("구매에 실패했습니다. 재고를 확인하세요.");
    }
  };

  const handleCancelPurchase = () => setShowPurchaseModal(false);

  if (loading) {
    return (
      <GradientBackground>
        <Header />
        <TitleContainer>
          <BackTitle>Gallery Goods</BackTitle>
          <Title>Gallery Goods</Title>
        </TitleContainer>
        <Container>
          <ProductTitle>로딩중...</ProductTitle>
        </Container>
        <Footer />
      </GradientBackground>
    );
  }

  if (!goods) {
    return (
      <GradientBackground>
        <Header />
        <TitleContainer>
          <BackTitle>Gallery Goods</BackTitle>
          <Title>Gallery Goods</Title>
        </TitleContainer>
        <Container>
          <ProductTitle>상품을 찾을 수 없습니다.</ProductTitle>
        </Container>
        <Footer />
      </GradientBackground>
    );
  }

  // 정적 이미지 불러오기
  const goodsImages = import.meta.glob("/public/images/goods-images/*", {
    eager: true,
  });

  // 공통 이미지 처리 함수
  const getGoodsImageUrl = (filename) => {
    if (!filename) return "/default.jpg";
    const matched = Object.entries(goodsImages).find(([path]) =>
      path.endsWith(filename)
    );
    if (matched) {
      return matched[1].default;
    }
    return `/uploads/${filename.replace(/^\/uploads\//, "")}`;
  };

  // 기존 currentProductImages 생성 부분 수정
  const currentProductImages =
    goods.imgUrlList?.map((url) => getGoodsImageUrl(url)) || [];

  return (
    <GradientBackground>
      <Header />
      <TitleContainer onClick={handleTitleClick}>
        <BackTitle>Gallery Goods</BackTitle>
        <Title>Gallery Goods</Title>
      </TitleContainer>
      <Container>
        <ProductContainer>
          <ImageSection>
            <MainImage
              src={currentProductImages[selectedImage]}
              alt={goods.name}
              onMouseMove={handleMouseMove}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            />
            <ThumbnailContainer>
              {currentProductImages.map((image, index) => (
                <ThumbnailImage
                  key={index}
                  src={image}
                  alt={`썸네일 ${index + 1}`}
                  $active={selectedImage === index}
                  onClick={() => setSelectedImage(index)}
                />
              ))}
            </ThumbnailContainer>
            <ZoomedImage $isVisible={isZoomed}>
              <ZoomedImageContent
                src={currentProductImages[selectedImage]}
                style={{
                  transform: `scale(2) translate(${-mousePosition.x * 4}px, ${
                    -mousePosition.y * 4
                  }px)`,
                  transformOrigin: "center center",
                }}
              />
            </ZoomedImage>
          </ImageSection>
          <InfoSection>
            <ProductTitle>{goods.name}</ProductTitle>
            <hr />
            <ProductDescription>
              {goods.description}
              <ProductPrice>{goods.price.toLocaleString()}원</ProductPrice>
            </ProductDescription>

            <CounterWrapper>
              <CountText>수량</CountText>
              <CounterButtonContainer>
                <CounterButton onClick={handleDecrease}>-</CounterButton>
                <CounterInput type="number" value={quantity} readOnly />
                <CounterButton onClick={handleIncrease}>+</CounterButton>
              </CounterButtonContainer>
            </CounterWrapper>

            <Stock $stockWarning={stockWarning}>
              <StockText>남은 재고: {stock}개</StockText>
              {stockWarning && <StockWarning>재고가 부족합니다!</StockWarning>}
            </Stock>
            <hr />

            <AmountCountContainer>
              <AmountCount>총 금액</AmountCount>
              <AmountCountText>
                {(goods.price * quantity).toLocaleString()}원
              </AmountCountText>
            </AmountCountContainer>

            <ButtonContainer>
              <GoToCartButton onClick={handleAddToCart}>
                장바구니 담기
              </GoToCartButton>
              {showCartNotice && (
                <CartNotification>
                  <NotificationText>장바구니에 담겼습니다</NotificationText>
                  <GoToCartLink onClick={handleGoToCart}>
                    장바구니로 가기
                  </GoToCartLink>
                </CartNotification>
              )}
              <PurchaseButton onClick={handlePurchase}>
                바로 구매하기
              </PurchaseButton>
            </ButtonContainer>
          </InfoSection>
        </ProductContainer>
      </Container>

      <ReviewHR />
      <Review />
      <Footer />
      <TopButton />

      {showPurchaseModal && (
        <ModalOverlay>
          <ModalContent>
            <ModalTitle>구매하시겠습니까?</ModalTitle>
            <p>총 금액: {(goods.price * quantity).toLocaleString()}원</p>
            <ModalButtonContainer>
              <ModalButton onClick={handlePurchaseConfirm}>확인</ModalButton>
              <ModalButton onClick={handleCancelPurchase}>취소</ModalButton>
            </ModalButtonContainer>
          </ModalContent>
        </ModalOverlay>
      )}
    </GradientBackground>
  );
}

export default GoodsDetail;
