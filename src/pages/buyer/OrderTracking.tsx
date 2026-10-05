import { useParams, useNavigate } from "react-router-dom"
import { Button } from "../../components/ui/Button"
import { mockOrders } from "../../data/mockData"
import { CheckCircle2, Circle, Clock, AlertTriangle } from "lucide-react"

export function OrderTracking() {
  const { id } = useParams();
  const navigate = useNavigate();
  const order = mockOrders[0]; // fallback to mock 1

  const steps = [
    { label: 'Agreement Confirmed', date: 'Oct 8, 2026', status: 'completed' },
    { label: 'Provider Started', date: 'Oct 9, 2026', status: 'completed' },
    { label: 'Preparation / Production', date: 'Oct 10, 2026', status: 'current' },
    { label: 'Ready for Dispatch', date: '-', status: 'pending' },
    { label: 'Out for Delivery', date: '-', status: 'pending' },
    { label: 'Delivered', date: '-', status: 'pending' },
  ];

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-8">
      <div className="flex items-center gap-4 border-b border-gray-200 pb-6">
        <Button variant="ghost" onClick={() => navigate('/buyer/orders')}>← Back</Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Order {id}</h1>
          <p className="text-gray-500 mt-1">{order.title}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 flex flex-col gap-6">
          <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
            <h2 className="text-xl font-bold mb-8">Fulfillment Timeline</h2>
            
            <div className="relative border-l border-gray-200 ml-3 space-y-8 pb-4">
              {steps.map((step, idx) => (
                <div key={idx} className="relative flex items-start gap-6 pl-8">
                  <div className="absolute -left-[11px] top-0 bg-white">
                    {step.status === 'completed' && <CheckCircle2 className="h-6 w-6 text-green-500" fill="white" />}
                    {step.status === 'current' && (
                      <div className="h-6 w-6 rounded-full border-2 border-primary flex items-center justify-center">
                        <div className="h-2 w-2 rounded-full bg-primary"></div>
                      </div>
                    )}
                    {step.status === 'pending' && <Circle className="h-6 w-6 text-gray-300" />}
                  </div>
                  <div>
                    <h4 className={`font-semibold ${step.status === 'pending' ? 'text-gray-400' : 'text-gray-900'}`}>{step.label}</h4>
                    <p className="text-sm text-gray-500 mt-1">{step.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm flex flex-col gap-4">
            <h3 className="font-semibold text-gray-900 border-b pb-2">Order Details</h3>
            <div className="flex flex-col gap-1 text-sm">
              <span className="text-gray-500">Provider</span>
              <span className="font-medium text-gray-900">Nova Electronics</span>
            </div>
            <div className="flex flex-col gap-1 text-sm">
              <span className="text-gray-500">Agreed Price</span>
              <span className="font-medium text-gray-900">₹{order.agreedPrice.toLocaleString()}</span>
            </div>
            <div className="flex flex-col gap-1 text-sm">
              <span className="text-gray-500">Deadline</span>
              <span className="font-medium text-gray-900 flex items-center gap-1"><Clock className="h-4 w-4"/> {order.deliveryDate}</span>
            </div>
          </div>

          <div className="bg-amber-50 rounded-xl border border-amber-200 p-6 flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0" />
            <div>
              <h4 className="font-semibold text-amber-900 text-sm">Deadline approaching</h4>
              <p className="text-xs text-amber-700 mt-1">Delivery is expected in 2 days. The provider has been reminded.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
