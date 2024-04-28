import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { loginContext } from '../../context/LoginContextProvider';

function Header() {
    const { setCurrentUserDetails } = useContext(loginContext);

    function userLogout() {
        sessionStorage.removeItem('token');
        setCurrentUserDetails({
            userLoginStatus: false,
            currentUser: {},
            err: "",
        });
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-dark text-white d-flex justify-content-around p-3">
            {/* Remove the empty anchor element */}
            <span className="navbar-brand"></span>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <Link className="nav-link text-white" to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-white" to="/signup">Signup</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-white" to="/signin">Signin</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-light" to="signin" onClick={userLogout}>
                            Signout
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Header;
