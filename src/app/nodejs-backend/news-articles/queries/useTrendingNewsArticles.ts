import { useQuery } from "@tanstack/react-query";
import { getTrendingNewsArticles } from "../api/getTrendingNewsArticles";

export function useTrendingNewsArticles() {
  return useQuery({
    queryKey: ["trending-news-articles"],
    queryFn: getTrendingNewsArticles,
  });
}
