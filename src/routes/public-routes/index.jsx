import { lazy } from "react";
import Loadable from "../../loader/loadable-routes";


const Login = Loadable(lazy(() => import("../../pages/auth/login.jsx")));
const Register = Loadable(lazy(() => import("../../pages/auth/register.jsx")));
const MerchantLayout = Loadable(lazy(() => import("../../pages/layout/merchant-layout.jsx")));
const Home = Loadable(lazy(() => import("../../pages/merchant/home/index.jsx")));

const FormLayout = Loadable(lazy(() => import("../../pages/layout/form-layout.jsx")));

const Profile = Loadable(lazy(() => import("../../pages/merchant/profile/index.jsx")));
const Forms = Loadable(lazy(() => import("../../pages/merchant/forms/index.jsx")));
const Services = Loadable(lazy(() => import("../../pages/merchant/services/index.jsx")));
const Settings = Loadable(lazy(() => import("../../pages/merchant/settings/index.jsx")));

const CompanyRegistration = Loadable(lazy(() => import ("../../pages/merchant/forms/company-details/company-register.jsx")));
const SignatoryDetails = Loadable(lazy(() => import ("../../pages/merchant/forms/e-merchant/signatory-details.jsx")));
const FinancialInformation = Loadable(lazy(() => import ("../../pages/merchant/forms/e-merchant/finacial-information.jsx")));
const AdditionalInformation = Loadable(lazy(() => import ("../../pages/merchant/forms/e-merchant/additional-information.jsx")));

const publicRoutes = ([
    {
        path: "/",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
    },
    {
        element: <MerchantLayout />,
        children: [
            {
                path: "/merchant/home",
                element: <Home />,
            }
        ]
    },



    // {
    //     element: <FormLayout/>,
    //     children: [
    //         {
    //             path: "form/company",
    //             element: <CompanyRegistration />,
    //         }
    //     ]
    // }

    {
        element: <MerchantLayout />,
        children: [
            {
                path: "/merchant/profile",
                element: <Profile />,
            }
        ]
    },
    {
        element: <MerchantLayout />,
        children: [
            {
                path: "/merchant/forms",
                element: <Forms />,
            }
        ]
    },
    {
        element: <MerchantLayout />,
        children: [
            {
                path: "/merchant/services",
                element: <Services />,
            }
        ]
    },
    {
        element: <MerchantLayout />,
        children: [
            {
                path: "/merchant/settings",
                element: <Settings />,
            }
        ]
    },

    {
        element: <FormLayout/>,
        children: [
            {
                path: "form/company",
                element: <CompanyRegistration />,
            }
        ]
    },

    {
        element: <FormLayout/>,
        children: [
            {
                path: "form/signatory",
                element: <SignatoryDetails />,
            }
        ]
    },

        {
        element: <FormLayout/>,
        children: [
            {
                path: "form/financial",
                element: <FinancialInformation />,
            }
        ]
    },

      {
        element: <FormLayout/>,
        children: [
            {
                path: "form/additional-info",
                element: <AdditionalInformation />,
            }
        ]
    }


    // {
    //     element: (
    //         <MainLayout />
    //     ),
    //     children: [
    //         {
    //             path: "/dashboard",
    //             element: <Dashboard />,
    //         },
    //         {
    //             path: "/merchant",
    //             element: <Merchant />,
    //         },
    //     ],
    // },
    //   {
    //     path: "*",
    //     element: <NotFound />,
    //   },
    //   {
    //     path: "/400",
    //     element: <BadRequest />,
    //   },
    //   {
    //     path: "/401",
    //     element: <Unauthorized />,
    //   },
]);

export default publicRoutes;
