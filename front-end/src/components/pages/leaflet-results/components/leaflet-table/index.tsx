import './leaflet-table.scss';
import { FetchLeaflet, Leaflet } from '../../../../../types/leaflet';

interface LeafletTableProps {
  medicationList?: FetchLeaflet;
  hadleClick: (medication: Leaflet | undefined) => void;
}

export function LeafletTable({ medicationList, hadleClick }: LeafletTableProps) {
  return (
    <div className="table-results-container">
      <table>
        <thead>
          <tr>
            <th>Medicamento</th>
            <th>Empresa</th>
            <th>Saiba+</th>
          </tr>
        </thead>
        <tbody>
          {medicationList && medicationList.data.map((medication) => (
            <tr className='medicine-item'>
              <th className="medicine-name">{medication.name}</th>
              <th className="medicine-company">{medication.company}</th>
              <th>
                <a className="show-medicine-informations" href="#" onClick={() => hadleClick(medication)}>Saiba+</a>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
