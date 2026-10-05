import { useNavigate } from "react-router-dom"
import { Button } from "../../components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card"
import { Badge } from "../../components/ui/Badge"
import { mockRequirements, mockOffers, mockOrders } from "../../data/mockData"
import { Clock, Plus } from "lucide-react"

export function BuyerDashboard() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Buyer Dashboard</h1>
          <p className="text-gray-500 mt-1">Here's what needs your attention today.</p>
        </div>
        <Button onClick={() => navigate('/buyer/requirements/new')} className="gap-2">
          <Plus className="h-4 w-4" /> Post Requirement
        </Button>
      </div>

      <div className="grid gap-8 md:grid-cols-3 border-y border-gray-200 py-8">
        <div className="flex flex-col gap-2 border-l-2 border-primary/20 pl-4">
          <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">Active Requirements</span>
          <div className="text-4xl font-bold text-gray-900 tracking-tight">
            {mockRequirements.filter(r => r.status === 'active').length}
          </div>
        </div>
        <div className="flex flex-col gap-2 border-l-2 border-primary/20 pl-4">
          <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">Offers to Review</span>
          <div className="text-4xl font-bold text-primary tracking-tight">
            {mockOffers.length}
          </div>
        </div>
        <div className="flex flex-col gap-2 border-l-2 border-primary/20 pl-4">
          <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">Active Orders</span>
          <div className="text-4xl font-bold text-gray-900 tracking-tight">
            {mockOrders.length}
          </div>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Recent Requirements</h2>
            <Button variant="ghost" size="sm" onClick={() => navigate('/buyer/requirements')}>View all</Button>
          </div>
          <div className="flex flex-col gap-3">
            {mockRequirements.map(req => (
              <Card key={req.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate(`/buyer/requirements/${req.id}`)}>
                <CardContent className="p-5 flex items-center justify-between">
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold text-gray-900">{req.title}</span>
                    <div className="flex items-center gap-3 text-sm text-gray-500">
                      <Badge variant={req.status === 'active' ? 'success' : 'neutral'}>{req.status}</Badge>
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3"/> Due: {req.deadline}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-lg font-bold text-primary">{req.offersCount}</span>
                    <span className="text-xs text-gray-500 uppercase tracking-wider">Offers</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Active Orders</h2>
            <Button variant="ghost" size="sm" onClick={() => navigate('/buyer/orders')}>View all</Button>
          </div>
          <div className="flex flex-col gap-3">
            {mockOrders.map(order => (
              <Card key={order.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate(`/buyer/orders/${order.id}`)}>
                <CardContent className="p-5 flex flex-col gap-3">
                  <div className="flex justify-between items-start">
                    <span className="font-semibold text-gray-900">{order.title}</span>
                    <Badge variant="warning">{order.status}</Badge>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: '40%' }}></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Provider: <span className="font-medium text-gray-900">Nova Electronics</span></span>
                    <span>Expected: {order.deliveryDate}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
