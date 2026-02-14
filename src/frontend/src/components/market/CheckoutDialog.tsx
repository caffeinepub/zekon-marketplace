import { useState } from 'react';
import { Product, Address, PaymentMethod } from '../../backend';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Loader2 } from 'lucide-react';

interface CheckoutDialogProps {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (shippingAddress: Address, paymentMethod: PaymentMethod) => void;
  isPending: boolean;
}

export default function CheckoutDialog({
  product,
  open,
  onOpenChange,
  onSubmit,
  isPending,
}: CheckoutDialogProps) {
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [country, setCountry] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'paypal' | 'upi' | 'cashOnDelivery'>('cashOnDelivery');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const resetForm = () => {
    setStreet('');
    setCity('');
    setState('');
    setZip('');
    setCountry('');
    setPaymentMethod('cashOnDelivery');
    setErrors({});
  };

  const handleClose = () => {
    if (!isPending) {
      resetForm();
      onOpenChange(false);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!street.trim()) {
      newErrors.street = 'Street address is required';
    }
    if (!city.trim()) {
      newErrors.city = 'City is required';
    }
    if (!state.trim()) {
      newErrors.state = 'State is required';
    }
    if (!zip.trim()) {
      newErrors.zip = 'ZIP code is required';
    }
    if (!country.trim()) {
      newErrors.country = 'Country is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }

    const shippingAddress: Address = {
      street: street.trim(),
      city: city.trim(),
      state: state.trim(),
      zip: zip.trim(),
      country: country.trim(),
    };

    let paymentMethodValue: PaymentMethod;
    if (paymentMethod === 'paypal') {
      paymentMethodValue = { __kind__: 'paypal', paypal: 'paypal-account' };
    } else if (paymentMethod === 'upi') {
      paymentMethodValue = { __kind__: 'bankTransfer', bankTransfer: 'upi-id' };
    } else {
      paymentMethodValue = { __kind__: 'cashOnDelivery', cashOnDelivery: null };
    }

    onSubmit(shippingAddress, paymentMethodValue);
  };

  if (!product) return null;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Checkout</DialogTitle>
          <DialogDescription>
            Complete your order by providing shipping address and payment method
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Product Summary */}
          <div className="flex gap-4 p-4 bg-muted rounded-lg">
            <div className="w-20 h-20 flex-shrink-0 overflow-hidden rounded-md bg-background">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-foreground">{product.name}</p>
              <p className="text-lg font-bold text-primary">${Number(product.price)}</p>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Shipping Address</h3>
            
            <div className="space-y-2">
              <Label htmlFor="street">Street Address *</Label>
              <Input
                id="street"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                placeholder="123 Main St"
                disabled={isPending}
              />
              {errors.street && (
                <p className="text-sm text-destructive">{errors.street}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="New York"
                  disabled={isPending}
                />
                {errors.city && (
                  <p className="text-sm text-destructive">{errors.city}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="state">State *</Label>
                <Input
                  id="state"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  placeholder="NY"
                  disabled={isPending}
                />
                {errors.state && (
                  <p className="text-sm text-destructive">{errors.state}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="zip">ZIP Code *</Label>
                <Input
                  id="zip"
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                  placeholder="10001"
                  disabled={isPending}
                />
                {errors.zip && (
                  <p className="text-sm text-destructive">{errors.zip}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="country">Country *</Label>
                <Input
                  id="country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder="USA"
                  disabled={isPending}
                />
                {errors.country && (
                  <p className="text-sm text-destructive">{errors.country}</p>
                )}
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Payment Method *</h3>
            <RadioGroup
              value={paymentMethod}
              onValueChange={(value) => setPaymentMethod(value as 'paypal' | 'upi' | 'cashOnDelivery')}
              disabled={isPending}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="paypal" id="paypal" />
                <Label htmlFor="paypal" className="cursor-pointer">PayPal</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="upi" id="upi" />
                <Label htmlFor="upi" className="cursor-pointer">UPI</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="cashOnDelivery" id="cashOnDelivery" />
                <Label htmlFor="cashOnDelivery" className="cursor-pointer">Cash on Delivery</Label>
              </div>
            </RadioGroup>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose} disabled={isPending}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isPending}>
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Placing Order...
              </>
            ) : (
              'Place Order'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
