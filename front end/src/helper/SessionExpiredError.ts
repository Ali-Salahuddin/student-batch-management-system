export class SessionExpiredError extends Error {
  constructor() {
    super("Session expired");
    this.name = "SessionExpiredError";
  }
}
// export const apiFetch = async (
//   url: string,
//   options: RequestInit = {}
// ): Promise<Response> => {
//   const response = await fetch(url, {
//     credentials: "include",
//     ...options,
//   });

//   if (response.status === 401) {
//     alert("Your session has expired. Please login again.");

//     // Remove any local storage if you use it later
//     localStorage.clear();

//     // Redirect to login page
//     window.location.replace("/login");

//     throw new Error("Session expired");
//   }

//   return response;
// };