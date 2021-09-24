import React from "react";
import styled from "styled-components";
import Slider from "react-slick";

import "./../../res/css/slick.css";

import maincontent01 from "./../../res/images/svgimg/maincontent01.svg";
import maincontent02 from "./../../res/images/svgimg/maincontent02.svg";
import maincontent03 from "./../../res/images/svgimg/maincontent03.svg";

const ImageWrapper = styled.div`
  width: "100%";
  height: "100%";
`;

const ImageTag = styled.img``;

interface Props {
  test?: string;
}

const MainImage = (props: Props): JSX.Element => {
  // let slider: TinySliderInstance;
  const settings = {
    dots: true,
    fade: true,

    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false
  };

  const ImageFileList = [
    { id: 1, imgFile: maincontent01 },
    { id: 2, imgFile: maincontent02 },
    { id: 3, imgFile: maincontent03 }
  ];

  return (
    <>
      <Slider {...settings}>
        {ImageFileList.map(data => {
          return (
            <ImageWrapper key={data.id}>
              <ImageTag src={data.imgFile} alt={`maincontent${data.id}`} />
            </ImageWrapper>
          );
        })}
      </Slider>
    </>
  );
};

export default MainImage;
