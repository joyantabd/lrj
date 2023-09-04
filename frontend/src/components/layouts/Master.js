import {Outlet} from 'react-router-dom'
import NavBar from '../partials/NavBar';
import SideBar from '../partials/SideBar';
import Footer from '../partials/Footer';

const Master = () => {
    return (
        <>
        <NavBar/>
 
            <div id="layoutSidenav">
<SideBar/>
                <div id="layoutSidenav_content">
                    <main>
                        <div className="container-fluid px-4">
                            <Outlet/>

                        </div>
                    </main>
                    <Footer/>


                </div>
       
            </div >
        </>
    );
}

export default Master;