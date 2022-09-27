
import './App.css';
import Login from './components/Login';
import Admin from './components/Admin';
import Trainer from './components/Trainer'
import Customer from './components/Customer';
import{
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"
function App() {
  return (
   <div>
     <Routes>
       <Route path='/' element={<Login/>}/>
       <Route path ='/customer' element ={<Customer/>}/>
       <Route path ='/admin' element ={<Admin/>}/>
       <Route path ='/trainer' element ={<Trainer/>}/>


    </Routes>
     {/* <Login/> */}

   </div>

    
  );
}

export default App;
