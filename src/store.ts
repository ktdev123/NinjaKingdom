import create from "zustand";

export type GlobalStore = {
  inviteCode: string | null;
  twitterId: string | null;
  discordId: string | null;
  metamaskId: string | null;
  input: Record<string, any>;
  completed?: boolean;
};

export const useGlobalStore = create<GlobalStore>()(() => {
  return {
    inviteCode: null,
    twitterId: null,
    discordId: null,
    metamaskId: null,
    input: {},
  };
});

export const useInput = (key: string) => {
  return useGlobalStore(
    (state) =>
      [
        state.input[key],
        (value: string) => {
          useGlobalStore.setState((state) => ({
            ...state,
            input: { ...state.input, [key]: value },
          }));
        },
      ] as const,
  );
};
