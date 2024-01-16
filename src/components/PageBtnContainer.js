import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';
import Wrapper from '../assets/wrappers/PageBtnContainer';
import { useDispatch, useSelector } from 'react-redux';
import { changePage } from '../features/allJobs/allJobsSlice';

const PageBtnContainer = () => {
	const { numOfPages, page } = useSelector((store) => store.allJobs);
	const pages = Array.from({ length: numOfPages }, (_, index) => index + 1);
    const dispatch = useDispatch();
    const prevPage = () =>{
        dispatch(changePage(page-1))
    } 
    const nextPage = () => {
        dispatch(changePage(page+1))
    }
    
	return (
		<Wrapper>
			<button className="prev-btn" disabled={page===1} onClick={prevPage}>
				<HiChevronDoubleLeft />
				prev
			</button>
			<div className="btn-container">
				{pages.map((pageNumber) => {
					return (
						<button
							type="button"
							key={pageNumber}
							className={`pageBtn ${page === pageNumber ? 'active' : ''}`}
    						onClick={()=>dispatch(changePage(pageNumber))}
                        >
							{pageNumber}
						</button>
					);
				})}
			</div>
			<button className="next-btn" disabled={page===numOfPages} onClick={nextPage}>
				next
				<HiChevronDoubleRight />
			</button>
		</Wrapper>
	);
};
export default PageBtnContainer;
