import { Link } from 'react-router-dom';
import "../styles/navigation.scss"
const Navigation = () => {
  return (
    <nav className='navigation'>
      <ul className='navigation-container'>
        <li className='navigation-container-item'>
          <Link to="/">Home</Link>
        </li>
        <li className='navigation-container-item'>
          <Link to="/units">Units</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
