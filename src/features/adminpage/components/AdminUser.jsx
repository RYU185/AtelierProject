import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axiosInstance from "../../../api/axiosInstance";

const AdminUserWrapper = styled.div`
  flex: 1;
  flex-direction: column;
  color: white;
`;

const TitleWrapper = styled.div`
  font-size: 30px;
  color: #3da9fc;
  margin-top: 43px;
  margin-bottom: 24px;
  font-weight: 500;
`;

const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1340px;
  position: relative;
`;

const SearchInput = styled.input`
  width: 300px;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  color: #e1e1e1;
  background-color: rgba(255, 255, 255, 0.07);
  padding: 11px;
  transition: 0.3s ease-in-out;
  &:focus {
    outline: none;
    border-color: #3da9fc;
  }
`;

const SortButton = styled.button`
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.07);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: 0.3s ease;
  &:hover {
    background: #3a92e5;
  }
`;

const SortOptions = styled.div`
  display: ${(props) => (props.open ? "block" : "none")};
  background: white;
  position: absolute;
  top: 45px;
  left: 0;
  width: 95px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  z-index: 20;
`;

const SortOption = styled.div`
  padding: 10px;
  font-size: 12px;
  cursor: pointer;
  color: rgb(47, 47, 47);
  transition: 0.3s;
  &:hover {
    background: #3a92e5;
    color: #ffffff;
  }
`;

const TableContainer = styled.div`
  width: 100%;
  margin-top: 10px;
  background: rgba(255, 255, 255, 0.07);
  max-width: 1340px;
`;

const TableWrapper = styled.div`
  max-height: 500px;
  overflow-y: auto;
  display: block;
  border-top: 1px solid #bbb;
`;

const TableHeaderWrapper = styled.div`
  display: grid;
  grid-template-columns: 80px 120px 120px 250px 150px 200px 150px 140px 100px 80px;
  background: rgba(255, 255, 255, 0.123);
  font-weight: bold;
  padding: 10px;
  border-bottom: 2px solid #bbb;
  text-align: center;
  position: sticky;
  top: 0;
`;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 90px 120px 120px 250px 150px 200px 150px 140px 100px 80px;
  text-align: center;
`;

const TableCell = styled.div`
  padding: 0 10px;
  border-bottom: 1px solid #ddd;
  text-align: center;
  font-size: 13px;
`;

const AdminUser = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOpen, setSortOpen] = useState(false);
  const [sortType, setSortType] = useState(null);
  const [userData, setUserData] = useState([]);
  const [genderFilter, setGenderFilter] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get("/user");
        setUserData(response.data);
      } catch (error) {
        console.error("유저 정보를 불러오는 데 실패했습니다:", error);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = userData
    .filter((user) =>
      user.nickName.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((user) => {
      if (genderFilter === "female") return user.gender === "FEMALE";
      if (genderFilter === "male") return user.gender === "MALE";
      return true;
    });

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (sortType === "recent") {
      return new Date(b.enrolmentDate) - new Date(a.enrolmentDate);
    }
    if (sortType === "birthday") {
      return new Date(a.birthday) - new Date(b.birthday); // 생일 오름차순
    }
    return 0;
  });

  return (
    <>
      <AdminUserWrapper>
        <TitleWrapper>유저 관리</TitleWrapper>

        <div>
          <FilterContainer>
            <SearchInput
              type="text"
              placeholder="닉네임 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div style={{ position: "relative" }}>
              <SortButton onClick={() => setSortOpen(!sortOpen)}>
                검색 정렬
              </SortButton>
              <SortOptions open={sortOpen}>
                <SortOption
                  onClick={() => {
                    setSortType("recent");
                    setGenderFilter(null);
                    setSortOpen(false);
                  }}
                >
                  최근 가입순
                </SortOption>
                <SortOption
                  onClick={() => {
                    setSortType("birthday");
                    setGenderFilter(null);
                    setSortOpen(false);
                  }}
                >
                  생일 순
                </SortOption>
                <SortOption
                  onClick={() => {
                    setGenderFilter("female");
                    setSortType(null);
                    setSortOpen(false);
                  }}
                >
                  여성 유저
                </SortOption>
                <SortOption
                  onClick={() => {
                    setGenderFilter("male");
                    setSortType(null);
                    setSortOpen(false);
                  }}
                >
                  남성 유저
                </SortOption>
                <SortOption
                  onClick={() => {
                    setGenderFilter(null);
                    setSortType(null);
                    setSortOpen(false);
                  }}
                >
                  전체 보기
                </SortOption>
              </SortOptions>
            </div>
          </FilterContainer>

          <TableContainer>
            <TableHeaderWrapper>
              <div>ID</div>
              <div>닉네임</div>
              <div>실명</div>
              <div>Email</div>
              <div>생년월일</div>
              <div>주소</div>
              <div>연락처</div>
              <div>가입일</div>
              <div>성별</div>
            </TableHeaderWrapper>
            <TableWrapper>
              {sortedUsers.map((user, index) => (
                <TableRow key={user.userId}>
                  <TableCell>{user.userId}</TableCell>
                  <TableCell>{user.nickName}</TableCell>
                  <TableCell>{user.realName}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.birthday}</TableCell>
                  <TableCell>{user.address}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>{user.enrolmentDate}</TableCell>

                  <TableCell>{user.gender}</TableCell>
                </TableRow>
              ))}
            </TableWrapper>
          </TableContainer>
        </div>
      </AdminUserWrapper>
    </>
  );
};

export default AdminUser;
