import { useState, useEffect } from 'react';
import { Logo } from '../components';
import Wrapper from '../assets/wrappers/RegisterPage';
import { FormRow } from '../components';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, registerUser } from '../features/user/userSlice';
import { useNavigate } from 'react-router-dom';
const initialState = {
	name: '',
	email: '',
	password: '',
	isMember: true
};

const Register = () => {
	const [values, setValues] = useState(initialState);
	const dispatch = useDispatch();
	const { isLoading, user } = useSelector((store) => store.user);

	const navigate = useNavigate();

	useEffect(() => {
		if (user) {
			setTimeout(() => {
				navigate('/');
			}, 3000);
		}
	}, [user, navigate]);

	const handleSubmit = (e) => {
		e.preventDefault();
		const { name, email, password, isMember } = values;
		if (!email || !password || (!isMember && !name)) {
			toast.error('Please fill out all the fields');
			return;
		}
		if (values.isMember) {
			dispatch(loginUser({ email, password }));
		} else {
			dispatch(registerUser({ name, email, password }));
		}
	};
	const handleChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};
	const toggleMember = () => {
		setValues({ ...values, isMember: !values.isMember });
	};
	return (
		<Wrapper className="full-page">
			<form className="form" onSubmit={handleSubmit}>
				<Logo />
				<h3>{values.isMember ? 'Login' : 'Register'}</h3>

				{/* name field */}
				{!values.isMember && (
					<FormRow
						name="name"
						type="text"
						value={values.name}
						handleChange={handleChange}
					/>
				)}

				{/* email field */}
				<FormRow
					name="email"
					type="email"
					value={values.email}
					handleChange={handleChange}
				/>
				{/* password field */}
				<FormRow
					name="password"
					type="password"
					value={values.password}
					handleChange={handleChange}
				/>
				<button type="submit" className="btn btn-block" disabled={isLoading}>
					submit
				</button>
				<button
					type='button'
					className="btn btn-block btn-hipster"
					onClick={() => {
						dispatch(loginUser({ email: 'testUser@test.com', password: 'secret' }));
					}}
				>
					{isLoading ? 'Loading...':'demo'}
				</button>
				<p>
					{values.isMember ? 'Not a member yet' : 'Already a member'}?
					<button type="button" className="member-btn" onClick={toggleMember}>
						{values.isMember ? 'Register' : 'Login'}
					</button>
				</p>
			</form>
		</Wrapper>
	);
};
export default Register;
