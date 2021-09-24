import React, { useState } from "react";

import styled from "styled-components";

interface Props {
  customerMent?: string;
}

// chating
const CustomerName = styled.div`
  color: #646464;
  font-size: 10px;
  font-weight: bold;
  margin-bottom: 8px;
`;
const CustomerChattop = styled.div`
  display: flex;
  justify-content: flex-end;
`;
const ChatDate = styled.div`
  color: #969696;
  font-size: 9px;
  margin-right: 30px;
`;
const CustomerChating = styled.div`
  position: relative;
  width: fit-content;
  margin: 4px 16px;
  margin-left: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const CustomerText = styled.div`
  color: #5d6368;
  padding: 10px 12px;
  background-color: #f1f9ff;
  display: inline-block;
  box-sizing: border-box;
  max-width: 280px;
  min-width: 40px;
  font-size: 14px;
  word-break: keep-all;
`;

const ChatCounsel = ({ customerMent }: Props): JSX.Element => {
  return (
    /* customer chating */
    <CustomerChating data-aos="fade-right" data-aos-delay="300">
      <CustomerChattop>
        <ChatDate>11:20 AM, Today</ChatDate>
        <CustomerName>me</CustomerName>
      </CustomerChattop>
      <CustomerText>{customerMent}</CustomerText>
    </CustomerChating>
  );
};

export default ChatCounsel;
