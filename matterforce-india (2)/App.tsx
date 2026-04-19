import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AILab from './components/AILab';
import Marketplace from './components/Marketplace';
import Cart from './components/Cart';
import Auth from './components/Auth';
import VeoSimulation from './components/VeoSimulation';
import { StudentDashboard, InstitutionDashboard, EngineerDashboard } from './components/Dashboards';
import { ViewState, CartItem, UserProfile, Order } from './types';
import { User, Settings, MapPin, LogOut, Package, Clock, ChevronRight, Truck, XCircle } from 'lucide-react';

const App = () => {
  // Load Auth State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('mf_auth') === 'true';
  });

  // Load User Profile Data from LocalStorage IF Authenticated
  const [user, setUser] = useState<UserProfile | null>(() => {
      const isAuth = localStorage.getItem('mf_auth') === 'true';
      if (!isAuth) return null;
      
      try {
        const savedUser = localStorage.getItem('mf_user');
        return savedUser ? JSON.parse(savedUser) : null;
      } catch {
        return null;
      }
  });

  const [currentView, setView] = useState<ViewState>('HOME');
  
  // Persist cart to localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const savedCart = localStorage.getItem('mf_cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch {
      return [];
    }
  });

  // Persist Cart
  useEffect(() => {
    localStorage.setItem('mf_cart', JSON.stringify(cart));
  }, [cart]);

  // Persist Auth State
  useEffect(() => {
    localStorage.setItem('mf_auth', isAuthenticated.toString());
  }, [isAuthenticated]);

  // Persist User Profile Data whenever it is updated
  useEffect(() => {
    if (user) {
        localStorage.setItem('mf_user', JSON.stringify(user));
    } else {
        localStorage.removeItem('mf_user');
    }
  }, [user]);

  const handleLogin = (data: { name?: string; email: string; role?: any }) => {
    // Basic login logic. In a real app, this would validate credentials.
    // Here we just ensure we have a user object structure.
    if (!user) {
        const newUser: UserProfile = {
            name: data.name || data.email.split('@')[0],
            email: data.email,
            role: data.role || 'STUDENT',
            workshopAddress: {
                houseNo: '',
                street: '',
                landmark: '',
                city: '',
                state: '',
                pincode: ''
            }
        };
        setUser(newUser);
    } else if (user.email !== data.email) {
        // Switching users (mock scenario)
        const newUser: UserProfile = {
            name: data.name || data.email.split('@')[0],
            email: data.email,
            role: data.role || 'STUDENT',
            workshopAddress: {
                houseNo: '',
                street: '',
                landmark: '',
                city: '',
                state: '',
                pincode: ''
            }
        };
        setUser(newUser);
    } else if (data.role && user.role !== data.role) {
        // Update role if same user but different role selected
        setUser({ ...user, role: data.role });
    }
    
    setIsAuthenticated(true);
    setView('HOME');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null); // This triggers the useEffect to remove mf_user from storage
    setView('HOME'); 
  };

  const updateUser = (updates: Partial<UserProfile>) => {
      setUser(prev => prev ? ({ ...prev, ...updates }) : null);
  };

  const addToCart = (item: CartItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, item];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, quantity: Math.max(1, item.quantity + delta) };
      }
      return item;
    }));
  };

  const clearCart = () => {
    setCart([]);
  };

  const renderView = () => {
    switch (currentView) {
      case 'HOME': return <Hero setView={setView} />;
      case 'FOUNDRY': return <AILab addToCart={addToCart} />;
      case 'BAZAAR': return <Marketplace addToCart={addToCart} />;
      case 'SIMULATION': return <VeoSimulation />;
      case 'CART': return <Cart cart={cart} removeFromCart={removeFromCart} updateQuantity={updateQuantity} clearCart={clearCart} user={user} updateUser={updateUser} />;
      case 'PROFILE':
        if (!user) return <div/>;
        if (user.role === 'INSTITUTION') {
            return <InstitutionDashboard user={user} onLogout={handleLogout} />;
        } else if (user.role === 'ENGINEER') {
            return <EngineerDashboard user={user} onLogout={handleLogout} />;
        }
        return <StudentDashboard user={user} onLogout={handleLogout} />;
      default: return <Hero setView={setView} />;
    }
  };

  if (!isAuthenticated) {
    return <Auth onLogin={handleLogin} />;
  }

  return (
    <div className="bg-matter-dark min-h-screen text-slate-200 font-sans selection:bg-matter-orange selection:text-black">
      <Navbar currentView={currentView} setView={setView} cart={cart} user={user} />
      <main>
        {renderView()}
      </main>
    </div>
  );
};

export default App;