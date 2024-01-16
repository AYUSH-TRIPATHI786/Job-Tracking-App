import { useState } from 'react';
import { FormRow } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import Wrapper from '../../assets/wrappers/DashboardFormPage';
import { toast } from 'react-toastify';
import { updateUser } from '../../features/user/userSlice';
const Profile = () => {
	const { user, isLoading } = useSelector((store) => store.user);
	const [userData, setUserData] = useState({
		name: user.name || '',
		lastName: user.lastName || '',
		email: user.email || '',
		location: user.location || ''
	});
	const dispatch = useDispatch()

	const handleSubmit = (e) => {
		e.preventDefault();
		const { name, lastName, email, location } = userData;
		if (!name || !lastName || !email || !location) {
			toast.error('Please fill out all the fields');
			return;
		}
		dispatch(updateUser(userData))
	};
	const handleChange = (e) => {
		setUserData({ ...userData, [e.target.name]: e.target.value });
	};
	return (
		<Wrapper>
			<form onSubmit={handleSubmit} className="form">
				<h3>Profile</h3>
				<div className="form-center">
					<FormRow
						label="name"
						name="name"
						type="text"
						value={userData.name}
						handleChange={handleChange}
					/>
					<FormRow
						label="last name"
						name="lastName"
						type="text"
						value={userData.lastName}
						handleChange={handleChange}
					/>
					<FormRow
						label="email"
						name="email"
						type="text"
						value={userData.email}
						handleChange={handleChange}
					/>
					<FormRow
						label="location"
						name="location"
						type="text"
						value={userData.location}
						handleChange={handleChange}
					/>
					<button type="submit" className="btn btn-block" disabled={isLoading}>
						{isLoading ? 'please wait...' : 'save changes'}
					</button>
				</div>
			</form>
		</Wrapper>
	);
};
export default Profile;
