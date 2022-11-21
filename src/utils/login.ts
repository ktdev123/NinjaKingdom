import { apiHelper, errorHandler } from "@/api";
import { useGlobalStore } from "@/store";

export const login = async (
  provider: "twitter" | "discord",
): Promise<{ isUsed?: boolean; id?: string; error?: any }> => {
  if (process.env.REACT_APP_DEV_MODE === "true") {
    useGlobalStore.setState({ [`${provider}Id`]: provider });
    return { isUsed: false, id: provider };
  }
  return new Promise((res) => {
    const win = window.open(
      `${process.env.REACT_APP_BACKEND_HOST}/auth/${provider}`,
    );
    const timer = setInterval(async function () {
      const data = localStorage.getItem(`${provider}Login`);
      if (data) {
        clearInterval(timer);
        const { success, id } = JSON.parse(data ?? "{}");
        if (success && id) {
          try {
            const used = await apiHelper.checkId(provider, id);
            if (!used) {
              res({ isUsed: false, id });
              // useGlobalStore.setState({ [`${provider}Id`]: id });
            } else {
              res({ isUsed: true, id });
              // alert("Account already used");
            }
          } catch (e) {
            res({ error: e });
            errorHandler(e);
          }
          win?.close();
        } else {
          // TODO: handle error
        }
        localStorage.removeItem(`${provider}Login`);
      }
    }, 1000);
  });
};
