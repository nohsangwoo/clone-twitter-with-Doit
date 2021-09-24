import React from "react";

import Slider from "react-slick";
import PlayIcon from "@material-ui/icons/PlayCircleOutlineRounded";

import "./../../res/css/slick.css";
import { ButtonBase } from "@material-ui/core";
import styled from "styled-components";

import maincontent01 from "./../../res/images/svgimg/maincontent01.svg";
import maincontent02 from "./../../res/images/svgimg/maincontent02.svg";
import maincontent03 from "./../../res/images/svgimg/maincontent03.svg";

const PlaySvg = styled(PlayIcon)`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 40px;
  color: #fff;
`;
const BackgroundMovie = styled.span`
  position: absolute;
  width: 110px;
  height: 86px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.38);
  border-radius: 6;
`;

const ImageTag = styled.img`
  width: 110px;
  height: 86px;
`;

interface Props {
  test?: string;
  isMovieon: boolean;
  setIsMovieon: (isMovieon: boolean) => void;
}

const MovieSlider = ({ isMovieon, setIsMovieon }: Props): JSX.Element => {
  const ImageFileList = [
    { id: 1, imgFile: maincontent01 },
    { id: 2, imgFile: maincontent02 },
    { id: 3, imgFile: maincontent03 },
    { id: 4, imgFile: maincontent01 },
    { id: 5, imgFile: maincontent02 },
    { id: 6, imgFile: maincontent03 },
    { id: 7, imgFile: maincontent01 },
    { id: 8, imgFile: maincontent02 }
  ];

  // const [ movieOn, setMovieon ] = useState<boolean>(true);
  const handleToggleMovie = (isOn: boolean) => {
    setIsMovieon(!isOn);
  };
  // let slider: TinySliderInstance;
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 2
  };

  return (
    // 사이트별 홍보영상 보여주는 slider
    <Slider className="my-slider" {...settings}>
      {ImageFileList.map(data => {
        return (
          <ButtonBase
            onClick={() => handleToggleMovie(!isMovieon)}
            data-aos="zoom-in"
            data-aos-delay="200"
            key={data.id}
          >
            <ImageTag src={data.imgFile} alt={`maincontent${data.id}`} />
            <BackgroundMovie />
            <PlaySvg />
          </ButtonBase>
        );
      })}
    </Slider>
  );
};

export default MovieSlider;
