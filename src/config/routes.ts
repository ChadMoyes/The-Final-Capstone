import LandingPage from "../pages/Landing";
import Dashboard from "../pages/Dashboard";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";


// The routes of the application
interface RouteType {
    path: string,
    component: () => JSX.Element,
    name: string,
    protected: boolean
}

const routes: RouteType[] = [
    {
      path: "",
      component : LandingPage,
      name: "Landing Page",
      protected: false 
    },
    // If someone is signed in, the dashboard is protected, you can only visit if signed in
    {
      path: "/dashboard",
      component: Dashboard,
      name: "Dashboard",
      protected: true
    },
    {
      path: "/signIn",
      component: SignIn,
      name: "SignIn",
      protected: false
    },
    {
        path: "/signUp",
        component: SignUp,
        name: "SignUp",
        protected: false
      },
  ];

export default routes 
  