import { getInitialData } from "../utils/api";
import { receiveUsers } from "./users";
import { receiveTweets } from "./tweets";
import { setAuthedUser } from "./authedUser";

// hard-coded for demo purposes
const AUTHED_ID = "sarah_edo";
export const handleInitialData = () => dispatch =>
  getInitialData().then(({ users, tweets }) => {
    dispatch(receiveUsers(users));
    dispatch(receiveTweets(tweets));
    dispatch(setAuthedUser(AUTHED_ID));
  });
