type opacityVariantsProps = {
  hiddenOpacity?: number;
  showOpacity?: number;
  leaveOpacity?: number;
};

export const opacityVariants = (props: opacityVariantsProps = {}) => {
  const { hiddenOpacity = 0, showOpacity = 1, leaveOpacity = 0 } = props;
  return {
    hidden: { opacity: hiddenOpacity },
    show: { opacity: showOpacity },
    leave: { opacity: leaveOpacity },
  };
};
