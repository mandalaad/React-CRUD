import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import Input from './pages/Input/Input';
import DataTable from './pages/DataTable/DataTable';
function App() {
  return (
   <Routes>
    <Route path='/input' Component={Input}/>
    <Route path='/data' Component={DataTable}/>
   </Routes>
  );
}

export default App;
