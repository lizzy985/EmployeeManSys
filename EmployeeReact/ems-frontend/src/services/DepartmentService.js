import axios from "axios";

const DEPARTMENT_REST_API_BASE_URL = 'http://localhost:8080/api/departments'

export const listDepartments = () => {
    return axios.get(DEPARTMENT_REST_API_BASE_URL)
}

export const createDepartment = (department) => {
    return axios.post(DEPARTMENT_REST_API_BASE_URL, department)
}

export const getDepartment = (departmentId) => {
    return axios.get(DEPARTMENT_REST_API_BASE_URL + '/' + departmentId)
}

export const updateDepartment = (departmentId, department) => {
    return axios.put(DEPARTMENT_REST_API_BASE_URL + '/' + departmentId, department)
}

export const deleteDepartment = (departmentId) => {
    return axios.delete(DEPARTMENT_REST_API_BASE_URL + '/' + departmentId)
}