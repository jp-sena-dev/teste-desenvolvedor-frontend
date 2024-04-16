import { useEffect, useState } from 'react';
import './query.scss'
import { fetchLeaflets } from '../../../utils/api/get-leaflet';
import { useParams } from 'react-router-dom';
import { PdfSvg } from '../../../../public/pdf-svg';
import { DisplayName } from '../../atoms/display-name';
import { FetchLeaflet } from '../../../types/leaflet';

export function LeafletResults() {
  const param = useParams();
  const [medicationList, setMedicationList] = useState<FetchLeaflet>();

  const searchMedications = async (pageNumber?: number) => {
    try {
      const data = await fetchLeaflets({
        company: param.company,
        id: param.id,
        name: param.name,
        page: pageNumber || 1,
      })
      // setInformationPages(rest)
      setMedicationList(data)
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
      <table>
        <thead>
          <tr>
            <th>Medicamento</th>
            <th>Empresa</th>
            <th>Expediente</th>
            <th>Data de Pubicação</th>
            <th>Bula do Paciente</th>
            <th>Bula do proficional</th>
          </tr>
        </thead>
        <tbody>
          {medicationList && medicationList.data.map((medication) => (
            <tr>
              <th>{medication.name}</th>
              <th>{medication.company}</th>
              <th>{medication.documents[0].expedient}</th>
              <th>{new Date(medication.published_at).toLocaleDateString('pt-BR')}</th>
              <th>
                <a
                  target='_blank'
                  href={medication.documents.filter((document) => document.type === 'PATIENT')[0].url}
                >
                  <PdfSvg/>
                </a>
              </th>
              <th>
                <a
                  target='_blank'
                  href={medication.documents.filter((document) => document.type === 'PROFESSIONAL')[0].url}
                >
                  <PdfSvg/>
                </a>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
      <button disabled={!medicationList?.prev} onClick={() => searchMedications(medicationList?.prev)}>{'<'}</button>
      {Array.from({ length: medicationList?.pages}).map((_, index) => (
        <button onClick={() => searchMedications(index + 1)}>{index + 1}</button>
      ))}
      <button disabled={!medicationList?.next} onClick={() => searchMedications(medicationList?.next)}>{'>'}</button>
    </main>
  );
}
