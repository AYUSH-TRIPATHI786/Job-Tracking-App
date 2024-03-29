import customFetch, { checkForUnauthorizedResponse } from '../../utils/axios';
import { clearAllJobsState } from '../allJobs/allJobsSlice';
import { clearValues } from '../job/jobSlice';
import { logoutUser } from './userSlice';

export const registerUserThunk = async (url, user, thunkAPI) => {
	try {
		const resp = await customFetch.post(url, user);
		return resp.data;
	} catch (error) {
		return thunkAPI.rejectWithValue(error.response.data.msg);
	}
};

export const loginUserThunk = async (url, user, thunkAPI) => {
	try {
		const resp = await customFetch.post(url, user);
		return resp.data;
	} catch (error) {
		return thunkAPI.rejectWithValue(error.response.data.msg);
	}
};
export const updateUserThunk = async (url, user, thunkAPI) => {
	try {
		const resp = await customFetch.patch(url, user, {
			headers: {
				Authorization: `Bearer ${thunkAPI.getState().user.user.token}`
			}
		});
		return resp.data;
	} catch (error) {
		return checkForUnauthorizedResponse(error,thunkAPI);
	}
};

export const clearStoreThunk = async (message, thunkAPI) => {
	try {
		// logout user
		thunkAPI.dispatch(logoutUser(message));
		// clear allJobs state
		thunkAPI.dispatch(clearAllJobsState());
		// clear job input state
		thunkAPI.dispatch(clearValues());
		return Promise.resolve();
	} catch (error) {
		return Promise.reject();
	}
};
