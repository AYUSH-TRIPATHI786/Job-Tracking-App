import { useDispatch, useSelector } from 'react-redux';
import Wrapper from '../assets/wrappers/JobsContainer';
import Job from './Job';
import Loading from './Loading';
import { getAllJobs } from '../features/allJobs/allJobsSlice';
import { useEffect } from 'react';
import PageBtnContainer from './PageBtnContainer';
const JobsContainer = () => {
	const {
		jobs,
		isLoading,
		numOfPages,
		totalJobs,
		page,
		search,
		searchType,
		searchStatus,
		sort
	} = useSelector((store) => store.allJobs);
	const dispatch = useDispatch();
	// const handleGetAllJobs = ()=> {
	//     dispatch(getAllJobs())
	// }

	useEffect(() => {
		dispatch(getAllJobs());
	}, [dispatch,page, search, searchType, searchStatus, sort]);

	if (isLoading) {
		return <Loading />;
	}
	if (jobs.length === 0) {
		return (
			<Wrapper>
				<h2>No jobs to display</h2>
			</Wrapper>
		);
	}

	return (
		<Wrapper>
			<h5>
				{totalJobs} job{totalJobs > 1 ? 's' : ''} found
			</h5>
			<div className="jobs">
				{jobs.map((job) => (
					<Job key={job._id} {...job} />
				))}
			</div>
			{numOfPages > 1 && <PageBtnContainer />}
		</Wrapper>
	);
};
export default JobsContainer;
