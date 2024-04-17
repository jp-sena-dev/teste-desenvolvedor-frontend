import './modal-table.scss';
import { PdfSvg } from '../../../../../../../assets/pdf-svg';
import { Leaflet } from '../../../../../../../types/leaflet';

interface ModalTableProps {
  medicationData?: Leaflet;
  onClose: () => void;
}

export function ModalTable({ medicationData, onClose }: ModalTableProps) {
  return (
    <>
      {medicationData &&(
        <div className="modal">
          <h1>Sobre {medicationData.name}</h1>
          <button className="ButtonCloseModal" onClick={onClose}>x</button>
          <table>
            <tbody>
              <tr>
                <th>Medicamento</th>
                <td>{medicationData.name}</td>
              </tr>
              <tr>
                <th>Empresa</th>
                <td>{medicationData.company}</td>
              </tr>
              <tr>
                <th>Expediente</th>
                <td>{medicationData.documents[0].expedient}</td>
              </tr>
              <tr>
                <th>Data de Pubicação</th>
                <td>{new Date(medicationData.published_at).toLocaleDateString('pt-BR')}</td>
              </tr>
              <tr>
                <th>Bula do Paciente</th>
                <td>
                  <a
                    target="_blank"
                    href={medicationData.documents.filter((document) => document.type === 'PATIENT')[0].url}
                  >
                    <PdfSvg/>
                  </a>
                </td>
              </tr>
              <tr>
                <th>Bula do proficional</th>
                <td>
                  <a
                    target="_blank"
                    href={medicationData.documents.filter((document) => document.type === 'PROFESSIONAL')[0].url}
                  >
                    <PdfSvg/>
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
