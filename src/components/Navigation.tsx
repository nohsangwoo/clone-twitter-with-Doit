import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
  userObj: any;
}
const Navigation = ({ userObj }: Props) => {
  console.log('userOBJ', userObj);
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/profile">{`${userObj.displayName}의 Profile`}</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
