import { saveLikeToggle, saveTweet } from "../utils/api";
import { showLoading, hideLoading } from "react-redux-loading";

export const RECEIVE_TWEETS = "RECEIVE_TWEETS";
export const TOGGLE_TWEET = "TOGGLE_TWEET";
export const ADD_TWEET = "ADD_TWEET";

export const receiveTweets = tweets => ({
  type: RECEIVE_TWEETS,
  tweets
});

function addTweet(tweet) {
  return {
    type: ADD_TWEET,
    tweet
  };
}

export function handleAddTweet(text, replyingTo) {
  return (dispatch, getState) => {
    const { authedUser } = getState();
    console.log("user", authedUser);
    dispatch(showLoading());
    return saveTweet({
      text,
      author: authedUser,
      replyingTo
    })
      .then(tweet => dispatch(addTweet(tweet)))
      .then(dispatch(hideLoading()));
  };
}

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
