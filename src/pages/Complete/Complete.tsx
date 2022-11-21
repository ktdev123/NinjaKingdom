import { useEffect } from "react";

import styled from "@emotion/styled";
import { motion } from "framer-motion";

import { audioSrc } from "@/audioSrc";
import { Banner } from "@/components/common/Banner";
import { Character } from "@/components/common/Character/Character";
import { TwitterButton } from "@/pages/Complete/components/TwitterButton";
import { useGlobalStore } from "@/store";
import useSound from "@/utils/useSoundWithCleanup";

const CompleteCenter = styled(motion.div)`
  position: absolute;
  left: 50%;
  top: 60%;
  transform: translate(-50%, -60%);
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 999;
`;

export const Complete = () => {
  // This will be preloaded when starting to do questionnaire
  const [playVo] = useSound(audioSrc.vo.complete, {}, true);

  useEffect(() => {
    playVo();
    useGlobalStore.setState({ completed: true });
  }, [playVo]);
  const bannerText =
    "Arigato! Sensei will review your application. Check back later to find out if you're eligible for whitelist.";
  return (
    <>
      <CompleteCenter initial="hidden" animate="show" exit="leave">
        <Banner text={bannerText} />
        <TwitterButton />
      </CompleteCenter>
      <Character animated />
    </>
  );
};
