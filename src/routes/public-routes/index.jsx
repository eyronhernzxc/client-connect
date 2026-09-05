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
const BusinessInformation = Loadable(lazy(() =>import ("../../pages/merchant/forms/e-merchant/business-information.jsx")));
const BusinessQuestion = Loadable(lazy(() =>import ("../../pages/merchant/forms/e-merchant/business-questions.jsx")));
const Declaration = Loadable(lazy(() =>import ("../../pages/merchant/forms/e-merchant/declaration.jsx")));
const Employment = Loadable(lazy(() => import ("../../pages/merchant/forms/e-merchant/employment-information.jsx")));
const RiskAssessment = Loadable(lazy(() =>import ("../../pages/merchant/forms/risk-assessment/risk-assess.jsx")));
const KnowYourCustomer = Loadable(lazy(() =>import ("../../pages/merchant/forms/kyc/kyc.jsx")));
const DeveloperSignatory = Loadable(lazy(() => import ("../../pages/merchant/forms/e-merchant/developer-signatory.jsx")));
const FinancialSignatory = Loadable(lazy(() => import ("../../pages/merchant/forms/e-merchant/finance-signatory.jsx")));

// ERRORS

const NotFound = Loadable(lazy(() => import ("../../pages/errors/notfound.jsx")));
const BadRequest = Loadable(lazy(() => import ("../../pages/errors/badrequest.jsx")));
const Unauthorized = Loadable(lazy(() => import ("../../pages/errors/unauthorized.jsx")));


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
            },

             {
                path: "/merchant/profile",
                element: <Profile />,
            },

            {
                path: "/merchant/forms",
                element: <Forms />,
            },

            {
                path: "/merchant/services",
                element: <Services />,
            },

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
            },

            {
                path: "form/signatory",
                element: <SignatoryDetails />,
            },

             {
                path: "form/finance",
                element: <FinancialSignatory />,
            },

            {
                path: "form/developer",
                element: <DeveloperSignatory />,
            },

            {
                path: "form/financial",
                element: <FinancialInformation />,
            },

            {
                path: "form/employment",
                element: <Employment />,
            },

            {
                path: "form/additional-info",
                element: <AdditionalInformation />,
            },

            {
                path: "form/business-info",
                element: <BusinessInformation />,
            },

            {
                path: "form/business-question",
                element: <BusinessQuestion />,
            },

            {
                path: "form/declaration",
                element: <Declaration />,
            },


            {
                path: "form/risk-assessment",
                element: <RiskAssessment />,
            },

            {
                path: "form/kyc",
                element: <KnowYourCustomer />,
            }
        ]
    },

    
      {
        path: "/400",
        element: <BadRequest />,
      },
      {
        path: "/401",
        element: <Unauthorized />,
      },

       {
        path: "*",
        element: <NotFound />,
      },


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
