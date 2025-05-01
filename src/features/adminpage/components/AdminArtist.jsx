import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axiosInstance from "../../../api/axiosInstance";
import { Link, useNavigate } from "react-router-dom";

const VITE_API_URL = import.meta.env.VITE_API_URL;

const getImageUrl = (filename) => {
  if (!filename) return "/default.png";

  if (filename.startsWith("/uploads/")) {
    return `${VITE_API_URL}${filename}`;
  }

  // 정적 이미지 경로 (public 폴더)
  return `/images/ArtistIMG/${filename}`;
};

const Wrapper = styled.div`
  width: 1300px;
  margin-bottom: 50px;
`;

const Title = styled.h2`
  font-size: 30px;
  color: #3da9fc;
  margin-top: 43px;
  margin-bottom: 24px;
  font-weight: 500;
`;

const ControllerContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const AddButton = styled.button`
  border: none;
  background-color: rgba(255, 255, 255, 0.07);
  width: 120px;
  border-radius: 5px;
  color: #e1e1e1;
  margin-right: 10px;
  padding: 10px;
  cursor: pointer;
  transition: 0.3s ease-in-out;

  &:hover {
    background-color: #3da9fc;
  }
`;

const SearchBar = styled.input`
  width: 300px;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  color: #e1e1e1;
  background-color: rgba(255, 255, 255, 0.07);
  transition: 0.3s ease-in-out;

  &:focus {
    outline: none;
    border-color: #3da9fc;
  }
`;

const ListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
  padding-top: 30px;
`;

const ArtistContainer = styled.div`
  width: 100%;
  height: 320px;
  border-radius: 5px;
  border: 1px solid rgba(29, 29, 29, 0.07);
  background-color: rgba(255, 255, 255, 0.07);
  cursor: pointer;
  overflow: hidden;
  transition: 0.3s ease-in;

  &:hover {
    border: 1px solid rgb(255, 255, 255);
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 240px;
`;

const ProfileIMG = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const ArtistInfoContainer = styled.div`
  text-align: start;
  padding-top: 13px;
  padding-left: 20px;
`;

const ArtistName = styled.h3`
  font-size: 20px;
  font-weight: 500;
  color: #e1e1e1;
`;

const EnrollmentDate = styled.p`
  font-size: 14px;
  color: #e1e1e1;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40px;
`;

const PageButton = styled.button`
  background-color: ${({ active }) =>
    active ? "#3da9fc" : "rgba(255, 255, 255, 0.07);"};
  color: ${({ active }) => (active ? "#fff" : "#eeeeee")};
  border: none;
  margin: 0 5px;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
`;

const AdminArtist = () => {
  const [artists, setArtists] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const navigate = useNavigate();

  const handleAddArtist = () => {
    navigate("/adminpage?tab=artistAdd");
  };

  const fetchAllArtists = async () => {
    try {
      const res = await axiosInstance.get(`/artist`);
      setArtists(res.data);
    } catch (err) {
      console.error("작가 전체 불러오기 실패: ", err);
    }
  };

  const fetchArtistsByName = async () => {
    try {
      const res = await axiosInstance.get(
        `/artist/name/${encodeURIComponent(search.trim())}`
      );
      setArtists(res.data);
      setCurrentPage(1);
    } catch (err) {
      console.error("작가명 검색 실패: ", err);
    }
  };

  useEffect(() => {
    fetchAllArtists();
  }, []);

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      if (search.trim() === "") {
        fetchAllArtists();
      } else {
        fetchArtistsByName(search.trim());
      }
    }
  };

  const paginatedData = artists.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(artists.length / itemsPerPage);

  return (
    <Wrapper>
      <Title>작가 조회 및 관리</Title>
      <ControllerContainer>
        <SearchBar
          placeholder="작가명을 검색하세요"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleSearch}
        />
        <AddButton onClick={handleAddArtist}>작가 등록</AddButton>
      </ControllerContainer>

      <ListContainer>
        {paginatedData.map((artist) => (
          <Link
            key={artist.id}
            to={`/artist/${artist.userId}`}
            style={{ textDecoration: "none" }}
          >
            <ArtistContainer>
              <ImageContainer>
                <ProfileIMG
                  src={getImageUrl(artist.profile_img)}
                  alt={artist.name}
                />
              </ImageContainer>
              <ArtistInfoContainer>
                <ArtistName>{artist.name}</ArtistName>
                <EnrollmentDate>등록일: {artist.enrolmentDate}</EnrollmentDate>
              </ArtistInfoContainer>
            </ArtistContainer>
          </Link>
        ))}
      </ListContainer>

      <Pagination>
        {Array.from({ length: totalPages }, (_, i) => (
          <PageButton
            key={i}
            active={currentPage === i + 1}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </PageButton>
        ))}
      </Pagination>
    </Wrapper>
  );
};

export default AdminArtist;
