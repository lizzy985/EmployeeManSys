
import './App.css'
import DepartmentComponent from './components/DepartmentComponent'
import EmployeeComponent from './components/EmployeeComponent'
import FooterComponents from './components/FooterComponents'
import HeaderComponent from './components/HeaderComponent'
import ListDepartmentComponent from './components/ListDepartmentComponent'
import ListEmployeeComponent from './components/ListEmployeeComponent'

import {BrowserRouter, Route, Routes} from 'react-router-dom'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
      <HeaderComponent />
      {/* Routes is a container or a parent for all the individual roure */}
        <Routes>
          {/* http://localhost:3000 */}
          <Route path='/' element = {<ListEmployeeComponent />}></Route>

            {/* http://localhost:3000/employees */}
          <Route path='/employees' element = {<ListEmployeeComponent />}></Route>

          {/* http://localhost:3000/add-employee */}
          <Route path='/add-employee' element = {<EmployeeComponent />}></Route>

          {/* http://localhost:3000/edit-employee/id */}
          <Route path='/edit-employee/:id' element = {<EmployeeComponent />}></Route>

          {/* http://localhost:3000/departments*/}
          <Route path='/departments' element={<ListDepartmentComponent/>}></Route>

          {/* http://localhost:3000/add-department*/}
          <Route path='/add-department' element={<DepartmentComponent/>}></Route>

          {/* http://localhost:3000/edit-department/id*/}
          <Route path='/edit-department/:id' element={<DepartmentComponent/>}></Route>
          
        </Routes>
      {/* <ListEmployeeComponent /> */}
      <FooterComponents/>
    </BrowserRouter>
      
    </>
  )
}

export default App
