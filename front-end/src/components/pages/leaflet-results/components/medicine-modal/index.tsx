import { DownloadSvg } from '../../../../../assets/download-svg';
import { PdfSvg } from '../../../../../assets/pdf-svg';
import { Leaflet } from '../../../../../types/leaflet';
import imgUrl from '../../../../../../../api/public/pdf_sample.pdf';

import './medicine-modal.scss';


interface ModalMedicineProps {
  medicineInfo?: Leaflet;
  isOpen: boolean;
  onClose: () => void;
}

export function ModalMedicine({ medicineInfo, onClose, isOpen }: ModalMedicineProps) {

  return (
    <div className={`modal-medicine-container ${!!medicineInfo && 'show'}`}>
      {isOpen && medicineInfo && (
        <>
          <h1>{medicineInfo && medicineInfo.name}</h1>
          <button className="Back close-modal" onClick={onClose}>X</button>
          <table>
            <tr>
              <th>Empresa:</th>
              <td>{medicineInfo.company}</td>
            </tr>
            <tr>
              <th>Publicado em:</th>
              <td>{new Date(medicineInfo.published_at).toLocaleDateString('pt-BR')}</td>
            </tr>
            <tr>
              <th>ID:</th>
              <td>{medicineInfo.id}</td>
            </tr>
            {medicineInfo && medicineInfo.active_principles.map((principle) => (
              <tr>
                <th>Princípio ativo:</th>
                <td>{principle.name}</td>
              </tr>
            ))}
            {medicineInfo && medicineInfo.documents.map((document) => (
              <tr>
                <th>{document.type === 'PATIENT' ? 'Profissional' : 'Paciente'}:</th>
                <td>
                  <a
                    target="_blank"
                    href={document.url}
                  >
                    <PdfSvg/>
                  </a>

                  <a href={imgUrl} download>
                    <DownloadSvg />
                  </a>
                </td>
              </tr>
            ))}
          </table>
        </>
      )}
    </div>
  );
}
