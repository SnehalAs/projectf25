
import { Link } from 'react-router-dom';
import './index.css'
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';


const Header = ()=>{

    const navigate = useNavigate();

    const handleLogout = () => {
        Cookies.remove('jwtToken');
        navigate('/login');
    };

    return (

        <nav className='my-nav'>
                       <Link to="/">
                        <img src="https://assets.ccbp.in/frontend/react-js/logo-img.png" className='web-logo' />
                        </Link>

                <ul className='nav-ul-cont'>
                    <li>
                        <Link to="/" className='my-nav-items'>Home</Link>
                    </li>
                    <li>
                        <Link to="/jobs"  className='my-nav-items'>Jobs</Link>
                    </li>
                </ul>

                <button  onClick={handleLogout} className='btn btn-primary'>Logout</button>

        </nav>

    )
}


export default Header;