import { useEffect } from "react";

import useSoundOriginal from "use-sound";
import { HookOptions, ReturnedValue } from "use-sound/dist/types";

export default function useSound<T = any>(
  src: string | string[],
  options?: HookOptions<T>,
  cleanup: boolean = false,
): ReturnedValue {
  const [play, ctrls] = useSoundOriginal(src, options);

  useEffect(() => {
    if (cleanup && ctrls.sound) {
      return () => {
        ctrls.sound.stop();
      };
    }
  }, [cleanup, ctrls.sound]);

  return [play, ctrls];
}
