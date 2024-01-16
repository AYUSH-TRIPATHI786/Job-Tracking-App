import { useState } from 'react';
import Wrapper from '../assets/wrappers/ChartsContainer';
import BarChart from './BarChart';
import AreaChart from './AreaChart';
import { useSelector } from 'react-redux';

const ChartsContainer = () => {
	const [chartType, setChartType] = useState('area');
    const {monthlyApplications:data} = useSelector(store=>store.allJobs)
	return (
		<Wrapper>
			<h4>monthly applications</h4>
			<button
				type="button"
				onClick={() => setChartType(chartType === 'bar' ? 'area' : 'bar')}
			>
				{chartType === 'bar' ? 'bar chart' : 'area chart'}
			</button>
			{chartType === 'bar' ? <BarChart data={data}/> : <AreaChart data={data}/>}
		</Wrapper>
	);
};
export default ChartsContainer;
