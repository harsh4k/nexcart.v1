import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, Truck, ShieldCheck, CheckCircle2, Loader2 } from 'lucide-react';
import { CartItem } from '../types';

interface CheckoutPageProps {
  cart: CartItem[];
  total: number;
  onClearCart: () => void;
}

export default function CheckoutPage({ cart, total, onClearCart }: CheckoutPageProps) {
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleNext = () => setStep(prev => prev + 1);
  const handleBack = () => setStep(prev => prev - 1);

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
    setIsSuccess(true);
    onClearCart();
  };

  if (cart.length === 0 && !isSuccess) {
    return (
      <div className="pt-32 pb-24 px-6 min-h-screen flex flex-col items-center justify-center text-center">
        <h2 className="text-3xl font-bold mb-4">Your cart is empty</h2>
        <p className="text-gray-500 mb-8 text-lg">Add some items to your cart before checking out.</p>
        <Link to="/" className="px-8 py-4 bg-black text-white rounded-full font-bold hover:scale-105 transition-transform">
          Back to Shop
        </Link>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="pt-32 pb-24 px-6 min-h-screen flex flex-col items-center justify-center text-center">
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", damping: 12 }}
          className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-8"
        >
          <CheckCircle2 size={48} />
        </motion.div>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl font-bold mb-4"
        >
          Order Confirmed!
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-gray-500 mb-12 text-lg max-w-md"
        >
          Thank you for your purchase. We've sent a confirmation email with your order details.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Link to="/" className="px-12 py-5 bg-black text-white rounded-full font-bold text-lg hover:scale-105 transition-transform inline-block">
            Continue Shopping
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-12">
          <Link to="/" className="p-2 hover:bg-white rounded-full transition-colors">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-4xl font-bold tracking-tighter">Checkout</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Steps Indicator */}
            <div className="flex gap-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex-1 h-1 rounded-full overflow-hidden bg-gray-200">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: step >= i ? '100%' : '0%' }}
                    className="h-full bg-black"
                  />
                </div>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div 
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white p-8 rounded-[2.5rem] shadow-sm space-y-6"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <Truck className="text-gray-400" size={24} />
                    <h3 className="text-xl font-bold">Shipping Information</h3>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">First Name</label>
                      <input type="text" className="w-full px-6 py-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-black transition-all" placeholder="John" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Last Name</label>
                      <input type="text" className="w-full px-6 py-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-black transition-all" placeholder="Doe" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Address</label>
                    <input type="text" className="w-full px-6 py-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-black transition-all" placeholder="123 Design St" />
                  </div>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">City</label>
                      <input type="text" className="w-full px-6 py-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-black transition-all" placeholder="New York" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">State</label>
                      <input type="text" className="w-full px-6 py-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-black transition-all" placeholder="NY" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">ZIP</label>
                      <input type="text" className="w-full px-6 py-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-black transition-all" placeholder="10001" />
                    </div>
                  </div>
                  <button onClick={handleNext} className="w-full py-5 bg-black text-white rounded-2xl font-bold hover:bg-gray-800 transition-colors mt-8">
                    Continue to Payment
                  </button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div 
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white p-8 rounded-[2.5rem] shadow-sm space-y-6"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <CreditCard className="text-gray-400" size={24} />
                    <h3 className="text-xl font-bold">Payment Method</h3>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Card Number</label>
                    <input type="text" className="w-full px-6 py-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-black transition-all" placeholder="0000 0000 0000 0000" />
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Expiry Date</label>
                      <input type="text" className="w-full px-6 py-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-black transition-all" placeholder="MM/YY" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">CVC</label>
                      <input type="text" className="w-full px-6 py-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-black transition-all" placeholder="000" />
                    </div>
                  </div>
                  <div className="flex gap-4 pt-8">
                    <button onClick={handleBack} className="flex-1 py-5 border border-gray-200 rounded-2xl font-bold hover:bg-gray-50 transition-colors">
                      Back
                    </button>
                    <button onClick={handleNext} className="flex-1 py-5 bg-black text-white rounded-2xl font-bold hover:bg-gray-800 transition-colors">
                      Review Order
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div 
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white p-8 rounded-[2.5rem] shadow-sm space-y-6"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <ShieldCheck className="text-gray-400" size={24} />
                    <h3 className="text-xl font-bold">Review & Confirm</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-2xl flex justify-between">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Shipping to</p>
                        <p className="text-sm font-medium">123 Design St, New York, NY</p>
                      </div>
                      <button onClick={() => setStep(1)} className="text-xs font-bold underline">Edit</button>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-2xl flex justify-between">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Payment</p>
                        <p className="text-sm font-medium">Card ending in 4242</p>
                      </div>
                      <button onClick={() => setStep(2)} className="text-xs font-bold underline">Edit</button>
                    </div>
                  </div>
                  <div className="flex gap-4 pt-8">
                    <button onClick={handleBack} className="flex-1 py-5 border border-gray-200 rounded-2xl font-bold hover:bg-gray-50 transition-colors">
                      Back
                    </button>
                    <button 
                      onClick={handlePlaceOrder} 
                      disabled={isProcessing}
                      className="flex-1 py-5 bg-black text-white rounded-2xl font-bold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                    >
                      {isProcessing ? <Loader2 className="animate-spin" size={20} /> : 'Place Order'}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Summary Sidebar */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm">
              <h3 className="text-xl font-bold mb-6">Order Summary</h3>
              <div className="space-y-4 mb-8">
                {cart.map(item => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-500">{item.name} x {item.quantity}</span>
                    <span className="font-bold">${item.price * item.quantity}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-3 pt-6 border-t">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-bold">${total}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Shipping</span>
                  <span className="font-bold text-green-600">Free</span>
                </div>
                <div className="flex justify-between text-xl font-bold pt-3">
                  <span>Total</span>
                  <span>${total}</span>
                </div>
              </div>
            </div>

            <div className="bg-black text-white p-8 rounded-[2.5rem] shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <ShieldCheck size={20} className="text-green-400" />
                <p className="text-sm font-bold">Secure Checkout</p>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                Your payment information is encrypted and processed securely. We never store your full card details.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
