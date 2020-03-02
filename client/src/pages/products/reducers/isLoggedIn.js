import { isLoggedIn } from "../../../core/services/auth.service";
import { SIGN_OUT_ACTION, SIGN_IN_ACTION } from "../actions";

export default (state = isLoggedIn(), {type = 'IN'}) => {
    switch(type) {
        case SIGN_IN_ACTION:
            return true;
        case SIGN_OUT_ACTION:
            return false;
        default:
            return state;
    }
}