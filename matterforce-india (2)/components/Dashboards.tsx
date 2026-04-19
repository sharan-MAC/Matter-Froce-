import React, { useState, useEffect } from 'react';
import { UserProfile, Order } from '../types';
import { User, Settings, MapPin, LogOut, Package, Clock, ChevronRight, Truck, XCircle, Building, Users, FileText, Wrench, CheckCircle, Eye, Play, CheckSquare, Printer, Zap, Ruler, Timer, Square, Cpu, Layers, Box, BookOpen, GraduationCap, Award, Activity } from 'lucide-react';

interface DashboardProps {
  user: UserProfile;
  onLogout: () => void;
}

// --- STUDENT DASHBOARD ---
export const StudentDashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [cancelOrderId, setCancelOrderId] = useState<string | null>(null);

  useEffect(() => {
    try {
        const history = JSON.parse(localStorage.getItem('mf_orders_history') || '[]');
        if (Array.isArray(history)) {
            setOrders(history);
        } else {
             const legacyOrder = JSON.parse(localStorage.getItem('mf_order_data') || 'null');
             if (legacyOrder) {
                 setOrders([legacyOrder]);
             }
        }
    } catch (e) {
        setOrders([]);
    }
  }, []);

  const handleCancelOrder = () => {
    if (!cancelOrderId) return;

    const updatedOrders = orders.map(order => {
        if (order.id === cancelOrderId) {
            return { ...order, status: 'Cancelled' as const };
        }
        return order;
    });

    setOrders(updatedOrders);
    localStorage.setItem('mf_orders_history', JSON.stringify(updatedOrders));
    
    try {
        const currentOrder = JSON.parse(localStorage.getItem('mf_order_data') || 'null');
        if (currentOrder && currentOrder.id === cancelOrderId) {
            currentOrder.status = 'Cancelled';
            localStorage.setItem('mf_order_data', JSON.stringify(currentOrder));
        }
    } catch (e) {}
    
    setCancelOrderId(null);
  };

  const getStatusColor = (status: string) => {
      switch(status) {
          case 'Cancelled': return 'bg-red-900/30 text-red-400 border-red-900/50';
          case 'Delivered': return 'bg-green-900/30 text-green-400 border-green-900/50';
          case 'Shipped': return 'bg-matter-orange/10 text-matter-orange border-matter-orange/30';
          case 'Processing': return 'bg-slate-800 text-slate-300 border-slate-600';
          default: return 'bg-blue-900/30 text-blue-400 border-blue-900/50';
      }
  };

  const getProgressStep = (status: string) => {
      switch(status) {
          case 'Processing': return 1;
          case 'Accepted': return 2;
          case 'In Progress': return 3;
          case 'Ready for Delivery': return 4;
          case 'Shipped': return 5;
          case 'Delivered': return 6;
          case 'Cancelled': return -1;
          default: return 0;
      }
  };

  const renderOrderTracker = (status: string) => {
      const step = getProgressStep(status);
      if (step === -1) {
          return (
              <div className="flex items-center gap-2 text-red-500 bg-red-950/30 p-3 rounded border border-red-900/50">
                  <XCircle className="w-5 h-5" />
                  <span className="text-sm font-bold uppercase tracking-wider">Order Cancelled</span>
              </div>
          );
      }

      const steps = [
          { label: 'Processing', icon: Clock },
          { label: 'Accepted', icon: CheckCircle },
          { label: 'Building', icon: Wrench },
          { label: 'Ready', icon: Package },
          { label: 'Shipped', icon: Truck },
          { label: 'Delivered', icon: MapPin }
      ];

      return (
          <div className="relative pt-8 pb-4">
              <div className="absolute top-10 left-0 w-full h-1 bg-slate-800 rounded-full"></div>
              <div 
                  className="absolute top-10 left-0 h-1 bg-matter-orange rounded-full transition-all duration-500" 
                  style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
              ></div>
              
              <div className="relative flex justify-between">
                  {steps.map((s, i) => {
                      const isCompleted = step >= i + 1;
                      const isCurrent = step === i + 1;
                      const Icon = s.icon;
                      return (
                          <div key={i} className="flex flex-col items-center gap-2 relative z-10">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors ${isCompleted ? 'bg-matter-orange border-matter-orange text-black shadow-[0_0_10px_rgba(249,115,22,0.5)]' : 'bg-slate-900 border-slate-700 text-slate-500'}`}>
                                  <Icon className="w-4 h-4" />
                              </div>
                              <span className={`text-[10px] font-bold uppercase tracking-widest absolute -bottom-6 whitespace-nowrap ${isCurrent ? 'text-matter-orange' : isCompleted ? 'text-slate-300' : 'text-slate-600'}`}>
                                  {s.label}
                              </span>
                          </div>
                      );
                  })}
              </div>
          </div>
      );
  };

  return (
    <div className="min-h-screen bg-matter-dark flex justify-center text-white pb-20 font-sans pt-12 px-4">
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Profile Card */}
        <div className="md:col-span-4 lg:col-span-4">
            <div className="bg-matter-surface border border-matter-border p-8 text-center relative overflow-hidden rounded-lg shadow-2xl sticky top-24">
            <div className="absolute top-0 left-0 w-full h-1 bg-matter-orange"></div>
            
            <div className="h-24 w-24 mx-auto bg-black rounded-full flex items-center justify-center mb-6 border-2 border-matter-orange shadow-[0_0_15px_rgba(249,115,22,0.3)]">
                <User className="h-10 w-10 text-matter-orange" />
            </div>
            <h2 className="text-2xl font-bold font-mono uppercase tracking-tight">{user.name}</h2>
            <p className="text-slate-500 mt-2 text-sm font-mono">{user.email}</p>
            <p className="text-matter-orange mt-1 text-xs font-bold uppercase tracking-widest border border-matter-orange/30 inline-block px-2 py-1 rounded bg-matter-orange/10">Student / Maker</p>
            
            <div className="mt-8 space-y-4 text-left">
                <div className="p-4 bg-black border border-matter-border flex items-start gap-4 rounded-sm">
                    <MapPin className="w-5 h-5 text-matter-orange shrink-0 mt-0.5" />
                    <div>
                        <h4 className="text-sm font-bold text-white uppercase tracking-wide">Workshop Base</h4>
                        {user.workshopAddress && user.workshopAddress.city ? (
                            <p className="text-xs text-slate-400 mt-1 font-mono">
                            {user.workshopAddress.houseNo}, {user.workshopAddress.street}<br/>
                            {user.workshopAddress.city}, {user.workshopAddress.state} {user.workshopAddress.pincode}
                            </p>
                        ) : (
                            <p className="text-xs text-slate-500 mt-1 italic">No address configured. Set during next checkout.</p>
                        )}
                    </div>
                </div>
            </div>

            <button 
                onClick={onLogout}
                className="mt-8 w-full py-3 border border-red-900/50 text-red-500 hover:bg-red-900/20 hover:text-red-400 transition-colors flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-wider rounded-sm"
            >
                <LogOut className="w-4 h-4" />
                Disconnect
            </button>
            </div>
        </div>

        {/* Main Content Area */}
        <div className="md:col-span-8 lg:col-span-8 space-y-8">
            
            {/* Learning Hub Section */}
            <div className="bg-matter-surface border border-matter-border rounded-lg p-6">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-white font-mono uppercase tracking-tight flex items-center gap-3">
                        <GraduationCap className="w-6 h-6 text-matter-orange" />
                        Learning Hub
                    </h3>
                    <button className="text-xs font-bold text-matter-orange uppercase tracking-wider hover:text-orange-400 flex items-center gap-1">
                        View All <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-black border border-matter-border rounded p-4 group hover:border-matter-orange/50 transition-colors cursor-pointer">
                        <div className="flex justify-between items-start mb-3">
                            <div className="p-2 bg-matter-orange/10 rounded text-matter-orange">
                                <Cpu className="w-5 h-5" />
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-widest bg-green-900/30 text-green-400 px-2 py-1 rounded border border-green-900/50">Beginner</span>
                        </div>
                        <h4 className="font-bold text-white mb-1 group-hover:text-matter-orange transition-colors">Intro to Microcontrollers</h4>
                        <p className="text-xs text-slate-400 mb-4">Learn the basics of Arduino and GPIO pins.</p>
                        <div className="w-full bg-slate-800 rounded-full h-1.5 mb-2">
                            <div className="bg-matter-orange h-1.5 rounded-full" style={{ width: '45%' }}></div>
                        </div>
                        <p className="text-[10px] text-slate-500 font-mono text-right">45% COMPLETED</p>
                    </div>

                    <div className="bg-black border border-matter-border rounded p-4 group hover:border-matter-orange/50 transition-colors cursor-pointer">
                        <div className="flex justify-between items-start mb-3">
                            <div className="p-2 bg-blue-900/30 rounded text-blue-400">
                                <Zap className="w-5 h-5" />
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-widest bg-yellow-900/30 text-yellow-400 px-2 py-1 rounded border border-yellow-900/50">Intermediate</span>
                        </div>
                        <h4 className="font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">IoT Sensor Networks</h4>
                        <p className="text-xs text-slate-400 mb-4">Connect multiple sensors via I2C and SPI.</p>
                        <div className="w-full bg-slate-800 rounded-full h-1.5 mb-2">
                            <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '0%' }}></div>
                        </div>
                        <p className="text-[10px] text-slate-500 font-mono text-right">NOT STARTED</p>
                    </div>
                </div>
            </div>

            {/* Order History */}
            <div>
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-white font-mono uppercase tracking-tight flex items-center gap-3">
                        <Package className="w-6 h-6 text-matter-orange" />
                        Active Projects & Orders
                    </h3>
                </div>

            {orders.length === 0 ? (
                <div className="bg-matter-surface border border-matter-border p-12 text-center rounded-lg">
                    <Clock className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                    <h4 className="text-lg font-bold text-white mb-2">No active orders</h4>
                    <p className="text-slate-500 text-sm">Your foundry is currently empty. Head to the AI Lab or Bazaar to start building.</p>
                </div>
            ) : (
                <div className="space-y-6">
                    {orders.slice().reverse().map((order) => (
                        <div key={order.id} className="bg-matter-surface border border-matter-border rounded-lg overflow-hidden">
                            <div className="bg-black/50 p-4 border-b border-matter-border flex flex-wrap items-center justify-between gap-4">
                                <div>
                                    <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Order ID</p>
                                    <p className="text-sm font-mono text-white">{order.id}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Date</p>
                                    <p className="text-sm font-mono text-white">{order.date}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Total</p>
                                    <p className="text-sm font-mono text-white font-bold">₹{order.total.toLocaleString('en-IN')}</p>
                                </div>
                                <div>
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${getStatusColor(order.status)}`}>
                                        {order.status}
                                    </span>
                                </div>
                            </div>
                            
                            <div className="p-6">
                                {/* Order Tracker */}
                                <div className="mb-10">
                                    {renderOrderTracker(order.status)}
                                </div>

                                <div className="space-y-4">
                                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest border-b border-matter-border pb-2 mb-4">Gadgets & Components</h4>
                                    {order.items.map((item, idx) => (
                                        <div key={idx} className="flex flex-col sm:flex-row gap-4 bg-black/30 p-4 rounded-lg border border-white/5 hover:border-matter-orange/30 transition-colors">
                                            <div className="w-24 h-24 bg-black border border-matter-border rounded-lg overflow-hidden shrink-0 relative group">
                                                {item.image ? (
                                                    <>
                                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover mix-blend-luminosity group-hover:mix-blend-normal transition-all" />
                                                        <div className="absolute inset-0 bg-matter-orange/10 group-hover:bg-transparent transition-colors"></div>
                                                    </>
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-slate-700">
                                                        <Cpu className="w-8 h-8" />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0 flex flex-col justify-between">
                                                <div>
                                                    <div className="flex justify-between items-start mb-1">
                                                        <h5 className="text-lg font-bold text-white truncate">{item.name}</h5>
                                                        <div className="text-right shrink-0 ml-4">
                                                            <p className="text-sm font-mono text-white font-bold">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                                                            <p className="text-[10px] text-slate-500 font-mono">QTY: {item.quantity}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-wrap gap-2 mb-2">
                                                        <span className="text-[10px] font-bold uppercase tracking-widest bg-matter-orange/10 text-matter-orange px-2 py-0.5 rounded border border-matter-orange/30">
                                                            {item.type.replace('_', ' ')}
                                                        </span>
                                                        {item.tier && (
                                                            <span className="text-[10px] font-bold uppercase tracking-widest bg-blue-900/30 text-blue-400 px-2 py-0.5 rounded border border-blue-900/50">
                                                                {item.tier.replace(/_/g, ' ')}
                                                            </span>
                                                        )}
                                                    </div>
                                                    {item.details && <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">{item.details}</p>}
                                                </div>
                                                
                                                {item.assemblyGuide && item.assemblyGuide.length > 0 && (
                                                    <div className="mt-3 flex items-center gap-2 text-xs text-matter-orange font-mono">
                                                        <BookOpen className="w-4 h-4" /> Includes Adaptive Build Guide ({item.assemblyGuide.length} steps)
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                
                                {order.status === 'Processing' && (
                                    <div className="mt-6 pt-4 border-t border-matter-border flex justify-end">
                                        <button 
                                            onClick={() => setCancelOrderId(order.id)}
                                            className="text-xs font-bold uppercase tracking-wider text-red-500 hover:text-red-400 flex items-center gap-1 transition-colors bg-red-500/10 px-4 py-2 rounded border border-red-500/20 hover:bg-red-500/20"
                                        >
                                            <XCircle className="w-4 h-4" />
                                            Cancel Request
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
            </div>
        </div>
      </div>

      {/* Cancel Confirmation Modal */}
      {cancelOrderId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
              <div className="bg-matter-surface border border-matter-border max-w-md w-full rounded-lg shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                  <div className="p-6">
                      <div className="w-12 h-12 rounded-full bg-red-900/30 flex items-center justify-center mb-4 border border-red-900/50">
                          <XCircle className="w-6 h-6 text-red-500" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">Cancel Order?</h3>
                      <p className="text-slate-400 text-sm mb-6">
                          Are you sure you want to cancel order <span className="font-mono text-white">{cancelOrderId}</span>? This action cannot be undone.
                      </p>
                      <div className="flex gap-3">
                          <button 
                              onClick={() => setCancelOrderId(null)}
                              className="flex-1 bg-transparent border border-matter-border text-white py-3 rounded text-sm font-bold uppercase tracking-wider hover:bg-white/5 transition-colors"
                          >
                              Keep Order
                          </button>
                          <button 
                              onClick={handleCancelOrder}
                              className="flex-1 bg-red-600 text-white py-3 rounded text-sm font-bold uppercase tracking-wider hover:bg-red-700 transition-colors"
                          >
                              Yes, Cancel
                          </button>
                      </div>
                  </div>
              </div>
          </div>
      )}
    </div>
  );
};

// --- INSTITUTION DASHBOARD ---
export const InstitutionDashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  return (
    <div className="min-h-screen bg-matter-dark flex justify-center text-white pb-20 font-sans pt-12 px-4">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Profile Card */}
        <div className="md:col-span-3 lg:col-span-3">
            <div className="bg-matter-surface border border-matter-border p-6 text-center relative overflow-hidden rounded-lg shadow-2xl sticky top-24">
            <div className="absolute top-0 left-0 w-full h-1 bg-blue-500"></div>
            
            <div className="h-20 w-20 mx-auto bg-black rounded-full flex items-center justify-center mb-4 border-2 border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                <Building className="h-8 w-8 text-blue-500" />
            </div>
            <h2 className="text-xl font-bold font-mono uppercase tracking-tight">{user.name}</h2>
            <p className="text-slate-500 mt-1 text-xs font-mono">{user.email}</p>
            <p className="text-blue-400 mt-2 text-[10px] font-bold uppercase tracking-widest border border-blue-500/30 inline-block px-2 py-1 rounded bg-blue-500/10">Institution</p>
            
            <button 
                onClick={onLogout}
                className="mt-6 w-full py-2 border border-red-900/50 text-red-500 hover:bg-red-900/20 hover:text-red-400 transition-colors flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider rounded-sm"
            >
                <LogOut className="w-3 h-3" />
                Disconnect
            </button>
            </div>
        </div>

        {/* Bulk Ordering Interface */}
        <div className="md:col-span-9 lg:col-span-9 space-y-6">
            <div className="bg-matter-surface border border-matter-border rounded-lg p-6">
                <h3 className="text-xl font-bold text-white font-mono uppercase tracking-tight flex items-center gap-3 mb-4">
                    <Users className="w-5 h-5 text-blue-500" />
                    Bulk Procurement Portal
                </h3>
                <p className="text-slate-400 text-sm mb-6">
                    Welcome to the institutional portal. Here you can request quotes for bulk materials, manage purchase orders, and track shipments for your labs.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div className="bg-black border border-matter-border p-4 rounded-lg">
                        <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Active Quotes</p>
                        <p className="text-2xl font-mono text-white">2</p>
                    </div>
                    <div className="bg-black border border-matter-border p-4 rounded-lg">
                        <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Pending Deliveries</p>
                        <p className="text-2xl font-mono text-white">1</p>
                    </div>
                    <div className="bg-black border border-matter-border p-4 rounded-lg">
                        <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Total Spent (YTD)</p>
                        <p className="text-2xl font-mono text-white">₹1.4M</p>
                    </div>
                </div>

                <div className="border-t border-matter-border pt-6">
                    <h4 className="text-lg font-bold text-white mb-4">Quick Bulk Request</h4>
                    <div className="flex gap-4">
                        <input type="text" placeholder="e.g., 50x Arduino Uno, 100x Servo Motors" className="flex-1 bg-black border border-slate-700 rounded-md px-4 py-2 text-sm text-white focus:border-blue-500 outline-none" />
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md text-sm font-bold uppercase tracking-wider transition-colors">
                            Request Quote
                        </button>
                    </div>
                </div>
            </div>

            <div className="bg-matter-surface border border-matter-border rounded-lg p-6">
                <h3 className="text-lg font-bold text-white font-mono uppercase tracking-tight mb-4">Recent Purchase Orders</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-slate-400">
                        <thead className="text-xs text-slate-500 uppercase bg-black/50 border-b border-matter-border">
                            <tr>
                                <th className="px-4 py-3 font-medium">PO Number</th>
                                <th className="px-4 py-3 font-medium">Date</th>
                                <th className="px-4 py-3 font-medium">Amount</th>
                                <th className="px-4 py-3 font-medium">Status</th>
                                <th className="px-4 py-3 font-medium">Invoice</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-matter-border/50 hover:bg-white/5">
                                <td className="px-4 py-3 font-mono text-white">PO-2024-089</td>
                                <td className="px-4 py-3">Oct 12, 2024</td>
                                <td className="px-4 py-3 font-mono">₹45,000</td>
                                <td className="px-4 py-3"><span className="text-matter-orange">Processing</span></td>
                                <td className="px-4 py-3"><FileText className="w-4 h-4 text-slate-500 hover:text-white cursor-pointer" /></td>
                            </tr>
                            <tr className="border-b border-matter-border/50 hover:bg-white/5">
                                <td className="px-4 py-3 font-mono text-white">PO-2024-042</td>
                                <td className="px-4 py-3">Sep 05, 2024</td>
                                <td className="px-4 py-3 font-mono">₹120,500</td>
                                <td className="px-4 py-3"><span className="text-green-400">Delivered</span></td>
                                <td className="px-4 py-3"><FileText className="w-4 h-4 text-slate-500 hover:text-white cursor-pointer" /></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

// --- ENGINEER DASHBOARD ---
export const EngineerDashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedBlueprint, setSelectedBlueprint] = useState<Order | null>(null);
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({});

  const toggleStep = (stepKey: string) => {
      setCompletedSteps(prev => ({
          ...prev,
          [stepKey]: !prev[stepKey]
      }));
  };

  useEffect(() => {
    try {
        const history = JSON.parse(localStorage.getItem('mf_orders_history') || '[]');
        if (Array.isArray(history)) {
            setOrders(history);
        }
    } catch (e) {
        setOrders([]);
    }
  }, []);

  const updateOrderStatus = (orderId: string, newStatus: Order['status']) => {
      const updatedOrders = orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o);
      setOrders(updatedOrders);
      localStorage.setItem('mf_orders_history', JSON.stringify(updatedOrders));
      
      try {
        const currentOrder = JSON.parse(localStorage.getItem('mf_order_data') || 'null');
        if (currentOrder && currentOrder.id === orderId) {
            currentOrder.status = newStatus;
            localStorage.setItem('mf_order_data', JSON.stringify(currentOrder));
        }
      } catch (e) {}
  };

  const newRequests = orders.filter(o => o.status === 'Processing');
  const inProgressOrders = orders.filter(o => o.status === 'Accepted' || o.status === 'In Progress');
  const readyOrders = orders.filter(o => o.status === 'Ready for Delivery');
  const shippedOrders = orders.filter(o => o.status === 'Shipped');

  return (
    <div className="min-h-screen bg-matter-dark flex justify-center text-white pb-20 font-sans pt-12 px-4">
      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Profile Card */}
        <div className="md:col-span-3 lg:col-span-3">
            <div className="bg-matter-surface border border-matter-border p-6 text-center relative overflow-hidden rounded-lg shadow-2xl sticky top-24">
            <div className="absolute top-0 left-0 w-full h-1 bg-purple-500"></div>
            
            <div className="h-20 w-20 mx-auto bg-black rounded-full flex items-center justify-center mb-4 border-2 border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.3)]">
                <Wrench className="h-8 w-8 text-purple-500" />
            </div>
            <h2 className="text-xl font-bold font-mono uppercase tracking-tight">{user.name}</h2>
            <p className="text-slate-500 mt-1 text-xs font-mono">{user.email}</p>
            <p className="text-purple-400 mt-2 text-[10px] font-bold uppercase tracking-widest border border-purple-500/30 inline-block px-2 py-1 rounded bg-purple-500/10">Service Engineer</p>
            
            <button 
                onClick={onLogout}
                className="mt-6 w-full py-2 border border-red-900/50 text-red-500 hover:bg-red-900/20 hover:text-red-400 transition-colors flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider rounded-sm"
            >
                <LogOut className="w-3 h-3" />
                Disconnect
            </button>
            </div>
        </div>

        {/* Fulfillment Center */}
        <div className="md:col-span-9 lg:col-span-9">
            <h3 className="text-2xl font-bold text-white font-mono uppercase tracking-tight flex items-center gap-3 mb-6">
                <Wrench className="w-6 h-6 text-purple-500" />
                Service Lab & Assembly
            </h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* New Requests */}
                <div className="bg-matter-surface border border-matter-border rounded-lg p-4 flex flex-col">
                    <div className="flex items-center justify-between mb-4 pb-2 border-b border-matter-border">
                        <h4 className="font-bold text-white flex items-center gap-2">
                            <Clock className="w-4 h-4 text-matter-orange" />
                            New Requests ({newRequests.length})
                        </h4>
                    </div>
                    
                    <div className="flex-1 space-y-4 overflow-y-auto pr-2 max-h-[400px]">
                        {newRequests.length === 0 ? (
                            <p className="text-slate-500 text-sm text-center py-8">No new requests.</p>
                        ) : (
                            newRequests.map(order => (
                                <div key={order.id} className="bg-black border border-matter-border rounded p-4">
                                    <div className="flex justify-between items-start mb-3">
                                        <div>
                                            <span className="font-mono text-sm text-white block">{order.id}</span>
                                            <span className="text-xs text-slate-500">{new Date(order.date).toLocaleDateString()}</span>
                                        </div>
                                        <span className="text-[10px] font-bold uppercase tracking-widest bg-matter-orange/10 text-matter-orange px-2 py-1 rounded border border-matter-orange/30">
                                            New
                                        </span>
                                    </div>
                                    
                                    <div className="space-y-3 mb-4">
                                        {order.items.map((item, i) => (
                                            <div key={i} className="flex items-center gap-3 bg-slate-900/50 p-2 rounded border border-white/5">
                                                {item.image ? (
                                                    <img src={item.image} alt={item.name} className="w-10 h-10 rounded object-cover border border-slate-700" />
                                                ) : (
                                                    <div className="w-10 h-10 rounded bg-slate-800 flex items-center justify-center border border-slate-700">
                                                        <Package className="w-5 h-5 text-slate-500" />
                                                    </div>
                                                )}
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-xs font-bold text-white truncate">{item.name}</p>
                                                    <p className="text-[10px] text-slate-400">{item.quantity}x • {item.type === 'ASSEMBLED' ? 'Assembly Req.' : 'Kit Prep'}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <button 
                                        onClick={() => updateOrderStatus(order.id, 'Accepted')}
                                        className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
                                    >
                                        <CheckCircle className="w-4 h-4" />
                                        Accept Order
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* In Progress */}
                <div className="bg-matter-surface border border-matter-border rounded-lg p-4 flex flex-col">
                    <div className="flex items-center justify-between mb-4 pb-2 border-b border-matter-border">
                        <h4 className="font-bold text-white flex items-center gap-2">
                            <Wrench className="w-4 h-4 text-blue-400" />
                            In Progress ({inProgressOrders.length})
                        </h4>
                    </div>
                    
                    <div className="flex-1 space-y-4 overflow-y-auto pr-2 max-h-[400px]">
                        {inProgressOrders.length === 0 ? (
                            <p className="text-slate-500 text-sm text-center py-8">No active assemblies.</p>
                        ) : (
                            inProgressOrders.map(order => (
                                <div key={order.id} className="bg-black border border-matter-border rounded p-4 border-l-2 border-l-blue-500">
                                    <div className="flex justify-between items-start mb-3">
                                        <div>
                                            <span className="font-mono text-sm text-white block">{order.id}</span>
                                            <span className="text-[10px] uppercase tracking-wider text-blue-400">{order.status}</span>
                                        </div>
                                        {order.items[0]?.image && (
                                            <img src={order.items[0].image} alt="preview" className="w-10 h-10 rounded object-cover border border-slate-700" />
                                        )}
                                    </div>
                                    
                                    <div className="flex gap-2 mb-4">
                                        <button 
                                            onClick={() => setSelectedBlueprint(order)}
                                            className="flex-1 bg-slate-800 hover:bg-slate-700 text-white py-2 rounded text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
                                        >
                                            <Eye className="w-4 h-4" /> View Blueprint
                                        </button>
                                    </div>

                                    {order.status === 'Accepted' ? (
                                        <button 
                                            onClick={() => updateOrderStatus(order.id, 'In Progress')}
                                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
                                        >
                                            <Play className="w-4 h-4" /> Start Making
                                        </button>
                                    ) : (
                                        <button 
                                            onClick={() => updateOrderStatus(order.id, 'Ready for Delivery')}
                                            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
                                        >
                                            <CheckSquare className="w-4 h-4" /> Mark Ready
                                        </button>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Ready & Shipped */}
                <div className="bg-matter-surface border border-matter-border rounded-lg p-4 flex flex-col lg:col-span-2">
                    <div className="flex items-center justify-between mb-4 pb-2 border-b border-matter-border">
                        <h4 className="font-bold text-white flex items-center gap-2">
                            <Truck className="w-4 h-4 text-green-400" />
                            Logistics & Delivery ({readyOrders.length + shippedOrders.length})
                        </h4>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Ready for Delivery */}
                        <div className="space-y-4">
                            <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Ready for Dispatch</h5>
                            {readyOrders.length === 0 && <p className="text-slate-600 text-xs">None ready.</p>}
                            {readyOrders.map(order => (
                                <div key={order.id} className="bg-black border border-matter-border rounded p-3 flex justify-between items-center gap-3">
                                    {order.items[0]?.image && (
                                        <img src={order.items[0].image} alt="preview" className="w-10 h-10 rounded object-cover border border-slate-700 shrink-0" />
                                    )}
                                    <div className="flex-1 min-w-0">
                                        <p className="font-mono text-sm text-white truncate">{order.id}</p>
                                        <p className="text-[10px] text-slate-500 truncate">{order.items[0]?.name} {order.items.length > 1 ? `+${order.items.length - 1}` : ''}</p>
                                    </div>
                                    <button 
                                        onClick={() => updateOrderStatus(order.id, 'Shipped')}
                                        className="bg-matter-orange hover:bg-orange-600 text-black px-3 py-1.5 rounded text-xs font-bold uppercase tracking-wider transition-colors shrink-0"
                                    >
                                        Dispatch
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* Shipped */}
                        <div className="space-y-4">
                            <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider">In Transit</h5>
                            {shippedOrders.length === 0 && <p className="text-slate-600 text-xs">None in transit.</p>}
                            {shippedOrders.map(order => (
                                <div key={order.id} className="bg-black border border-matter-border rounded p-3 flex justify-between items-center gap-3 opacity-70">
                                    {order.items[0]?.image && (
                                        <img src={order.items[0].image} alt="preview" className="w-10 h-10 rounded object-cover border border-slate-700 shrink-0" />
                                    )}
                                    <div className="flex-1 min-w-0">
                                        <p className="font-mono text-sm text-white truncate">{order.id}</p>
                                        <p className="text-[10px] text-slate-500">Tracking: {order.trackingId || 'TRK-' + order.id.substring(4, 10)}</p>
                                    </div>
                                    <button 
                                        onClick={() => updateOrderStatus(order.id, 'Delivered')}
                                        className="border border-green-500/50 text-green-400 hover:bg-green-500/10 px-3 py-1.5 rounded text-xs font-bold uppercase tracking-wider transition-colors shrink-0"
                                    >
                                        Delivered
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </div>
      </div>

      {/* Blueprint Modal */}
      {selectedBlueprint && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
              <div className="bg-slate-950 border-2 border-blue-900/50 max-w-4xl w-full max-h-[90vh] rounded-xl shadow-[0_0_50px_rgba(30,58,138,0.3)] overflow-hidden flex flex-col animate-in zoom-in-95 duration-200 relative">
                  {/* Blueprint Grid Background */}
                  <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'linear-gradient(#1e3a8a 1px, transparent 1px), linear-gradient(90deg, #1e3a8a 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                  
                  {/* Header */}
                  <div className="p-4 border-b border-blue-900/50 flex justify-between items-center bg-blue-950/20 relative z-10">
                      <div className="flex items-center gap-4">
                          <div className="p-2 bg-blue-900/30 rounded border border-blue-500/30">
                              <FileText className="w-6 h-6 text-blue-400" />
                          </div>
                          <div>
                              <h3 className="text-xl font-bold text-blue-100 font-mono uppercase tracking-widest">Technical Schematic</h3>
                              <p className="text-xs text-blue-400/70 font-mono">REF: {selectedBlueprint.id} // TS: {new Date().getTime()}</p>
                          </div>
                      </div>
                      <div className="flex gap-2">
                          <button className="p-2 hover:bg-blue-900/30 rounded text-blue-400 transition-colors border border-transparent hover:border-blue-500/30" title="Print Schematic">
                              <Printer className="w-5 h-5" />
                          </button>
                          <button 
                              onClick={() => setSelectedBlueprint(null)}
                              className="p-2 hover:bg-red-900/30 rounded text-slate-400 hover:text-red-400 transition-colors"
                          >
                              <XCircle className="w-6 h-6" />
                          </button>
                      </div>
                  </div>
                  
                  <div className="p-6 overflow-y-auto flex-1 space-y-8 relative z-10">
                      {selectedBlueprint.items.map((item, idx) => (
                          <div key={idx} className="bg-slate-900/80 border border-blue-900/50 rounded-lg p-6 backdrop-blur-sm">
                              {/* Item Header with 3D Wireframe Effect */}
                              <div className="flex flex-col md:flex-row gap-6 mb-6">
                                  {item.image ? (
                                      <div className="w-40 h-40 shrink-0 rounded-lg border-2 border-blue-500/50 overflow-hidden relative group perspective-1000">
                                          <div className="absolute inset-0 bg-blue-900/20 group-hover:bg-transparent transition-colors z-10"></div>
                                          
                                          {/* 3D Wireframe Container */}
                                          <div className="w-full h-full relative transform-style-3d transition-transform duration-700 group-hover:rotate-y-12 group-hover:rotate-x-12">
                                              <img src={item.image} alt={item.name} className="w-full h-full object-cover mix-blend-luminosity opacity-80" />
                                              
                                              {/* Holographic Overlay */}
                                              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-transparent mix-blend-overlay"></div>
                                              
                                              {/* Grid Overlay for 3D feel */}
                                              <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'linear-gradient(rgba(96, 165, 250, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(96, 165, 250, 0.5) 1px, transparent 1px)', backgroundSize: '10px 10px' }}></div>
                                          </div>

                                          {/* Scanner line effect */}
                                          <div className="absolute top-0 left-0 w-full h-0.5 bg-blue-400 shadow-[0_0_15px_#60a5fa] animate-[scan_3s_ease-in-out_infinite] z-20"></div>
                                          
                                          {/* Corner Accents */}
                                          <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-blue-400 z-20"></div>
                                          <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-blue-400 z-20"></div>
                                          <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-blue-400 z-20"></div>
                                          <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-blue-400 z-20"></div>
                                      </div>
                                  ) : (
                                      <div className="w-40 h-40 shrink-0 rounded-lg border-2 border-blue-500/50 flex items-center justify-center bg-blue-950/40 relative overflow-hidden group perspective-1000">
                                          <div className="transform-style-3d transition-transform duration-700 group-hover:rotate-y-12 group-hover:rotate-x-12">
                                            <Box className="w-16 h-16 text-blue-500/50" />
                                          </div>
                                          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(rgba(96, 165, 250, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(96, 165, 250, 0.5) 1px, transparent 1px)', backgroundSize: '10px 10px' }}></div>
                                      </div>
                                  )}
                                  <div className="flex-1 flex flex-col justify-between">
                                      <div>
                                          <div className="flex justify-between items-start">
                                              <div>
                                                  <h4 className="font-bold text-blue-50 text-3xl tracking-tight drop-shadow-[0_0_10px_rgba(96,165,250,0.5)]">{item.name}</h4>
                                                  <p className="text-sm text-blue-400 uppercase tracking-widest font-bold mt-2 flex items-center gap-2">
                                                      <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_8px_#3b82f6]"></span>
                                                      {item.type.replace('_', ' ')}
                                                  </p>
                                              </div>
                                              <div className="text-right bg-blue-950/50 border border-blue-900/50 px-4 py-2 rounded">
                                                  <p className="text-[10px] text-blue-500/70 font-mono uppercase tracking-widest">Required QTY</p>
                                                  <p className="text-3xl font-mono text-blue-200">{item.quantity}</p>
                                              </div>
                                          </div>
                                          {item.details && <p className="text-sm text-slate-300 mt-4 leading-relaxed border-l-2 border-blue-500/30 pl-3">{item.details}</p>}
                                      </div>
                                  </div>
                              </div>

                              {/* Technical Specs Grid */}
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                  <div className="bg-slate-950/50 border border-blue-900/30 p-3 rounded">
                                      <p className="text-[10px] text-blue-500/70 uppercase tracking-widest mb-1 flex items-center gap-1"><Zap className="w-3 h-3"/> Power</p>
                                      <p className="text-sm font-mono text-blue-200">5V / 3.3V DC</p>
                                  </div>
                                  <div className="bg-slate-950/50 border border-blue-900/30 p-3 rounded">
                                      <p className="text-[10px] text-blue-500/70 uppercase tracking-widest mb-1 flex items-center gap-1"><Cpu className="w-3 h-3"/> Interface</p>
                                      <p className="text-sm font-mono text-blue-200">I2C / SPI / GPIO</p>
                                  </div>
                                  <div className="bg-slate-950/50 border border-blue-900/30 p-3 rounded">
                                      <p className="text-[10px] text-blue-500/70 uppercase tracking-widest mb-1 flex items-center gap-1"><Ruler className="w-3 h-3"/> Dimensions</p>
                                      <p className="text-sm font-mono text-blue-200">Standard ATX</p>
                                  </div>
                                  <div className="bg-slate-950/50 border border-blue-900/30 p-3 rounded">
                                      <p className="text-[10px] text-blue-500/70 uppercase tracking-widest mb-1 flex items-center gap-1"><Timer className="w-3 h-3"/> Est. Time</p>
                                      <p className="text-sm font-mono text-blue-200">{item.tier === 'ADVANCED' ? '45 mins' : '15 mins'}</p>
                                  </div>
                              </div>

                              {/* Bill of Materials (BOM) */}
                              <div className="mt-6 pt-6 border-t border-blue-900/50">
                                  <h5 className="text-sm font-bold text-blue-300 uppercase tracking-widest mb-4 flex items-center gap-2">
                                      <Layers className="w-4 h-4 text-blue-500" />
                                      Bill of Materials (BOM)
                                  </h5>
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                      <div className="flex justify-between items-center bg-slate-950/50 border border-blue-900/30 p-2 rounded text-sm">
                                          <span className="text-slate-300 font-mono">1x Core Processing Unit</span>
                                          <span className="text-blue-500/70 text-xs">MCU-01</span>
                                      </div>
                                      <div className="flex justify-between items-center bg-slate-950/50 border border-blue-900/30 p-2 rounded text-sm">
                                          <span className="text-slate-300 font-mono">1x Power Management IC</span>
                                          <span className="text-blue-500/70 text-xs">PWR-5V</span>
                                      </div>
                                      <div className="flex justify-between items-center bg-slate-950/50 border border-blue-900/30 p-2 rounded text-sm">
                                          <span className="text-slate-300 font-mono">1x Custom Enclosure</span>
                                          <span className="text-blue-500/70 text-xs">ENC-3D</span>
                                      </div>
                                      <div className="flex justify-between items-center bg-slate-950/50 border border-blue-900/30 p-2 rounded text-sm">
                                          <span className="text-slate-300 font-mono">1x Sensor Array</span>
                                          <span className="text-blue-500/70 text-xs">SNS-MOD</span>
                                      </div>
                                  </div>
                              </div>

                              {/* Assembly Instructions */}
                              {item.assemblyGuide && item.assemblyGuide.length > 0 ? (
                                  <div className="mt-6 pt-6 border-t border-blue-900/50">
                                      <h5 className="text-sm font-bold text-blue-300 uppercase tracking-widest mb-4 flex items-center gap-2">
                                          <Wrench className="w-4 h-4 text-blue-500" />
                                          Assembly Protocol
                                      </h5>
                                      <div className="space-y-3">
                                          {item.assemblyGuide.map((step, stepIdx) => {
                                              const stepKey = `${selectedBlueprint.id}-${idx}-${stepIdx}`;
                                              const isCompleted = completedSteps[stepKey];
                                              return (
                                                  <div 
                                                      key={stepIdx} 
                                                      className={`flex gap-4 p-3 rounded border transition-colors cursor-pointer ${isCompleted ? 'bg-blue-900/20 border-blue-500/30 opacity-60' : 'bg-slate-950/50 border-blue-900/30 hover:border-blue-500/50'}`}
                                                      onClick={() => toggleStep(stepKey)}
                                                  >
                                                      <div className="mt-0.5">
                                                          {isCompleted ? <CheckSquare className="w-5 h-5 text-blue-400" /> : <Square className="w-5 h-5 text-blue-800" />}
                                                      </div>
                                                      <div>
                                                          <span className="text-blue-500 font-mono font-bold text-xs mr-2">STEP {String(stepIdx + 1).padStart(2, '0')}</span>
                                                          <span className={`text-sm ${isCompleted ? 'text-slate-500 line-through' : 'text-blue-100'}`}>{step}</span>
                                                      </div>
                                                  </div>
                                              );
                                          })}
                                      </div>
                                  </div>
                              ) : (
                                  <div className="mt-6 pt-6 border-t border-blue-900/50">
                                      <div className="bg-blue-950/30 border border-blue-900/50 rounded p-4 flex items-center gap-3">
                                          <Package className="w-5 h-5 text-blue-500" />
                                          <p className="text-sm text-blue-200">Standard packaging protocol. No complex assembly required.</p>
                                      </div>
                                  </div>
                              )}
                          </div>
                      ))}
                  </div>

                  <div className="p-4 border-t border-blue-900/50 bg-blue-950/20 flex justify-between items-center relative z-10">
                      <div className="text-xs text-blue-500/70 font-mono">
                          CONFIDENTIAL // INTERNAL USE ONLY
                      </div>
                      <button 
                          onClick={() => setSelectedBlueprint(null)}
                          className="bg-blue-600 text-white px-8 py-2.5 rounded text-sm font-bold uppercase tracking-widest hover:bg-blue-500 transition-colors shadow-[0_0_15px_rgba(37,99,235,0.4)]"
                      >
                          Close Schematic
                      </button>
                  </div>
              </div>
          </div>
      )}
    </div>
  );
};
