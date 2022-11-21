type delayAndStaggerVariantsProps = {
  showDelay?: number;
  showStagger?: number;
  hiddenDelay?: number;
  hiddenStagger?: number;
  leaveDelay?: number;
  leaveStagger?: number;
};

export const delayAndStaggerVariants = (
  props: delayAndStaggerVariantsProps = {},
) => {
  const {
    showDelay = 0.3,
    showStagger = 0.2,
    hiddenDelay = 0.3,
    hiddenStagger = 0.2,
    leaveDelay = 0.3,
    leaveStagger = 0.2,
  } = props;
  return {
    show: {
      transition: {
        delayChildren: showDelay,
        staggerChildren: showStagger,
      },
    },
    hidden: {
      transition: {
        delayChildren: hiddenDelay,
        staggerChildren: hiddenStagger,
      },
    },
    leave: {
      transition: {
        delayChildren: leaveDelay,
        staggerChildren: leaveStagger,
      },
    },
  };
};
