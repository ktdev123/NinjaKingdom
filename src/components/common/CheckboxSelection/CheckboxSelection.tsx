import { useEffect } from "react";

import styled from "@emotion/styled";
import { motion } from "framer-motion";

import { clipPathVariants } from "@/pages/Questionnaire/framerMotionVariants/clipPathVariants";
import { delayAndStaggerVariants } from "@/pages/Questionnaire/framerMotionVariants/delayAndStaggerVariants";
import { useGlobalStore } from "@/store";
import { pxToRem } from "@/utils/toRem";

const CheckboxSelectionMain = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const Title = styled(motion.div)`
  font-weight: 700;
  color: white;
  font-size: ${pxToRem(16)};
  margin-bottom: ${pxToRem(20)};
  text-transform: uppercase;
`;

const SelectionsWrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const Option = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${pxToRem(10)};
`;

const Checkbox = styled(motion.input)`
  margin-right: ${pxToRem(12)};
  border: solid 1px white;
  width: ${pxToRem(12)};
  height: ${pxToRem(12)};
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border-radius: 50%;

  &:checked {
    background: white content-box;
  }
`;

const OptionText = styled(motion.div)`
  font-weight: 700;
  color: white;
  font-size: ${pxToRem(13)};
`;

export type Selection = {
  keyName: string;
  text: string;
  isChecked: boolean;
};

type CheckboxSelectionProps = {
  title: string;
  inputKey: string;
  isMultiple: boolean;
  options: string[];
};

export const CheckBoxSelection = ({
  title,
  isMultiple,
  inputKey,
  options,
}: CheckboxSelectionProps) => {
  const value = useGlobalStore((state) => state.input[inputKey]);

  useEffect(() => {
    // init global store input.whenYouAreNotANinja when it is not exist
    if (typeof value !== "string" && !Array.isArray(value)) {
      useGlobalStore.setState((state) => ({
        ...state,
        input: {
          ...state.input,
          [inputKey]: isMultiple ? [] : "",
        },
      }));
    }
  }, [value, isMultiple, inputKey]);

  const handleCheck = (text: string) => {
    useGlobalStore.setState((state) => {
      const oldValue = state.input[inputKey];
      let newValue: any;
      if (isMultiple) {
        newValue = [...oldValue];
        if (newValue.includes(text)) {
          newValue = newValue.filter((op: string) => op !== text);
        } else {
          newValue = [...new Set([...oldValue, text])];
        }
      } else {
        newValue = text;
      }
      return {
        ...state,
        input: {
          ...state.input,
          [inputKey]: newValue,
        },
      };
    });
  };

  return (
    <CheckboxSelectionMain initial="hidden" animate="show" exit="leave">
      <Title variants={clipPathVariants}>{title}</Title>

      <SelectionsWrapper
        variants={delayAndStaggerVariants({
          showDelay: 0,
          showStagger: 0.05,
          hiddenDelay: 0,
          hiddenStagger: 0.05,
          leaveDelay: 0,
          leaveStagger: 0.05,
        })}
      >
        {options.map((option) => {
          return (
            <Option
              key={option}
              onClick={() => {
                handleCheck(option);
              }}
            >
              <Checkbox
                variants={clipPathVariants}
                type="checkbox"
                checked={
                  isMultiple ? (value ?? []).includes(option) : value === option
                }
                onChange={() => {}}
              />
              <OptionText variants={clipPathVariants}>{option}</OptionText>
            </Option>
          );
        })}
      </SelectionsWrapper>
    </CheckboxSelectionMain>
  );
};
