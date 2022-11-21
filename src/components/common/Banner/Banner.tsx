import { useMemo } from "react";

import styled from "@emotion/styled";
import { motion } from "framer-motion";

type BannerProps = {
  text: string;
};

const BannerWrapper = styled(motion.div)`
  width: 39rem;
  position: relative;
`;

const BannerImg = styled.picture`
  width: 100%;
  filter: grayscale(80%) contrast(80%) hue-rotate(80deg);
  > img {
    width: 100%;
  }
`;

const BannerTextWrapper = styled(motion.div)`
  width: 100%;
  padding: 2rem 4rem;
  position: absolute;
  left: 50%;
  top: 20%;
  transform: translate(-50%, -20%);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BannerText = styled.div`
  color: black;
  font-size: 1.3rem;
  text-align: center;
`;

export const Banner = ({ text }: BannerProps) => {
  const spans = useMemo(
    () =>
      text.split("").map((char, index) => {
        return (
          <motion.span
            key={index}
            variants={{
              hidden: {
                opacity: 0,
              },
              show: {
                opacity: 1,
                transition: { duration: 0 },
              },
            }}
          >
            {char}
          </motion.span>
        );
      }),
    [text],
  );
  return (
    <BannerWrapper
      variants={{
        hidden: {
          scale: 0,
        },
        show: {
          scale: [0, 1.1, 1],
          transition: {
            type: "keyframes",
            times: [0, 0.2, 0.4],
          },
        },
        leave: {
          scale: [1, 1.1, 0],
          transition: {
            type: "keyframes",
            times: [0, 0.2, 0.4],
          },
        },
      }}
    >
      <BannerImg>
        <source srcSet="./assets/images/banner_bg.webp" type="image/webp" />
        <source srcSet="./assets/images/banner_bg.png" type="image/png" />
        <img src="./assets/images/banner_bg.png" />
      </BannerImg>
      <BannerTextWrapper
        key={text}
        variants={{
          show: {
            transition: { staggerChildren: 0.05 },
          },
        }}
      >
        <BannerText>{spans}</BannerText>
      </BannerTextWrapper>
    </BannerWrapper>
  );
};
