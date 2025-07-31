import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import NotFound from "../pages/Shared/NotFound";
import Home from "../pages/Home/Home";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import AllScholarships from "../pages/Scholarships/AllScholarships";
import ScholarshipDetails from "../pages/Scholarships/ScholarshipDetails";
import PrivateRoute from "./PrivateRoute";
import ApplyScholarship from "../pages/Scholarships/ApplyScholarship";
import PaymentPage from "../pages/Shared/PaymentPage";
import DashboardLayout from "../layouts/DashboardLayout";
import ModeratorRoute from "./ModeratorRoute";
import AdminRoute from "./AdminRoute";
import UserProfile from "../pages/Dashboard/user/UserProfile";
import UserApplications from "../pages/Dashboard/user/UserApplications";
import UserReviews from "../pages/Dashboard/user/UserReviews";
import ModeratorProfile from "../pages/Dashboard/moderator/ModeratorProfile";
import ManageScholarships from "../pages/Dashboard/moderator/ManageScholarships";
import AllReviews from "../pages/Dashboard/moderator/AllReviews";
import ManageApplications from "../pages/Dashboard/moderator/ManageApplications";
import AddScholarship from "../pages/Dashboard/moderator/AddScholarship";
import AdminProfile from "../pages/Dashboard/admin/AdminProfile";
import AdminAddScholarship from "../pages/Dashboard/admin/AdminAddScholarship";
import AdminManageScholarships from "../pages/Dashboard/admin/AdminManageScholarships";
import AdminManageApplications from "../pages/Dashboard/admin/AdminManageApplications";
import ManageUsers from "../pages/Dashboard/admin/ManageUsers";
import ManageReviews from "../pages/Dashboard/admin/ManageReviews";
import User from "../pages/Dashboard/User";
import Moderator from "../pages/Dashboard/Moderator";
import Admin from "../pages/Dashboard/Admin";
import ApplyScholarshipForm from "../pages/Scholarships/ApplyScholarshipForm";


export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        errorElement: <NotFound />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: 'login',
                element: <Login />,
            },
            {
                path: 'register',
                element: <Register />,
            },
            {
                path: 'scholarships',
                element: <AllScholarships />,
            },
            {
                path: 'scholarships/:id',
                element: <PrivateRoute><ScholarshipDetails /></PrivateRoute>,
            },
            {
                path: 'apply/:id',
                element: <PrivateRoute><ApplyScholarship /></PrivateRoute>,
            },
            {
                path: 'payment',
                element: <PrivateRoute><PaymentPage /></PrivateRoute>,
            },
            {
                path: 'application-form/:id',
                element: <PrivateRoute><ApplyScholarshipForm /></PrivateRoute>,
            }
        ],
    },
    {
        path: '/dashboard',
        element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
        errorElement: <NotFound />,
        children: [
            // User Dashboard
            {
                path: 'user',
                element: <PrivateRoute><User /></PrivateRoute>,
            },
            {
                path: 'user/profile',
                element: <PrivateRoute><UserProfile /></PrivateRoute>,
            },
            {
                path: 'user/applications',
                element: <PrivateRoute><UserApplications /></PrivateRoute>,
            },
            {
                path: 'user/reviews',
                element: <PrivateRoute><UserReviews /></PrivateRoute>,
            },
            // Moderator Dashboard
            {
                path: 'moderator',
                element: <ModeratorRoute><Moderator /></ModeratorRoute>, // Reusing User component for Moderator
            },
            {
                path: 'moderator/profile',
                element: <ModeratorRoute><ModeratorProfile /></ModeratorRoute>,
            },
            {
                path: 'moderator/manage-scholarships',
                element: <ModeratorRoute><ManageScholarships /></ModeratorRoute>,
            },
            {
                path: 'moderator/all-reviews',
                element: <ModeratorRoute><AllReviews /></ModeratorRoute>,
            },
            {
                path: 'moderator/all-applications',
                element: <ModeratorRoute><ManageApplications /></ModeratorRoute>,
            },
            {
                path: 'moderator/add-scholarship',
                element: <ModeratorRoute><AddScholarship /></ModeratorRoute>,
            },
            // Admin Dashboard
            {
                path: 'admin',
                element: <AdminRoute><Admin /></AdminRoute>, // Reusing User component for Admin
            },
            {
                path: 'admin/profile',
                element: <AdminRoute><AdminProfile /></AdminRoute>,
            },
            {
                path: 'admin/add-scholarship',
                element: <AdminRoute><AdminAddScholarship /></AdminRoute>,
            },
            {
                path: 'admin/manage-scholarships',
                element: <AdminRoute><AdminManageScholarships /></AdminRoute>,
            },
            {
                path: 'admin/manage-applications',
                element: <AdminRoute><AdminManageApplications /></AdminRoute>,
            },
            {
                path: 'admin/manage-users',
                element: <AdminRoute><ManageUsers /></AdminRoute>,
            },
            {
                path: 'admin/manage-reviews',
                element: <AdminRoute><ManageReviews /></AdminRoute>,
            }
        ],
    },
]);
