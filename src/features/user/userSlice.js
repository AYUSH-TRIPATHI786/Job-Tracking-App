import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
	addUserToLocalStorage,
	getUserFromLocalStorage,
	removeUserFromLocalStorage
} from '../../utils/localStorage';
import { clearStoreThunk, loginUserThunk, registerUserThunk, updateUserThunk } from './userThunk';
const initialState = {
	isLoading: false,
	isSidebarOpen: false,
	user: getUserFromLocalStorage()
};

export const registerUser = createAsyncThunk(
	'user/registerUser',
	(user, thunkAPI) => {
		return registerUserThunk('auth/register', user, thunkAPI);
	}
);

export const loginUser = createAsyncThunk(
	'user/loginUser',
	(user, thunkAPI) => {
		return loginUserThunk('auth/login', user, thunkAPI);
	}
);

export const updateUser = createAsyncThunk(
	'user/updateUser',
	(user, thunkAPI) => {
		return updateUserThunk('auth/updateUser', user, thunkAPI);
	}
);

export const clearStore = createAsyncThunk('user/clearStore',clearStoreThunk)
const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		logoutUser: (state,{payload}) => {
			state.user = false;
			state.isSidebarOpen = false;
			removeUserFromLocalStorage();
			if(payload){
				toast.success(payload);
			}
		},
		toggleSidebar: (state) => {
			state.isSidebarOpen = !state.isSidebarOpen;
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(registerUser.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(registerUser.fulfilled, (state, { payload }) => {
				const { user } = payload;
				state.user = user;
				addUserToLocalStorage(user);
				toast.success(`Hello there ${user.name}`);
				state.isLoading = false;
			})
			.addCase(registerUser.rejected, (state, { payload }) => {
				state.isLoading = false;
				toast.error(payload);
			})
			.addCase(loginUser.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(loginUser.fulfilled, (state, { payload }) => {
				const { user } = payload;
				state.user = user;
				addUserToLocalStorage(user);
				toast.success(`Welcome back ${user.name}`);
				state.isLoading = false;
			})
			.addCase(loginUser.rejected, (state, { payload }) => {
				state.isLoading = false;
				toast.error(payload);
			})
			.addCase(updateUser.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(updateUser.fulfilled, (state, { payload }) => {
				const { user } = payload;
				state.user = user;
				addUserToLocalStorage(user);
				toast.success(`User Updated!`);
				state.isLoading = false;
			})
			.addCase(updateUser.rejected, (state, { payload }) => {
				state.isLoading = false;
				toast.error(payload);
			})
			.addCase(clearStore.rejected, () => {
				toast.error('There was an error...');
			});
	}
});

export const { toggleSidebar, logoutUser } = userSlice.actions;
export default userSlice.reducer;
