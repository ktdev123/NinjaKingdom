import { useEffect } from "react";

import { useLocation, useParams } from "react-router-dom";

export const AuthCallback = () => {
  const { search } = useLocation();
  const { provider } = useParams();
  const id = new URLSearchParams(search).get("id");
  useEffect(() => {
    if (id && provider && ["twitter", "discord"].includes(provider)) {
      localStorage.setItem(
        `${provider}Login`,
        JSON.stringify({ success: true, id }),
      );
    } else {
      localStorage.setItem(
        `${provider}Login`,
        JSON.stringify({ success: false, id: null }),
      );
    }
  }, [id, provider]);
  return null;
};
