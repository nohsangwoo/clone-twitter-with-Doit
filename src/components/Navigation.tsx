import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "store/store";
interface Props {}
const Navigation = (props: Props) => {
  const userInfo = useSelector((state: RootState) => state.users.userInfo);

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/profile">{`${userInfo.displayName}의 Profile`}</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
