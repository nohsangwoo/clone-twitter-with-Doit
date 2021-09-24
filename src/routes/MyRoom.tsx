import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getMyDevices } from "store/actions/devicesActions";
import * as wss from "components/utils/wssConnection/wssConnection";
import streamSlice from "store/reducers/streamSlice";

const MyRoom = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(streamSlice.actions.getMyStreamSagaTrigger());
    dispatch(getMyDevices());
    wss.connectWithWebSocket();
  }, []);
  return <div>RoomList</div>;
};

export default MyRoom;
