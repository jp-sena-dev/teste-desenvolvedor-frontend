import './display-name.scss';
import { Link, useLocation } from 'react-router-dom';

export function DisplayName() {
  const location = useLocation();

  return (
    <div className='DisplayNames'>
      <div className={`DisplayName ${location.pathname !== '/' ? '' : 'active'}`}>
        <Link to="/">Consultas</Link>
      </div>
      <div className={`DisplayName ${location.pathname.includes('bulario') ? 'active' : ''}`}>Bulário</div>
    </div>
  );
}