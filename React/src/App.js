
import React from 'react';

import Rotas from "./main/Rotas"
import "bootswatch/dist/flatly/bootstrap.css"
import "./views/custom.css"
import "./components/navBar"
import "toastr/build/toastr.min.js"
import NavBar from './components/navBar';
import { AuthProviderr } from './context/context';
import "toastr/build/toastr.css"
import "primereact/resources/themes/lara-light-indigo/theme.css";  
import "primereact/resources/primereact.min.css";                  
import "primeicons/primeicons.css";                               
 

class App  extends React.Component {

  render(){
    return[
      <AuthProviderr>
        <NavBar></NavBar>
     <div  className='container'> 
       <Rotas/>
    </div>
    </AuthProviderr>
    ]
  }
}

export default App;
