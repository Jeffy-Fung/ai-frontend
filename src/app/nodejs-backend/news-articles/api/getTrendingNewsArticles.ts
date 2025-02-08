import { get } from "@/app/helpers/api";

export function getTrendingNewsArticles() {
  return get(`api/news/trending`, null);
}
