import { useMutation } from "@tanstack/react-query";
import { postCrawlLatestNews } from "../api/postCrawlLatestNews";
import { useQueryClient } from "@tanstack/react-query";

export function useCrawlLatestNews() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postCrawlLatestNews,
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({ queryKey: ["trending-news-articles"] });
    },
  });
}
