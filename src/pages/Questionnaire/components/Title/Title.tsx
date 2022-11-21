import styled from "@emotion/styled";
import { motion } from "framer-motion";

import { translateyVariants } from "@/pages/Questionnaire/framerMotionVariants/translateyVariants";
import { pxToRem } from "@/utils/toRem";

const TitleWrapper = styled(motion.div)`
  font-weight: 400;
  font-size: ${pxToRem(30)};
  color: white;
  width: 100%;
  text-align: center;
  margin-bottom: ${pxToRem(16)};
  font-family: "Racing-Sans-One";
`;

export const Title = () => {
  return (
    <TitleWrapper variants={translateyVariants()}>
      TELL US MORE ABOUT YOURSELF
    </TitleWrapper>
  );
};
