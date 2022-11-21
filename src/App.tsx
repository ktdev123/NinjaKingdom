import "@/App.css";
import "modern-normalize/modern-normalize.css";

import { useEffect, useMemo } from "react";

import styled from "@emotion/styled";
import { Web3ReactHooks, Web3ReactProvider } from "@web3-react/core";
import { MetaMask } from "@web3-react/metamask";
import { AnimatePresence } from "framer-motion";
import { Howl } from "howler";
import { Route, Routes, useLocation } from "react-router-dom";

import { ReactComponent as MobileSvg } from "@/assets/images/mobile.svg";
import { audioSrc } from "@/audioSrc";
import { NinjaLogo } from "@/components/common/NinjaLogo";
import { routes } from "@/routes";
import useSound from "@/utils/useSoundWithCleanup";
import { hooks as metaMaskHooks, metaMask } from "@/web3/metamask";
const Box = styled.div`
  overflow: hidden;
  position: relative;
  width: 100%;
  height: 100%;
`;

const FullscreenWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #606e79;
  color: white;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 5vh 5vw;
  svg {
    height: 100px;
    width: 100px;
  }
  span {
    margin-top: 20px;
    font-size: 24px;
    text-align: center;
  }
`;
const MobileWrapper = styled(FullscreenWrapper)`
  @media screen and (min-width: 992px) {
    display: none;
  }
`;

const connectors: [MetaMask, Web3ReactHooks][] = [[metaMask, metaMaskHooks]];

function App() {
  const { pathname } = useLocation();
  const [, { sound: soundLogin }] = useSound(
    [audioSrc.bgm.login],
    {
      interrupt: true,
      loop: true,
    },
    true,
  );
  const [, { sound: soundWelcome }] = useSound(
    [audioSrc.bgm.welcome],
    {
      interrupt: true,
      loop: true,
    },
    true,
  );

  const isWelcomePage = pathname === "/";

  useEffect(() => {
    if (!soundWelcome || !soundLogin) return;

    const howlLogin = soundLogin as Howl;
    const howlWelcome = soundWelcome as Howl;

    if (isWelcomePage) {
      howlWelcome.play();
      howlWelcome.fade(0, 1, 700);
      howlLogin.fade(1, 0, 700);
      setTimeout(() => {
        howlLogin.stop();
      }, 700);
    } else {
      howlLogin.play();
      howlLogin.fade(0, 0.25, 700);
      howlWelcome.fade(1, 0, 700);
      setTimeout(() => {
        howlWelcome.stop();
      }, 700);
    }
  }, [isWelcomePage, soundLogin, soundWelcome]);

  const location = useLocation();
  const key = useMemo(
    () => location.pathname.split("/")[1] || "root",
    [location.pathname],
  );

  if (location.pathname.includes("callback")) {
    return (
      <>
        <FullscreenWrapper>
          <span>Loading...</span>
        </FullscreenWrapper>
        <Routes>
          {routes.map((route, index) => {
            return <Route {...route} key={index} />;
          })}
        </Routes>
      </>
    );
  }
  return (
    <>
      <Web3ReactProvider connectors={connectors}>
        <NinjaLogo />
        <Box>
          <AnimatePresence mode="wait">
            <Routes location={location} key={key}>
              {routes.map((route, index) => {
                return <Route {...route} key={index} />;
              })}
            </Routes>
          </AnimatePresence>
          <MobileWrapper>
            <MobileSvg />
            <span>Please view this on a larger screen.</span>
          </MobileWrapper>
        </Box>
      </Web3ReactProvider>
    </>
  );
}

export default App;
