import { showModal } from '../render-modal/render-modal';
import './render-add-button.css';

/**
 * 
 *  @param {HTMLDivElement} element 
 */

export const renderAddButton = (element) => {
    
    const fabButon = document.createElement('button');
    fabButon.innerText = '+';
    fabButon.classList.add('fab-button');

    element.append(fabButon);

    //TODO
    fabButon.addEventListener('click', () => {
        showModal();
    });
}

//CON CALLBACK
/**
 * 
 * @param {() => void} callback 
 */

// export const renderAddButton = (element, callback) => {
    
//     const fabButon = document.createElement('button');
//     fabButon.innerText = '+';
//     fabButon.classList.add('fab-button');

//     element.append(fabButon);

//     //TODO
//     fabButon.addEventListener('click', () => {
//        // throw new Error('No implementado');
//         if(!callback) return;
//         callback();
//     })
// }