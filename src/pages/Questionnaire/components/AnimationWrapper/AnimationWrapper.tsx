import { ReactNode } from "react";

import styled from "@emotion/styled";
import { HTMLMotionProps, motion } from "framer-motion";

import { ContentBackgroud } from "@/pages/Questionnaire/components/ContentBackgroud";
import { NavBar, NavBarProps } from "@/pages/Questionnaire/components/NavBar";
import { pxToRem } from "@/utils/toRem";

const Top = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  height: ${pxToRem(550)};
`;

const Content = styled(motion.div)`
  position: absolute;
  padding: 2rem;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
export const AnimationWrapper = ({
  children,
  navbarProps,
  ...motionProps
}: {
  children: ReactNode;
  navbarProps: NavBarProps;
} & HTMLMotionProps<"div">) => {
  return (
    <Top {...motionProps}>
      <ContentBackgroud />
      <Content>
        {children}
        <NavBar {...navbarProps} />
      </Content>
    </Top>
  );
};
