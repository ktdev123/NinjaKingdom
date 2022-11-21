import { useEffect, useMemo, useState } from "react";

import styled from "@emotion/styled";
import { useWeb3React } from "@web3-react/core";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import { apiHelper, errorHandler } from "@/api";
import { audioSrc } from "@/audioSrc";
import { Banner } from "@/components/common/Banner";
import { Character } from "@/components/common/Character/Character";
import { NavButton, NavButtonMode } from "@/components/common/NavButton";
import { Content, Page } from "@/components/common/Page";
import { Footer } from "@/pages/Questionnaire/components/Footer";
import { MetamaskButton } from "@/pages/Questionnaire/components/MetamaskButton";
import { delayAndStaggerVariants } from "@/pages/Questionnaire/framerMotionVariants/delayAndStaggerVariants";
import { opacityVariants } from "@/pages/Questionnaire/framerMotionVariants/opacityVariants";
import { useGlobalStore } from "@/store";
import { login } from "@/utils/login";
import { pxToRem } from "@/utils/toRem";
import useSound from "@/utils/useSoundWithCleanup";

import { LoginButton } from "./components/LoginButton";

const LoginMain = styled(Content)`
  background-image: url("./assets/images/BG_successpage-1920x1080.webp"),
    url("./assets/images/BG_successpage-1920x1080.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
  flex-direction: column;
`;

const LoginBody = styled(motion.div)`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  padding-bottom: ${pxToRem(120)};
  z-index: 1;
`;

const LoginCenter = styled(motion.div)`
  display: flex;
  margin-right: 3rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LoginTitle = styled(motion.div)`
  font-size: 0.75rem;
  font-weight: bold;
`;

const LoginTwitterButton = styled(motion.div)`
  margin-top: 2rem;
`;

const LoginDiscordButton = styled(motion.div)`
  margin-top: 0.7rem;
`;

const LoginContinueButton = styled(NavButton)`
  margin-right: 0.5rem;
  align-self: flex-end;
  align-items: center;
  margin-top: 1.5rem;
`;

const BannerContainer = styled(motion.div)`
  margin-top: 4rem;
`;
export const Login = () => {
  const { inviteCode, discordId, metamaskId, twitterId, completed } =
    useGlobalStore();
  const navigate = useNavigate();
  const [error, setError] = useState<null | "used" | "wrongChain">(null);

  const [playVo] = useSound(audioSrc.vo.login, {}, true);

  useEffect(() => {
    playVo();
  }, [playVo]);

  const handleLogin = async (provider: "twitter" | "discord") => {
    const { id, isUsed } = await login(provider);
    if (isUsed) {
      setError("used");
      return;
    }
    if (id) {
      setError(null);
      useGlobalStore.setState({ [`${provider}Id`]: id });
    }
  };

  const { chainId, account, connector } = useWeb3React();

  useEffect(() => {
    async function setAccount() {
      if (account) {
        if (chainId === 1) {
          try {
            const used = await apiHelper.checkId("metamask", account);
            // const used =
            //   process.env.REACT_APP_DEV_MODE === "true"
            //     ? false
            //     : await apiHelper.checkId("metamask", account);
            if (!used) {
              useGlobalStore.setState({ metamaskId: account });
              setError(null);
            } else {
              setError("used");
            }
          } catch (e) {
            errorHandler(e);
          }
        } else {
          setError("wrongChain");
        }
      }
    }
    setAccount();
  }, [account, chainId]);

  const hasAllLogin = useMemo(() => {
    if (!!twitterId && !!discordId && !!metamaskId) {
      return true;
    } else return false;
  }, [discordId, metamaskId, twitterId]);

  const handleNav = () => {
    navigate("/questionnaire/page/1");
  };
  const errorMsg: Record<"used" | "wrongChain", string> = {
    used: "Oops! Looks like you have connected this account before.",
    wrongChain: "Please connect to the Ethereum Mainnet.",
  };

  const bannerText = error
    ? errorMsg[error]
    : "Congratulations! You've found the training base of the Ninja Kingdom!";

  const canProceed = !!inviteCode;

  useEffect(() => {
    if (completed) {
      navigate("/questionnaire/complete");
      return;
    }
    if (!canProceed) {
      navigate("/");
    }
  }, [canProceed, completed, navigate]);
  useEffect(() => {
    if (canProceed) {
      setTimeout(() => {
        connector.activate();
      }, 200);
    }
  }, [canProceed, connector]);
  if (!canProceed) {
    return null;
  }
  return (
    <>
      <Page>
        <LoginMain>
          <MetamaskButton />

          <LoginBody variants={delayAndStaggerVariants()}>
            <LoginCenter>
              <LoginTitle variants={opacityVariants()}>
                PLEASE AUTHENTICATE YOUR ACCOUNTS
              </LoginTitle>
              <LoginTwitterButton variants={opacityVariants()}>
                <LoginButton
                  handleLogin={() => handleLogin("twitter")}
                  logoSrc="./assets/images/twitter_logo.png"
                  app="TWITTER"
                  isConnected={!!twitterId}
                />
              </LoginTwitterButton>
              <LoginDiscordButton variants={opacityVariants()}>
                <LoginButton
                  handleLogin={() => handleLogin("discord")}
                  logoSrc="./assets/images/discord_logo.png"
                  app="DISCORD"
                  isConnected={!!discordId}
                />
              </LoginDiscordButton>
              <LoginContinueButton
                disabled={!hasAllLogin}
                active={hasAllLogin}
                mode={NavButtonMode.CONTINUE}
                onNav={handleNav}
                variants={opacityVariants({
                  showOpacity: 0.5,
                })}
              />
            </LoginCenter>

            <BannerContainer>
              <Banner text={bannerText} />
            </BannerContainer>
          </LoginBody>

          <Footer />
        </LoginMain>
        <Character animated />
      </Page>
    </>
  );
};
