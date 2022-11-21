import { RouteProps } from "react-router-dom";

import { Complete } from "@/pages/Complete";

import { Page1 } from "../pages/Page1";
import { Page2 } from "../pages/Page2";
import { Page3 } from "../pages/Page3";

export const routes: RouteProps[] = [
  {
    path: "page/1",
    element: <Page1 />,
  },
  {
    path: "page/2",
    element: <Page2 />,
  },
  {
    path: "page/3",
    element: <Page3 />,
  },
  {
    path: "complete",
    element: <Complete />,
  },
];
