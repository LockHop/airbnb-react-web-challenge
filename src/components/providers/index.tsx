"use client";

import ApolloProvider from '@/lib/graphql/apollo';
import React, { useState, ReactNode } from 'react';


const Providers: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [value, setValue] = useState<string>('');

  return (
    <ApolloProvider>
      {children}
    </ApolloProvider>
  );
};

export default Providers;