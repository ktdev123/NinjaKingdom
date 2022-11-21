type translateyVariantsProps = {
  hiddenOpacity?: number;
  showOpacity?: number;
  leaveOpacity?: number;
  hiddenY?: number;
  showY?: number;
  leaveY?: number;
};

export const translateyVariants = (props: translateyVariantsProps = {}) => {
  const {
    hiddenOpacity = 0,
    showOpacity = 1,
    leaveOpacity = 0,
    hiddenY = 50,
    showY = 0,
    leaveY = -20,
  } = props;
  return {
    hidden: { opacity: hiddenOpacity, y: hiddenY },
    show: { opacity: showOpacity, y: showY },
    leave: {
      opacity: leaveOpacity,
      y: leaveY,
      transition: { ease: "easeOut", duration: 0.4 },
    },
  };
};
