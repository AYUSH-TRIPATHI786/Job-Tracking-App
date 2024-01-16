import {Logo} from '../components';
import main from '../assets/images/main.svg';
import Wrapper from '../assets/wrappers/LandingPage';
import { Link } from 'react-router-dom';

const Landing = () => {
	return (
		<Wrapper>
			<nav>
                <Logo/>
			</nav>
			<div className="container page">
				{/* info */}
				<div className="info">
					<h1>
						Job <span>Tracking</span> App
					</h1>
					<p>
						Cardigan 3 wolf moon viral fanny pack, lo-fi DSA pug. Succulents waistcoat
						jianbing lo-fi palo santo neutra tacos sustainable vinyl glossier. Fit
						copper mug heirloom
					</p>
					<Link to='/register' className="btn btn-hero">Login/Register</Link>
				</div>
                <img src={main} alt="job hunt" className="img main-img" />
				
			</div>
		</Wrapper>
	);
};
export default Landing;
