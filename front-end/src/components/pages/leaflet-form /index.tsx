import { useState } from 'react';
import './query.scss'
import { useNavigate } from 'react-router-dom';
import { DisplayName } from '../../atoms/display-name';

export function LeafletForm() {
  const [leafletName, setLeafletName] = useState('');
  const [leafleCompany, setLeafletCompany] = useState('');
  const [leafleId, setLeafletId] = useState('');

  const navigate = useNavigate();

  const HandleSubmit = async () => {
    navigate(`/bulario/name/${leafletName || '%20'}/company/${leafleCompany || '%20'}/id/${leafleId || '%20'}`)
  }


  return (
    <main>
      <DisplayName />
      <form onSubmit={(e) => { e.preventDefault(); HandleSubmit(); }}>
        <div>
          <label>
            Medicamento
            <input onChange={({ target }) => setLeafletName(target.value)} value={leafletName}/>
          </label>
          <label>
            ID
            <input onChange={({ target }) => setLeafletId(target.value)} value={leafleId}/>
          </label>
          <label>
            Compania
            <input onChange={({ target }) => setLeafletCompany(target.value)} value={leafleCompany}/>
          </label>
        </div>
        <div style={{ margin: '0 auto' }}>
          <button className='submit' type="submit">Consultar</button>
          <button type="submit">Limpar</button>
        </div>
      </form>
    </main>
  );
}
