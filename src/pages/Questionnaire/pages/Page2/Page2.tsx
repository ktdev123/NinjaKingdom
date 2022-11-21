import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

import { Character } from "@/components/common/Character/Character";
import { InputTextArea } from "@/components/common/InputTextArea";
import { QuestionnaireContent } from "@/components/common/Page";
import { AnimationWrapper } from "@/pages/Questionnaire/components/AnimationWrapper/AnimationWrapper";
import { Title } from "@/pages/Questionnaire/components/Title";
import { delayAndStaggerVariants } from "@/pages/Questionnaire/framerMotionVariants/delayAndStaggerVariants";
import { useGlobalStore } from "@/store";
import { pxToRem } from "@/utils/toRem";

const Spacer = styled.div`
  min-height: ${pxToRem(12)};
  height: ${pxToRem(35)};
`;
export const Page2 = () => {
  const navigate = useNavigate();
  const store = useGlobalStore();

  return (
    <>
      <QuestionnaireContent initial="hidden" animate="show" exit="leave">
        <Title />
        <AnimationWrapper
          variants={delayAndStaggerVariants({
            showDelay: 0,
            showStagger: 0.4,
            hiddenDelay: 0,
            hiddenStagger: 0.4,
            leaveDelay: 0,
            leaveStagger: 0.2,
          })}
          navbarProps={{
            style: {
              marginTop: pxToRem(24),
            },
            disableContinue: !["q3", "q4"].every((key) => store.input[key]),
            onBack: () => {
              navigate(-1);
            },
            onContinue: () => {
              navigate("/questionnaire/page/3");
            },
          }}
        >
          <InputTextArea
            maxLength={250}
            title={`What SUPERPOWER do you possess THAT can make the Kingdom stronger?`}
            questionKeyName="q3"
          />
          <Spacer />
          <InputTextArea
            maxLength={250}
            title="Which anime character best describes you? Why?"
            questionKeyName="q4"
          />
        </AnimationWrapper>
        <Character />
      </QuestionnaireContent>
    </>
  );
};
