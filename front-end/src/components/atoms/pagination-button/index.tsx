import './pagination-button.scss';

type PaginationInfo = {
  pageCount: number;
  currentePageNumber: number;
}

interface PaginationButtonProps {
  handleClickLastPage: () => void;
  handleClickNextPage: () => void;
  handleClickNumberPage: (page: number) => void;
  paginationInformation: PaginationInfo;
}

export function PaginationButton({
  handleClickLastPage,
  handleClickNextPage,
  handleClickNumberPage,
  paginationInformation,
}: PaginationButtonProps) {
  return (
    <div id='pagination-button-container'>
      <button
        className='LastPage'
        onClick={handleClickLastPage}
      >
        {'Prev'}
      </button>
      {Array.from({ length: paginationInformation.pageCount}).map((_, index) => (
        <button
          className={`pagination-button-number ${paginationInformation.currentePageNumber - 1 === index  && 'active'}`}
          onClick={() => handleClickNumberPage(index + 1)}
        >
          {index + 1}
        </button>
      ))}
      <button
        className='NextPage'
        onClick={handleClickNextPage}
      >
        {'Next'}
      </button>
    </div>
  );
}