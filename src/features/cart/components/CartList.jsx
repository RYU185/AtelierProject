import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from "react";
import axiosInstance from "../../../api/axiosInstance";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const CartItemContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  border: 2px solid #464646;
  border-radius: 5px;
`;

const Checkbox = styled.input`
  width: 20px;
  height: 20px;
  margin: 0 24px 0 0;
  cursor: pointer;
  accent-color: #0066ff;
`;

const ProductImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin-right: 32px;
`;

const ProductInfo = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 40px;
`;

const ProductDetails = styled.div`
  flex: 1;
`;

const ProductName = styled.div`
  font-size: 16px;
  color: #e1e1e1;
  margin-bottom: 8px;
`;

const PriceText = styled.div`
  font-size: 16px;
  color: #e1e1e1;
  font-weight: 500;
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
`;

const QuantityButton = styled.button`
  width: 28px;
  height: 28px;
  border: none;
  background-color: white;
  color: #474747;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    background-color: #f8f9fa;
  }
`;

const QuantityInput = styled.input`
  width: 40px;
  height: 28px;
  border: none;
  border-left: 1px solid #ddd;
  border-right: 1px solid #ddd;
  text-align: center;
  font-size: 14px;
`;

const DeleteButton = styled.button`
  padding: 6px 12px;
  border: none;
  background-color: transparent;
  color: #c2c2c2;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const CartList = forwardRef(({ onUpdateTotal }, ref) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const userId = localStorage.getItem("username");
        const response = await axiosInstance.get(`/cart/user/${userId}`);
        const data = response.data;

        const transformed = data.map((item) => ({
          id: item.id,
          name: item.goodsName,
          price: item.goodsPrice,
          quantity: item.amount,
          image: item.imgUrl?.includes("/uploads")
            ? `${item.imgUrl}`
            : `/images/goods-images/${item.imgUrl?.replace(/^.*[\\/]/, "")}`,
          checked: false,
        }));

        setItems(transformed);
        calculateTotal(transformed);
      } catch (err) {
        console.error("장바구니 불러오기 실패:", err);
      }
    };

    fetchCart();
  }, []);

  const navigate = useNavigate();

  useImperativeHandle(ref, () => ({
    selectAll: (checked) => {
      const updatedItems = items.map((item) => ({
        ...item,
        checked,
      }));
      setItems(updatedItems);
      setTimeout(() => {
        calculateTotal(updatedItems);
      }, 0);

      const selectedItems = updatedItems.filter((item) => item.checked);
      const newTotal = {
        quantity: selectedItems.reduce((sum, item) => sum + item.quantity, 0),
        price: selectedItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        ),
        selectedItems: selectedItems,
        hasItems: selectedItems.length > 0,
      };
      onUpdateTotal(newTotal);
    },
    deleteSelected: async () => {
      const selected = items.filter((item) => item.checked);
      const ids = selected.map((item) => item.id);

      try {
        await axiosInstance.delete("/cart", { data: ids });

        const newItems = items.filter((item) => !item.checked);
        setItems(newItems);
        calculateTotal(newItems);
      } catch (err) {
        console.error("선택 상품 삭제 실패:", err);
        alert("선택한 상품 삭제에 실패했습니다.");
      }
    },
    getSelectedItems: () => {
      return items.filter((item) => item.checked);
    },
    getAllItems: () => [...items],
  }));

  const handleQuantityChange = (index, newQuantity) => {
    const updatedItems = [...items];
    updatedItems[index] = {
      ...updatedItems[index],
      quantity: newQuantity,
    };
    setItems(updatedItems);

    // 수량 변경 시 즉시 총액 업데이트
    const selectedItems = updatedItems.filter((item) => item.checked);
    const newTotal = {
      quantity: selectedItems.reduce((sum, item) => sum + item.quantity, 0),
      price: selectedItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      ),
      selectedItems: selectedItems,
      hasItems: selectedItems.length > 0,
    };
    onUpdateTotal(newTotal);
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/cart`, { data: [id] });
      const newItems = items.filter((item) => item.id !== id);
      setItems(newItems);
      calculateTotal(newItems);
    } catch (err) {
      console.error(err);
      alert("상품 삭제에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const handleCheckItem = (id) => {
    const newItems = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setItems(newItems);
    calculateTotal(newItems);
  };

  const calculateTotal = (currentItems) => {
    if (!currentItems || currentItems.length === 0) {
      onUpdateTotal({
        quantity: 0,
        price: 0,
        selectedItems: [],
        hasItems: false,
      });
      return;
    }

    const selectedItems = currentItems.filter((item) => item.checked);
    const totalQuantity = selectedItems.reduce(
      (sum, item) => sum + item.quantity,
      0
    );
    const totalPrice = selectedItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    onUpdateTotal({
      quantity: totalQuantity,
      price: totalPrice,
      selectedItems: selectedItems,
      hasItems: currentItems.length > 0,
    });
  };

  return (
    <Container>
      {items.map((item) => (
        <CartItemContainer key={item.id}>
          <Checkbox
            type="checkbox"
            checked={item.checked}
            onChange={() => handleCheckItem(item.id)}
          />
          <ProductImage src={item.image} alt={item.name} />
          <ProductInfo>
            <ProductDetails>
              <ProductName>{item.name}</ProductName>
              <PriceText>{item.price.toLocaleString()}원</PriceText>
            </ProductDetails>
            <QuantityControl>
              <QuantityButton
                onClick={() =>
                  handleQuantityChange(
                    items.indexOf(item),
                    Math.max(1, item.quantity - 1)
                  )
                }
                disabled={item.quantity <= 1} // 체크 여부 상관없이 작동
              >
                -
              </QuantityButton>
              <QuantityInput type="text" value={item.quantity} readOnly />
              <QuantityButton
                onClick={() =>
                  handleQuantityChange(items.indexOf(item), item.quantity + 1)
                }
              >
                +
              </QuantityButton>
            </QuantityControl>
            <DeleteButton onClick={() => handleDelete(item.id)}>
              삭제
            </DeleteButton>
          </ProductInfo>
        </CartItemContainer>
      ))}
    </Container>
  );
});

export default CartList;
