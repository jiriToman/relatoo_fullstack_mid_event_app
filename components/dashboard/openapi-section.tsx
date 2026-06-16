"use client";

import { useEffect, useState } from "react";

import { OpenApiList } from "@/components/dashboard/openapi-list";
import { Alert } from "@/components/ui/alert";
import { api } from "@/lib/api";
import { getAuthToken } from "@/lib/auth/token";
import { parseOpenApiOperations, type OpenApiOperation } from "@/lib/openapi/parse-paths";
import commonStrings from "@/lib/strings/common.json";
import homeStrings from "@/lib/strings/pages/home.json";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";

export function OpenApiSection() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [apiTitle, setApiTitle] = useState("Event App API");
  const [apiVersion, setApiVersion] = useState("—");
  const [operations, setOperations] = useState<OpenApiOperation[]>([]);

  useEffect(() => {
    const token = getAuthToken();

    void api
      .getOpenApiSpec(token ?? undefined)
      .then((spec) => {
        setOperations(parseOpenApiOperations(spec));
        setApiTitle(spec.info.title);
        setApiVersion(spec.info.version);
        setError(null);
      })
      .catch(() => {
        setError(homeStrings.errors.openApiUnavailable);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <p className="mt-8 text-sm text-relatoo-gray">{commonStrings.loading}</p>
    );
  }

  if (error) {
    return (
      <div className="mt-8">
        <Alert message={error} />
      </div>
    );
  }

  return (
    <OpenApiList
      operations={operations}
      apiTitle={apiTitle}
      apiVersion={apiVersion}
      docsUrl={`${API_BASE_URL}/api-docs`}
    />
  );
}
