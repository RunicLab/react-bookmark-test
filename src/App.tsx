import React, { useEffect } from 'react';
import { useBookmarks } from './hooks/useBookmarks';
import { extractTweetId } from './utils/tweetUtils';

const App: React.FC = () => {
  const { bookmarks, addBookmark } = useBookmarks();

  useEffect(() => {
    const observeBookmarkButtons = () => {
      const bookmarkButtons = document.querySelectorAll(
        '[data-testid="bookmark"], div[role="button"][aria-label*="Bookmark"]'
      );

      bookmarkButtons.forEach(button => {
        if (button.getAttribute('data-bookmark-listener')) return;
        button.setAttribute('data-bookmark-listener', 'true');

        button.addEventListener('click', () => {
          const tweetContainer = button.closest('article');
          if (tweetContainer) {
            const tweetId = extractTweetId(tweetContainer);
            if (tweetId) {
              console.log('Bookmarked Tweet ID:', tweetId);
              
              // Create a basic tweet object
              const tweet = {
                id: tweetId,
                content: tweetContainer.textContent || '',
                author: '', // You'd need to extract this
                timestamp: Date.now()
              };

              addBookmark(tweet);
            }
          }
        });
      });
    };

    // Initial run
    observeBookmarkButtons();

    // Continuous observation
    const observer = new MutationObserver(observeBookmarkButtons);
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    return () => observer.disconnect();
  }, [addBookmark]);

  return (
    <div>
      <h1>Bookmarked Tweets</h1>
      {Object.values(bookmarks).map(tweet => (
        <div key={tweet.id}>
          Tweet ID: {tweet.id}
          {/* Add more tweet details */}
        </div>
      ))}
    </div>
  );
};

export default App;