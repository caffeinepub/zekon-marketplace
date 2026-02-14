import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

interface ErrorStateProps {
  error: Error | unknown;
  title?: string;
}

export default function ErrorState({ error, title = 'Error' }: ErrorStateProps) {
  const message = error instanceof Error ? error.message : 'An unexpected error occurred';

  // Map common backend errors to user-friendly messages
  const getFriendlyMessage = (msg: string): string => {
    if (msg.includes('Unauthorized')) {
      return 'You do not have permission to perform this action.';
    }
    if (msg.includes('Invalid product ID')) {
      return 'The product you are looking for does not exist.';
    }
    if (msg.includes('Only sellers can create products')) {
      return 'Only seller accounts can create products.';
    }
    if (msg.includes('Only buyers can place orders')) {
      return 'Only buyer accounts can place orders.';
    }
    return msg;
  };

  return (
    <Alert variant="destructive" className="my-4">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{getFriendlyMessage(message)}</AlertDescription>
    </Alert>
  );
}
