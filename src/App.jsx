import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  useLocation,
  Link,
  Navigate,
  Outlet,
} from 'react-router-dom';

import './css/style.css';

import './charts/ChartjsConfig';
import { Component } from 'react';

// Import pages
// demo lan 2
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import Fintech from './pages/Fintech';
import Customers from './pages/ecommerce/Customers';
import Members from './pages/ecommerce/User';
import Orders from './pages/ecommerce/Orders';
import Events from './pages/ecommerce/Event';
import Blogs from './pages/ecommerce/Blogs';
import Invoices from './pages/ecommerce/Invoices';
import Shop from './pages/ecommerce/Shop';
import Shop2 from './pages/ecommerce/Shop2';
import Product from './pages/ecommerce/Product';
import Cart from './pages/ecommerce/Cart';
import Cart2 from './pages/ecommerce/Cart2';
import Cart3 from './pages/ecommerce/Cart3';
import Pay from './pages/ecommerce/Pay';
import Campaigns from './pages/Campaigns';
import UsersTabs from './pages/community/UsersTabs';
import UsersTiles from './pages/community/UsersTiles';
import Profile from './pages/community/Profile';
import Feed from './pages/community/Feed';
import Forum from './pages/community/Forum';
import ForumPost from './pages/community/ForumPost';
import Meetups from './pages/community/Meetups';
import MeetupsPost from './pages/community/MeetupsPost';
import CreditCards from './pages/finance/CreditCards';
import Transactions from './pages/finance/Transactions';
import TransactionDetails from './pages/finance/TransactionDetails';
import JobListing from './pages/job/JobListing';
import JobPost from './pages/job/JobPost';
import CompanyProfile from './pages/job/CompanyProfile';
import Messages from './pages/Messages';
import TasksKanban from './pages/tasks/TasksKanban';
import TasksList from './pages/tasks/TasksList';
import Inbox from './pages/Inbox';
import Calendar from './pages/Calendar';
import Account from './pages/settings/Account';
import Notifications from './pages/settings/Notifications';
import Apps from './pages/settings/Apps';
import Plans from './pages/settings/Plans';
import Billing from './pages/settings/Billing';
import Feedback from './pages/settings/Feedback';
import Changelog from './pages/utility/Changelog';
import Roadmap from './pages/utility/Roadmap';
import Faqs from './pages/utility/Faqs';
import EmptyState from './pages/utility/EmptyState';
import PageNotFound from './pages/utility/PageNotFound';
import KnowledgeBase from './pages/utility/KnowledgeBase';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import ResetPassword from './pages/ResetPassword';
import Onboarding01 from './pages/Onboarding01';
import Onboarding02 from './pages/Onboarding02';
import Onboarding03 from './pages/Onboarding03';
import Onboarding04 from './pages/Onboarding04';
import ButtonPage from './pages/component/ButtonPage';
import FormPage from './pages/component/FormPage';
import DropdownPage from './pages/component/DropdownPage';
import AlertPage from './pages/component/AlertPage';
import ModalPage from './pages/component/ModalPage';
import PaginationPage from './pages/component/PaginationPage';
import TabsPage from './pages/component/TabsPage';
import BreadcrumbPage from './pages/component/BreadcrumbPage';
import BadgePage from './pages/component/BadgePage';
import AvatarPage from './pages/component/AvatarPage';
import TooltipPage from './pages/component/TooltipPage';
import MeetupEdit from './pages/community/MeetupEdit';
import AccordionPage from './pages/component/AccordionPage';
import IconsPage from './pages/component/IconsPage';
import CreateBlog from './partials/community/CreateBlog';
import MeetupCreate from './pages/community/MeetupCreate';
import { authentication } from './pages/hooks/authentication';
import { Role } from './pages/enum/roleEnum';

