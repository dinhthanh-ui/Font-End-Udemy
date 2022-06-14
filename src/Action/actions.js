import { INCREMENT, DECREMENT, FETCH_USER_REQUEST, FETCH_USER_SUCCESS, FETCH_USER_ERROR } from "./types";
import axios from '../SetUp/axios';
export const increaseCounter = () =>
{
	return {
		type: INCREMENT,
	};
};

export const decreaseCounter = () =>
{
	return {
		type: DECREMENT,
	};
};

export const fetchAllGroups = () =>
{
	return async (dispatch, getState) =>
	{
		dispatch(fetchUsersRequest());
		try
		{
			const res = await axios.get('/api/v1/group/show')
			dispatch(fetchUsersSuccess(res.errorData))
		} catch (error)
		{
			console.log(error);
			dispatch(fetchUsersError());
		}

	}
}
export const fetchUsersRequest = () =>
{
	return {
		type: FETCH_USER_REQUEST,
	}
}
export const fetchUsersSuccess = (data) =>
{
	return {
		type: FETCH_USER_SUCCESS,
		dataGroups: data
	}
}
export const fetchUsersError = () =>
{
	return {
		type: FETCH_USER_ERROR
	}
}