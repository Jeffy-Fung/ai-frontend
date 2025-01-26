import { ApiError } from "./ApiError";

export const apiBaseUrl = `${process.env.NEXT_PUBLIC_NODEJS_BACKEND_API_URL}`;

export async function get(path: string, params: Record<string, string | number | boolean | (string | number | boolean)[]> | null) {
  const response = await callFetch(`${path}${getParams(params)}`, {
    method: "GET",
  });

  if (!response.ok) {
    return await handleError(response);
  }

  const parsedResponse = await response.json();

  return parsedResponse.data;
}

// export async function post(
//   path,
//   data,
//   { ignoreAuthorization = false, onResponseHeader = null } = {}
// ) {
//   const response = await callFetch(path, {
//     method: "POST",
//     body: JSON.stringify(data),
//     ignoreAuthorization,
//   });

//   if (!response.ok) {
//     return handleError(response);
//   }

//   onResponseHeader?.(response.headers);

//   // 204 No Content - return nothing.
//   if (response.status === 204) {
//     return null;
//   }

//   const parsedResponse = await response.json();

//   return parsedResponse.data;
// }

// export async function patch(path, data) {
//   const response = await callFetch(path, {
//     method: "PATCH",
//     body: JSON.stringify(data),
//   });

//   if (!response.ok) {
//     return handleError(response);
//   }

//   const parsedResponse = await response.json();

//   return parsedResponse.data;
// }

function callFetch(resource: string, { ignoreAuthorization = false, ...options }: { ignoreAuthorization?: boolean;[key: string]: any }) {
  const headers: Record<string, string> = {
    "Content-Type": "application/json; charset=utf-8",
    "Preface-Client": "cp-web",
  };

  // if (!ignoreAuthorization && isLoggedIn()) {
  //   headers["Authorization"] = `Bearer ${getAuthToken()}`;
  // }

  return fetch(`${apiBaseUrl}/${resource}`, {
    ...options,
    credentials: "omit",
    headers,
  });
}

function getParams(params: Record<string, string | number | boolean | (string | number | boolean)[]> | null) {
  const filteredParams: [string, string][] = [];

  if (!params) {
    return "";
  }

  for (const key in params) {
    if (params[key] !== null && params[key] !== undefined && params[key] !== "") {
      if (Array.isArray(params[key])) {
        params[key].forEach((value) => {
          filteredParams.push([`${key}[]`, String(value)]);
        });
      } else {
        filteredParams.push([key, String(params[key])]);
      }
    }
  }

  const search = new URLSearchParams(filteredParams).toString();
  return search ? `?${search}` : "";
}

async function handleError(response: Response) {
  const responseJson = await response.json();

  if (responseJson) {
    const {
      data: { code, errors, message },
    } = responseJson;

    const status = response.status;

    const error = new ApiError({
      url: response.url,
      status,
      code,
      errors,
      message,
    });

    if (error.unauthorized()) {
      // onUnauthorized(error);
    }

    throw error;
  }

  throw new Error("API Error.");
}
