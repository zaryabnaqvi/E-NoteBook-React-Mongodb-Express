import React, {useState} from 'react'
import { Link, useLocation } from 'react-router-dom'



export default function NavBar() {


    let auth=localStorage.getItem("token")
    let location = useLocation();


    const [credentials, setCredentials] = useState({ Email: "", Password: "" })
    const [User, setUser] = useState({ nname: "", nEmail: "", npassword: "" })
    const OnChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    const LoginSubmit = async (e) => {
        e.preventDefault();
        console.log(credentials)
        const data = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: credentials.Email, password: credentials.Password })
        })

        const json = await data.json()
        localStorage.setItem("token", json.token)
        document.location.reload();
        console.log(json)

    }
    const onChange = (e) => {
        setUser({ ...User, [e.target.name]: e.target.value })
    }

    const SignUp = async (e) => {
        e.preventDefault();
        const data = await fetch("http://localhost:5000/api/auth", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: User.nname, email: User.nEmail, password: User.npassword })
        })
        
        const json = await data.json()
        localStorage.setItem("token",json.token)
        document.location.reload();
        console.log(json)
    }
    const LogOut=()=>{
        localStorage.removeItem("token")
        document.location.reload();
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">e-NoteBook</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${(location.pathname === "/") ? "active" : ""}`} aria-current="page" to="/">Dashboard</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${(location.pathname === "/about") ? "active" : ""}`} to="/about">About</Link>
                            </li>
                        </ul>

                        <div>

                            {!auth && <button type="button" className="btn btn-outline-secondary mx-2" data-bs-toggle="modal" data-bs-target="#LoginModal">
                                Login
                            </button>}

                            <div className="modal fade" id="LoginModal" tabIndex="-1" aria-labelledby="LoginModalLabel" aria-hidden="true">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="LoginModalLabel">Login</h5>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            <form onSubmit={LoginSubmit}>
                                                <div className="mb-3">
                                                    <label htmlFor="Email" className="form-label">Email address</label>
                                                    <input type="email" className="form-control" onChange={OnChange} id="Email" aria-describedby="emailHelp" name='Email' />
                                                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="Password" className="form-label">Password</label>
                                                    <input type="password" className="form-control" onChange={OnChange} id="Password" name="Password" />
                                                </div>

                                                <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Login</button>
                                            </form>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>

                            {!auth&&<button type="button" className="btn btn-outline-secondary mx-2" data-bs-toggle="modal" data-bs-target="#SignModal">
                                Sign up
                            </button>}


                            <div className="modal fade" id="SignModal" tabIndex="-1" aria-labelledby="SignModalLabel" aria-hidden="true">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="SignModalLabel">Sign Up</h5>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            <form>
                                                <div className="mb-3">
                                                    <label htmlFor="nname" className="form-label">Name</label>
                                                    <input type="text" className="form-control" id="nname" name='nname' onChange={onChange} />
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="nEmail" className="form-label">Email</label>
                                                    <input type="text" className="form-control" id="nEmail" name='nEmail' onChange={onChange} />
                                                </div>
                                                <div className="mb-3 ">
                                                    <label htmlFor="npassword" className="form-label">Password</label>
                                                    <input type="password" className="form-control" id="npassword" name='npassword' onChange={onChange} />
                                                </div>
                                                <button type="submit" onClick={SignUp} className="btn btn-primary mb-3">Sign Up</button>
                                            </form>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {auth &&<button type="button" onClick={LogOut} className="btn btn-outline-secondary mx-2" >
                                Log out
                            </button>}
                    </div>
                </div>
            </nav>

        </>
    )
}
