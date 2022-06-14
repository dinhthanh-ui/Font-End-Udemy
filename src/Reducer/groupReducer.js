import { FETCH_USER_REQUEST, FETCH_USER_SUCCESS, FETCH_USER_ERROR } from '../Action/types'

const INITIAL_STATE = {
	listGroup: [],
};
const groupReducer = (state = INITIAL_STATE, action) =>
{
	switch (action.type) 
	{
		case FETCH_USER_REQUEST:
			return {
				...state,
			};
		case FETCH_USER_SUCCESS:
			return {
				...state,
				listGroup: action.dataGroups,
			};
		case FETCH_USER_ERROR:
			return {
				...state,
			};
		default: return state;
	}
};
export default groupReducer;