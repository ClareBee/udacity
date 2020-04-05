import { LOG_IN_ERROR } from "../actions/errors";
import { SYSTEM_ERROR } from "../actions/errors";

export default function errors(state = null, action) {
  switch (action.type) {
    case LOG_IN_ERROR:
      return action.error;
    case SYSTEM_ERROR:
      return action.error;
    default:
      return state;
  }
}
