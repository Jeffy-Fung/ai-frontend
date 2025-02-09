import { post } from "@/app/helpers/api";

export function postCrawlLatestNews() {
  return post(`api/news/crawl-latest`, {});
}
