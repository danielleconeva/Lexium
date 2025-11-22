import { createBrowserRouter } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";
import { GuestRoute } from "./GuestRoute";

import HomePage from "../pages/HomePage";
import PublicCasesPage from "../pages/PublicCasesPage";
import PublicCaseDetailsPage from "../pages/PublicCaseDetailsPage";

import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";

import DashboardPage from "../pages/DashboardPage";

import CasesListPage from "../pages/CasesListPage";
import CaseCreatePage from "../pages/CaseCreatePage";
import CaseDetailsPage from "../pages/CaseDetailsPage";
import CaseEditPage from "../pages/CaseEditPage";

import CaseTasksPage from "../pages/CaseTasksPage";
import UpcomingPage from "../pages/UpcomingPage";

import NotFoundPage from "../pages/NotFoundPage";
import RootLayout from "../layouts/RootLayout";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            { index: true, element: <HomePage /> },

            { path: "public-cases", element: <PublicCasesPage /> },
            { path: "public-cases/:id", element: <PublicCaseDetailsPage /> },

            {
                path: "login",
                element: (
                    <GuestRoute>
                        <LoginPage />
                    </GuestRoute>
                ),
            },

            {
                path: "register",
                element: (
                    <GuestRoute>
                        <RegisterPage />
                    </GuestRoute>
                ),
            },

            {
                path: "dashboard",
                element: (
                    <PrivateRoute>
                        <DashboardPage />
                    </PrivateRoute>
                ),
            },

            {
                path: "cases",
                element: (
                    <PrivateRoute>
                        <CasesListPage />
                    </PrivateRoute>
                ),
            },
            {
                path: "cases/create",
                element: (
                    <PrivateRoute>
                        <CaseCreatePage />
                    </PrivateRoute>
                ),
            },
            {
                path: "cases/:id",
                element: (
                    <PrivateRoute>
                        <CaseDetailsPage />
                    </PrivateRoute>
                ),
            },
            {
                path: "cases/:id/edit",
                element: (
                    <PrivateRoute>
                        <CaseEditPage />
                    </PrivateRoute>
                ),
            },

            {
                path: "case/:id/tasks",
                element: (
                    <PrivateRoute>
                        <CaseTasksPage />
                    </PrivateRoute>
                ),
            },

            {
                path: "upcoming",
                element: (
                    <PrivateRoute>
                        <UpcomingPage />
                    </PrivateRoute>
                ),
            },

            { path: "*", element: <NotFoundPage /> },
        ],
    },
]);
