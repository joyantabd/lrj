import { createBrowserRouter } from "react-router-dom";
import Login from "../components/modules/auth/Login";
import Auth from "../components/layouts/Auth";



const PublicRouter  = createBrowserRouter([
    {path:'/', element: <Auth/>,
     children : [
        {path:'/', element: <Login/>},

     ]}

]); 

export default PublicRouter;