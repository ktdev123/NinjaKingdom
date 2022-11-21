import styled from "@emotion/styled";
import { motion } from "framer-motion";

import { clipPathVariants } from "@/pages/Questionnaire/framerMotionVariants/clipPathVariants";

const ContentBackgroundWrapper = styled(motion.div)`
  width: 100%;
  background-color: rgba(99, 99, 112, 0.74);
  border-radius: 2rem;
  height: 100%;
  overflow-y: auto;
`;

export const ContentBackgroud = () => {
  return <ContentBackgroundWrapper variants={clipPathVariants} />;
};
