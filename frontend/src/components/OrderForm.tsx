import { useState } from 'react';
import { usePlaceOrder, useGetAllProducts } from '../hooks/useQueries';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

interface OrderFormProps {
  open: boolean;
  onClose: () => void;
  preselectedProductId?: bigint;
  preselectedProductName?: string;
}

interface FormData {
  customerName: string;
  phone: string;
  address: string;
  productId: string;
  quantity: string;
}

interface FormErrors {
  customerName?: string;
  phone?: string;
  address?: string;
  productId?: string;
  quantity?: string;
}

export default function OrderForm({ open, onClose, preselectedProductId, preselectedProductName }: OrderFormProps) {
  const [formData, setFormData] = useState<FormData>({
    customerName: '',
    phone: '',
    address: '',
    productId: preselectedProductId !== undefined ? String(preselectedProductId) : '',
    quantity: '1',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const placeOrderMutation = usePlaceOrder();
  const { data: products = [] } = useGetAllProducts();

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.customerName.trim()) newErrors.customerName = 'Please enter your name.';
    if (!formData.phone.trim()) newErrors.phone = 'Please enter your phone number.';
    else if (!/^[0-9+\-\s()]{7,15}$/.test(formData.phone.trim())) newErrors.phone = 'Please enter a valid phone number.';
    if (!formData.address.trim()) newErrors.address = 'Please enter your delivery address.';
    if (!formData.productId) newErrors.productId = 'Please select a product.';
    const qty = parseInt(formData.quantity);
    if (!formData.quantity || isNaN(qty) || qty < 1) newErrors.quantity = 'Please enter a valid quantity (min 1).';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await placeOrderMutation.mutateAsync({
        customerName: formData.customerName.trim(),
        phone: formData.phone.trim(),
        address: formData.address.trim(),
        productId: BigInt(formData.productId),
        quantity: BigInt(parseInt(formData.quantity)),
      });
      setSubmitted(true);
    } catch {
      // error handled by mutation state
    }
  };

  const handleChange = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const handleClose = () => {
    setSubmitted(false);
    setFormData({
      customerName: '',
      phone: '',
      address: '',
      productId: preselectedProductId !== undefined ? String(preselectedProductId) : '',
      quantity: '1',
    });
    setErrors({});
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => { if (!isOpen) handleClose(); }}>
      <DialogContent className="max-w-lg bg-card border-lavender/60 rounded-3xl">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl text-plum">
            {submitted ? '🎉 Order Placed!' : '🛒 Place Your Order'}
          </DialogTitle>
          <DialogDescription className="font-sans text-muted-foreground">
            {submitted
              ? 'Thank you! We will contact you shortly to confirm your order.'
              : 'Fill in your details and we\'ll get your handmade item ready with love.'}
          </DialogDescription>
        </DialogHeader>

        {submitted ? (
          <div className="text-center py-6">
            <div className="text-6xl mb-4">🧶</div>
            <p className="font-sans text-plum-light leading-relaxed mb-2">
              Your order has been received! We'll reach out to you at the phone number provided to confirm details and arrange delivery.
            </p>
            <p className="font-handwritten text-lg text-rose mt-4">Thank you for choosing Knots & Folds! 💜</p>
            <Button
              onClick={handleClose}
              className="mt-6 bg-rose hover:bg-rose-dark text-primary-foreground font-sans font-bold rounded-full px-8"
            >
              Close
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="space-y-4 mt-2">
            {/* Customer Name */}
            <div className="space-y-1.5">
              <Label htmlFor="order-name" className="font-sans text-sm font-bold text-plum">Full Name *</Label>
              <Input
                id="order-name"
                type="text"
                placeholder="e.g. Priya Sharma"
                value={formData.customerName}
                onChange={handleChange('customerName')}
                className={`bg-blush border-lavender focus:border-rose font-sans ${errors.customerName ? 'border-destructive' : ''}`}
              />
              {errors.customerName && <p className="font-sans text-xs text-destructive">{errors.customerName}</p>}
            </div>

            {/* Phone */}
            <div className="space-y-1.5">
              <Label htmlFor="order-phone" className="font-sans text-sm font-bold text-plum">Phone Number *</Label>
              <Input
                id="order-phone"
                type="tel"
                placeholder="e.g. +91 98765 43210"
                value={formData.phone}
                onChange={handleChange('phone')}
                className={`bg-blush border-lavender focus:border-rose font-sans ${errors.phone ? 'border-destructive' : ''}`}
              />
              {errors.phone && <p className="font-sans text-xs text-destructive">{errors.phone}</p>}
            </div>

            {/* Address */}
            <div className="space-y-1.5">
              <Label htmlFor="order-address" className="font-sans text-sm font-bold text-plum">Delivery Address *</Label>
              <Textarea
                id="order-address"
                placeholder="Full delivery address including city and pincode"
                value={formData.address}
                onChange={handleChange('address')}
                rows={3}
                className={`bg-blush border-lavender focus:border-rose font-sans resize-none ${errors.address ? 'border-destructive' : ''}`}
              />
              {errors.address && <p className="font-sans text-xs text-destructive">{errors.address}</p>}
            </div>

            {/* Product Selection */}
            <div className="space-y-1.5">
              <Label className="font-sans text-sm font-bold text-plum">Product *</Label>
              {products.length > 0 ? (
                <Select
                  value={formData.productId}
                  onValueChange={(val) => {
                    setFormData(prev => ({ ...prev, productId: val }));
                    if (errors.productId) setErrors(prev => ({ ...prev, productId: undefined }));
                  }}
                >
                  <SelectTrigger className={`bg-blush border-lavender focus:border-rose font-sans ${errors.productId ? 'border-destructive' : ''}`}>
                    <SelectValue placeholder="Select a product" />
                  </SelectTrigger>
                  <SelectContent>
                    {products.map((p) => (
                      <SelectItem key={String(p.id)} value={String(p.id)}>
                        {p.name} — ₹{p.price.toFixed(2)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <div className="bg-blush border border-lavender rounded-lg px-4 py-3">
                  {preselectedProductName ? (
                    <p className="font-sans text-sm text-plum">{preselectedProductName}</p>
                  ) : (
                    <p className="font-sans text-sm text-muted-foreground">No products available yet.</p>
                  )}
                </div>
              )}
              {errors.productId && <p className="font-sans text-xs text-destructive">{errors.productId}</p>}
            </div>

            {/* Quantity */}
            <div className="space-y-1.5">
              <Label htmlFor="order-qty" className="font-sans text-sm font-bold text-plum">Quantity *</Label>
              <Input
                id="order-qty"
                type="number"
                min="1"
                placeholder="1"
                value={formData.quantity}
                onChange={handleChange('quantity')}
                className={`bg-blush border-lavender focus:border-rose font-sans ${errors.quantity ? 'border-destructive' : ''}`}
              />
              {errors.quantity && <p className="font-sans text-xs text-destructive">{errors.quantity}</p>}
            </div>

            {placeOrderMutation.isError && (
              <p className="font-sans text-xs text-destructive">
                Something went wrong placing your order. Please try again.
              </p>
            )}

            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                className="flex-1 border-lavender text-plum font-sans font-bold rounded-full"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={placeOrderMutation.isPending}
                className="flex-1 bg-rose hover:bg-rose-dark text-primary-foreground font-sans font-bold rounded-full shadow-warm"
              >
                {placeOrderMutation.isPending ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Placing...
                  </span>
                ) : (
                  'Place Order ✦'
                )}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
