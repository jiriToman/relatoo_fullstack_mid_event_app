"use client";

import { useRouter } from "next/navigation";
import { type ReactNode, useEffect, useState } from "react";

import {
  clearAuthToken,
  isAuthenticated,
  touchAuthActivity,
} from "@/lib/auth/token";
import commonStrings from "@/lib/strings/common.json";

type AuthGateProps = {
  children: ReactNode;
};

export function AuthGate({ children }: AuthGateProps) {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.replace("/login");
      return;
    }

    setIsReady(true);

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

  return (
    <div className="relative flex flex-1 flex-col">
      {!isReady && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-relatoo-gray-light">
          <p className="text-sm text-relatoo-gray">{commonStrings.loading}</p>
        </div>
      )}
      <div
        className={isReady ? "flex flex-1 flex-col" : "invisible flex flex-1 flex-col"}
        aria-hidden={!isReady}
      >
        {children}
      </div>
    </div>
  );
}
