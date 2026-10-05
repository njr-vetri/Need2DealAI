export const mockProviders = [
  {
    id: 'p1',
    name: 'Chennai PrintWorks',
    rating: 4.8,
    reliability: 94,
    categories: ['Printing', 'Apparel'],
    typicalDelivery: '3-5 days'
  },
  {
    id: 'p2',
    name: 'Nova Electronics',
    rating: 4.9,
    reliability: 98,
    categories: ['Electronics', 'Manufacturing'],
    typicalDelivery: '7-14 days'
  },
  {
    id: 'p3',
    name: 'CampusFab',
    rating: 4.6,
    reliability: 88,
    categories: ['Custom Products', 'Apparel'],
    typicalDelivery: '5-10 days'
  }
];

export const mockRequirements = [
  {
    id: 'req-1',
    title: '500 custom T-shirts for college event',
    category: 'Apparel',
    quantity: 500,
    budget: 80000,
    deadline: '2026-10-15',
    status: 'active',
    offersCount: 3,
    postedAt: '2026-10-01'
  },
  {
    id: 'req-2',
    title: '20 ESP32 development kits with custom PCB',
    category: 'Electronics',
    quantity: 20,
    budget: 25000,
    deadline: '2026-10-20',
    status: 'draft',
    offersCount: 0,
    postedAt: '2026-10-05'
  }
];

export const mockOffers = [
  {
    id: 'off-1',
    requirementId: 'req-1',
    providerId: 'p1',
    price: 72000,
    deliveryTime: 6,
    matchScore: 96,
    status: 'pending'
  },
  {
    id: 'off-2',
    requirementId: 'req-1',
    providerId: 'p3',
    price: 65000,
    deliveryTime: 10,
    matchScore: 83,
    status: 'pending'
  }
];

export const mockOrders = [
  {
    id: 'ord-1',
    requirementId: 'req-0',
    providerId: 'p2',
    status: 'In Progress',
    agreedPrice: 45000,
    deliveryDate: '2026-10-10',
    title: '1000 printed brochures'
  }
];
