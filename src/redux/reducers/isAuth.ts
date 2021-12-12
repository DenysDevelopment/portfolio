import { IS_AUTHORIZED } from '../consts';

interface IsAuthReducerType {
	authUser: boolean;
}

const initialState: IsAuthReducerType = {
	authUser: false,
};

export const isAuthReducer = (state: any = initialState, action: any) => {
	switch (action.type) {
		case IS_AUTHORIZED:
			return {
				...state,
				authUser: true,
			};
		default:
			return state;
	}
};
