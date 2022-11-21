export const clipPathVariants = {
  hidden: {
    clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)",
    transition: { ease: "easeIn", duration: 0.6 },
  },
  show: {
    clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
    transition: { ease: "easeOut", duration: 0.4 },
  },
  leave: {
    clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)",
    transition: { ease: "easeOut", duration: 0.4 },
  },
};
