import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { SignIn, SignUp } from '@clerk/react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: 'login' | 'signup';
  onSuccess?: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  defaultMode = 'login',
}) => {
  const mode = defaultMode;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md p-0 border-none bg-transparent shadow-none [&>button]:hidden">
        <DialogHeader className="hidden">
          <DialogTitle className="sr-only">
            {mode === 'login' ? 'Sign in to your account' : 'Create a new account'}
          </DialogTitle>
        </DialogHeader>

        {mode === 'login' ? (
          <SignIn
            routing="hash"
            signUpUrl="#"
            appearance={{
              elements: {
                rootBox: 'w-full',
                cardBox: 'w-full shadow-none',
                card: 'w-full shadow-none',
              },
            }}
            fallbackRedirectUrl="/"
          />
        ) : (
          <SignUp
            routing="hash"
            signInUrl="#"
            appearance={{
              elements: {
                rootBox: 'w-full',
                cardBox: 'w-full shadow-none',
                card: 'w-full shadow-none',
              },
            }}
            fallbackRedirectUrl="/"
          />
        )}
      </DialogContent>
    </Dialog>
  );
};
