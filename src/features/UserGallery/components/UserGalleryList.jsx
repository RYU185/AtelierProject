import React, { useEffect, useState } from "react";
import UserGallerys from "./UserGallerys";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const images = import.meta.glob("/public/images/UserGalleryIMG/*", {
  eager: true,
});

const Container = styled.div`
  width: 94%;
  margin: 0 auto;
`;

const GalleryGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 75%;
  margin: 0 auto;
  margin-top: 70px;
  margin-bottom: 70px;
`;

function UserGalleryList({ filteredItems }) {
  const navigate = useNavigate();
  const [galleryItems, setGalleryItems] = useState([]);
  const getImageUrl = (filename) => {
    const matched = Object.entries(images).find(([path]) =>
      path.endsWith(filename)
    );
    return matched ? matched[1].default : "";
  };

  useEffect(() => {
    // 초기 데이터 로드 (전체 전시)
    fetchGalleryData("/api/usergallery");
  }, []);

  useEffect(() => {
    // filteredItems prop이 변경될 때 상태 업데이트
    if (filteredItems && filteredItems.length > 0) {
      const transformed = filteredItems.map((item) => ({
        id: item.id,
        imageUrl: getImageUrl(item.posterUrl),
        title: item.title,
        date: `${item.startDate} ~ ${item.endDate}`,
        description: item.description,
      }));
      setGalleryItems(transformed);
    } else {
      // filteredItems가 없거나 비어있으면 전체 데이터를 다시 불러옴 (선택 사항)
      fetchGalleryData("/api/usergallery");
    }
  }, [filteredItems]);

  const fetchGalleryData = (apiUrl) => {
    axios
      .get(apiUrl)
      .then((res) => {
        const transformed = res.data.map((item) => ({
          id: item.id,
          imageUrl: getImageUrl(item.posterUrl),
          title: item.title,
          date: `${item.startDate} ~ ${item.endDate}`,
          description: item.description,
        }));
        setGalleryItems(transformed);
      })
      .catch((err) => {
        console.error("갤러리 데이터 불러오기 실패:", err);
      });
  };

  return (
    <Container>
      <GalleryGrid>
        {galleryItems.map((item) => (
          <div
            key={item.id}
            onClick={() => navigate(`/gallery/usergallery/${item.id}`)}
          >
            <UserGallerys {...item} />
          </div>
        ))}
      </GalleryGrid>
    </Container>
  );
}

export default UserGalleryList;
