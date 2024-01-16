import { useDispatch, useSelector } from 'react-redux';
import Wrapper from '../../assets/wrappers/DashboardFormPage';
import { FormRow, FormRowSelect } from '../../components';
import { toast } from 'react-toastify';
import {
	clearValues,
	createJob,
	editJob,
	handleChange
} from '../../features/job/jobSlice';
import { useEffect } from 'react';

const AddJob = () => {
	const {
		editJobId,
		isLoading,
		isEditing,
		position,
		jobLocation,
		company,
		status,
		jobType,
		jobTypeOptions,
		statusOptions
	} = useSelector((store) => store.job);
	const { user } = useSelector((store) => store.user);
	const dispatch = useDispatch();
	const handleSubmit = (e) => {
		e.preventDefault();
		if (!position || !company || !jobLocation) {
			toast.error('Please Fill Out All Fields');
			return;
		}
		if(isEditing){
			dispatch(editJob({
				jobId: editJobId,
				job: {
					position,
					company,
					jobLocation,
					jobType,
					status
				}
			}))
			return 
		}
		dispatch(
			createJob({
				position,
				company,
				jobLocation,
				status,
				jobType
			})
		);
	};
	const handleJobInput = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		dispatch(handleChange({ name, value }));
	};
	useEffect(() => {
		if (!isEditing) {
			dispatch(handleChange({ name: 'jobLocation', value: user.location }));
		}
	}, [dispatch,isEditing,user.location]);
	return (
		<Wrapper>
			<form onSubmit={handleSubmit}>
				<h3>{isEditing ? 'edit job' : 'add job'}</h3>
				<div className="form-center">
					{/* position */}
					<FormRow
						type="text"
						name="position"
						label="position"
						value={position}
						handleChange={handleJobInput}
					/>
					{/* company */}
					<FormRow
						type="text"
						name="company"
						label="company"
						value={company}
						handleChange={handleJobInput}
					/>
					{/* location */}
					<FormRow
						type="text"
						name="jobLocation"
						label="job location"
						value={jobLocation}
						handleChange={handleJobInput}
					/>
					{/* status */}
					<FormRowSelect
						name="status"
						label="status"
						list={statusOptions}
						handleChange={handleJobInput}
						value={status}
					/>
					{/* job type */}
					<FormRowSelect
						name="jobType"
						label="job type"
						list={jobTypeOptions}
						handleChange={handleJobInput}
						value={jobType}
					/>
					{/* btn-container */}
					<div className="btn-container">
						<button
							className="btn btn-block clear-btn"
							type="button"
							onClick={() => dispatch(clearValues())}
						>
							clear
						</button>
						<button
							className="btn btn-block submit-btn"
							type="submit"
							disabled={isLoading}
						>
							submit
						</button>
					</div>
				</div>
			</form>
		</Wrapper>
	);
};
export default AddJob;
