import { Outlet } from 'react-router-dom';
import Wrapper from '../../assets/wrappers/SharedLayout';
import { BigSidebar, Navbar, SmallSidebar } from '../../components';
const SharedLayout = () => {
	// const {isSide}
	return (
		<Wrapper>
			<div className="dashboard">
				<SmallSidebar />
				<BigSidebar />
				<div>
					<Navbar />
					<div className="dashboard-page">
						<Outlet />
					</div>
				</div>
			</div>
		</Wrapper>
	);
};
export default SharedLayout;
