import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getStatsThunk, getAllJobsThunk } from './allJobsThunk';

const initialFilterState = {
	search: '',
	searchType: 'all',
	searchStatus: 'all',
	sort: 'latest',
	sortOptions: ['latest', 'oldest', 'a-z', 'z-a']
};

const initialState = {
	isLoading: false,
	jobs: [],
	totalJobs: 0,
	numOfPages: 1,
	page: 1,
	stats: {},
	monthlyApplications: [],
	...initialFilterState
};

export const getAllJobs = createAsyncThunk('allJobs/getJobs', getAllJobsThunk);
export const getStats = createAsyncThunk('allJobs/showStats', getStatsThunk);
const allJobsSlice = createSlice({
	name: 'allJobs',
	initialState,
	reducers: {
		showLoading: (state) => {
			state.isLoading = true;
		},
		hideLoading: (state) => {
			state.isLoading = false;
		},
		handleChange: (state, { payload: { name, value } }) => {
			state.page = 1;
			state[name] = value;
		},
		clearFilters: (state) => {
			return { ...state, ...initialFilterState };
		},
		changePage: (state, { payload }) => {
			state.page = payload;
		},
		clearAllJobsState: () => initialState
	},
	extraReducers: (builder) => {
		builder
			.addCase(getAllJobs.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getAllJobs.fulfilled, (state, { payload }) => {
				state.jobs = payload.jobs;
				state.numOfPages = payload.numOfPages;
				state.totalJobs = payload.totalJobs;
				state.isLoading = false;
			})
			.addCase(getAllJobs.rejected, (state, { payload }) => {
				console.log(payload);
				state.isLoading = false;
			})
			.addCase(getStats.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getStats.fulfilled, (state, { payload }) => {
				state.stats = payload.defaultStats;
				state.monthlyApplications = payload.monthlyApplications;
				state.isLoading = false;
			})
			.addCase(getStats.rejected, (state, { payload }) => {
				console.log(payload);
				state.isLoading = false;
			});
	}
});
export const {
	showLoading,
	hideLoading,
	handleChange,
	clearFilters,
	changePage,
	clearAllJobsState
} = allJobsSlice.actions;
export default allJobsSlice.reducer;
