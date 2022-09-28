
import './App.css';
import Login from './components/Login';
import Admin from './components/Admin';
import Trainer from './components/Trainer'
import Customer from './components/Customer';
import Signup from './components/Signup';
import Home from './components/Home';
import{
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"
function App() {
  return (
   <div>
     <Routes>
       <Route path='/' element={<Home/>}/>
       <Route path ='/customer' element ={<Customer/>}/>
       <Route path ='/admin' element ={<Admin/>}/>
       <Route path ='/trainer' element ={<Trainer/>}/>
       <Route path ='/signup' element ={<Signup />}/>
       <Route path ='/login' element ={<Login />}/> 
    </Routes>
     {/* <Login/> */}

   </div>

    
  );
}

export default App;
