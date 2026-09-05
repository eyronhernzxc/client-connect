import { lazy } from "react";
import Loadable from "../../loader/loadable-routes.jsx";
import { createBrowserRouter } from "react-router-dom";

const Dashboard = Loadable(lazy(() => import("../../pages/admin/dashboard/index.jsx")));
const MainLayout = Loadable(lazy(() => import("../../pages/layout/main-layout.jsx")));
const Onboarding = Loadable(lazy(() => import ("../../pages/admin/onboarding/index.jsx")));
const Applications = Loadable(lazy(() => import ("../../pages/admin/applications/index.jsx")));
const Services = Loadable(lazy(() => import ("../../pages/admin/services/index.jsx")));
const ActivityLog = Loadable(lazy(() => import ("../../pages/admin/activity-log/index.jsx")));
const Settings = Loadable(lazy(() => import ("../../pages/admin/settings/index.jsx")));
const Merchants = Loadable(lazy(() => import ("../../pages/admin/merchants/index.jsx")));
const Login = Loadable(lazy(() => import("../../pages/auth/admin/login.jsx")));


const protectedRoutes = ([
    // {
    //     path: "/",
    //     element: <Login />,
    // },
    // {
    //     path: "/register",
    //     element: <Register />,
    // },

        {
            path: "/admin/login",
            element: <Login />,
        },
    {
        element: 
            <MainLayout />,
        children: [
            {
                path: "/dashboard",
                element: <Dashboard />,
            },

            {

                path:"/onboarding",
                element: <Onboarding />,
            },

            {

                path:"/applications",
                element: <Applications/>,
            },

            {
                path:"/merchants",
                element: <Merchants/>,
            },

            {

                path:"/services",
                element:<Services/>,
            },

            {
                path:"/activity-log",
                element:<ActivityLog/>,
            },

            {

                path:"/settings",
                element:<Settings/>,
            },
        ],
    },

    
]);

export default protectedRoutes;
