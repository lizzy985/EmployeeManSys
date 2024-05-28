import React, { useState } from 'react'
import { createEmployee, getEmployee, updateEmployee } from '../services/EmployeeService'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { listDepartments } from '../services/DepartmentService'


function EmployeeComponent() {

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  //add department
  const [departmentId, setDepartmentId] = useState('')
  const [departments, setDepartments] = useState([])// "[]"

  const {id} = useParams();

  useEffect(() => {
    listDepartments().then((response) => {
      setDepartments(response.data)
    }).catch((error) => {
      console.error(error)
    })
  }, [])

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    //add department
    department: ''
  })

  const navigator = useNavigate()

  //显示旧数据
  useEffect(() => {
    if(id) {
      getEmployee(id).then((response) => {
        setFirstName(response.data.firstName)
        setLastName(response.data.lastName)
        setEmail(response.data.email)
        //add dapartment
        setDepartmentId(response.data.departmentId)
      }).catch(error => {
        console.error(error);
      })
    }
  }, [id])

  // function handleFirstName(e) {
  //     setFirstName(e.target.value)
  // }

  // function handleLastName(e) {
  //   setLastName(e.target.value)
  // }

  // function handleEmail(e) {
  //   setEmail(e.target.value)
  // }

  // const handleFirstName = (e) => setFirstName(e.target.value)
  // const handleLastName = (e) => setLastName(e.target.value)
  // const handleEmail = (e) => setEmail(e.target.value)

  function saveOrUpdateEmployee(e) {
    //prevent default activities that will happen while submitting the form
    e.preventDefault()

    if(validForm()) {
      
      //add department
      const employee = {firstName, lastName, email, departmentId}
      console.log(employee)

      if(id) {
        updateEmployee(id, employee).then((response) => {
          console.log(response.data)
          navigator('/employees')
        }).catch(error => {
          console.error(error)
        })
      }else {
        createEmployee(employee).then((response) => {
          console.log(response.data);
          navigator('/employees');
        }).catch(error =>{
          console.error(error)
        })
      }
      
    }
    
  }

  function validForm() {
    let valid = true

    //use spread operator to copy object
    const errorsCopy = {... errors}

    if(firstName.trim()) {
      errorsCopy.firstName = ''
    }else {
      errorsCopy.firstName = 'First name is required'
      valid = false
    }

    if(lastName.trim()) {
      errorsCopy.lastName = ''
    }else {
      errorsCopy.lastName = 'Last name is required'
      valid = false
    }

    if(email.trim()) {
      errorsCopy.email = ''
    }else {
      errorsCopy.email = 'Email is required'
      valid = false
    }

    //add department
    if(departmentId) {
      errorsCopy.department = ''
    }else {
      errorsCopy.department = 'Select Department '
      valid = false
    }

    setErrors(errorsCopy);
    return valid;

  }

  function pageTitle() {
      if(id) {
        return <h2 className='text-center'>Update Employee</h2>
      }else {
        return <h2 className='text-center'>Add Employee</h2>
      } 
  }

  return (
    <div className='container'>
      <br /><br />
      <div className='row'>
        <div className='card col-md-6 offset-md-3 offset-md-3'>
          {/* <h2 className='text-center'>Add Employee</h2> */}
          {
            pageTitle()
          }
          <div className='card-body'>
            <form action="">
              <div className='form-group mb-2'>
                <label className='form-label' >First Name: </label>
                <input type="text" 
                  placeholder='Enter Employee First Name' 
                  name='firstName' value={firstName} 
                  className={`form-control ${ errors.firstName ? 'is-invalid':'' }`} 
                  onChange={(e) => setFirstName(e.target.value)}/>
                {errors.firstName && <div className='invalid-feedback'> {errors.firstName} </div>}
              </div>

              <div className='form-group mb-2'>
                <label className='form-label' >Last Name: </label>
                {/* value={lastName}  中 lastName为state varibales (useState里的lastName) */}
                <input type="text" 
                  placeholder='Enter Employee Last Name' 
                  name='lastName' value={lastName} 
                  className={`form-control ${errors.lastName ? 'is-invalid': '' }`} 
                  onChange={(e) => setLastName(e.target.value)}/>
                {errors.lastName && <div className='invalid-feedback'> {errors.lastName} </div>}             
              </div>

              <div className='form-group mb-2'>
                <label className='form-label' >Email: </label>
                <input type="text" 
                  placeholder='Enter Employee Email' 
                  name='email' value={email} 
                  className={`form-control ${errors.email ? 'is-invalid': '' }`} 
                  onChange={(e) => setEmail(e.target.value)}/>
                { errors.email && <div className='invalid-feedback'> { errors.email} </div>}
              </div>

              <div className='form-group mb-2'>
                <label className='form-label' >Select Department: </label>

                <select 
                  className={`form-control ${errors.department? 'is-invalid': '' }`}  
                  value={departmentId} 
                  onChange={(e) => setDepartmentId(e.target.value)}>
                    <option value="Select Department">Select Department</option>
                    {
                      departments.map(department => <option key={department.id} value={department.id}>{department.departmentName}</option>)
                    }
                </select>
                { errors.department && <div className='invalid-feedback'> { errors.department} </div>}
              </div>

              <button className='btn btn-success' onClick={saveOrUpdateEmployee}>Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmployeeComponent