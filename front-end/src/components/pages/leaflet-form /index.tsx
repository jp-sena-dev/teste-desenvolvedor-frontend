import './leaflet-form.scss';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DisplayName } from '../../atoms/display-name';
import { Input } from '../../atoms/input';

export function LeafletForm() {
  const [leafletName, setLeafletName] = useState('');
  const [leafleCompany, setLeafletCompany] = useState('');
  const [leafleId, setLeafletId] = useState('');

  const navigate = useNavigate();

  const HandleSubmit = async () => {
    if (leafletName || leafleCompany || leafleId) {
      navigate((`/bulario/name/${leafletName || ' '}/company/${encodeURIComponent(leafleCompany) || ' '}/id/${leafleId || ' '}`))
    } 
  }

  const HandleResetInfos = () => {
    setLeafletName('');
    setLeafletCompany('');
    setLeafletId('');
  };

  return (
    <main id="leaflet-page-container">
      <div className="leaflet-form-container">
        <div>
          {/* <img src="https://images.pexels.com/photos/8949916/pexels-photo-8949916.jpeg" alt="" /> */}
          <h1>Boas vindas ao bulário online</h1>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); HandleSubmit(); }}>
          <DisplayName />
          <div>
            <Input description="Medicamento" name="medicine" onChange={({ target }) => setLeafletName(target.value)} value={leafletName}/>
            <Input description="ID" name="id" onChange={({ target }) => setLeafletId(target.value)} value={leafleId}/>
            <Input description="Empresa" name="company" onChange={({ target }) => setLeafletCompany(target.value)} value={leafleCompany}/>
          </div>
          <div>
            <button className='submit' type="submit">Consultar</button>
            <button type="button" onClick={HandleResetInfos}>Limpar</button>
          </div>
        </form>
      </div>
    </main>
  );
}
