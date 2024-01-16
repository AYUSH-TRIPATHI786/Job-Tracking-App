import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Landing, Error, Register } from './pages';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
	SharedLayout,
	Stats,
	AddJob,
	AllJobs,
	Profile
} from './pages/Dashboard';
import ProtectedRoute from './pages/ProtectedRoute';

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route
						path="/"
						element={
							<ProtectedRoute>
								<SharedLayout />
							</ProtectedRoute>
						}
					>
						<Route index={true} element={<Stats />} />
						<Route path="all-jobs" element={<AllJobs />} />
						<Route path="add-job" element={<AddJob />} />
						<Route path="profile" element={<Profile />} />
					</Route>
					<Route path="landing" element={<Landing />} />
					<Route path="register" element={<Register />} />
					<Route path="*" element={<Error />} />
				</Routes>
				<ToastContainer position="top-center" />
			</BrowserRouter>
		</>
	);
}

export default App;
