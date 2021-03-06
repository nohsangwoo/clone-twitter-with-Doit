import { Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import AloIcon from "../../res/images/svgicon/alo_logo.svg";
import { AdminViewMode } from "../enum";
import { RouterPath } from "../utils/routerPath";

const LoginContent = styled.div`
  background-color: #fff;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: calc(100% - 48px);
  margin: 40px 24px 40px;
  padding: 54px 24px 40px;
  border-radius: 24px;
  box-sizing: border-box;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  align-items: center;
  & > * {
    margin-bottom: 14px;
  }
  & > *:last-child {
    margin-bottom: 0px;
  }
  & > button {
    min-height: 50px;
  }
`;
const OpenText = styled.div`
  color: #fff;
  position: absolute;
  top: -100px;
  font-size: 20px;
  font-weight: 600;
`;
const AloLogo = styled.img``;
const LoginText = styled.div`
  color: #4263c0;
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 30px;
`;
const PrimaryTextField = styled(TextField)`
  background-color: #f5f5f5;
`;
const PrimaryButton = styled(Button)``;
const SubButton = styled(Button)``;

const LogoImgContent = styled.div`
  width: 96px;
  height: 96px;
  background-color: #fff;
  border-radius: 50%;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: -48px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LogoImg = styled.img`
  width: 50px;
  height: auto;
`;

const MailsendMsd = styled.div`
  margin-bottom: 14px;
  color: rgb(150, 150, 150);
  font-size: 13px;
`;

const LoginField = () => {
  const history = useHistory();

  const handleLogIn = () => {
    history.push(RouterPath.AdminHome);
  };

  const [viewMode, setViewMode] = useState<string>("");

  const renderFindPassword = () => {
    const moveLoginPage = () => {
      setViewMode(AdminViewMode.Null);
    };
    return (
      <>
        <PrimaryTextField
          placeholder="???????????? ???????????????"
          variant="outlined"
          fullWidth={true}
        />
        <MailsendMsd>
          ???????????? ???????????? ????????? ???????????? ?????? ?????????.
        </MailsendMsd>
        <PrimaryButton variant="contained" color="primary" fullWidth={true}>
          ?????? ?????????
        </PrimaryButton>
        <SubButton onClick={moveLoginPage} color="primary" fullWidth={true}>
          login ???????????? ????????????
        </SubButton>
      </>
    );
  };

  const renderLogin = () => {
    const movePasswordPage = () => {
      setViewMode(AdminViewMode.FindPassword);
    };

    return (
      <>
        <PrimaryTextField
          placeholder="???????????? ???????????????"
          variant="outlined"
          fullWidth={true}
        />
        <PrimaryTextField
          placeholder="??????????????? ??????????????????"
          variant="outlined"
          fullWidth={true}
          type="password"
        />
        <PrimaryButton
          color="primary"
          variant="contained"
          fullWidth={true}
          onClick={handleLogIn}
        >
          Log in
        </PrimaryButton>
        <SubButton onClick={movePasswordPage} color="primary" fullWidth={true}>
          ???????????? ??????
        </SubButton>
      </>
    );
  };

  let title;
  let bodyForm;

  switch (viewMode) {
    case AdminViewMode.FindPassword:
      title = "???????????? ?????????";
      break;
    default:
      title = "Login";
  }

  switch (viewMode) {
    case AdminViewMode.FindPassword:
      bodyForm = renderFindPassword();
      break;
    default:
      bodyForm = renderLogin();
  }

  return (
    <LoginContent>
      <OpenText>??????????????? AlO?????????.</OpenText>
      <AloLogo />
      <LogoImgContent>
        <LogoImg src={AloIcon} />
      </LogoImgContent>
      <LoginText>{title}</LoginText>
      {bodyForm}
    </LoginContent>
  );
};

export default LoginField;
