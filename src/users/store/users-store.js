import { User } from "../models/user";
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
   //console.log(state.users);
}

const loadPreviosPage = async() => {
    if(state.currentPage === 1) return;
    const users = await loadUsersByPage(state.currentPage - 1);

    state.currentPage = state.currentPage - 1;
    state.users = users;
}

/**
 * 
 * @param {User} updatedUser
 */
//Implementar
const onUserChanged = (updatedUser) => {
    let wasFound = false;
    state.users = state.users.map(user => {
        if(user.id === updatedUser.id) {
            wasFound = true;
            return updatedUser;
        }
        return user;
    });

    if(state.users.length < 10 && !wasFound) {
        state.users.push(updatedUser);
    }
}

const reloadPage = async() => {
    const users = await loadUsersByPage(state.currentPage);
    if(users.length === 0) {
        await loadPreviosPage();
        return;
    }
    state.users = users;
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