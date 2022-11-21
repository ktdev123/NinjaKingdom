import { ReactNode } from "react";

import styled from "@emotion/styled";
import { motion } from "framer-motion";

const PageWrapper = styled(motion.div)`
  width: 100%;
  height: 100%;
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  position: relative;
`;

export const Content = styled(motion.div)`
  width: 100%;
  height: 100%;
`;

export const QuestionnaireContent = styled(Content)`
  display: flex;
  flex-direction: column;
`;
type PageProps = {
  children?: ReactNode;
};

export const Page = ({ children }: PageProps) => {
  return (
    <PageWrapper initial="hidden" animate="show" exit="leave">
      {children}
    </PageWrapper>
  );
};
