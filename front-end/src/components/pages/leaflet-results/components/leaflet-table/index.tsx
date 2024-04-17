import './leaflet-table.scss';
import { PdfSvg } from '../../../../../assets/pdf-svg';
import { FetchLeaflet } from '../../../../../types/leaflet';

interface LeafletTableProps {
  medicationList?: FetchLeaflet;
}

export function LeafletTable({ medicationList }: LeafletTableProps) {
  return (
    <div className="Table">
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
            <tr className='MedicineItem'>
              <th className="medicineName">{medication.name}</th>
              <th className="medicineCompany">{medication.company}</th>
              <th>{medication.documents[0].expedient}</th>
              <th>{new Date(medication.published_at).toLocaleDateString('pt-BR')}</th>
              <th>
                <a
                  target="_blank"
                  href={medication.documents.filter((document) => document.type === 'PATIENT')[0].url}
                >
                  <PdfSvg/>
                </a>
              </th>
              <th>
                <a
                  target="_blank"
                  href={medication.documents.filter((document) => document.type === 'PROFESSIONAL')[0].url}
                >
                  <PdfSvg/>
                </a>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
