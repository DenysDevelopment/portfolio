import { SET_USER_DATA } from '../consts';

export const setUserData = (payload: object) => ({
	type: SET_USER_DATA,
	payload,
});
