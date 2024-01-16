import { useDispatch, useSelector } from 'react-redux';
import Wrapper from '../assets/wrappers/SearchContainer';
import { FormRow, FormRowSelect } from './';
import { clearFilters, handleChange } from '../features/allJobs/allJobsSlice';
import { useMemo, useState } from 'react';
const SearchContainer = () => {
	const [localSearch, setLocalSearch] = useState('');
	const {  searchStatus, searchType, sort, sortOptions, isLoading } =
		useSelector((store) => store.allJobs);
	const { statusOptions, jobTypeOptions } = useSelector((store) => store.job);
	const dispatch = useDispatch();
	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(setLocalSearch(''))
		dispatch(clearFilters());
	};
	const handleSearch = (e) => {
		dispatch(handleChange({ name: e.target.name, value: e.target.value }));
	};
	const debounce = () => {
		let timeoutId;
		return (e) => {
			setLocalSearch(e.target.value);
			clearTimeout(timeoutId);
			timeoutId = setTimeout(() => {
				dispatch(handleChange({ name: e.target.name, value: e.target.value }));
			}, 1000);
		};
	};
	const optimizedDebounce = useMemo(() => debounce(), []);
	return (
		<Wrapper>
			<form className="form">
				<h4>search form</h4>
				<div className="form-center">
					{/* search position */}

					<FormRow
						type="text"
						name="search"
						value={localSearch}
						handleChange={optimizedDebounce}
					/>
					{/* search by status */}
					<FormRowSelect
						label="status"
						name="searchStatus"
						value={searchStatus}
						handleChange={handleSearch}
						list={['all', ...statusOptions]}
					/>
					{/* search by type */}
					<FormRowSelect
						label="type"
						name="searchType"
						value={searchType}
						handleChange={handleSearch}
						list={['all', ...jobTypeOptions]}
					/>
					{/* sort */}
					<FormRowSelect
						name="sort"
						value={sort}
						handleChange={handleSearch}
						list={sortOptions}
					/>
					<button
						className="btn btn-block btn-danger"
						disabled={isLoading}
						onClick={handleSubmit}
					>
						clear filters
					</button>
				</div>
			</form>
		</Wrapper>
	);
};

export default SearchContainer;
