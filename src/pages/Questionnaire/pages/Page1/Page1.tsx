import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

import { Character } from "@/components/common/Character/Character";
import { CheckBoxSelection } from "@/components/common/CheckboxSelection";
import { InputTextArea } from "@/components/common/InputTextArea";
import { QuestionnaireContent } from "@/components/common/Page";
import { AnimationWrapper } from "@/pages/Questionnaire/components/AnimationWrapper/AnimationWrapper";
import { Title } from "@/pages/Questionnaire/components/Title";
import { delayAndStaggerVariants } from "@/pages/Questionnaire/framerMotionVariants/delayAndStaggerVariants";
import { useGlobalStore } from "@/store";
import { pxToRem } from "@/utils/toRem";

const Spacer = styled.div`
  height: ${pxToRem(8)};
`;

const options = [
  "I create/write beautiful things",
  "I build things and make sure things run smoothly",
  "I’m crazy about variables and data structures",
  "I'm obsessed with graphs and $$$ management",
  "I talk to people all day and make sure they are happy ^^",
  "I study all things web3",
];

export const Page1 = () => {
  const navigate = useNavigate();
  const store = useGlobalStore();

  return (
    <>
      <QuestionnaireContent initial="hidden" animate="show" exit="leave">
        <Title />
        <AnimationWrapper
          variants={delayAndStaggerVariants({
            showDelay: 0,
            showStagger: 0.6,
            hiddenDelay: 0,
            hiddenStagger: 0.6,
            leaveDelay: 0,
            leaveStagger: 0.4,
          })}
          navbarProps={{
            style: {
              marginTop: pxToRem(16),
            },
            disableContinue: !["q1", "q2"].every((key) => store.input[key]),
            onContinue: () => {
              navigate("/questionnaire/page/2");
            },
          }}
        >
          <CheckBoxSelection
            options={options}
            title="When you are not a ninja, what do you do ?"
            inputKey="q1"
            isMultiple={false}
          />

          <Spacer />

          <InputTextArea
            title={`
        What is the most desirable quality of an NFT project\n you are looking for?
        `}
            maxLength={250}
            questionKeyName="q2"
          />
        </AnimationWrapper>
        <Character />
      </QuestionnaireContent>
    </>
  );
};
