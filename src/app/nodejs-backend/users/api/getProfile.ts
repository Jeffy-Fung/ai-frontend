import { get } from "@/app/helpers/api";

export function getProfile() {
  return get(`api/users/my_profile`, null);
}
