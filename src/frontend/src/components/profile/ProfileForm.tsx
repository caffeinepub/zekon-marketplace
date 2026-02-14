import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Variant_seller_buyer, UserProfile } from '../../backend';
import { Loader2, ShoppingBag, Store } from 'lucide-react';

interface ProfileFormProps {
  initialProfile?: UserProfile | null;
  onSubmit: (profile: UserProfile) => void;
  isPending: boolean;
  submitLabel?: string;
}

export default function ProfileForm({
  initialProfile,
  onSubmit,
  isPending,
  submitLabel = 'Save Profile',
}: ProfileFormProps) {
  const [displayName, setDisplayName] = useState(initialProfile?.displayName || '');
  const [phoneNumber, setPhoneNumber] = useState(initialProfile?.phoneNumber || '');
  const [role, setRole] = useState<Variant_seller_buyer>(
    initialProfile?.role || Variant_seller_buyer.buyer
  );

  useEffect(() => {
    if (initialProfile) {
      setDisplayName(initialProfile.displayName);
      setPhoneNumber(initialProfile.phoneNumber || '');
      setRole(initialProfile.role);
    }
  }, [initialProfile]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!displayName.trim()) {
      return;
    }

    const profile: UserProfile = {
      displayName: displayName.trim(),
      role,
      phoneNumber: phoneNumber.trim() || undefined,
      shippingAddress: initialProfile?.shippingAddress,
      paymentMethods: initialProfile?.paymentMethods || [],
    };

    onSubmit(profile);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="displayName">Display Name *</Label>
        <Input
          id="displayName"
          type="text"
          placeholder="Enter your name"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          required
          disabled={isPending}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phoneNumber">Phone Number (optional)</Label>
        <Input
          id="phoneNumber"
          type="tel"
          placeholder="+1 234 567 8900"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          disabled={isPending}
        />
        <p className="text-xs text-muted-foreground">
          Not verified. Used for order notifications only.
        </p>
      </div>

      <div className="space-y-3">
        <Label>I want to</Label>
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => setRole(Variant_seller_buyer.buyer)}
            disabled={isPending}
            className={`p-6 rounded-xl border-2 transition-all ${
              role === Variant_seller_buyer.buyer
                ? 'border-primary bg-primary/5 shadow-md'
                : 'border-border hover:border-primary/50'
            }`}
          >
            <div className="flex flex-col items-center space-y-3">
              <ShoppingBag
                className={`h-8 w-8 ${
                  role === Variant_seller_buyer.buyer ? 'text-primary' : 'text-muted-foreground'
                }`}
              />
              <div className="text-center">
                <div className="font-semibold">Buy</div>
                <div className="text-xs text-muted-foreground">Browse & purchase</div>
              </div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setRole(Variant_seller_buyer.seller)}
            disabled={isPending}
            className={`p-6 rounded-xl border-2 transition-all ${
              role === Variant_seller_buyer.seller
                ? 'border-primary bg-primary/5 shadow-md'
                : 'border-border hover:border-primary/50'
            }`}
          >
            <div className="flex flex-col items-center space-y-3">
              <Store
                className={`h-8 w-8 ${
                  role === Variant_seller_buyer.seller ? 'text-primary' : 'text-muted-foreground'
                }`}
              />
              <div className="text-center">
                <div className="font-semibold">Sell</div>
                <div className="text-xs text-muted-foreground">List products</div>
              </div>
            </div>
          </button>
        </div>
      </div>

      <Button type="submit" className="w-full h-12 text-lg" disabled={isPending || !displayName.trim()}>
        {isPending ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Saving...
          </>
        ) : (
          submitLabel
        )}
      </Button>
    </form>
  );
}
