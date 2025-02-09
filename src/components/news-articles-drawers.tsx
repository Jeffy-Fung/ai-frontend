"use client";

import { useContext } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import ChatSessionContext from "@/store/ChatSessionProvider";
import Divider from "@/components/divider";
import DividerWithButton from "@/components/divider-with-button";
import { useCrawlLatestNews } from "@/app/nodejs-backend/news-articles/mutations/useCrawlLatestNews";

type NewsArticle = {
  id: string;
  title: string;
  description: string;
  url: string;
  publishedAt: string;
  action: () => void;
  current: boolean;
};

export default function NewsArticlesDrawers({
  newsArticles,
}: {
  newsArticles: NewsArticle[];
}) {
  const { newsArticlesDrawerOpen, setNewsArticlesDrawerOpen } =
    useContext(ChatSessionContext);

  const { mutate: crawlLatestNews } = useCrawlLatestNews();

  // TODO: handle create session loading state

  return (
    <Dialog
      open={newsArticlesDrawerOpen}
      onClose={setNewsArticlesDrawerOpen}
      className="relative z-10"
    >
      <div className="fixed inset-0" />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed top-12 inset-y-0 right-0 flex max-w-full pl-10">
            <DialogPanel
              transition
              className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
            >
              <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                <div className="px-4 sm:px-6">
                  <div className="flex items-start justify-between">
                    <DialogTitle className="text-base font-semibold text-gray-900">
                      News Articles
                    </DialogTitle>
                    <div className="ml-3 flex h-7 items-center">
                      <button
                        type="button"
                        onClick={() => setNewsArticlesDrawerOpen(false)}
                        className="relative rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        <span className="absolute -inset-2.5" />
                        <span className="sr-only">Close panel</span>
                        <XMarkIcon aria-hidden="true" className="size-6" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="relative mt-6 flex-1 px-4 sm:px-6">
                  <Divider />
                  <NewsArticlesDrawerContent newsArticles={newsArticles} />
                  <DividerWithButton
                    onClick={() => crawlLatestNews()}
                    buttonText="Crawl latest news (Limited feature)"
                  />
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
}

function NewsArticlesDrawerContent({
  newsArticles,
}: {
  newsArticles: NewsArticle[];
}) {
  return (
    <ul role="list" className="flex-1 divide-y divide-gray-200 overflow-y-auto">
      {newsArticles.map((newsArticle: NewsArticle) => (
        <li key={newsArticle.id}>
          <div className="group relative flex items-center px-5 py-6">
            <button
              onClick={newsArticle.action}
              className="-m-1 block flex-1 p-1"
            >
              <div
                aria-hidden="true"
                className="absolute inset-0 group-hover:bg-gray-50"
              />
              <div className="relative flex min-w-0 flex-1 items-center">
                <span className="relative inline-block shrink-0">
                  <span
                    aria-hidden="true"
                    className={classNames(
                      newsArticle.current ? "bg-green-400" : "bg-gray-300",
                      "absolute right-0 top-0 block size-2.5 rounded-full ring-2 ring-white"
                    )}
                  />
                </span>
                <div className="ml-4 text-left">
                  <p className="text-sm font-bold text-gray-900 mb-2">
                    {newsArticle.title}
                  </p>
                  <p className="text-sm text-gray-500 mb-2">
                    {newsArticle.description}
                  </p>
                  <p className="text-sm text-gray-500">
                    {newsArticle.publishedAt}
                  </p>
                </div>
              </div>
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(" ");
}
