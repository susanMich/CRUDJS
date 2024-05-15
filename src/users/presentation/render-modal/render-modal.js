import modalHTML from './render-modal.html?raw';
import './render-modal.css';

let modal, form;

//TODO Cargar usuario por id
export const showModal = () => {
    modal?.classList.remove('hide-modal');
}

export const hideModal = () => {
    modal?.classList.add('hide-modal');
    
    //TODO Resertear el modal
    form?.reset();
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
        const userLike = {};
        
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