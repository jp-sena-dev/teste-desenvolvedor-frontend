import './query.scss';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DisplayName } from '../../atoms/display-name';

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
    <main>
      <DisplayName />
      <form onSubmit={(e) => { e.preventDefault(); HandleSubmit(); }}>
        <div>
          <label>
            Medicamento
            <input name="medicine" onChange={({ target }) => setLeafletName(target.value)} value={leafletName}/>
          </label>
          <label>
            ID
            <input name="id" onChange={({ target }) => setLeafletId(target.value)} value={leafleId}/>
          </label>
          <label>
            Compania
            <input name="company" onChange={({ target }) => setLeafletCompany(target.value)} value={leafleCompany}/>
          </label>
        </div>
        <div style={{ margin: '0 auto' }}>
          <button className='submit' type="submit">Consultar</button>
          <button type="button" onClick={HandleResetInfos}>Limpar</button>
        </div>
      </form>
    </main>
  );
}
