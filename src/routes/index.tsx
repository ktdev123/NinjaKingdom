import { RouteProps } from "react-router-dom";

import { AuthCallback } from "@/pages/AuthCallback";
import { Complete } from "@/pages/Complete";
import { Login } from "@/pages/Login";
import { Questionnaire } from "@/pages/Questionnaire";
import { Welcome } from "@/pages/Welcome";

export const routes: RouteProps[] = [
  {
    index: true,
    element: <Welcome />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/questionnaire/*",
    element: <Questionnaire />,
  },
  {
    path: "/complete",
    element: <Complete />,
  },
  {
    path: "/auth/:provider/callback",
    element: <AuthCallback />,
  },
];
