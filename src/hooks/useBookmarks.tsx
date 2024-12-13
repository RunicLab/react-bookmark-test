import { useState, useEffect } from 'react';
import { Tweet, BookmarkStorage } from '../types/tweet';
import { 
  saveBookmark, 
  getBookmarks, 
  removeBookmark 
} from '../utils/tweetUtils';

export const useBookmarks = () => {
  const [bookmarks, setBookmarks] = useState<BookmarkStorage>({});

  useEffect(() => {
    const storedBookmarks = getBookmarks();
    setBookmarks(storedBookmarks);
  }, []);

  const addBookmark = (tweet: Tweet) => {
    saveBookmark(tweet);
    setBookmarks(prev => ({
      ...prev,
      [tweet.id]: tweet
    }));
  };

  const deleteBookmark = (tweetId: string) => {
    removeBookmark(tweetId);
    setBookmarks(prev => {
      const newBookmarks = { ...prev };
      delete newBookmarks[tweetId];
      return newBookmarks;
    });
  };

  return {
    bookmarks,
    addBookmark,
    deleteBookmark
  };
};