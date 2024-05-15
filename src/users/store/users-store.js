import { loadUsersByPage } from "../use-case/load-users-by-page";

const state = {
    currentPage: 0,
    users: [],
}

const loadNextPage = async() => {
   const users = await loadUsersByPage(state.currentPage + 1);
   if(users.length === 0) return;

   state.currentPage = state.currentPage + 1;
   state.users = users;
   console.log(state.users);
}

const loadPreviosPage = async() => {
    if(state.currentPage === 1) return;
    const users = await loadUsersByPage(state.currentPage - 1);

    state.currentPage = state.currentPage - 1;
    state.users = users;
}

//Implementar
const onUserChanged = () => {
    throw new Error('No implementado');
}

const reloadPage = async() => {
    throw new Error('No implementado');
}

export default {
    loadNextPage,
    loadPreviosPage,
    onUserChanged,
    reloadPage,
    /**
     * 
     * @returns {User[]}
     */
    getUsers: () => [...state.users],
    /**
     * 
     * @returns {Number}
     */
    getCurrentPage: () => state.currentPage,
}