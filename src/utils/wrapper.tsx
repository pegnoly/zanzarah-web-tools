//src/lib/apollo-wrapper.ts
"use client";

import { ReactNode } from "react";
import { ApolloLink, HttpLink } from "@apollo/client";
import {
  ApolloNextAppProvider,
  ApolloClient,
  InMemoryCache,
} from "@apollo/experimental-nextjs-app-support";

const client=()=>{
  const httpLink = new HttpLink({
    uri: "https://zz-webapi-cv7m.shuttle.app/",
    fetchOptions: { cache: "no-store", mode: 'no-cors'},
    headers: {method: 'POST', contentType: 'application/json'}
  });

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: httpLink,
  });
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={client}>
      {children}
    </ApolloNextAppProvider>
  );
}