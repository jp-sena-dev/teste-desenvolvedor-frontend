import './display-name.scss';
import { Link, useLocation } from 'react-router-dom';

export function DisplayName() {
  const location = useLocation();

  return (
    <div className='DisplayNames'>
      <span className={`DisplayName ${location.pathname !== '/' ? '' : 'active'}`}>
        <Link to="/">Consultas / </Link>
      </span>
      { location.pathname.includes('bulario') && <span className="DisplayName active">Bulário</span>}
    </div>
  );
}