"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode, useEffect, useState } from "react";

interface AuthProviderProps {
  readonly children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  // État pour savoir si nous sommes côté client
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Cela aide à prévenir les erreurs liées à l'hydration
  if (!isMounted) {
    return <>{children}</>;
  }

  return <SessionProvider>{children}</SessionProvider>;
}
