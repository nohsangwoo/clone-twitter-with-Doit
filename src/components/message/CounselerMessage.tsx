import React, { useState } from "react";

import styled from "styled-components";

interface Props {
  centerMent: string;
  centerName: string;
}

const Chating = styled.div`
  width: 100%;
  height: calc(100% - 64px);
  margin-bottom: 64px;
  background-color: rgba(255, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
`;

const CenterChating = styled.div`
  position: relative;
  width: fit-content;
  margin: 4px 16px;
`;
const CenterName = styled.div`
  color: #646464;
  font-size: 10px;
  font-weight: bold;
  margin-bottom: 8px;
`;
const CenterChattop = styled.div`
  display: flex;
`;

const CenterText = styled.div`
  background-color: #2699fb;
  padding: 10px 12px;
  color: #fff;
  display: inline-block;
  box-sizing: border-box;
  max-width: 280px;
  min-width: 40px;
  font-size: 14px;
  word-break: keep-all;
`;
const ChatDate = styled.div`
  color: #969696;
  font-size: 9px;
  margin-left: 30px;
`;

const CounselerMessage = ({ centerMent, centerName }: Props): JSX.Element => {
  return (
    /* center chating */
    <CenterChating data-aos="fade-left" data-aos-delay="200">
      <CenterChattop>
        <CenterName>{centerName}</CenterName>
        <ChatDate>11:20 AM, Today</ChatDate>
      </CenterChattop>
      <CenterText>{centerMent}</CenterText>
    </CenterChating>
  );
};

export default CounselerMessage;
