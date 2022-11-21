import styled from "@emotion/styled";

import { pxToRem } from "@/utils/toRem";

export enum FooterTextPosition {
  "LEFT",
  "RIGHT",
}

type FooterProps = {
  textPosition?: FooterTextPosition;
};

const FooterMain = styled.div<{ textPos: FooterTextPosition }>`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: ${pxToRem(56)};
  padding: 0 ${pxToRem(45)};
  font-size: ${pxToRem(12)};
  text-align: ${(props) =>
    props.textPos === FooterTextPosition.LEFT ? "start" : "end"};
`;

export const Footer = ({
  textPosition = FooterTextPosition.LEFT,
}: FooterProps) => {
  return (
    <FooterMain textPos={textPosition}>
      © 2022 THE NINJA KINGDOM| All Rights Reserved
    </FooterMain>
  );
};
