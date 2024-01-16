import { FaTimes } from 'react-icons/fa';
import Wrapper from '../assets/wrappers/SmallSidebar';
import Logo from './Logo';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar } from '../features/user/userSlice';
import NavLinks from './NavLinks';

const SmallSidebar = () => {
	const { isSidebarOpen } = useSelector((store) => store.user);
	const dispatch = useDispatch();
	const toggle = () => dispatch(toggleSidebar());
	return (
		<Wrapper>
			{isSidebarOpen}
			<div className={`sidebar-container ${isSidebarOpen ? 'show-sidebar' : ''}`}>
				<div className="content">
					<button type="button" className="close-btn" onClick={toggle}>
						<FaTimes />
					</button>
					<header>
						<Logo />
					</header>
					<NavLinks toggleSidebar={toggle}/>
				</div>
			</div>
		</Wrapper>
	);
};
export default SmallSidebar;
