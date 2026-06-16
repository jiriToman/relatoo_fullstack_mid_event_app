"use client";

import { useRouter } from "next/navigation";
import { type ReactNode, useEffect, useState } from "react";

import {
  clearAuthToken,
  isAuthenticated,
  touchAuthActivity,
} from "@/lib/auth/token";

type AuthGateProps = {
  children: ReactNode;
};

export function AuthGate({ children }: AuthGateProps) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.replace("/login");
      return;
    }

    setReady(true);

    const activityEvents: Array<keyof WindowEventMap> = [
      "mousedown",
      "mousemove",
      "keydown",
      "scroll",
      "touchstart",
    ];

    const handleActivity = () => {
      touchAuthActivity();
    };

    for (const eventName of activityEvents) {
      window.addEventListener(eventName, handleActivity, { passive: true });
    }

    const intervalId = window.setInterval(() => {
      if (!isAuthenticated()) {
        clearAuthToken();
        router.replace("/login");
      }
    }, 30_000);

    return () => {
      for (const eventName of activityEvents) {
        window.removeEventListener(eventName, handleActivity);
      }
      window.clearInterval(intervalId);
    };
  }, [router]);

  if (!ready) {
    return (
      <div className="flex flex-1 items-center justify-center bg-relatoo-gray-light">
        <p className="text-sm text-relatoo-gray">Načítám…</p>
      </div>
    );
  }

  return <>{children}</>;
}
