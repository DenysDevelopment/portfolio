import { SET_USER_DATA } from '../consts';

interface UserDataType {
	name: string;
	uid: string;
	works: [];
	email: string;
}

const initialState: UserDataType = {
	name: '',
	email: '',
	uid: '',
	works: [],
};

export const userDataReducer = (state: any = initialState, action: any) => {
	switch (action.type) {
		case SET_USER_DATA:
			return {
				...state,
				...action.payload,
			};
		default:
			return state;
	}
};
