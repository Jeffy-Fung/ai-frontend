type ErrorMapping = {
  [key: number]: { [key: string]: string };
  any: { [key: string]: string };
};

const errorCodeMapping: ErrorMapping = {
  422: {
    any: "Authentication error",
  },
  400: {
    any: "Bad Request",
  },
  404: {
    user_not_found_error: "User not found",
  },
  any: {
    any: "Error",
  },
};

export function composeErrorMessage(status: number, code: string, message: string) {
  const statusSubtree = errorCodeMapping[status] || errorCodeMapping.any;

  return statusSubtree[code] || statusSubtree.any || message;
}
