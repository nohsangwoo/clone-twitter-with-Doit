import React, { useState } from "react";

import { Avatar } from "@material-ui/core";
import styled from "styled-components";

interface Props {}

const ProfileContainer = styled.div`
  background-color: #fff;
  position: absolute;
  left: 6;
  top: 6;
  display: flex;
  padding: 6px 12px;
  border-radius: 24;
  align-items: center;
`;
const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 12;
`;
const AvatarBox = styled(Avatar)`
  width: 38px;
  height: 38px;
  margin-right: 4;
`;

const Profile = ({}: Props): JSX.Element => {
  return (
    <ProfileContainer>
      <AvatarBox />
      <ProfileInfo>
        <span>서비스팀</span>
        <span>John cooper</span>
      </ProfileInfo>
    </ProfileContainer>
  );
};

export default Profile;
