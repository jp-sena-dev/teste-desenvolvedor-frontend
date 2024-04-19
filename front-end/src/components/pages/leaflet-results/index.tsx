import './leaflet-results.scss';
import { useEffect, useState } from 'react';
import { fetchLeaflets } from '../../../utils/api/get-leaflet';
import { useNavigate, useParams } from 'react-router-dom';
import { FetchLeaflet, Leaflet, SortQueryleaflet } from '../../../types/leaflet';
import { LeafletTable } from './components/leaflet-table';
import { ResultsHeader } from './components/results-header';
import { PaginationButton } from '../../atoms/pagination-button';
import { ModalMedicine } from './components/medicine-modal';

export function LeafletResults() {
  const param = useParams();
  const navigate = useNavigate();
  const [medicationList, setMedicationList] = useState<FetchLeaflet>();
  const [currentePageNumber, setCurrentePageNumber] = useState(1);
  const [medicationSort, setMedicationSort] = useState<SortQueryleaflet | undefined>();
  const [showMedicineInformation, setShowMedinecineInformation] = useState<Leaflet | undefined>();

  const searchMedications = async (pageNumber?: number) => {
    try {
      const data = await fetchLeaflets({
        company: param.company,
        name: param.name,
        page: pageNumber || 1,
        id: param.id,
        sort: medicationSort,
      });
      setCurrentePageNumber(pageNumber || 1)
      setMedicationList(data);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    searchMedications();
  }, [medicationSort]);

  const handleChangeSort = (value?: SortQueryleaflet) => {
    if (value) setMedicationSort(value);
  };

  const handleClickLastPage = () => {
    if (medicationList?.prev) searchMedications(medicationList?.prev);
  }

  const handleClickNextPage = () => {
    if (medicationList?.next) searchMedications(medicationList?.next);
  }

  return (
    <main id="results-page">
      <div className="results-container">
        <ModalMedicine isOpen={!!showMedicineInformation} medicineInfo={showMedicineInformation} onClose={() => setShowMedinecineInformation(undefined)} />
        <ResultsHeader handleChangeSort={handleChangeSort} />
        <LeafletTable
          hadleClick={setShowMedinecineInformation}
          medicationList={medicationList}
        />
        <div className="buttons-container">
          <button className="back" onClick={() => navigate('/')}>Voltar</button>
          {medicationList?.pages > 1 && (
            <div>
              <PaginationButton
                handleClickLastPage={handleClickLastPage}
                handleClickNextPage={handleClickNextPage}
                handleClickNumberPage={searchMedications}
                paginationInformation={
                  {
                    currentePageNumber,
                    pageCount: medicationList?.pages || 1
                  }
                }
              />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
