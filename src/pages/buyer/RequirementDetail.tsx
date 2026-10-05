import * as React from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Badge } from "../../components/ui/Badge"
import { Button } from "../../components/ui/Button"
import { Card, CardContent } from "../../components/ui/Card"
import { mockRequirements, mockOffers, mockProviders } from "../../data/mockData"
import { CheckCircle2, ShieldAlert, Sparkles, MessageSquare } from "lucide-react"

export function RequirementDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const req = mockRequirements.find(r => r.id === id) || mockRequirements[0];
  const offers = mockOffers.filter(o => o.requirementId === req.id);

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-8">
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <Badge variant="success">Active</Badge>
            <span className="text-sm text-gray-500 font-medium tracking-wide">REQ-0024</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">{req.title}</h1>
          <div className="flex gap-6 text-sm text-gray-600 mt-2">
            <span>Budget: <span className="font-semibold text-gray-900">₹{req.budget.toLocaleString()}</span></span>
            <span>Quantity: <span className="font-semibold text-gray-900">{req.quantity}</span></span>
            <span>Deadline: <span className="font-semibold text-gray-900">{req.deadline}</span></span>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">Edit Draft</Button>
          <Button variant="danger">Close</Button>
        </div>
      </div>

      <div className="mt-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Compare Offers</h2>
          <Badge variant="neutral">{offers.length} Offers Received</Badge>
        </div>

        {offers.length > 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="p-4 font-semibold text-gray-600">Provider</th>
                  <th className="p-4 font-semibold text-gray-600">Price</th>
                  <th className="p-4 font-semibold text-gray-600">Delivery</th>
                  <th className="p-4 font-semibold text-gray-600">AI Match</th>
                  <th className="p-4 font-semibold text-gray-600">Reliability</th>
                  <th className="p-4 text-right font-semibold text-gray-600">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {offers.sort((a,b) => b.matchScore - a.matchScore).map((offer, idx) => {
                  const provider = mockProviders.find(p => p.id === offer.providerId);
                  const isBest = idx === 0;
                  
                  return (
                    <tr key={offer.id} className={`hover:bg-gray-50 transition-colors ${isBest ? 'bg-primary/5' : ''}`}>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          {isBest && <Sparkles className="h-4 w-4 text-primary" />}
                          <span className="font-medium text-gray-900">{provider?.name}</span>
                        </div>
                      </td>
                      <td className="p-4 font-mono font-medium">₹{offer.price.toLocaleString()}</td>
                      <td className="p-4">{offer.deliveryTime} days</td>
                      <td className="p-4">
                        <Badge variant={offer.matchScore >= 90 ? 'success' : 'warning'}>{offer.matchScore}%</Badge>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-1 text-green-600">
                          <CheckCircle2 className="h-4 w-4" /> {provider?.reliability}%
                        </div>
                      </td>
                      <td className="p-4 text-right flex justify-end gap-2">
                        <Button variant="ghost" size="sm" className="gap-2"><MessageSquare className="h-4 w-4"/> Ask</Button>
                        <Button size="sm">Select</Button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            
            <div className="p-6 bg-gray-50 border-t border-gray-200 flex gap-4 items-start">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Why Provider A is recommended</h4>
                <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                  Chennai PrintWorks is the strongest overall match. Their offer is ₹8,000 under your budget, they can deliver 1 day before your deadline, and they have a 94% reliability score for similar apparel orders.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <Card className="border-dashed">
            <CardContent className="p-12 text-center flex flex-col items-center justify-center text-gray-500">
              <ShieldAlert className="h-12 w-12 text-gray-300 mb-4" />
              <p>Waiting for providers to submit offers.</p>
              <p className="text-sm">We've notified 12 matched providers.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
