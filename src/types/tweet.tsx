export interface Tweet {
    id: string;
    content: string;
    author: string;
    timestamp: number;
    bookmarkedAt?: number;
  }
  
  export interface BookmarkStorage {
    [tweetId: string]: Tweet;
  }