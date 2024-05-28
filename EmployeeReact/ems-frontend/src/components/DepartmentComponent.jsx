import React, { useEffect, useState } from 'react'
import { createDepartment, getDepartment, updateDepartment } from '../services/DepartmentService'
import { useNavigate, useParams } from 'react-router-dom'

const DepartmentComponent = () => {

const [departmentName, setDepartmentName] = useState('')
const [departmentDescription, setDepartmentDescription] = useState('')

const navigator = useNavigate()
const {id} = useParams()

const [errors, setErrors] = useState({
        departmentName: '',
        departmentDescription: ''
    })

function handleDepartmentName(e) {
    setDepartmentName(e.target.value)
}

function handleDepartmentDescription(e) {
    setDepartmentDescription(e.target.value)
}


//显示旧数据
useEffect(() => {
    if(id) {
        getDepartment(id).then((response) => {
            setDepartmentName(response.data.departmentName)
            setDepartmentDescription(response.data.departmentDescription)
        }).catch((error) => {
            console.error(error)
        })
    }
},[id])

// function saveDepartment(e) {
//     e.preventDefault()

//     if(validForm()) {
//         const department = {departmentName, departmentDescription}
//         console.log(department)
        
//         createDepartment(department).then((response) => {
//             console.log(response.data)
//             navigator('/departments')
    
//         }).catch((error) => {
//             console.error(error)
//         })
//     }

// }

function saveOrUpdateDepartment(e) {
    e.preventDefault()

    if(validForm()) {
        const department = {departmentName, departmentDescription}
        console.log(department)

        if(id) {
            updateDepartment(id, department).then((response) => {
                console.log(response.data)
                navigator('/departments')
            }).catch((error) => {
                console.error(error)
            })

        }else {
            createDepartment(department).then((response) => {
                console.log(response.data)
                navigator('/departments')
        
            }).catch((error) => {
                console.error(error)
            })
        }
    }

}

function validForm() {
    let valid = true

    const copyError = {...errors}

    if(departmentName.trim()) {
        copyError.departmentName = ''
    }else {
        copyError.departmentName = 'Department Name is required'
        valid = false
    }

    if(departmentDescription.trim()){
        copyError.departmentDescription = ''
    }else {
        copyError.departmentDescription = 'Department Description is required'
        valid = false
    }

    setErrors(copyError)
    return valid

}

function pageTitle(){
    if(id) {
        return <h1 className='text-center'>Update Department</h1>
    }else {
        return <h2 className='text-center'>Add Department</h2> 
    }
}

  return (
    <div className='container'>
       <br /><br />
       <div className='row'>
           <div className='card col-md-6 offset-md-3 offset-md-3'>
               {/* <h2 className='text-center'>Add Department</h2> */}
               {pageTitle()}
               <div className='card-body'>
                    <form action="">
                        <div className='form-group mb-2'>
                            <label className='form-label' >Department Name:</label>
                            <input type="text" placeholder='Enter Department Name' name='departmentName' className={`form-control ${errors.departmentName ? 'is-invalid' : ''}`} value={departmentName}  onChange={handleDepartmentName}/>

                            {errors.departmentName && <div className='invalid-feedback'> {errors.departmentName} </div>}
                        </div>
                        
                        <div className='form-group mb-2'>
                            <label  className='form-label' >Department Description:</label>
                            <input type="text" placeholder='Enter Department Description' className={`form-control ${errors.departmentDescription ? 'is-invalid' : ''}`}  value={departmentDescription}  onChange={handleDepartmentDescription}/>
                            {errors.departmentDescription && <div className='invalid-feedback'> {errors.departmentDescription} </div>}
                        </div>

                        <button className='btn btn-success' onClick={saveOrUpdateDepartment}> Submit</button>
                    </form>
                </div>
            </div>
        </div>
    </div>  
       
  )
}

export default DepartmentComponent