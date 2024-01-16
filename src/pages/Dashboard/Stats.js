import { useDispatch, useSelector } from 'react-redux';
import { ChartsContainer, Loading, StatsContainer } from '../../components';
import { useEffect } from 'react';
import { getStats } from '../../features/allJobs/allJobsSlice';

const Stats = () => {
	const { isLoading, monthlyApplications } = useSelector(
		(store) => store.allJobs
	);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getStats());
	}, [dispatch]);
	if (isLoading) {
		return <Loading />;
	}
	return (
		<div>
			<StatsContainer />
			{monthlyApplications.length > 0 && <ChartsContainer />}
		</div>
	);
};
export default Stats;
