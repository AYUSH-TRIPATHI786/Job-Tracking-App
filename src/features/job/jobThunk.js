import { getAllJobs, hideLoading, showLoading } from '../allJobs/allJobsSlice';
import customFetch, { checkForUnauthorizedResponse } from '../../utils/axios';
import { clearValues } from './jobSlice';

export const createJobThunk = async (job, thunkAPI) => {
	try {
		const resp = customFetch.post('/jobs', job, {
			headers: {
				Authorization: `Bearer ${thunkAPI.getState().user?.user?.token}`
			}
		});
		thunkAPI.dispatch(clearValues());
		return resp.data;
	} catch (error) {
		return checkForUnauthorizedResponse(error,thunkAPI);
	}
};

export const editJobThunk = async ({ jobId, job }, thunkAPI) => {
	try {
		const resp = customFetch.post(`/jobs/${jobId}`, job, {
			headers: {
				Authorization: `Bearer ${thunkAPI.getState().user?.user?.token}`
			}
		});
		thunkAPI.dispatch(clearValues());
		return resp.data;
	} catch (error) {
		return checkForUnauthorizedResponse(error,thunkAPI);
	}
};

export const deleteJobThunk = async (id, thunkAPI) => {
	try {
		thunkAPI.dispatch(showLoading());
		const resp = await customFetch.delete(`/jobs/${id}`, {
			headers: {
				Authorization: `Bearer ${thunkAPI.getState().user?.user?.token}`
			}
		});
		thunkAPI.dispatch(getAllJobs());
		return resp.data;
	} catch (error) {
		thunkAPI.dispatch(hideLoading());
		return checkForUnauthorizedResponse(error,thunkAPI);
	}
};