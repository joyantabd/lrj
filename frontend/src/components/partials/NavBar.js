import { FaBars, FaUser } from "react-icons/fa";
import {Link} from 'react-router-dom'
import $ from 'jquery'
import Swal from 'sweetalert2'
import Constants from "../../Constants";
import axios from "axios";
import logo from './../../assets/img/logo.png'
import GlobalFunction from '../../GlobalFunction'
import { useEffect, useState } from "react";

function NavBar() {

    const [branch,setBranch] = useState({})

    

    const handleSidebar = () =>{
        $('body').toggleClass('sb-sidenav-toggled');
    }

    const handleLogout = () =>
    {
        Swal.fire({
            title: 'Are you sure?',
            text: "You will be logout from Panel",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Logout!'
          }).then((result) => {
            if (result.isConfirmed) {
                axios.post(`${Constants.BASE_URL}/logout`).then(res=>{
                    GlobalFunction.Logout()
            
                  }).catch(errors=>{
                    GlobalFunction.Logout()
                  })
            }
          })
    }

    useEffect(()=>{
        if(localStorage.branch != undefined){
            setBranch(JSON.parse(localStorage.branch))
        }
    },[])



    return ( 
        <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">

            <Link className="navbar-brand ps-3" to='/' >POS System</Link>

            <button onClick={handleSidebar} className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" href="#!"><FaBars/></button>

            <div className="d-flex justify-content-around p-2 mt-3">

                <p className="text-white fw-bold">{branch !=undefined ? branch.name : '' }</p>
            </div>


            <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">

            </form>

            <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
                <p className="text-white"> {localStorage.name !== undefined ? localStorage.name : null}</p>
            
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><FaUser/></a>
                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                        <li><a className="dropdown-item" href="#!">Settings</a></li>
                        <li><a className="dropdown-item" href="#!">Activity Log</a></li>
                        <li><hr className="dropdown-divider" /></li>
                        <li><button onClick={handleLogout} className="dropdown-item">Logout</button></li>
                    </ul>
                </li>
            </ul>
        </nav>
     );
}

export default NavBar;