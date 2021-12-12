import { SET_LIST_USERS } from '../consts';

export const setListUsers = (payload: object) => ({
	type: SET_LIST_USERS,
	payload,
});
