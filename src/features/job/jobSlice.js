import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { getUserFromLocalStorage } from '../../utils/localStorage';
import { createJobThunk, deleteJobThunk, editJobThunk } from './jobThunk';

const initialState = {
	isLoading: false,
	position: '',
	company: '',
	jobLocation: '',
	status: 'pending',
	jobType: 'full-time',
	editJobId: '',
	isEditing: false,
	statusOptions: ['pending', 'declined', 'interview'],
	jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship']
};

export const createJob = createAsyncThunk('job/createJob', createJobThunk);

export const editJob = createAsyncThunk('job/editJob', editJobThunk);

export const deleteJob = createAsyncThunk('job/deleteJob', deleteJobThunk);

const jobSlice = createSlice({
	name: 'job',
	initialState,
	reducers: {
		handleChange: (state, { payload: { name, value } }) => {
			state[name] = value;
		},
		clearValues: () => {
			return {
				...initialState,
				jobLocation: getUserFromLocalStorage()?.location || ''
			};
		},
		setEditJob: (state, { payload }) => {
			return { ...state, ...payload, isEditing: true };
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(createJob.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(createJob.fulfilled, (state, { payload }) => {
				toast.success('Job created successfully');
				state.isLoading = false;
			})
			.addCase(createJob.rejected, (state, { payload }) => {
				toast.error(payload);
				state.isLoading = false;
			})
			.addCase(editJob.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(editJob.fulfilled, (state, { payload }) => {
				toast.success('Job edited successfully');
				state.isLoading = false;
			})
			.addCase(editJob.rejected, (state, { payload }) => {
				toast.error(payload);
				state.isLoading = false;
			});
	}
});

export const { handleChange, clearValues, setEditJob } = jobSlice.actions;
export default jobSlice.reducer;
