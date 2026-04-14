import { SharedModels } from "@kontent-ai/management-sdk";

export type AppError = {
  body: string;
  statusCode: string | number;
  originalError?: unknown;
};

export const createAppError = (
  body: string,
  statusCode: string | number,
  originalError?: unknown,
): AppError => ({ body, statusCode, originalError });

export const isAppError = (
  error: unknown,
): error is AppError => typeof error === "object" && error !== null && "body" in error && "statusCode" in error;

export const isKontentError = (
  error: unknown,
): error is SharedModels.ContentManagementBaseKontentError =>
  error instanceof SharedModels.ContentManagementBaseKontentError;
