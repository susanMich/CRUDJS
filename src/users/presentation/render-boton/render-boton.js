import usersStore from '../../store/users-store';
import { renderTable } from '../render-table/render-table';
import './render-boton.css';


export const renderButton = (element) => {
    const nextButton = document.createElement('button');
    nextButton.innerText = ' Next >';

    const prevButton = document.createElement('button');
    prevButton.innerText = '< Prev';

    const currenPageLabel = document.createElement('span');
    currenPageLabel.id = 'current-page';
    currenPageLabel.innerText = usersStore.getCurrentPage();

    element.append(prevButton, currenPageLabel, nextButton);

    nextButton.addEventListener('click', async() => {
        await usersStore.loadNextPage();
        currenPageLabel.innerText = usersStore.getCurrentPage();
        renderTable(element);
    });
    prevButton.addEventListener('click', async() => {
        await usersStore.loadPreviosPage();
        currenPageLabel.innerText = usersStore.getCurrentPage();
        renderTable(element);
    })
}