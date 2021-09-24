import React from "react";

import CounselerMessage from "../message/CounselerMessage";
import CustomerMessage from "../message/CustomerMessage";
import styled from "styled-components";

interface Props {
  centerName?: string;
}

const Chating = styled.div`
  width: 100%;
  height: 100%;
  margin-bottom: 64px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
  flex: 1;
`;

const ChatContainer = ({ centerName = "Sunny Pany" }: Props): JSX.Element => {
  const counselerChatList = [
    { id: 1, msg: "도움이 필요하세요?" },
    {
      id: 2,
      msg: "아래쪽에 보이는 영상상담을 누르시면 빠른 제품확인이 가능합니다."
    },
    {
      id: 3,
      msg: "아래쪽에 보시면 영상아이콘표시가 보이는데 그걸누르시면 됩니다."
    },
    { id: 4, msg: "네 버튼을 누르시면 영상상담이 진행됩니다." }
  ];

  const customerChatList = [
    { id: 1, msg: "네 제품을 실제로 확인하고싶은데 어떻게 확인할수 있을까요?" },
    { id: 2, msg: "어느쪽에있는 버튼인가요?" },
    { id: 3, msg: "네 찾았습니다 바로 연결할수 있나요" },
    { id: 4, msg: "네 감사합니다" }
  ];

  return (
    <Chating>
      {/* center chating */}
      {counselerChatList.map(data => {
        return (
          <CounselerMessage
            key={data.id}
            centerName={centerName}
            centerMent={data.msg}
          />
        );
      })}
      {customerChatList.map(data => {
        return <CustomerMessage key={data.id} customerMent={data.msg} />;
      })}
    </Chating>
  );
};

export default ChatContainer;
