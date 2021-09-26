export const Constrains = {
  audio: true,
  // 이런 간단한 속성을 이용하여 mediaConstraints를 구성하면 장치정보를 얻고 분류하는 작업 없이 전면/후면 카메라 전환 기능을 구현할 수 있다.
  video: {
    // facingMode는 모바일 환경에서 전면 후면등의 카메라를 선택하는 기능이다
    // facingMode는 user, environment, left, right 이렇게 4개의 값을 갖는다
    // user는 전면카메라, environment는  후면카메라를 의마한다
    facingMode: "user",
    // 가로세로 초기 화질 및 비율 설정 가능
    height: window.innerHeight / 1,
    width: window.innerWidth / 1
  }
};

// -------- 현재 사용되고있는 camera또는 audio input관련 current information을 저장하는 작업 --------
export const saveDevicesInfo = async ({
  track,
  getSelectedDeviceLabelActionFuncWithRedux,
  deviceKind,
  getSelectedDeviceIdActionFuncWithRedux,
  thunkAPI
}: {
  track: any;
  getSelectedDeviceLabelActionFuncWithRedux: any;
  deviceKind: string;
  getSelectedDeviceIdActionFuncWithRedux: any;
  thunkAPI: any;
}): Promise<void> => {
  const getCurrentDeviceId = async (
    deviceKind: string,
    currentDeviceLabel: string
  ) => {
    let result;
    const devices = await navigator.mediaDevices.enumerateDevices();

    const getAllDevices = devices.filter(device => device.kind === deviceKind);

    const getSpecificDeviceInfo = getAllDevices.filter((device: any) => {
      return device.label === currentDeviceLabel;
    });

    getSpecificDeviceInfo.forEach((info: any) => {
      result = info.deviceId;
    });
    return result;
  };

  if (track?.label) {
    // video/audio input 관련 인덱싱을위한 장치 label을 리덕스 스토어에 저장
    thunkAPI.dispatch(getSelectedDeviceLabelActionFuncWithRedux(track.label));

    // 현재 연결된 모든 비디오출력/오디오입력 장치를 찾고 위에서 찾은 label을 기준으로
    // currend video/audio deviceId를 찾아서 저장하기위한 용도
    const currentDeviceId: string | undefined = await getCurrentDeviceId(
      deviceKind,
      track.label
    );

    // 리덕스 저장소에 current DeviceId를 저장하는 구간
    if (currentDeviceId) {
      thunkAPI.dispatch(
        getSelectedDeviceIdActionFuncWithRedux(currentDeviceId)
      );
    }
  }
};
// -------- end of 현재 사용되고있는 camera또는 audio input관련 current information을 저장하는 작업 --------
