import { CarouselProvider, Image, Slide, Slider } from "pure-react-carousel";
import React from "react";
import { Divider } from "semantic-ui-react";

import CustomDotGroup from "./CustomDotGroup";

import "./index.css"

const ImageCarousel = (props) => (
  <CarouselProvider
    naturalSlideWidth={1}
    naturalSlideHeight={1}
    totalSlides={3}
  >
    <Slider>
      <Slide tag="a" index={0}>
        <Image id="image1"  size='small' src="https://images3.penguinrandomhouse.com/cover/9780399585050" />
      </Slide>
      <Slide tag="a" index={1}>
        <Image id="image2" size='small' src="https://damonza.com/wp-content/uploads/portfolio/fiction/World-Whisperer.jpg" />
      </Slide>
      <Slide tag="a" index={2}>
        <Image id="image3" size='small' src="https://i.pinimg.com/236x/82/79/74/827974d98ed5dabfbeecbdae890caebf.jpg" />
      </Slide>
    </Slider>

    <Divider />
    <CustomDotGroup slides={3} />
  </CarouselProvider>
);

export default ImageCarousel;