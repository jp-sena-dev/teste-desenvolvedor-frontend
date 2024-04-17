import './query.scss';
import { useEffect, useState } from 'react';
import { fetchLeaflets } from '../../../utils/api/get-leaflet';
import { useNavigate, useParams } from 'react-router-dom';
import { DisplayName } from '../../atoms/display-name';
import { FetchLeaflet } from '../../../types/leaflet';
import { LeafletTable } from './components/leaflet-table';
import { LeafletMobileTable } from './components/leaflet-mobile-table';

export function LeafletResults() {
  const param = useParams();
  const navigate = useNavigate();
  const [medicationList, setMedicationList] = useState<FetchLeaflet>();
  const [currentePageNumber, setCurrentePageNumber] = useState(1);

  const searchMedications = async (pageNumber?: number) => {
    try {
      const data = await fetchLeaflets({
        company: param.company,
        name: param.name,
        page: pageNumber || 1,
        id: param.id
      });
      setCurrentePageNumber(pageNumber || 1)
      setMedicationList(data);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    searchMedications();
  }, []);

  return (
    <main>
      <DisplayName />
      <LeafletTable medicationList={medicationList} />
      <LeafletMobileTable medicationList={medicationList} />
      <div className="ButtonSection">
        <button className="Back" onClick={() => navigate('/')}>Voltar</button>
        {medicationList?.pages > 1 && (
          <div>
            <button
              className='LastPage'
              disabled={medicationList?.prev > 0}
              onClick={() => searchMedications(medicationList?.prev)}
            >
              {'<'}
            </button>
            {Array.from({ length: medicationList?.pages}).map((_, index) => (
              <button
                className={`PageButton ${currentePageNumber - 1 === index  && 'active'}`}
                onClick={() => searchMedications(index + 1)}
              >
                {index + 1}
              </button>
            ))}
            <button
              className='NextPage'
              disabled={!medicationList?.next}
              onClick={() => searchMedications(medicationList?.next)}
            >
              {'>'}
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
