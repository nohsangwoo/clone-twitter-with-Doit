import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "store/store";
import styled from "styled-components";

const NavigationContainer = styled.nav`
  display: flex;
  justify-content: center;
  padding: 40px 0;
`;

const NavItemWrapper = styled.div`
  margin: 5px;
  padding: 5px;
  border-radius: 5px;
  text-decoration: none;
  box-shadow: 0 1px 4px rgb(0 0 0 / 55%);
  transition: all 0.5s;
  color: black;
`;

interface Props {}
const Navigation = (props: Props) => {
  const userInfo = useSelector((state: RootState) => state.users.userInfo);

  return (
    <NavigationContainer>
      <NavItemWrapper>
        <Link to="/">Home</Link>
      </NavItemWrapper>

      <NavItemWrapper>
        <Link to="/profile">{`${userInfo.displayName}'s Profile`}</Link>
      </NavItemWrapper>
    </NavigationContainer>
  );
};

export default Navigation;
