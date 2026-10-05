
import { Routes, Route } from 'react-router-dom'
import { PublicLayout } from './components/layout/PublicLayout'
import { DashboardLayout } from './components/layout/DashboardLayout'
import { LandingPage } from './pages/public/LandingPage'
import { Login } from './pages/public/Login'
import { Signup } from './pages/public/Signup'
import { BuyerDashboard } from './pages/buyer/BuyerDashboard'
import { CreateRequirement } from './pages/buyer/CreateRequirement'
import { RequirementDetail } from './pages/buyer/RequirementDetail'
import { OrderTracking } from './pages/buyer/OrderTracking'
import { ProviderDashboard } from './pages/provider/ProviderDashboard'

function App() {
  return (
    <Routes>
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<LandingPage />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
      </Route>

      <Route path="/buyer" element={<DashboardLayout role="buyer" />}>
        <Route index element={<BuyerDashboard />} />
        <Route path="requirements/new" element={<CreateRequirement />} />
        <Route path="requirements/:id" element={<RequirementDetail />} />
        <Route path="orders/:id" element={<OrderTracking />} />
        <Route path="*" element={<div className="p-8"><h1 className="text-2xl font-bold">Coming Soon</h1></div>} />
      </Route>

      <Route path="/provider" element={<DashboardLayout role="provider" />}>
        <Route index element={<ProviderDashboard />} />
        <Route path="*" element={<div className="p-8"><h1 className="text-2xl font-bold">Coming Soon</h1></div>} />
      </Route>
    </Routes>
  )
}

export default App
