import React, { useState } from 'react';
import { X, Check, ShieldCheck, Truck, Store, CreditCard, Clock, ArrowLeft } from 'lucide-react';
import { CartItem } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  discount: number;
  promoCode: string;
  initialFulfillment: 'delivery' | 'pickup';
  onOrderCompleted: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cart,
  discount,
  promoCode,
  initialFulfillment,
  onOrderCompleted,
}) => {
  const [fulfillment, setFulfillment] = useState<'delivery' | 'pickup'>(initialFulfillment);
  const [formData, setFormData] = useState({
    name: 'Elena Vance',
    email: 'elena.vance@example.com',
    phone: '(312) 555-0192',
    address: '840 N Michigan Avenue, Apt 14B',
    city: 'Chicago',
    state: 'IL',
    zip: '60611',
    deliveryDate: 'Tomorrow, Morning Slot (9:00 AM - 1:00 PM)',
    paymentMethod: 'card' as 'card' | 'applepay' | 'cod',
    cardNumber: '•••• •••• •••• 4281',
    cardExp: '08/28',
    cardCvc: '•••',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  if (!isOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = fulfillment === 'pickup' ? 0 : subtotal >= 65 || subtotal === 0 ? 0 : 12;
  const tax = Math.round((subtotal - discount) * 0.05 * 100) / 100;
  const total = Math.max(0, subtotal - discount + shipping + tax);

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setOrderNumber(`CHALUPI-${Math.floor(1000 + Math.random() * 9000)}`);
      setOrderConfirmed(true);
      onOrderCompleted();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div 
        className="relative w-full max-w-2xl bg-[#FAF7F2] rounded-2xl shadow-2xl border border-[#DFCBB5] overflow-hidden my-8 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-[#EAE0D2] flex items-center justify-between bg-[#F4ECDF]">
          <div className="flex items-center gap-2">
            <span className="font-serif italic text-[#B5761E] font-bold">♦ Chalupi ♦</span>
            <h2 className="font-serif text-xl font-bold text-[#1E1511]">
              {orderConfirmed ? 'Order Confirmation' : 'Complete Your Order'}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="p-1.5 text-[#5B4738] hover:text-[#1E1511] rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-6 sm:p-8 flex-1">
          {orderConfirmed ? (
            /* Order Success State */
            <div className="space-y-6 text-center py-4">
              <div className="w-16 h-16 bg-[#2E5E32] text-white rounded-full flex items-center justify-center mx-auto shadow-md">
                <Check className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs font-mono font-bold tracking-widest text-[#B5761E] uppercase block mb-1">
                  ORDER {orderNumber} CONFIRMED
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1E1511]">
                  Chalupi is Preparing Your Bake!
                </h3>
                <p className="text-xs sm:text-sm text-[#665040] max-w-md mx-auto mt-2 leading-relaxed">
                  Thank you, <span className="font-bold text-[#1E1511]">{formData.name}</span>. We sent a detailed confirmation receipt to <span className="font-medium text-[#1E1511]">{formData.email}</span>.
                </p>
              </div>

              {/* Delivery Tracker Steps */}
              <div className="bg-[#FFFDF9] p-5 rounded-xl border border-[#DECBB4] text-left space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#1E1511] block">
                  Freshness & Dispatch Timeline
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                  <div className="p-3 bg-[#FAF3E8] rounded-lg border border-[#E5D7C3]">
                    <div className="font-bold text-[#2E5E32] flex items-center gap-1 mb-1">
                      <Check className="w-3.5 h-3.5" /> 1. Received
                    </div>
                    <span className="text-[11px] text-[#785E4D]">Batch scheduled</span>
                  </div>
                  <div className="p-3 bg-[#FAF3E8] rounded-lg border border-[#E5D7C3]">
                    <div className="font-bold text-[#B5761E] flex items-center gap-1 mb-1">
                      <Clock className="w-3.5 h-3.5" /> 2. 14h Tempering
                    </div>
                    <span className="text-[11px] text-[#785E4D]">Setting velvet crumb</span>
                  </div>
                  <div className="p-3 bg-white rounded-lg border border-[#DECBB4]">
                    <div className="font-bold text-[#5B4738] mb-1">
                      3. Dry-Gel Chill
                    </div>
                    <span className="text-[11px] text-[#8C6D58]">Thermal packaging</span>
                  </div>
                  <div className="p-3 bg-white rounded-lg border border-[#DECBB4]">
                    <div className="font-bold text-[#5B4738] mb-1">
                      4. {fulfillment === 'pickup' ? 'Ready for Pickup' : 'Courier Out'}
                    </div>
                    <span className="text-[11px] text-[#8C6D58]">{formData.deliveryDate.split('(')[0]}</span>
                  </div>
                </div>
              </div>

              {/* Order Receipt Summary */}
              <div className="bg-[#F5ECE0] p-4 rounded-xl border border-[#DFCBB5] text-left text-xs space-y-2">
                <div className="font-bold text-[#1E1511] mb-2 flex justify-between">
                  <span>Items Ordered ({cart.length})</span>
                  <span className="font-mono">${total.toFixed(2)} Paid</span>
                </div>
                {cart.map((item) => (
                  <div key={item.cartItemId} className="flex justify-between text-[#685343]">
                    <span>{item.quantity}x {item.productName} ({item.sizeName})</span>
                    <span className="font-mono tabular-nums">${item.price * item.quantity}</span>
                  </div>
                ))}
                <div className="pt-2 border-t border-[#DFCBB5] text-[11px] text-[#785E4D] italic flex items-center justify-between">
                  <span>Executive Quality Guarantee</span>
                  <span className="font-medium text-[#1E1511]">Yusuf Bagher Zadeh (CEO) & Mohamad Mneimneh (Founder)</span>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="px-8 py-3 text-sm font-semibold rounded-lg bg-[#1E1511] text-white hover:bg-[#34241C] transition-all cursor-pointer shadow-sm"
              >
                Back to Bakery
              </button>
            </div>
          ) : (
            /* Checkout Form */
            <form onSubmit={handleSubmitOrder} className="space-y-6">
              {/* Order summary pill */}
              <div className="flex items-center justify-between p-3.5 bg-[#F5ECE0] rounded-xl border border-[#DFCBB5] text-xs">
                <div>
                  <span className="text-[#8C6D58]">Total for {cart.length} item(s): </span>
                  <span className="font-serif font-bold text-base text-[#1E1511] tabular-nums">${total.toFixed(2)}</span>
                </div>
                <div className="text-[#2E5E32] font-medium flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Freshness & Cold-Chain Guarantee</span>
                </div>
              </div>

              {/* Fulfillment Method */}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#8C6D58] block mb-2">
                  Fulfillment Method
                </span>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFulfillment('delivery')}
                    className={`p-3 rounded-xl border text-left flex items-start gap-3 transition-all cursor-pointer ${
                      fulfillment === 'delivery'
                        ? 'border-[#1E1511] bg-[#1E1511] text-white'
                        : 'border-[#DECBB4] bg-white text-[#1E1511] hover:border-[#B5761E]'
                    }`}
                  >
                    <Truck className="w-4 h-4 mt-0.5 shrink-0" />
                    <div>
                      <div className="text-xs font-bold">Chilled Express Delivery</div>
                      <div className="text-[11px] opacity-80">Insulated honeycomb cooler</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFulfillment('pickup')}
                    className={`p-3 rounded-xl border text-left flex items-start gap-3 transition-all cursor-pointer ${
                      fulfillment === 'pickup'
                        ? 'border-[#1E1511] bg-[#1E1511] text-white'
                        : 'border-[#DECBB4] bg-white text-[#1E1511] hover:border-[#B5761E]'
                    }`}
                  >
                    <Store className="w-4 h-4 mt-0.5 shrink-0" />
                    <div>
                      <div className="text-xs font-bold">Bakehouse Window Pickup</div>
                      <div className="text-[11px] opacity-80">418 Grand Artisan Ave (Free)</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#8C6D58] block mb-2">
                  Contact Information
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-[#685343] mb-1 font-medium">Full Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full p-2.5 bg-white border border-[#DECBB4] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#C68A29] text-[#1E1511]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#685343] mb-1 font-medium">Email for Tracking Receipt</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full p-2.5 bg-white border border-[#DECBB4] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#C68A29] text-[#1E1511]"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-[#685343] mb-1 font-medium">Phone Number (for Courier notification)</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full p-2.5 bg-white border border-[#DECBB4] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#C68A29] text-[#1E1511]"
                    />
                  </div>
                </div>
              </div>

              {/* Delivery Address (if delivery) */}
              {fulfillment === 'delivery' && (
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#8C6D58] block mb-2">
                    Shipping Address
                  </span>
                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="block text-[#685343] mb-1 font-medium">Street Address</label>
                      <input
                        type="text"
                        required
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="w-full p-2.5 bg-white border border-[#DECBB4] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#C68A29] text-[#1E1511]"
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[#685343] mb-1 font-medium">City</label>
                        <input
                          type="text"
                          required
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          className="w-full p-2.5 bg-white border border-[#DECBB4] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#C68A29] text-[#1E1511]"
                        />
                      </div>
                      <div>
                        <label className="block text-[#685343] mb-1 font-medium">State</label>
                        <input
                          type="text"
                          required
                          value={formData.state}
                          onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                          className="w-full p-2.5 bg-white border border-[#DECBB4] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#C68A29] text-[#1E1511]"
                        />
                      </div>
                      <div>
                        <label className="block text-[#685343] mb-1 font-medium">ZIP Code</label>
                        <input
                          type="text"
                          required
                          value={formData.zip}
                          onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                          className="w-full p-2.5 bg-white border border-[#DECBB4] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#C68A29] text-[#1E1511]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Payment Method */}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#8C6D58] block mb-2">
                  Payment Method
                </span>
                <div className="grid grid-cols-3 gap-2 mb-3">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, paymentMethod: 'card' })}
                    className={`p-2.5 rounded-lg border text-xs font-medium flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      formData.paymentMethod === 'card'
                        ? 'border-[#1E1511] bg-[#1E1511] text-white'
                        : 'border-[#DECBB4] bg-white text-[#1E1511] hover:border-[#B5761E]'
                    }`}
                  >
                    <CreditCard className="w-3.5 h-3.5" />
                    <span>Card</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, paymentMethod: 'applepay' })}
                    className={`p-2.5 rounded-lg border text-xs font-medium flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      formData.paymentMethod === 'applepay'
                        ? 'border-[#1E1511] bg-[#1E1511] text-white'
                        : 'border-[#DECBB4] bg-white text-[#1E1511] hover:border-[#B5761E]'
                    }`}
                  >
                    <span>Apple Pay</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                    className={`p-2.5 rounded-lg border text-xs font-medium flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      formData.paymentMethod === 'cod'
                        ? 'border-[#1E1511] bg-[#1E1511] text-white'
                        : 'border-[#DECBB4] bg-white text-[#1E1511] hover:border-[#B5761E]'
                    }`}
                  >
                    <span>{fulfillment === 'pickup' ? 'Pay at Counter' : 'Pay on Delivery'}</span>
                  </button>
                </div>

                {formData.paymentMethod === 'card' && (
                  <div className="p-3.5 bg-white border border-[#DECBB4] rounded-xl space-y-3 text-xs">
                    <div>
                      <label className="block text-[#685343] mb-1 font-medium">Card Number</label>
                      <input
                        type="text"
                        value={formData.cardNumber}
                        onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                        className="w-full p-2 bg-[#FAF7F2] border border-[#EAE0D2] rounded-lg font-mono text-[#1E1511]"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[#685343] mb-1 font-medium">Expires</label>
                        <input
                          type="text"
                          value={formData.cardExp}
                          onChange={(e) => setFormData({ ...formData, cardExp: e.target.value })}
                          className="w-full p-2 bg-[#FAF7F2] border border-[#EAE0D2] rounded-lg font-mono text-[#1E1511]"
                        />
                      </div>
                      <div>
                        <label className="block text-[#685343] mb-1 font-medium">CVC</label>
                        <input
                          type="text"
                          value={formData.cardCvc}
                          onChange={(e) => setFormData({ ...formData, cardCvc: e.target.value })}
                          className="w-full p-2 bg-[#FAF7F2] border border-[#EAE0D2] rounded-lg font-mono text-[#1E1511]"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Submit CTA */}
              <div className="pt-4 border-t border-[#EAE0D2] flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="text-xs font-semibold text-[#5B4738] hover:text-[#1E1511] flex items-center gap-1"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Return to Bag</span>
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3.5 text-sm font-semibold rounded-lg bg-[#1E1511] text-white hover:bg-[#34241C] transition-all cursor-pointer shadow-sm disabled:opacity-50"
                >
                  {isSubmitting ? 'Baking Your Order...' : `Place Order · $${total.toFixed(2)}`}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
