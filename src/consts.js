const {
 SERVER_PORT=8080
} = process.env

const SERVER_URL = `https://ofir-ls-project.herokuapp.com/`

export const REGISTER_USER_API = `${SERVER_URL}/api/auth/register`;
export const SIGNIN_USER_API = `${SERVER_URL}/api/auth/signin`;
export const STORAGE_KEY = `LS_USER`; 
export const DATATABLE_EMPLOYEE_API = `${SERVER_URL}/api/info/all-employees`
export const ADD_NEW_EMPOLOYEE_API = `${SERVER_URL}/api/info/add-new-employee`