import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
    const isAuth = false;
    return (
        <nav className="light-blue">
            <div className="nav-wrapper row">
                <Link to="/" className="brand-logo left col s4">
                    CP
                </Link>
                <div className=" col s6 right row">
                    <div class="input-field col s6 " style={{ height: "auto" }}>
                        <input id="search" type="search" required />
                        <label class="label-icon" for="search">
                            <i class="material-icons">search</i>
                        </label>
                        <i class="material-icons">close</i>
                    </div>
                    <ul id="nav-mobile" className="right hide-on-med-and-down col s4">
                        <li>
                            <Link to="/films">Films</Link>
                        </li>
                        <li>
                            <Link to="/books">Books</Link>
                        </li>
                        {isAuth ? (
                            <li>
                                <Link to="/">Выйти</Link>
                            </li>
                        ) : (
                            <li>
                                <Link to="/">Войти</Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Header;
