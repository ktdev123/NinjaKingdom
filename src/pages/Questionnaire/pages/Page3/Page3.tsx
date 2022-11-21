import { useNavigate } from "react-router-dom";

import { apiHelper } from "@/api";
import { Character } from "@/components/common/Character/Character";
import { InputTextArea } from "@/components/common/InputTextArea";
import { QuestionnaireContent } from "@/components/common/Page";
import { AnimationWrapper } from "@/pages/Questionnaire/components/AnimationWrapper/AnimationWrapper";
import { Title } from "@/pages/Questionnaire/components/Title";
import { delayAndStaggerVariants } from "@/pages/Questionnaire/framerMotionVariants/delayAndStaggerVariants";
import { useGlobalStore } from "@/store";
import { pxToRem } from "@/utils/toRem";

import { questionKeys } from "../../questionKeys";

export const Page3 = () => {
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
            leaveStagger: 0.4,
          })}
          navbarProps={{
            style: {
              marginTop: pxToRem(36),
            },
            disableContinue: !questionKeys.every((key) => store.input[key]),
            onBack: () => {
              navigate(-1);
            },
            onSubmit: async () => {
              if (process.env.REACT_APP_DEV_MODE === "true") {
                navigate("/questionnaire/complete");
                return;
              }
              await apiHelper.submit();
              navigate("/questionnaire/complete");
            },
          }}
        >
          <InputTextArea
            maxLength={800}
            title={`The night is dark, you are alone in a forest. Suddenly... \n(What happens next?)`}
            textAreaHeight={169}
            questionKeyName="q5"
          />
        </AnimationWrapper>
        <Character />
      </QuestionnaireContent>
    </>
  );
};
