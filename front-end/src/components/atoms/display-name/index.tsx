import './display-name.scss';
import { Link, useLocation } from 'react-router-dom';

export function DisplayName() {
  const location = useLocation();
  const currentDisplay = location.pathname;

  console.log(currentDisplay)

  return (
    <div className='DisplayName'>
      <span className={`${currentDisplay === '/' && 'active'}`}>
        <Link to="/">Consultas / </Link>
      </span>
      { location.pathname.includes('bulario') && <span className="active">Bulário</span>}
    </div>
  );
}