import { Navbar, Nav } from 'rsuite';
import { Link } from 'react-router-dom';
import LoginLogout from '../components/LoginLogout';


export default function MainNavbar(props) {
    return <Navbar 
        style={{ background: "#673AB7" }} 
        className='text-white' 
        {...props}
    >
        <div className='container px-4 d-flex align-items-center justify-content-between'>
            <Link className='h-0 py-2 text-decoration-none text-white' to="/home">
                <span className='fw-bolder fs-4'>MyFD <i className="fas fa-coins"></i></span>
            </Link>

            <LoginLogout />
        </div>
    </Navbar>
}