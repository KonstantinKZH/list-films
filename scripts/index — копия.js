const KEY_ARRAY_IN_LOCAL_STORAGE = "listFilms";
const ID_CONTAINER_WITH_LIST_FILMS = 'list-films-id';
const CLASS_NAME_CHECKBOX = 'checkbox-film';
const CLASS_NAME_REMOVAL_CROSS = 'film__cross-delete';

const MODIFIER_DIMMING = "film_blackout";
const MODIFIER_CROSS_OUT_NAME_FILM = "name-film_cross-out";
const MODIFIER_BACKGROUND_CHECKBOX = "background_checkbox";


const inputFilmsNode = document.querySelector('.js-input__add-films');
const btnAddFilmNodde = document.querySelector('.js-button-download-films');
const listMovieNode = document.querySelector('.js-list-films');

const checkboxsNode = document.getElementsByClassName('checkbox-film');
const crossDeleteNode = document.getElementsByClassName('film__cross-delete');
const filmNode = document.getElementsByClassName('film');

// Получаем массив из localStorage
let listFilmsLocalStorage = JSON.parse(localStorage.getItem(KEY_ARRAY_IN_LOCAL_STORAGE));

// Проверяем, есть ли в localStorage массив с ключём - listFilms. Если его нет, то создаём
window.onload = function(){
    let listFilms = [];
    if(localStorage.getItem(KEY_ARRAY_IN_LOCAL_STORAGE) === null){
        localStorage.setItem(KEY_ARRAY_IN_LOCAL_STORAGE, JSON.stringify(listFilms));
    };
};

// Кнопка добавления фильма в список
btnAddFilmNodde.addEventListener('click', function () {
    getNameFilmInArrow();
    outputNameFilmInWindow();
});

// Получаем название фильмма 
const getNameFilmInArrow = () => {
    if(inputFilmsNode.value === ''){
        return;
    };
    let nameFilm = inputFilmsNode.value;
    createObjectFilm(nameFilm);
    inputFilmsNode.value = "";
};

// Создаёт объекты и добавляет в массив - listFilms
const createObjectFilm = (nameFilm) => {
    let listFilms = [];
    const objectFilms = {
        nameFilm,
        filmBlackout: "",
        crossOut: "",
        backgroundCheckbox: "",
    };
    listFilms.push(objectFilms);
    saveFilmInLocalStorage(listFilms);
};

// Сохраняет данные в локальное хранилище
const saveFilmInLocalStorage = (listFilms) => {
    for(let film of listFilms){
        listFilmsLocalStorage.push(film);
    };
    localStorage.setItem(KEY_ARRAY_IN_LOCAL_STORAGE, JSON.stringify(listFilmsLocalStorage));
};

// ДАЛЕЕ ОПИШЕМ ЛОГИКУ КЛИКА ПО ФЛАЖКАМ
// Определяем индекс флажка и индекс крестика, по которым произошол клик и передаём их в соответствующие функции
document.getElementById(ID_CONTAINER_WITH_LIST_FILMS).onclick = function(e){
    const item = e.target;
    if(item.classList.contains(CLASS_NAME_CHECKBOX)){
        for(let i=0; i<checkboxsNode.length; i++){
            if(item === checkboxsNode[i]){
                crossUpTextAndBlackoutBackground(i);
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
};

const crossUpTextAndBlackoutBackground = (index) => {
    if(listFilmsLocalStorage[index].filmBlackout !== MODIFIER_DIMMING){
        if(listFilmsLocalStorage[index].filmBlackout !== MODIFIER_CROSS_OUT_NAME_FILM){
            if(listFilmsLocalStorage[index].filmBlackout !== MODIFIER_BACKGROUND_CHECKBOX){
                listFilmsLocalStorage[index].filmBlackout = MODIFIER_DIMMING;
                listFilmsLocalStorage[index].crossOut = MODIFIER_CROSS_OUT_NAME_FILM;
                listFilmsLocalStorage[index].backgroundCheckbox = MODIFIER_BACKGROUND_CHECKBOX;
            }; 
        };
        
    } else {
        listFilmsLocalStorage[index].filmBlackout = "";
        listFilmsLocalStorage[index].crossOut = "";
        listFilmsLocalStorage[index].backgroundCheckbox = "";
    };
    // Сохраняем изменение в localStorage
    localStorage.setItem(KEY_ARRAY_IN_LOCAL_STORAGE, JSON.stringify(listFilmsLocalStorage));
    // Выводим изменение на экран
    outputNameFilmInWindow();
};

// Удаляет фильм из списка, а также удаляет соответствующий объект из массива
const deleteFilmFromList = (indexCross) => {
    // Удаляем элемент с экрана
    filmNode[indexCross].remove();
    // Удаляем данные карточки с localStorage
    listFilmsLocalStorage.splice(indexCross, 1);
    // Сохраняем изменения в localStorage
    localStorage.setItem(KEY_ARRAY_IN_LOCAL_STORAGE, JSON.stringify(listFilmsLocalStorage));
};


// Вывод сохранённого фильма на экран
const outputNameFilmInWindow = () => {
    let listFilmsHTML = '';
    listFilmsLocalStorage.forEach(item =>{
        let addedFilm = `
            <div class="film ${item.filmBlackout}">
                <div class="film__checkbox-name">
                    <input id="checkbox-id" type="checkbox">
                    <label for="checkbox-id" class="checkbox-film ${item.backgroundCheckbox}"></label>
                    <p class="name-film ${item.crossOut}">${item.nameFilm}</p>
                </div>
                <img class="film__cross-delete" src="resources/icons/cross-delete/cross-delete.png" alt="Крестик удаления">
            </div>
        `;
        listFilmsHTML += addedFilm;
        console.log(listFilmsHTML);
        listMovieNode.innerHTML = listFilmsHTML;
    });
};
outputNameFilmInWindow();