function App() {

  const location = useLocation();
  const jwt = localStorage.getItem('accessToken')
  const role = localStorage.getItem('role')

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Routes>
        <Route exact path="/" element={<Dashboard />} />
        <Route path="/your-record" element={
          <ProtectedRoute
            redirectPath="*"
            isAllowed={!!authentication.isAuthentication() && (role === Role.manager || role === Role.admin || role === Role.staff || role === Role.member)}
          >
            <Analytics />
          </ProtectedRoute>
        } />
        <Route path="/dashboard/fintech" element={<Fintech />} />
        <Route path="/ecommerce/customers" element={
          <ProtectedRoute
            redirectPath="*"
            isAllowed={!!authentication.isAuthentication() && (role === Role.manager || role === Role.admin)}
          >
            <Customers />
          </ProtectedRoute>
        } />
        <Route path="/ecommerce/members" element={
          <ProtectedRoute
            redirectPath="*"
            isAllowed={!!authentication.isAuthentication() && (role === Role.manager || role === Role.admin)}
          >
            <Members />
          </ProtectedRoute>
        } />
        <Route path="/ecommerce/events" element={
          <ProtectedRoute
            redirectPath="*"
            isAllowed={!!authentication.isAuthentication() && (role === Role.manager || role === Role.admin)}
          >
            <Events />
          </ProtectedRoute>
        } />
        <Route path="/ecommerce/blogs" element={
          <ProtectedRoute
            redirectPath="*"
            isAllowed={!!authentication.isAuthentication() && (role === Role.manager || role === Role.admin)}
          >
            <Blogs />
          </ProtectedRoute>
        } />
        <Route path="/your-event" element={
          <ProtectedRoute
            redirectPath="*"
            isAllowed={role === Role.staff || role === Role.admin || role === Role.manager} 
          >
            <Orders />
          </ProtectedRoute>
        } />
        <Route path="/your-blog" element={
          <ProtectedRoute
            redirectPath="*"
            isAllowed={role === Role.staff || role === Role.admin || role === Role.manager || role === Role.member}
          >
            <Invoices />
          </ProtectedRoute>

        } />
        <Route path="/activity/meetups-create" element={
          <ProtectedRoute
            redirectPath="*"
            isAllowed={role === Role.staff || role === Role.admin || role === Role.manager}
          >
            <MeetupCreate />
          </ProtectedRoute>

        } />
        <Route path="/activity/meetups-edit" element={
          <ProtectedRoute
            redirectPath="*"
            isAllowed={role === Role.staff || role === Role.admin || role === Role.manager}
          >
            <MeetupEdit />
          </ProtectedRoute>

        } />

        <Route path="/activity/create-blog" element={
          <ProtectedRoute
            redirectPath="*"
            isAllowed={!!authentication.isAuthentication() }
          >
            <CreateBlog />
          </ProtectedRoute>
        } />
        <Route path="/ecommerce/shop-2" element={
          <ProtectedRoute
            redirectPath="*"
            isAllowed={!!authentication.isAuthentication() && role === Role.admin}
          >
            <Shop2 />
          </ProtectedRoute>
        } />
        {/* <Route path="/ecommerce/shop" element={<Shop />} />
        
        <Route path="/ecommerce/product" element={<Product />} />
        <Route path="/ecommerce/cart" element={<Cart />} />
        <Route path="/ecommerce/cart-2" element={<Cart2 />} />
        <Route path="/ecommerce/cart-3" element={<Cart3 />} />
        <Route path="/ecommerce/pay" element={<Pay />} /> */}
        <Route path="/campaigns" element={<Campaigns />} />
        <Route path="/job/users-tabs" element={<UsersTabs />} />
        <Route path="/job/users-tiles" element={<UsersTiles />} />
        <Route path="/job/profile" element={<Profile />} />
        <Route path="/activity/feed" element={<Feed />} />
        <Route path="/activity/forum" element={<Forum />} />
        <Route path="/activity/forum-post" element={<ForumPost />} />
        <Route path="/activity/meetups" element={<Meetups />} />
        <Route path="/activity/meetups-post" element={<MeetupsPost />} />
        <Route path="/finance/cards" element={<CreditCards />} />
        <Route path="/finance/transactions" element={<Transactions />} />
        <Route path="/finance/transaction-details" element={<TransactionDetails />} />
        <Route path="/job/job-listing" element={<JobListing />} />
        <Route path="/club" element={<JobPost />} />
        <Route path="/job/company-profile" element={<CompanyProfile />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/tasks/kanban" element={<TasksKanban />} />
        <Route path="/tasks/list" element={<TasksList />} />
        <Route path="/inbox" element={<Inbox />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/settings/account" element={<Account />} />
        <Route path="/settings/notifications" element={<Notifications />} />
        <Route path="/settings/apps" element={<Apps />} />
        <Route path="/settings/plans" element={<Plans />} />
        <Route path="/settings/billing" element={<Billing />} />
        <Route path="/settings/feedback" element={<Feedback />} />
        <Route path="/utility/changelog" element={<Changelog />} />
        <Route path="/utility/roadmap" element={<Roadmap />} />
        <Route path="/utility/faqs" element={<Faqs />} />
        <Route path="/utility/empty-state" element={<EmptyState />} />
        <Route path="/utility/404" element={<PageNotFound />} />
        <Route path="/utility/knowledge-base" element={<KnowledgeBase />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/onboarding-01" element={<Onboarding01 />} />
        <Route path="/onboarding-02" element={<Onboarding02 />} />
        <Route path="/onboarding-03" element={<Onboarding03 />} />
        <Route path="/onboarding-04" element={<Onboarding04 />} />
        <Route path="/component/button" element={<ButtonPage />} />
        <Route path="/component/form" element={<FormPage />} />
        <Route path="/component/dropdown" element={<DropdownPage />} />
        <Route path="/component/alert" element={<AlertPage />} />
        <Route path="/component/modal" element={<ModalPage />} />
        <Route path="/component/pagination" element={<PaginationPage />} />
        <Route path="/component/tabs" element={<TabsPage />} />
        <Route path="/component/breadcrumb" element={<BreadcrumbPage />} />
        <Route path="/component/badge" element={<BadgePage />} />
        <Route path="/component/avatar" element={<AvatarPage />} />
        <Route path="/component/tooltip" element={<TooltipPage />} />
        <Route path="/component/accordion" element={<AccordionPage />} />
        <Route path="/component/icons" element={<IconsPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

const ProtectedRoute = ({
  isAllowed,
  redirectPath = '/',
  children,
}) => {
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};

export default App;
// authentication.isAuthentication() ?