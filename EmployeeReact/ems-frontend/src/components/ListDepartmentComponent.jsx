import React, { useEffect, useState } from 'react'
import {  deleteDepartment, listDepartments } from '../services/DepartmentService'
import { useNavigate } from 'react-router-dom'

const ListDepartmentComponent = () => {

    // const DummyData = [
    //     {
    //         "id": "1",
    //         "departmentName": "R&D",
    //         "departmentDescription": "Research"
    //     },
    //     {
    //         "id": "2",
    //         "departmentName": "Sales",
    //         "departmentDescription": "Market sales" 
    //     }
    // ]

    const [departments, setDepartments] = useState([])

    useEffect(() => {
        // listDepartments().then((response) => {
        //     setDepartments(response.data)
        // }).catch(error =>{
        //     console.error(error)
        // })
        getAllDepartments()
    },[])

    function getAllDepartments() {
        listDepartments().then((response) => {
            setDepartments(response.data)
        }).catch(error =>{
            console.error(error)
        })
    }

    const navigator = useNavigate()

    function addNewDepartment() {
        navigator("/add-department")
    }

    function updateDepartment(id) {
        navigator(`/edit-department/${id}`)
    }
    function removeDepartment(id) {

        deleteDepartment(id).then((response) => {
            // console.log(response.data)
            // navigator('/departments')
            getAllDepartments()
        }).catch((error) => {
            console.error(error)
        })

    }
  return (
    <div className='container'>
        <h2 className='text-center'>List of Departments</h2>
        <button className='btn btn-primary mb-2' onClick={addNewDepartment}>Add Department</button>

        <table className='table table-striped table-bordered'>
            <thead>
                <tr>
                    <th>Department Id</th>
                    <th>Department Name</th>
                    <th>Department Description</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    // DummyData.map(department => 
                    departments.map(department => 
                    <tr key={department.id}>
                        <td>{department.id}</td>
                        <td>{department.departmentName}</td>
                        <td>{department.departmentDescription}</td>
                        <th>
                            <button className='btn btn-info' onClick={() => updateDepartment(department.id)}>Update</button>
                            <button className='btn btn-danger' onClick={() => removeDepartment(department.id)}>Delete</button>
                        </th>
                    </tr>)
                }    
                
            </tbody>
        </table>


    </div>
  )
}

export default ListDepartmentComponent