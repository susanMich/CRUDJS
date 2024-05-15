import { User } from "../models/user"

/**
 * 
 * @param {Like<User>} localhostUser 
 * @returns User
 */
export const localhostUserToMOdel = (localhostUser) => {
    // Se desestructura la instancia de user
    const {
        avatar,
        balance,
        first_name,
        gender,
        id,
        isActive,
        last_name,
    } = localhostUser;
    
    //Se retorna la nueva instancia con las nuevas variables renombradas
    return new User({
        avatar,
        balance,
        firstName: first_name,
        gender,
        id,
        isActive,
        lastName: last_name,
    });
}
