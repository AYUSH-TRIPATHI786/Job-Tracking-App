import Wrapper from '../assets/wrappers/Navbar';
import { FaAlignLeft, FaCaretDown, FaUserCircle } from 'react-icons/fa';
import Logo from './Logo';
import { useDispatch, useSelector } from 'react-redux';
import { clearStore,  toggleSidebar } from '../features/user/userSlice';
import { useState } from 'react';
const Navbar = () => {
	const [showLogout,setShowLogout] = useState(false)
	const { user } = useSelector((store) => store.user);
	const dispatch = useDispatch();
	const toggle = () => {
		dispatch(toggleSidebar());
	};
	return (
		<Wrapper>
			<div className="nav-center">
				<button className="toggle-btn" type="button" onClick={toggle}>
					<FaAlignLeft />
				</button>
				<div>
					<h3 className="logo-text">Dashboard</h3>
					<Logo />
				</div>
				<div className="btn-container">
					<button
						type="button"
						className="btn"
						onClick={() => setShowLogout(!showLogout)}
					>
						<FaUserCircle />
						{user?.name}
						<FaCaretDown />
					</button>

					<div className={`dropdown ${showLogout && 'show-dropdown'}`} >
						<button
							className="dropdown-btn"
							type="button"
							onClick={() => dispatch(clearStore('Logging Out...'))}
						>
							logout
						</button>
					</div>
				</div>
			</div>
		</Wrapper>
	);
};
export default Navbar;
