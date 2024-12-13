import { Tweet, BookmarkStorage } from "../types/tweet";

export const extractTweetId = (element: Element): string | null => {
  try {
    // Method 1: Look for tweet link with status in URL
    const tweetLink = element.querySelector('a[href*="/status/"]');
    if (tweetLink) {
      const url = new URL(tweetLink.getAttribute('href') || '');
      const pathParts = url.pathname.split('/');
      const statusIndex = pathParts.indexOf('status');
      if (statusIndex !== -1 && pathParts[statusIndex + 1]) {
        return pathParts[statusIndex + 1];
      }
    }

    // Method 2: Check for data attributes or specific tweet containers
    const articleTweet = element.closest('article');
    if (articleTweet) {
      const dataTestidTweet = articleTweet.querySelector('[data-testid="tweet"]');
      if (dataTestidTweet) {
        const tweetIdAttr = dataTestidTweet.getAttribute('data-tweet-id');
        if (tweetIdAttr) return tweetIdAttr;
      }
    }

    return null;
  } catch (error) {
    console.error('Error extracting tweet ID:', error);
    return null;
  }
};

export const saveBookmark = (tweet: Tweet) => {
  const bookmarks = getBookmarks();
  bookmarks[tweet.id] = {
    ...tweet,
    bookmarkedAt: Date.now()
  };
  localStorage.setItem('bookmarkedTweets', JSON.stringify(bookmarks));
};

export const getBookmarks = (): BookmarkStorage => {
  const bookmarks = localStorage.getItem('bookmarkedTweets');
  return bookmarks ? JSON.parse(bookmarks) : {};
};

export const removeBookmark = (tweetId: string) => {
  const bookmarks = getBookmarks();
  delete bookmarks[tweetId];
  localStorage.setItem('bookmarkedTweets', JSON.stringify(bookmarks));
};