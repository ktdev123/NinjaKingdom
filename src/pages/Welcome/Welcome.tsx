/* eslint-disable react/jsx-key */
import { useRef, useState } from "react";

import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import { apiHelper } from "@/api";
import { Banner } from "@/components/common/Banner";
import { NavButton, NavButtonMode } from "@/components/common/NavButton";
import { Page, Content } from "@/components/common/Page";
import {
  Footer,
  FooterTextPosition,
} from "@/pages/Questionnaire/components/Footer";
import { delayAndStaggerVariants } from "@/pages/Questionnaire/framerMotionVariants/delayAndStaggerVariants";
import { opacityVariants } from "@/pages/Questionnaire/framerMotionVariants/opacityVariants";
import { useGlobalStore } from "@/store";
import { pxToRem } from "@/utils/toRem";

// import welcomeBgJpg from "./assets/BG_invitecodepage.jpeg";

const WelcomeMain = styled(Content)`
  background-image: url("./assets/images/BG_invitecodepage.webp"),
    url("./assets/images/BG_invitecodepage.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
  flex-direction: column;
`;

const WelcomeBody = styled(motion.form)`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  padding-bottom: ${pxToRem(120)};
`;
const WelcomeContinueButton = styled(NavButton)`
  margin-left: auto;
  margin-right: 0.5rem;
  margin-top: 2rem;
`;

const WelcomeCenter = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const WelcomeInviteText = styled(motion.div)`
  font-size: 0.9rem;
`;

const WelcomeInviteInput = styled(motion.input)`
  border-radius: 4rem;
  height: 3rem;
  padding: 0 1rem;
  margin-top: 1rem;
  width: 17rem;
`;

const BannerContainer = styled(motion.div)`
  margin-top: 5rem;
`;

export const Welcome = () => {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState("");
  const [inviteCodeError, setInviteCodeError] = useState(false);

  const handleChange = (e: any) => {
    setInputValue(e.target.value);
  };

  const validateAndContinue = async () => {
    const isValid =
      process.env.REACT_APP_DEV_MODE === "true" ||
      (await apiHelper.checkInviteCode(inputValue));

    if (isValid) {
      useGlobalStore.setState({ inviteCode: inputValue });
      navigate("/login");
    } else {
      setInviteCodeError(true);
    }
  };

  const bannerText = inviteCodeError
    ? "Sorry, your code seems to be invalid."
    : "After hours of wandering in the forest, the hidden entrance is still nowhere to be found...";

  return (
    <Page>
      <WelcomeMain>
        <WelcomeBody
          variants={delayAndStaggerVariants({
            showDelay: 0.3,
            showStagger: 0.2,
            hiddenDelay: 0.3,
            hiddenStagger: 0.2,
            leaveDelay: 0,
            leaveStagger: 0.1,
          })}
          onSubmit={(e) => {
            e.preventDefault();
            validateAndContinue();
          }}
        >
          <WelcomeCenter>
            <WelcomeInviteText variants={opacityVariants()}>
              INVITE CODE:
            </WelcomeInviteText>
            <WelcomeInviteInput
              variants={opacityVariants()}
              type="text"
              ref={inputRef}
              onChange={handleChange}
              maxLength={6}
            />

            <WelcomeContinueButton
              mode={NavButtonMode.CONTINUE}
              onNav={validateAndContinue}
              type="submit"
              disabled={inputValue.length !== 6}
              active={inputValue.length === 6}
              variants={opacityVariants({
                showOpacity: 0.5,
              })}
            />
          </WelcomeCenter>

          <BannerContainer>
            <Banner text={bannerText} />
          </BannerContainer>
        </WelcomeBody>
        <Footer textPosition={FooterTextPosition.RIGHT} />
      </WelcomeMain>
    </Page>
  );
};
