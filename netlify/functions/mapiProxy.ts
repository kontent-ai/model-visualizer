import { Handler, HandlerEvent } from "@netlify/functions";
import { ManagementClient, SharedModels } from "@kontent-ai/management-sdk";

type Action = keyof Pick<ManagementClient, "listContentTypes" | "listContentTypeSnippets" | "listTaxonomies">;

type ActionMap = {
  [K in Action]: () => ReturnType<ManagementClient[K]>;
};

type RequestPayload = {
  environmentId: string;
  action: Action;
};

const createResponse = (statusCode: number, data: object) => ({
  statusCode,
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(data),
});

export const handler: Handler = async (event: HandlerEvent) => {
  if (event.httpMethod !== "POST") {
    return createResponse(405, { message: `Method Not Allowed: ${event.httpMethod}`, errorCode: 405 });
  }

  const { environmentId, action }: RequestPayload = JSON.parse(event.body || "{}");

  if (!environmentId || !action) {
    return createResponse(400, { message: "Missing environmentId or action", errorCode: 400 });
  }

  const apiKey = process.env.MAPI_KEY;
  if (!apiKey) {
    console.error("API key is missing from environment variables.");
    return createResponse(500, { message: "Missing MAPI key", errorCode: 500 });
  }

  const client = new ManagementClient({ environmentId, apiKey });
  const actions: ActionMap = {
    listContentTypes: () => client.listContentTypes(),
    listContentTypeSnippets: () => client.listContentTypeSnippets(),
    listTaxonomies: () => client.listTaxonomies(),
  };

  const actionFn = actions[action];
  if (!actionFn) {
    return createResponse(400, { message: `Unsupported action: "${action}"`, errorCode: 400 });
  }

  try {
    const response = await actionFn().toAllPromise();
    return createResponse(200, response.data.items);
  } catch (apiError) {
    console.error("Kontent.ai management API Error:", apiError);

    if (apiError instanceof SharedModels.ContentManagementBaseKontentError) {
      return createResponse(400, {
        message: apiError.message,
        errorCode: apiError.errorCode,
        details: apiError.validationErrors,
        requestId: apiError.requestId,
      });
    }

    // Fallback for unknown errors.
    return createResponse(500, {
      message: apiError instanceof Error ? apiError.message : "Unknown API error",
      errorCode: 500,
      details: typeof apiError === "object" ? JSON.stringify(apiError) : apiError,
    });
  }
};
