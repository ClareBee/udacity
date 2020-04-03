import { saveLikeToggle } from "../utils/api";

export const RECEIVE_TWEETS = "RECEIVE_TWEETS";
export const TOGGLE_TWEET = "TOGGLE_TWEET";

export const receiveTweets = tweets => ({
  type: RECEIVE_TWEETS,
  tweets
});

function toggleTweet({ id, authedUser, hasLiked }) {
  return {
    type: TOGGLE_TWEET,
    id,
    authedUser,
    hasLiked
  };
}

export function handleToggleTweet(info) {
  return dispatch => {
    // for optimistic update
    dispatch(toggleTweet(info));
    // for api/db
    return saveLikeToggle(info).catch(e => {
      console.warn(`Error in handleToggleTweet: ${e}`);
      // reset tweet
      dispatch(toggleTweet(info));
      alert("There was an error liking this tweet");
    });
  };
}
