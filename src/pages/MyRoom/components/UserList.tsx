import React from "react";
import styled from "styled-components";
import ClientViewBox from "./ClientViewBox";
import OtherUsersViewBox from "./OtherUsersViewBox";

const UserListContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  padding: 0 10px;
  z-index: 10;
`;

const UserList = () => {
  return (
    <UserListContainer>
      {/* 맨 좌측 client view 고정 */}
      <ClientViewBox />

      {/* 두번째 부터 접속한 client 유저 peers 렌더링 */}
      <OtherUsersViewBox />
    </UserListContainer>
  );
};

export default UserList;
