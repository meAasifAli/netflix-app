import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./routes/dashboard";
import SignIn from "./routes/sign-in";
import { ThemeProvider } from "./components/general/theme-provider";
import SignUp from "./routes/sign-up";
import Onboarding from "./routes/onboarding";
import NotFound from "./routes/not-found";
import RootLayout from "./layout/root-layout";
import ShowDetails from "./routes/show-details";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/movie/:show_type/:movie_id",
        element: <ShowDetails />,
      },
    ],
  },
  {
    path: "/onboard",
    element: <Onboarding />,
  },
  {
    path: "/sign-in",
    element: <SignIn />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>
);
