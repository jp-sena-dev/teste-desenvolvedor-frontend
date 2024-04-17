import './leaflet-mobile-table.scss';
import { useState } from 'react';
import { FetchLeaflet, Leaflet } from '../../../../../types/leaflet';
import { ModalTable } from './components/modal-table';

interface LeafletMobileTableProps {
  medicationList?: FetchLeaflet;
}

export function LeafletMobileTable({ medicationList }: LeafletMobileTableProps) {
  const [showMoreInformation, setShowMoreInformation] = useState<Leaflet | undefined>(undefined);

  return (
    <div className="Table-Mobile">
      <ModalTable medicationData={showMoreInformation} onClose={() => {setShowMoreInformation(undefined)}} />
      <table>
        <thead>
          <tr>
            <th>Medicamento</th>
            <th>Empresa</th>
            <th>Sobre</th>
          </tr>
        </thead>
        <tbody>
          {medicationList && medicationList.data.map((medication) => (
            <tr>
              <th>{medication.name}</th>
              <th>{medication.company}</th>
              <th><a rel="stylesheet" href="#" onClick={() => setShowMoreInformation(medication)}>ver mais...</a></th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
