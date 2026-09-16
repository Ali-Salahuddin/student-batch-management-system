import { SessionExpiredError } from "./SessionExpiredError";

export const apiFetch = async (
  url: string,
  options: RequestInit = {}
): Promise<Response> => {
  const response = await fetch(url, {
    credentials: "include",
    ...options,
  });

  if (response.status === 401) {
    throw new SessionExpiredError();
  }

  return response;
};