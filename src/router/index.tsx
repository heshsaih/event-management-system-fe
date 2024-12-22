import { createBrowserRouter, RouteObject } from "react-router-dom";
import DefaultLayout from "../layouts/DefaultLayout";
import HomePage from "../pages/public/home-page";
import LoginPage from "../pages/public/login-page";
import AuthGuard from "./AuthGuard";
import AdminGuard from "./AdminGuard";
import ManagerGuard from "./ManagerGuard";
import RegisterPage from "../pages/public/register-page";
import ForgotPasswordPage from "../pages/public/forgot-password-page";
import { lazy, Suspense } from "react";
import { CircularProgress } from "@mui/material";
import EventsPage from "../pages/public/events-page";
import EventPage from "../pages/public/event-page";
import MyProfilePage from "../pages/participant/my-profile-page";
import EventsPageManager from "../pages/manager/events-page";
import EventPageManager from "../pages/manager/event-page";
import SpeakersPage from "../pages/manager/speakers-page";
import SpeakerPage from "../pages/manager/speaker-page";
import LocationsPage from "../pages/manager/locations-page";
import LocationPage from "../pages/manager/location-page";
import UsersPage from "../pages/admin/users-page";
import UserPage from "../pages/admin/user-page";
import LogoutPage from "../pages/public/logout-page";
import OtherPage from "../pages/manager/other-page";
import { Colors } from "../constants/styling";
import NotFoundPage from "../pages/public/not-found-page";
const CreateEventPageComp = lazy(
  () => import("../pages/manager/create-event-page/index"),
);
//const EventsPageComp = lazy(() => import("../pages/manager/events-page/index"));
//const EventPageComp = lazy(() => import("../pages/manager/event-page/index"));
//const SpeakersPageComp = lazy(
//  () => import("../pages/manager/speakers-page/index"),
//);
//const SpeakerPageComp = lazy(
//  () => import("../pages/manager/speaker-page/index"),
//);
//const LocationsPageComp = lazy(
//  () => import("../pages/manager/locations-page/index"),
//);
//const LocationPageComp = lazy(
//  () => import("../pages/manager/location-page/index"),
//);
//const OtherPageComp = lazy(() => import("../pages/manager/other-page/index"));

function CreateEventPage() {
  return (
    <Suspense
      fallback={
        <CircularProgress
          size={"3rem"}
          sx={{ color: Colors.RED }}
        ></CircularProgress>
      }
    >
      <CreateEventPageComp></CreateEventPageComp>
    </Suspense>
  );
}

const routes: RouteObject[] = [
  {
    Component: DefaultLayout,
    path: "/",
    children: [
      {
        children: [
          {
            path: "/",
            Component: HomePage,
          },
          {
            path: "/login",
            Component: LoginPage,
          },
          {
            path: "/register",
            Component: RegisterPage,
          },
          {
            path: "/forgot-password",
            Component: ForgotPasswordPage,
          },
          {
            path: "/events",
            Component: EventsPage,
          },
          {
            path: "/events/:id",
            Component: EventPage,
          },
          {
            path: "/logout",
            Component: LogoutPage,
          },
          {
            path: "*",
            Component: NotFoundPage,
          },
        ],
      },
      {
        Component: AuthGuard,
        children: [
          {
            path: "/my-profile",
            Component: MyProfilePage,
          },
        ],
      },
      {
        path: "/manager",
        Component: ManagerGuard,
        children: [
          {
            path: "/manager/events/create",
            Component: CreateEventPage,
          },
          {
            path: "/manager/events",
            Component: EventsPageManager,
          },
          {
            path: "/manager/events/:id",
            Component: EventPageManager,
          },
          {
            path: "/manager/speakers",
            Component: SpeakersPage,
          },
          {
            path: "/manager/speakers/:id",
            Component: SpeakerPage,
          },
          {
            path: "/manager/locations",
            Component: LocationsPage,
          },
          {
            path: "/manager/locations/:id",
            Component: LocationPage,
          },
          {
            path: "/manager/other",
            Component: OtherPage,
          },
        ],
      },
      {
        path: "/admin",
        Component: AdminGuard,
        children: [
          {
            path: "/admin/users",
            Component: UsersPage,
          },
          {
            path: "/admin/users/:id",
            Component: UserPage,
          },
        ],
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
