import React from 'react'
import { useState } from 'react'
import { deleteEmployee, listEmployees } from '../services/EmployeeService'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

//step1 create function
function ListEmployeeComponent() {

    //step2 dummydata
    // const dummyData = [
    //    {
    //     "id": "1",
    //     "firstName": "Lizzy",
    //     "lastName": "Max",
    //     "email": "test1@test.com"
    //    },
    //    {
    //     "id": "2",
    //     "firstName": "Mary",
    //     "lastName": "Jac",
    //     "email": "test2@test.com"
    //    },
    //    {
    //     "id": "3",
    //     "firstName": "LBob",
    //     "lastName": "Mac",
    //     "email": "test3@test.com"
    //    }
    // ]

    //useState hook  []2个参数 一个state variable 第二个update state variable
    const [employees, setEmployees] = useState([])

    const navigator = useNavigate();

    //write a logic to get the response of the REST API and store that data in a employees state
    useEffect(() => {
        // listEmployees().then((response) => {
            //consloe.log(response.data)
        //     setEmployees(response.data)
        // }).catch(error => {
        //     console.error(error);
        // })
        getAllemployees()
    }, [])

    function getAllemployees() {
        listEmployees().then((response) => {
            setEmployees(response.data)
        }).catch(error => {
            console.error(error)
        })
    }

    function addNewEmployee() {
        //whenever user click on this add employee button, navigate the user to the Add employee
        navigator('/add-employee')
    }

    function updateEmployee(id) {
        navigator(`/edit-employee/${id}`)//反引号
    }

    function removeEmployee(id) {
        console.log(id)

        deleteEmployee(id).then((response) => {
            // console.log(response.data)
            getAllemployees()
        }).catch(error => {
            console.error(error)
        })
    }

  return (
    //step3 jsx code to display data
    <div className='container'>  

        <h2 className='text-center'>List of Employees</h2>

        <button className='btn btn-primary mb-2' onClick={addNewEmployee}>Add Employee</button>

        <table className='table table-striped table-bordered'>
            {/* 表头 */}
            <thead>
                {/* 表格一行 */}
                <tr>
                    {/* 数据名称 列名 */}
                    <th>Employee Id</th>
                    <th>Employee First Name</th>
                    <th>Employee Last Name</th>
                    <th>Employee Email Id</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                    {
                        // dummyData.map(employee => 
                        employees.map(employee => 
                            <tr key={employee.id}>
                                <td>{employee.id}</td>
                                <td>{employee.firstName}</td>
                                <td>{employee.lastName}</td>
                                <td>{employee.email}</td>
                                <td>
                                    <button className='btn btn-info' onClick={() => updateEmployee(employee.id)}>Update</button>
                                    <button className='btn btn-danger' onClick={() => removeEmployee(employee.id)} style={{marginLeft: '10px'}}>Delete</button>                               
                                </td>

                            </tr>)
                    }
            </tbody>
        </table>
    </div>
  )
}

export default ListEmployeeComponent
