import { SET_LIST_USERS } from '../consts';

interface IsAuthReducerType {
	listUsers: [object];
}

const initialState: IsAuthReducerType = {
	listUsers: [{}],
};

export const listUsers = (state: any = initialState, action: any) => {
	switch (action.type) {
		case SET_LIST_USERS:
			return {
				...state,
				...action.paload,
			};
		default:
			return state;
	}
};
