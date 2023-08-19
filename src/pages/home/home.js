
import Navbar from "../../components/navbar/Navbar";
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import DataTablePrompts from "../../components/datatable/tableprompts/DataTablePrompts";
import { Outlet, useLocation} from "react-router-dom";
const Home = () => {
    let location = useLocation();
    const token = sessionStorage.getItem('access_token');
    const navigate = useNavigate();
  
    useEffect(() => {
      if (!token) {
        navigate("/login");
      }
    }, [token, navigate]);
    
    return (
      <div>
        {token ? <Navbar /> : null}
      
        { location.pathname === "/" ? (
            //area del login 
            <>     
              <Navbar /> 
              <DataTablePrompts/>
            </> 
          ) : (                              
            <>
 
              <Outlet></Outlet>
              
            </>                     
          )        
        }    
      </div>
    );
  };
  
  export default Home;