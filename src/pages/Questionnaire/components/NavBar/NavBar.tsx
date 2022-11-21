import styled from "@emotion/styled";
import { HTMLMotionProps, motion } from "framer-motion";

import { NavButton, NavButtonMode } from "@/components/common/NavButton";
import { clipPathVariants } from "@/pages/Questionnaire/framerMotionVariants/clipPathVariants";
import { pxToRem } from "@/utils/toRem";

export const NavBarMain = styled(motion.div)`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-areas: "left center right";
  align-items: center;
`;

const ButtonWrapper = styled(motion.div)`
  display: flex;
  align-items: center;
  width: 100%;
`;

const BackWrapper = styled(ButtonWrapper)`
  grid-area: left;
  justify-content: flex-start;
`;

const ContinueWrapper = styled(ButtonWrapper)`
  grid-area: right;
  justify-content: flex-end;
`;

const Submit = styled.button`
  grid-area: center;
  --color: white;
  &:hover:not(:disabled) {
    --color: #7284c6;
  }
  opacity: 1;
  :disabled {
    opacity: 0.5;
  }
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: ${pxToRem(45)};
  font-weight: 700;
  --color: white;
  color: var(--color);
  font-size: ${pxToRem(13)};
  border: solid 2px var(--color);
  border-radius: 0.85rem;
  &:hover:not(:disabled) {
    --color: #7284c6;
  }
  transition: all 0.15s ease-in-out;
`;

export type NavBarProps = {
  disableContinue?: boolean;
  disableSubmit?: boolean;

  onBack?: () => void;
  onContinue?: () => void;
  onSubmit?: () => void;
} & Omit<HTMLMotionProps<"div">, "variants">;

export const NavBar = ({
  disableContinue = false,
  disableSubmit = false,
  onBack,
  onContinue,
  onSubmit,
  ...motionProps
}: NavBarProps) => {
  return (
    <NavBarMain {...motionProps} variants={clipPathVariants}>
      <BackWrapper>
        {!!onBack && <NavButton onNav={onBack} mode={NavButtonMode.BACK} />}
      </BackWrapper>

      {!!onSubmit && (
        <Submit
          disabled={disableSubmit}
          onClick={() => {
            onSubmit();
          }}
        >
          SUBMIT
        </Submit>
      )}

      <ContinueWrapper>
        {!!onContinue && (
          <NavButton
            onNav={() => {
              onContinue();
            }}
            disabled={disableContinue}
            active={!disableContinue}
            mode={NavButtonMode.CONTINUE}
          />
        )}
      </ContinueWrapper>
    </NavBarMain>
  );
};
