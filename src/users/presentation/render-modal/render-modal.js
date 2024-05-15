import modalHTML from './render-modal.html?raw';
import './render-modal.css';
import { User } from '../../models/user';
import { getUserById } from '../../use-case/get-user-by-id';

let modal, form;
let loadeUser = {};

/**
 * 
 * @param {String|Number} id 
 */
//TODO Cargar usuario por id
export const showModal = async(id) => {
    modal?.classList.remove('hide-modal');
    loadeUser = {};

    //Si no existe el id no se hace nada
    if(!id) return;

    //Si existe el id
    const user = await getUserById(id);
    setFormValue(user);
}

export const hideModal = () => {
    modal?.classList.add('hide-modal');
    
    //TODO Resertear el modal
    form?.reset();
}
/**
 * 
 * @param {User} user 
 */
const setFormValue = (user) => {
    form.querySelector('[name="firstName"]').value = user.firstName;
    form.querySelector('[name="lastName"]').value = user.lastName;
    form.querySelector('[name="balance"]').value = user.balance;
    form.querySelector('[name="isActive"]').checked = user.isActive;
    loadeUser = user;

}


/**
 * 
 * @param {HTMLDivElement} element 
 * @param {(userLike) => Promise<void>} saveUserCallback
 */
export const renderModal = (element, saveUserCallback) => {
    //Si ya existe no se hace nada
    if(modal) return;
    //Si no existe se construye
    modal = document.createElement('div');
    modal.innerHTML = modalHTML;
    //hide-modal oculta el modal
    modal.className = 'modal-container hide-modal';
    form = modal.querySelector('form'); 

    modal.addEventListener('click', (event) => {
        if(event.target.className === 'modal-container') {
            hideModal();
        }
    });

    form.addEventListener('submit', async(event) => {
        event.preventDefault();
        
        const formData = new FormData(form);
        const userLike = {...loadeUser};
        
        for (const [key, value] of formData) {
            //['firstName', 'Susan'] esto es lo que devuelve la key y el valor
            if(key === 'balance') {
                userLike[key] = Number(value);
                continue;
            }
            if(key === 'isActive'){
                userLike[key] = (value === 'on') ? true : false;
                continue;
            }
            userLike[key] = value;
            
        }
        // console.log(userLike);
        //TODO guardar usuario
        await saveUserCallback(userLike);
        hideModal();
    });

    element.append(modal);
}