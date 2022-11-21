import styled from "@emotion/styled";
import { motion } from "framer-motion";

import { clipPathVariants } from "@/pages/Questionnaire/framerMotionVariants/clipPathVariants";
import { useInput } from "@/store";
import { pxToRem } from "@/utils/toRem";

const InputTextAreaMain = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  /* margin-bottom: ${pxToRem(0)}; */
`;

const Title = styled.div`
  font-weight: 700;
  font-size: ${pxToRem(16)};
  width: 100%;
  text-transform: uppercase;
  text-align: center;
  margin-bottom: ${pxToRem(12)};
  white-space: pre-line;
`;

const TextArea = styled.textarea<{ height: number }>`
  width: 100%;
  height: ${(props) => {
    return pxToRem(props.height);
  }};
  outline: none !important;
  border: solid 2px white;
  background-color: transparent;
  border-radius: 1rem;
  margin-bottom: ${pxToRem(10)};
  color: white;
  padding: 1rem;
  resize: none;

  &:focus {
    border-color: #7284c6;
    border-width: 4px;
  }
`;

const TextLimit = styled.div`
  width: 100%;
  text-align: start;
  font-weight: 700;
  font-size: ${pxToRem(13)};
  color: white;
`;

type InputTextAreaProps = {
  title: string;
  maxLength: number;
  questionKeyName: string;
  textAreaHeight?: number;
};

export const InputTextArea = ({
  title,
  maxLength,
  questionKeyName,
  textAreaHeight = 114,
}: InputTextAreaProps) => {
  const [value = "", setValue] = useInput(questionKeyName);
  const remaining = maxLength - value.length;
  const handleTextAreaChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
    setValue(e.currentTarget.value);
  };

  return (
    <InputTextAreaMain variants={clipPathVariants}>
      <Title>{title}</Title>
      <TextArea
        value={value}
        onChange={handleTextAreaChange}
        maxLength={maxLength}
        height={textAreaHeight}
      />
      <TextLimit>{remaining} characters remaining</TextLimit>
    </InputTextAreaMain>
  );
};
