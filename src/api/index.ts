import axios from "axios";

import { useGlobalStore } from "@/store";
export const client = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const errorHandler = (e: unknown) => {
  if (axios.isAxiosError(e)) {
    alert(e.response?.data?.msg || "Error occurred");
  }
};

export const apiHelper = {
  checkId: async (
    provider: "twitter" | "discord" | "metamask",
    id: string,
  ): Promise<boolean | null> => {
    const {
      data: { data },
    } = await client.post<{ success: boolean; data: { isUsed: boolean } }>(
      `checkId`,
      {
        provider,
        value: id,
      },
    );
    return data.isUsed;
  },
  checkInviteCode: async (code: string) => {
    const {
      data: { isValid },
    } = await client.post<{ isValid: boolean }>(`checkInviteCode`, {
      code,
    });
    return isValid;
  },
  submit: async () => {
    const data = useGlobalStore.getState();
    const {
      data: { success },
    } = await client.post<{ success: boolean }>(`submit`, {
      ...data,
    });
    return success;
  },
};
