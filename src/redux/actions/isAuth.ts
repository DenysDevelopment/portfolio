import { IS_AUTHORIZED } from '../consts';

export const setIsAuth = (payload: boolean = true) => ({
	type: IS_AUTHORIZED,
	payload,
});
