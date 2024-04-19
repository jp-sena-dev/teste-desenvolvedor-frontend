import { SortQueryleaflet } from '../../../../../types/leaflet';
import { DisplayName } from '../../../../atoms/display-name';
import './results-header.scss';

interface ResultsHeaderProps {
  handleChangeSort: (para?: SortQueryleaflet) => void;
}

export function ResultsHeader({ handleChangeSort }: ResultsHeaderProps) {
  return (
    <div id='results-container-header'>
      <DisplayName />
      <select
        className='sort-select'
        onChange={({ target }) => handleChangeSort(target.value as SortQueryleaflet | undefined)}
      >
        <option value="">Ordernar por:</option>
        <option value="published_at">Data</option>
        <option value="name">Nome</option>
      </select>
    </div>
  );
}
