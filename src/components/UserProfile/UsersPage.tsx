'use client'
import React from 'react';
import UserManagement from './UserManagement'; 
import { SessionProvider } from "next-auth/react";

const UsersPage: React.FC = () => {
  return (
    <SessionProvider>
      <div>
      <UserManagement />
      </div>
    </SessionProvider>
  );
};

export default UsersPage;
