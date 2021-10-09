
import { STORAGE_KEY  } from "../consts";

const localStorageService = {}

localStorageService.saveUser = user => localStorage.setItem(STORAGE_KEY, JSON.stringify(user));

localStorageService.getUser = () => JSON.parse(localStorage.getItem(STORAGE_KEY));

localStorageService.getToken = () => JSON.parse(localStorage.getItem(STORAGE_KEY))?.token;

localStorageService.getIsAdmin = () => (JSON.parse(localStorage.getItem(STORAGE_KEY))?.role?.toLowerCase()) === 'admin';

export default localStorageService;