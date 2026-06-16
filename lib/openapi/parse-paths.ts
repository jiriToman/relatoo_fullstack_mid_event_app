export type OpenApiOperation = {
  method: string;
  path: string;
  operationId?: string;
  summary?: string;
  tags: string[];
};

export type OpenApiSpec = {
  openapi: string;
  info: {
    title: string;
    version: string;
    description?: string;
  };
  paths: Record<
    string,
    Partial<
      Record<
        "get" | "post" | "put" | "patch" | "delete",
        {
          operationId?: string;
          summary?: string;
          tags?: string[];
        }
      >
    >
  >;
};

const HTTP_METHODS = ["get", "post", "put", "patch", "delete"] as const;

export function parseOpenApiOperations(spec: OpenApiSpec): OpenApiOperation[] {
  const operations: OpenApiOperation[] = [];

  for (const [path, pathItem] of Object.entries(spec.paths)) {
    for (const method of HTTP_METHODS) {
      const operation = pathItem[method];
      if (!operation) {
        continue;
      }

      operations.push({
        method: method.toUpperCase(),
        path,
        operationId: operation.operationId,
        summary: operation.summary,
        tags: operation.tags ?? [],
      });
    }
  }

  return operations.sort((a, b) => {
    const pathCompare = a.path.localeCompare(b.path);
    return pathCompare !== 0 ? pathCompare : a.method.localeCompare(b.method);
  });
}
