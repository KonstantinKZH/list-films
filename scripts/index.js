const KEY_ARRAY_IN_LOCAL_STORAGE = "listFilms";
const ID_CONTAINER_WITH_LIST_FILMS = 'list-films-id';
const CLASS_NAME_CHECKBOX = 'checkbox-film';
const CLASS_NAME_REMOVAL_CROSS = 'film__cross-delete';

const INITIAL_CLASS_ELEMENT_LIST_FILMS = "list-films__film";
const INITIAL_CLASS_CHECKBOX = "checkbox-film";
const INITIAL_CLASS_NAME_FILM = "name-film";

const MODIFIER_CLASS_ELEMENT_LIST_FILMS = "list-films_blackout";
const MODIFIER_CLASS_CHECKBOX = "checkbox-film_background";
const MODIFIER_CLASS_NAME_FILM = "name-film_cross-out";

const inputNode = document.querySelector('.js-input__add-films');
const btnAddFilmNodde = document.querySelector('.js-button-download-films');
const listMovieNode = document.querySelector('.js-list-films');

const checkboxsNode = document.getElementsByClassName('checkbox-film');
const crossDeleteNode = document.getElementsByClassName('film__cross-delete');
const filmNode = document.getElementsByClassName('film');

let nameFilm = null;

window.onload = function(){
    render();
};

const listFilmsLocalStorageString = localStorage.getItem(KEY_ARRAY_IN_LOCAL_STORAGE);
const listFilmsLocalStorage = JSON.parse(listFilmsLocalStorageString);
let listFilms = [];

if(Array.isArray(listFilmsLocalStorage)){
    listFilms = listFilmsLocalStorage;
};

// Кнопка добавления фильма в список
btnAddFilmNodde.addEventListener('click', function () {
    getNameFilm();
    createObject(nameFilm);
    render();
});

// Получаем название фильмма 
const getNameFilm = () => {
    if(inputNode.value === ''){
        return;
    };
    nameFilm = inputNode.value;
    inputNode.value = "";
};

const createObject = (nameFilm) => {
    const object = {
        nameFilm,
        classListFilm: INITIAL_CLASS_ELEMENT_LIST_FILMS,
        classCheckbox: INITIAL_CLASS_CHECKBOX,
        classNameFilm: INITIAL_CLASS_NAME_FILM,
    };

    listFilms.push(object);
    const listFilmsJSON = JSON.stringify(listFilms);
    localStorage.setItem(KEY_ARRAY_IN_LOCAL_STORAGE, listFilmsJSON);
};

const createHtmlElement = () => {
    listMovieNode.innerHTML = "";
    listFilms.forEach(film => {
        const filmNode = document.createElement("div");
        filmNode.className = film.classListFilm;

        const checkboxAndNameNode = document.createElement("div");
        checkboxAndNameNode.className = "film__checkbox-name";

        const inputCheckboxNode = document.createElement("input");
        inputCheckboxNode.id = "checkbox-id";
        inputCheckboxNode.type = "checkbox";

        const labelNode = document.createElement("label");
        labelNode.for = "checkbox-id";
        labelNode.className = film.classCheckbox;

        const nameMovieNode = document.createElement("p");
        nameMovieNode.className = film.classNameFilm;
        nameMovieNode.textContent = film.nameFilm;

        const imgCrossDeleteNode = document.createElement("img");
        imgCrossDeleteNode.className = "film__cross-delete";
        imgCrossDeleteNode.src = "resources/icons/cross-delete/cross-delete.png";
        imgCrossDeleteNode.alt = "Крестик удаления";

        filmNode.appendChild(checkboxAndNameNode);
        filmNode.appendChild(imgCrossDeleteNode);
        checkboxAndNameNode.appendChild(inputCheckboxNode);
        checkboxAndNameNode.appendChild(labelNode);
        checkboxAndNameNode.appendChild(nameMovieNode);

        listMovieNode.appendChild(filmNode);
    });
};

const render = () => {
    createHtmlElement();
};

// Клик по чекбоксу и крестику
document.addEventListener('click', (e)=> {
    const item = e.target;
    if(item.classList.contains(CLASS_NAME_CHECKBOX)){
        for(let i=0; i<checkboxsNode.length; i++){
            if(item === checkboxsNode[i]){
                changeStatus(i);
            };
        };
    };
    if(item.classList.contains(CLASS_NAME_REMOVAL_CROSS)){
        for(let j=0; j<crossDeleteNode.length; j++){
            if(item === crossDeleteNode[j]){
                deleteFilmFromList(j);
            };
        };
    };
});

const changeStatus = (index) => {
    let listFilmsItem = listFilms[index];
    
    listFilmsItem.classListFilm === INITIAL_CLASS_ELEMENT_LIST_FILMS ? 
        listFilmsItem.classListFilm = `${INITIAL_CLASS_ELEMENT_LIST_FILMS} ${MODIFIER_CLASS_ELEMENT_LIST_FILMS}` : listFilmsItem.classListFilm = INITIAL_CLASS_ELEMENT_LIST_FILMS;

    listFilmsItem.classCheckbox === INITIAL_CLASS_CHECKBOX ? 
        listFilmsItem.classCheckbox = `${INITIAL_CLASS_CHECKBOX} ${MODIFIER_CLASS_CHECKBOX}` : listFilmsItem.classCheckbox = INITIAL_CLASS_CHECKBOX;

    listFilmsItem.classNameFilm === INITIAL_CLASS_NAME_FILM ? 
        listFilmsItem.classNameFilm = `${INITIAL_CLASS_NAME_FILM} ${MODIFIER_CLASS_NAME_FILM}` : listFilmsItem.classNameFilm = INITIAL_CLASS_NAME_FILM;
    
    const listFilmsJSON = JSON.stringify(listFilms);
    localStorage.setItem(KEY_ARRAY_IN_LOCAL_STORAGE, listFilmsJSON);
    render();
};

const deleteFilmFromList = (index) => {
    listFilms.splice(index, 1);
    const listFilmsJSON = JSON.stringify(listFilms);
    localStorage.setItem(KEY_ARRAY_IN_LOCAL_STORAGE, listFilmsJSON);
    render();
};