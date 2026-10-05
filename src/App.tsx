import { Routes, Route, Navigate } from 'react-router-dom';
import { MarketplaceProvider } from './context/MarketplaceContext';
import { PublicLayout } from './components/layout/PublicLayout';
import { DashboardLayout } from './components/layout/DashboardLayout';

// Public pages
import { LandingPage } from './pages/public/LandingPage';
import { Login } from './pages/public/Login';
import { Signup } from './pages/public/Signup';

// Buyer pages
import { BuyerDashboard } from './pages/buyer/BuyerDashboard';
import { BuyerRequirements } from './pages/buyer/BuyerRequirements';
import { CreateRequirement } from './pages/buyer/CreateRequirement';
import { RequirementDetail } from './pages/buyer/RequirementDetail';
import { AgreementDetail } from './pages/buyer/AgreementDetail';
import { BuyerOffers } from './pages/buyer/BuyerOffers';
import { BuyerOrders } from './pages/buyer/BuyerOrders';
import { OrderTracking } from './pages/buyer/OrderTracking';
import { BuyerProviders } from './pages/buyer/BuyerProviders';
import { BuyerCategories } from './pages/buyer/BuyerCategories';
import { BuyerMessages } from './pages/buyer/BuyerMessages';
import { BuyerNotifications } from './pages/buyer/BuyerNotifications';
import { BuyerRecords } from './pages/buyer/BuyerRecords';
import { BuyerProfile } from './pages/buyer/BuyerProfile';
import { BuyerSettings } from './pages/buyer/BuyerSettings';

// Provider pages
import { ProviderDashboard } from './pages/provider/ProviderDashboard';
import { ProviderRequirements } from './pages/provider/ProviderRequirements';
import { SubmitOffer } from './pages/provider/SubmitOffer';
import { ProviderOffers } from './pages/provider/ProviderOffers';
import { ProviderOrders } from './pages/provider/ProviderOrders';
import { ProviderCatalog } from './pages/provider/ProviderCatalog';
import { ProviderCustomers } from './pages/provider/ProviderCustomers';
import { ProviderMessages } from './pages/provider/ProviderMessages';
import { ProviderNotifications } from './pages/provider/ProviderNotifications';
import { ProviderProfile } from './pages/provider/ProviderProfile';
import { ProviderSettings } from './pages/provider/ProviderSettings';

function App() {
  return (
    <MarketplaceProvider>
      <Routes>
        {/* Public Marketing & Auth */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="categories" element={<BuyerCategories />} />
          <Route path="providers" element={<BuyerProviders />} />
          <Route path="how-it-works" element={<LandingPage />} />
        </Route>

        {/* Buyer Workspace */}
        <Route path="/buyer" element={<DashboardLayout role="buyer" />}>
          <Route index element={<BuyerDashboard />} />
          <Route path="requirements" element={<BuyerRequirements />} />
          <Route path="requirements/new" element={<CreateRequirement />} />
          <Route path="requirements/:id" element={<RequirementDetail />} />
          <Route path="agreements/:id" element={<AgreementDetail />} />
          <Route path="offers" element={<BuyerOffers />} />
          <Route path="orders" element={<BuyerOrders />} />
          <Route path="orders/:id" element={<OrderTracking />} />
          <Route path="providers" element={<BuyerProviders />} />
          <Route path="categories" element={<BuyerCategories />} />
          <Route path="messages" element={<BuyerMessages />} />
          <Route path="notifications" element={<BuyerNotifications />} />
          <Route path="records" element={<BuyerRecords />} />
          <Route path="profile" element={<BuyerProfile />} />
          <Route path="settings" element={<BuyerSettings />} />
          {/* Wildcard redirect to overview instead of dead placeholder */}
          <Route path="*" element={<Navigate to="/buyer" replace />} />
        </Route>

        {/* Provider Workspace */}
        <Route path="/provider" element={<DashboardLayout role="provider" />}>
          <Route index element={<ProviderDashboard />} />
          <Route path="requirements" element={<ProviderRequirements />} />
          <Route path="requirements/:id/offer" element={<SubmitOffer />} />
          <Route path="offers" element={<ProviderOffers />} />
          <Route path="orders" element={<ProviderOrders />} />
          <Route path="orders/:id" element={<OrderTracking />} />
          <Route path="catalog" element={<ProviderCatalog />} />
          <Route path="products" element={<ProviderCatalog />} />
          <Route path="customers" element={<ProviderCustomers />} />
          <Route path="messages" element={<ProviderMessages />} />
          <Route path="notifications" element={<ProviderNotifications />} />
          <Route path="profile" element={<ProviderProfile />} />
          <Route path="settings" element={<ProviderSettings />} />
          {/* Wildcard redirect to overview instead of dead placeholder */}
          <Route path="*" element={<Navigate to="/provider" replace />} />
        </Route>

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </MarketplaceProvider>
  );
}

export default App;
