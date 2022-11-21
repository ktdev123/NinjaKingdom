import React from "react";

import styled from "@emotion/styled";
import { motion } from "framer-motion";

const CharacterImg = styled(motion.picture)`
  position: fixed;
  left: 58%;
  top: 14%;
  height: 120vh;
  width: auto;
  > img {
    /* width: 100%; */
    height: 100%;
  }
`;
type CharacterProps = {
  animated?: boolean;
};
export const Character = ({ animated = false }: CharacterProps) => {
  return (
    <CharacterImg
      variants={
        animated
          ? {
              hidden: {
                y: "8%",
                opacity: 0,
              },

              show: {
                y: "0%",
                opacity: 1,
                transition: { ease: "easeOut", duration: 0.3 },
              },

              leave: {
                y: "-10%",
                opacity: 0,
                transition: { ease: "easeIn", duration: 0.4 },
              },
            }
          : undefined
      }
    >
      <source srcSet="./assets/images/char.webp" type="image/webp" />
      <source srcSet="./assets/images/char.png" type="image/png" />
      <img src="./assets/images/char.png" />
    </CharacterImg>
  );
};
