import { useEffect, useMemo } from "react";

import styled from "@emotion/styled";
import { AnimatePresence } from "framer-motion";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

import { audioSrc } from "@/audioSrc";
import { Content, Page } from "@/components/common/Page";
import { useGlobalStore } from "@/store";
import useSound from "@/utils/useSoundWithCleanup";

import { Footer } from "./components/Footer";
import { MetamaskButton } from "./components/MetamaskButton";
import { routes } from "./routes";

const QuestionnaireMain = styled(Content)`
  display: flex;

  justify-content: flex-end;
  background-image: url("./assets/images/BG_successpage-1920x1080.webp"),
    url("./assets/images/BG_successpage-1920x1080.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

const Left = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  /* height: 100%; */
  margin-right: 42vw;
  margin-left: 10rem;
  margin-top: 8rem;
  margin-bottom: 5em;
  max-width: 50rem;
  /* max-height: 30rem; */
  @media screen and ((max-width: 1280px) or (max-height: 800px)) {
    margin-top: 7rem;
  }
`;

const RouteWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

export const Questionnaire = () => {
  const { inviteCode, discordId, metamaskId, twitterId, completed } =
    useGlobalStore();
  const navigate = useNavigate();
  const canProceed = inviteCode && discordId && metamaskId && twitterId;
  const location = useLocation();
  const key = useMemo(() => location.pathname, [location.pathname]);

  // if (isCompletePage) alert("1");
  useEffect(() => {
    if (completed) {
      navigate("/questionnaire/complete");
      return;
    }
    if (!canProceed) {
      navigate("/");
    }
  }, [canProceed, completed, navigate]);

  // Preload vo
  useSound([audioSrc.vo.complete]);
  if (!canProceed) {
    return null;
  }

  return (
    <Page>
      <QuestionnaireMain>
        <MetamaskButton />

        <Left>
          <RouteWrapper>
            <AnimatePresence mode="wait">
              <Routes location={location} key={key}>
                {routes.map((route, index) => {
                  return <Route {...route} key={index} />;
                })}
              </Routes>
            </AnimatePresence>
          </RouteWrapper>
        </Left>

        <Footer />
      </QuestionnaireMain>
    </Page>
  );
};
