import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Requirement,
  Offer,
  Provider,
  Agreement,
  Order,
  NotificationItem,
  ChatMessage,
  CatalogProduct,
  CustomerRecord,
  initialRequirements,
  initialOffers,
  initialProviders,
  initialAgreements,
  initialOrders,
  initialNotifications,
  initialMessages,
  initialCatalog,
  initialCustomers
} from '../data/mockData';

interface SearchResult {
  type: 'requirement' | 'provider' | 'order' | 'product';
  id: string;
  title: string;
  subtitle: string;
  category?: string;
  link: string;
}

interface MarketplaceContextType {
  role: 'buyer' | 'provider';
  setRole: (role: 'buyer' | 'provider') => void;
  toggleRole: () => void;
  requirements: Requirement[];
  offers: Offer[];
  providers: Provider[];
  agreements: Agreement[];
  orders: Order[];
  notifications: NotificationItem[];
  messages: ChatMessage[];
  catalog: CatalogProduct[];
  customers: CustomerRecord[];
  darkMode: boolean;
  toggleDarkMode: () => void;

  // Actions
  addRequirement: (req: Partial<Requirement>) => Requirement;
  updateRequirement: (id: string, updates: Partial<Requirement>) => void;
  deleteRequirement: (id: string) => void;
  submitOffer: (offerData: Partial<Offer>) => Offer;
  shortlistOffer: (offerId: string) => void;
  selectOfferAndCreateAgreement: (offerId: string) => Agreement | undefined;
  signAgreement: (agreementId: string, asRole: 'buyer' | 'provider') => void;
  updateOrderStatus: (orderId: string, newStepIndex: number, note?: string) => void;
  sendMessage: (text: string, requirementId?: string, offerId?: string, senderRole?: 'buyer' | 'provider') => ChatMessage;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  addProduct: (product: Omit<CatalogProduct, 'id'>) => CatalogProduct;
  deleteProduct: (id: string) => void;
  searchAll: (query: string) => SearchResult[];
}

const MarketplaceContext = createContext<MarketplaceContextType | undefined>(undefined);

const STORAGE_KEYS = {
  REQUIREMENTS: 'n2d_requirements_v2',
  OFFERS: 'n2d_offers_v2',
  AGREEMENTS: 'n2d_agreements_v2',
  ORDERS: 'n2d_orders_v2',
  NOTIFICATIONS: 'n2d_notifications_v2',
  MESSAGES: 'n2d_messages_v2',
  CATALOG: 'n2d_catalog_v2',
  ROLE: 'n2d_role_v2',
  DARK_MODE: 'n2d_dark_v2'
};

