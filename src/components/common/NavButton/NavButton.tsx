import { ComponentProps } from "react";

import styled from "@emotion/styled";
import { motion } from "framer-motion";

import { pxToRem } from "@/utils/toRem";

export const ButtonMain = styled(motion.button)<{ mode: "BACK" | "CONTINUE" }>`
  display: flex;
  flex-direction: ${(props) => (props.mode === "BACK" ? "row" : "row-reverse")};
  align-items: center;
  margin: 0;
  border: 0;
  padding: 0;
  background-color: transparent;
  --color: white;
  & [data-name="arrow"] {
    opacity: 1;
  }
  & [data-name="arrow_hover"] {
    opacity: 0;
  }
  &:hover:not(:disabled) {
    --color: #7284c6;
    & [data-name="arrow_hover"] {
      opacity: 1;
    }
  }

  transition: all 0.15s ease-in-out;
`;

const Text = styled.span`
  color: var(--color);
  transition: color 0.15s ease-in-out;
  font-weight: 700;
  font-size: ${pxToRem(13)};
  margin-left: ${pxToRem(8)};
  margin-right: ${pxToRem(8)};
  margin-bottom: -${pxToRem(3)};
`;
const ArrowContainer = styled.div`
  width: ${pxToRem(20)};
  height: ${pxToRem(20)};
  position: relative;
`;
const Arrow = styled.img<{ rotate: string }>`
  width: ${pxToRem(20)};
  position: absolute;
  top: 0;
  left: 0;
  object-fit: contain;
  rotate: ${(props) => {
    return props.rotate !== "false" ? "180deg" : "0deg";
  }};
  transition: all 0.15s ease-in-out;
`;

export enum NavButtonMode {
  BACK = "BACK",
  CONTINUE = "CONTINUE",
}

type NavButtonProps = {
  onNav?: () => void;
  text?: string;
  active?: boolean;
  mode: NavButtonMode;
} & ComponentProps<typeof motion.button>;

export const NavButton = ({
  onNav,
  text,
  mode,
  active = true,
  ...buttonProps
}: NavButtonProps) => {
  return (
    <ButtonMain
      mode={mode}
      onClick={() => {
        onNav?.();
      }}
      animate={{
        opacity: active ? 1 : 0.5,
        transition: { duration: 0.2 },
      }}
      {...buttonProps}
    >
      <ArrowContainer>
        <Arrow
          data-name="arrow"
          src="./assets/images/arrow.png"
          rotate={(mode === NavButtonMode.BACK).toString()}
        />
        <Arrow
          data-name="arrow_hover"
          src="./assets/images/arrow_hover.png"
          rotate={(mode === NavButtonMode.BACK).toString()}
        />
      </ArrowContainer>
      <Text>{text || mode}</Text>
    </ButtonMain>
  );
};
