import React from 'react';
import { UserButton } from '@clerk/react';

export const UserProfile: React.FC = () => {
  return (
    <UserButton
      appearance={{
        elements: {
          avatarBox: 'h-8 w-8',
        },
      }}
    />
  );
};