export function MarketplaceProvider({ children }: { children: React.ReactNode }) {
  const [role, setRoleState] = useState<'buyer' | 'provider'>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ROLE);
    return (saved === 'provider' ? 'provider' : 'buyer');
  });

  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.DARK_MODE);
    return saved === 'true';
  });

  const [requirements, setRequirements] = useState<Requirement[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.REQUIREMENTS);
      return saved ? JSON.parse(saved) : initialRequirements;
    } catch {
      return initialRequirements;
    }
  });

  const [offers, setOffers] = useState<Offer[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.OFFERS);
      return saved ? JSON.parse(saved) : initialOffers;
    } catch {
      return initialOffers;
    }
  });

  const [providers] = useState<Provider[]>(initialProviders);

  const [agreements, setAgreements] = useState<Agreement[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.AGREEMENTS);
      return saved ? JSON.parse(saved) : initialAgreements;
    } catch {
      return initialAgreements;
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ORDERS);
      return saved ? JSON.parse(saved) : initialOrders;
    } catch {
      return initialOrders;
    }
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
      return saved ? JSON.parse(saved) : initialNotifications;
    } catch {
      return initialNotifications;
    }
  });

  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.MESSAGES);
      return saved ? JSON.parse(saved) : initialMessages;
    } catch {
      return initialMessages;
    }
  });

  const [catalog, setCatalog] = useState<CatalogProduct[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CATALOG);
      return saved ? JSON.parse(saved) : initialCatalog;
    } catch {
      return initialCatalog;
    }
  });

  const [customers] = useState<CustomerRecord[]>(initialCustomers);

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ROLE, role);
  }, [role]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.DARK_MODE, darkMode ? 'true' : 'false');
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.REQUIREMENTS, JSON.stringify(requirements));
  }, [requirements]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.OFFERS, JSON.stringify(offers));
  }, [offers]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.AGREEMENTS, JSON.stringify(agreements));
  }, [agreements]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CATALOG, JSON.stringify(catalog));
  }, [catalog]);

  const setRole = (newRole: 'buyer' | 'provider') => {
    setRoleState(newRole);
  };

  const toggleRole = () => {
    setRoleState(prev => (prev === 'buyer' ? 'provider' : 'buyer'));
  };

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  // Create Requirement
  const addRequirement = (reqData: Partial<Requirement>): Requirement => {
    const newId = `req-${Date.now().toString().slice(-4)}`;
    const newReq: Requirement = {
      id: newId,
      title: reqData.title || 'Untitled Requirement',
      category: reqData.category || 'Apparel',
      quantity: reqData.quantity || 100,
      unit: reqData.unit || 'Units',
      budget: reqData.budget || 50000,
      deadline: reqData.deadline || '2026-10-25',
      location: reqData.location || 'Anna University, Chennai',
      description: reqData.description || '',
      preferences: reqData.preferences || ['Delivery ahead of deadline', 'Verified supplier'],
      status: reqData.status || 'active',
      offersCount: 0,
      postedAt: 'Just now',
      buyerName: 'Aditya Swaminathan',
      buyerOrg: 'College Tech Symposium Lead',
      buyerLocation: 'Chennai, TN',
      lastUpdated: 'Just now',
      matchedProvidersCount: 4
    };

    setRequirements(prev => [newReq, ...prev]);

    // Add matching notification for providers
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      role: 'provider',
      title: 'New Matching Requirement',
      message: `A buyer posted "${newReq.title}" in ${newReq.category}. Matching your services.`,
      type: 'offer',
      read: false,
      timestamp: 'Just now',
      link: '/provider/requirements'
    };
    setNotifications(prev => [newNotif, ...prev]);

    return newReq;
  };

  const updateRequirement = (id: string, updates: Partial<Requirement>) => {
    setRequirements(prev =>
      prev.map(r => (r.id === id ? { ...r, ...updates, lastUpdated: 'Just now' } : r))
    );
  };

  const deleteRequirement = (id: string) => {
    setRequirements(prev => prev.filter(r => r.id !== id));
  };

  // Submit Offer
  const submitOffer = (offerData: Partial<Offer>): Offer => {
    const newId = `off-${Date.now().toString().slice(-4)}`;
    const provider = providers.find(p => p.id === (offerData.providerId || 'p1')) || providers[0];
    const targetReq = requirements.find(r => r.id === offerData.requirementId);

    const price = offerData.price || (targetReq ? Math.round(targetReq.budget * 0.92) : 50000);
    const deliveryDays = offerData.deliveryDays || 5;

    // Calculate match score based on budget & delivery
    let calculatedScore = 90;
    if (targetReq) {
      if (price <= targetReq.budget) calculatedScore += 5;
      else calculatedScore -= 10;
    }

    const newOffer: Offer = {
      id: newId,
      requirementId: offerData.requirementId || 'req-1',
      providerId: provider.id,
      price,
      deliveryDays,
      matchScore: Math.min(99, Math.max(70, calculatedScore)),
      status: 'pending',
      specs: offerData.specs || 'Standard verified specification with manufacturer warranty.',
      warranty: offerData.warranty || 'Replacement guarantee within 7 days of delivery.',
      terms: offerData.terms || 'Advance deposit required before production starts.',
      notes: offerData.notes || 'Looking forward to working with your team.',
      submittedAt: 'Just now',
      riskAssessment: 'Low Risk',
      matchRationale: `Submitted by ${provider.businessName}: ₹${price.toLocaleString()} for delivery in ${deliveryDays} days.`
    };

    setOffers(prev => [newOffer, ...prev]);

    // Update requirements offer count
    if (offerData.requirementId) {
      setRequirements(prev =>
        prev.map(r => (r.id === offerData.requirementId ? { ...r, offersCount: r.offersCount + 1 } : r))
      );
    }

    // Add notification for buyer
    const buyerNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      role: 'buyer',
      title: 'New Offer Received',
      message: `${provider.businessName} submitted an offer of ₹${price.toLocaleString()} for "${targetReq?.title || 'your requirement'}".`,
      type: 'offer',
      read: false,
      timestamp: 'Just now',
      link: `/buyer/requirements/${offerData.requirementId || 'req-1'}`
    };
    setNotifications(prev => [buyerNotif, ...prev]);

    return newOffer;
  };

  const shortlistOffer = (offerId: string) => {
    setOffers(prev =>
      prev.map(o => (o.id === offerId ? { ...o, status: o.status === 'shortlisted' ? 'pending' : 'shortlisted' } : o))
    );
  };

  // Buyer accepts an offer -> creates Mutual Agreement
  const selectOfferAndCreateAgreement = (offerId: string): Agreement | undefined => {
    const selectedOffer = offers.find(o => o.id === offerId);
    if (!selectedOffer) return undefined;

    const req = requirements.find(r => r.id === selectedOffer.requirementId);
    const provider = providers.find(p => p.id === selectedOffer.providerId);

    if (!req || !provider) return undefined;

    // Mark offer as accepted
    setOffers(prev =>
      prev.map(o => (o.id === offerId ? { ...o, status: 'accepted' } : o.requirementId === req.id ? { ...o, status: 'declined' } : o))
    );

    // Update requirement status
    setRequirements(prev =>
      prev.map(r => (r.id === req.id ? { ...r, status: 'agreement_pending' } : r))
    );

    const agreementId = `agr-${Date.now().toString().slice(-4)}`;
    const newAgreement: Agreement = {
      id: agreementId,
      requirementId: req.id,
      offerId: selectedOffer.id,
      buyerId: 'b1',
      buyerName: req.buyerName,
      buyerOrg: req.buyerOrg,
      buyerEmail: 'aditya.techfest@annauniv.edu',
      providerId: provider.id,
      providerName: provider.name,
      providerBusiness: provider.businessName,
      productTitle: req.title,
      quantity: req.quantity,
      unit: req.unit,
      agreedPrice: selectedOffer.price,
      deadline: req.deadline,
      location: req.location,
      terms: [
        `Provider will supply ${req.quantity} ${req.unit} strictly matching approved specifications: ${selectedOffer.specs}`,
        `Total agreed procurement price is fixed at ₹${selectedOffer.price.toLocaleString()} all-inclusive.`,
        `Fulfillment and handover must occur on or before ${req.deadline} at ${req.location}.`,
        `Warranty & Guarantee terms: ${selectedOffer.warranty}`,
        'Any modification requires written digital amendment on the Need2Deal platform.'
      ],
      notes: `Offer accepted by buyer on ${new Date().toLocaleDateString()}. Digital signing required by both parties.`,
      status: 'awaiting_buyer',
      providerSignedAt: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      createdAt: 'Just now'
    };

    setAgreements(prev => [newAgreement, ...prev]);

    // Send notifications to both
    const notifBuyer: NotificationItem = {
      id: `notif-${Date.now()}-b`,
      role: 'buyer',
      title: 'Mutual Agreement Ready to Sign',
      message: `Agreement drafted for "${req.title}" with ${provider.businessName}. Please sign to confirm.`,
      type: 'agreement',
      read: false,
      timestamp: 'Just now',
      link: `/buyer/agreements/${agreementId}`
    };

    const notifProvider: NotificationItem = {
      id: `notif-${Date.now()}-p`,
      role: 'provider',
      title: 'Offer Accepted! Agreement Generated',
      message: `Buyer selected your offer of ₹${selectedOffer.price.toLocaleString()} for "${req.title}".`,
      type: 'agreement',
      read: false,
      timestamp: 'Just now',
      link: `/provider/orders`
    };

    setNotifications(prev => [notifBuyer, notifProvider, ...prev]);

    return newAgreement;
  };

  // Sign Mutual Agreement -> When both signed, creates Order!
  const signAgreement = (agreementId: string, asRole: 'buyer' | 'provider') => {
    setAgreements(prev => {
      return prev.map(agr => {
        if (agr.id !== agreementId) return agr;

        const now = new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        let updated: Agreement = { ...agr };

        if (asRole === 'buyer') {
          updated.buyerSignedAt = now;
        } else {
          updated.providerSignedAt = now;
        }

        // Check if both signed
        if (updated.buyerSignedAt && updated.providerSignedAt) {
          updated.status = 'agreed';

          // Spawn new Order!
          const orderId = `ord-${Date.now().toString().slice(-4)}`;
          const newOrder: Order = {
            id: orderId,
            agreementId: updated.id,
            requirementId: updated.requirementId,
            buyerId: updated.buyerId,
            buyerName: updated.buyerName,
            buyerOrg: updated.buyerOrg,
            providerId: updated.providerId,
            providerName: updated.providerBusiness,
            title: updated.productTitle,
            quantity: updated.quantity,
            unit: updated.unit,
            agreedPrice: updated.agreedPrice,
            deliveryDate: updated.deadline,
            status: 'agreement_confirmed',
            currentStepIndex: 0,
            timeline: [
              { step: 'Agreement Confirmed', date: 'Just now', status: 'completed', note: 'Digitally signed by both Buyer and Provider.' },
              { step: 'Provider Started', date: '-', status: 'pending', note: 'Raw material procurement & prep' },
              { step: 'Processing / Production', date: '-', status: 'pending', note: 'Manufacturing & assembly run' },
              { step: 'Quality Checked & Packed', date: '-', status: 'pending', note: 'Standard quality verification' },
              { step: 'Dispatched', date: '-', status: 'pending', note: 'Carrier handover' },
              { step: 'Out for Delivery', date: '-', status: 'pending', note: 'Final mile transit' },
              { step: 'Delivered & Completed', date: '-', status: 'pending', note: 'Physical handover & verification' }
            ],
            lastUpdate: 'Just now',
            delayRisk: false,
            trackingNumber: `N2D-${orderId.toUpperCase()}`,
            carrier: 'Verified Need2Deal Logistics Partner',
            latestProviderNote: 'Agreement confirmed. Production schedule queued.'
          };

          // Update state
          setOrders(ordersPrev => [newOrder, ...ordersPrev]);
          setRequirements(reqPrev =>
            reqPrev.map(r => (r.id === updated.requirementId ? { ...r, status: 'ordered' } : r))
          );

          // Notifications
          const orderNotif: NotificationItem = {
            id: `notif-${Date.now()}-ord`,
            role: 'both',
            title: 'Agreement Confirmed — Order Created!',
            message: `Order #${orderId} is now live for "${updated.productTitle}". Milestones can now be tracked.`,
            type: 'order',
            read: false,
            timestamp: 'Just now',
            link: asRole === 'buyer' ? `/buyer/orders/${orderId}` : `/provider/orders`
          };
          setNotifications(nPrev => [orderNotif, ...nPrev]);
        }

        return updated;
      });
    });
  };

  // Advance Order Milestone
  const updateOrderStatus = (orderId: string, newStepIndex: number, note?: string) => {
    setOrders(prev =>
      prev.map(ord => {
        if (ord.id !== orderId) return ord;

        const updatedTimeline = ord.timeline.map((step, idx) => {
          if (idx < newStepIndex) {
            return { ...step, status: 'completed' as const, date: step.date === '-' ? 'Today' : step.date };
          } else if (idx === newStepIndex) {
            return {
              ...step,
              status: 'current' as const,
              date: 'In Progress',
              note: note || step.note
            };
          } else {
            return { ...step, status: 'pending' as const };
          }
        });

        const statusMap: Record<number, Order['status']> = {
          0: 'agreement_confirmed',
          1: 'provider_started',
          2: 'processing',
          3: 'ready',
          4: 'dispatched',
          5: 'out_for_delivery',
          6: 'delivered'
        };

        const newStatus = statusMap[newStepIndex] || 'processing';

        return {
          ...ord,
          currentStepIndex: newStepIndex,
          status: newStatus,
          timeline: updatedTimeline,
          lastUpdate: 'Just now',
          latestProviderNote: note || ord.latestProviderNote
        };
      })
    );

    // Notify buyer
    const targetOrder = orders.find(o => o.id === orderId);
    if (targetOrder) {
      const stepName = targetOrder.timeline[newStepIndex]?.step || 'New milestone';
      const notif: NotificationItem = {
        id: `notif-${Date.now()}`,
        role: 'buyer',
        title: 'Order Status Update',
        message: `${targetOrder.providerName} updated Order #${orderId} to: "${stepName}".`,
        type: 'order',
        read: false,
        timestamp: 'Just now',
        link: `/buyer/orders/${orderId}`
      };
      setNotifications(prev => [notif, ...prev]);
    }
  };

  // Chat / Enquiry message
  const sendMessage = (
    text: string,
    requirementId?: string,
    offerId?: string,
    senderRole?: 'buyer' | 'provider'
  ): ChatMessage => {
    const activeRole = senderRole || role;
    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      requirementId: requirementId || 'req-1',
      offerId,
      senderRole: activeRole,
      senderName: activeRole === 'buyer' ? 'Aditya Swaminathan (Buyer)' : 'Chennai PrintWorks (Provider)',
      text,
      timestamp: 'Just now'
    };

    setMessages(prev => [...prev, newMsg]);

    // Simulated contextual reply from other party after brief delay
    setTimeout(() => {
      const replyMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        requirementId: requirementId || 'req-1',
        offerId,
        senderRole: activeRole === 'buyer' ? 'provider' : 'buyer',
        senderName: activeRole === 'buyer' ? 'Chennai PrintWorks (Provider)' : 'Aditya Swaminathan (Buyer)',
        text:
          activeRole === 'buyer'
            ? 'Thank you for your enquiry! We have noted this specification adjustment and will accommodate it seamlessly in the production schedule.'
            : 'Got it! Thank you for the quick clarification. Let us finalize the details.',
        timestamp: 'Just now'
      };
      setMessages(prev => [...prev, replyMsg]);
    }, 1500);

    return newMsg;
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const addProduct = (product: Omit<CatalogProduct, 'id'>): CatalogProduct => {
    const newProduct: CatalogProduct = {
      id: `cat-${Date.now()}`,
      ...product
    };
    setCatalog(prev => [newProduct, ...prev]);
    return newProduct;
  };

  const deleteProduct = (id: string) => {
    setCatalog(prev => prev.filter(p => p.id !== id));
  };

  // Global search across models
  const searchAll = (query: string): SearchResult[] => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    const results: SearchResult[] = [];

    // Search Requirements
    requirements.forEach(r => {
      if (r.title.toLowerCase().includes(q) || r.category.toLowerCase().includes(q) || r.description.toLowerCase().includes(q)) {
        results.push({
          type: 'requirement',
          id: r.id,
          title: r.title,
          subtitle: `${r.category} • Budget ₹${r.budget.toLocaleString()} • ${r.offersCount} offers`,
          category: r.category,
          link: role === 'buyer' ? `/buyer/requirements/${r.id}` : `/provider/requirements`
        });
      }
    });

    // Search Providers
    providers.forEach(p => {
      if (p.name.toLowerCase().includes(q) || p.businessName.toLowerCase().includes(q) || p.categories.some(c => c.toLowerCase().includes(q))) {
        results.push({
          type: 'provider',
          id: p.id,
          title: p.businessName,
          subtitle: `${p.categories.join(', ')} • ${p.reliability}% reliability • ${p.rating}★`,
          category: p.categories[0],
          link: `/buyer/providers`
        });
      }
    });

    // Search Orders
    orders.forEach(o => {
      if (o.title.toLowerCase().includes(q) || o.id.toLowerCase().includes(q) || o.providerName.toLowerCase().includes(q)) {
        results.push({
          type: 'order',
          id: o.id,
          title: `Order #${o.id}: ${o.title}`,
          subtitle: `Status: ${o.status.replace('_', ' ')} • Due ${o.deliveryDate}`,
          link: role === 'buyer' ? `/buyer/orders/${o.id}` : `/provider/orders`
        });
      }
    });

    // Search Catalog
    catalog.forEach(c => {
      if (c.name.toLowerCase().includes(q) || c.category.toLowerCase().includes(q) || c.description.toLowerCase().includes(q)) {
        results.push({
          type: 'product',
          id: c.id,
          title: c.name,
          subtitle: `${c.category} • From ₹${c.startingPrice} • ${c.typicalDelivery}`,
          category: c.category,
          link: `/provider/catalog`
        });
      }
    });

    return results.slice(0, 8);
  };

  return (
    <MarketplaceContext.Provider
      value={{
        role,
        setRole,
        toggleRole,
        requirements,
        offers,
        providers,
        agreements,
        orders,
        notifications,
        messages,
        catalog,
        customers,
        darkMode,
        toggleDarkMode,
        addRequirement,
        updateRequirement,
        deleteRequirement,
        submitOffer,
        shortlistOffer,
        selectOfferAndCreateAgreement,
        signAgreement,
        updateOrderStatus,
        sendMessage,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        addProduct,
        deleteProduct,
        searchAll
      }}
    >
      {children}
    </MarketplaceContext.Provider>
  );
}

export function useMarketplace() {
  const context = useContext(MarketplaceContext);
  if (!context) {
    throw new Error('useMarketplace must be used within a MarketplaceProvider');
  }
  return context;
}
