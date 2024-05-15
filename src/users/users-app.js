import { renderAddButton } from "./presentation/render-add-button/render-add-button";
import { renderButton } from "./presentation/render-boton/render-boton";
import { renderModal } from "./presentation/render-modal/render-modal";
import { renderTable } from "./presentation/render-table/render-table";
import usersStore from "./store/users-store";
import { saveUser } from "./use-case/save-user";

/**
 * 
 * @param {HTMLDivElement} element 
 */
export const UserApp = async(element) => {
    element.innerHTML = 'Loading...';
    await usersStore.loadNextPage();
    element.innerHTML = '';
    renderTable(element);
    renderButton(element);
    // renderAddButton(element, () => { console.log('desde el padre')});
    renderAddButton(element);
    renderModal(element, async(userLike) => {
        const user = await saveUser(userLike);
        usersStore.onUserChanged(user);
        renderTable(element);
    });
}