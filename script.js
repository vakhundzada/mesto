//Main variables
const page = document.querySelector('.page'); //Whole page element

const editForm = page.querySelector('.edit-form'); //Name and career edit pop-up section
const addForm = page.querySelector('.add-form'); //Card add form pop-up element

const editFormPopUp = editForm.querySelector('.pop-up'); //Selecting pop-up box in edit form section
const addFormPopUp = addForm.querySelector('.pop-up'); //Selecting pop-up box in edit form section

const popUpCloseButtons = page.querySelectorAll('.pop-up__close-button');

const editButton = page.querySelector('.profile__edit-button');
const addButton = page.querySelector('.button_type_add');

const imagePreview = page.querySelector('.image-preview');


//Edit and add forms open/close feature
editButton.addEventListener('click', function () {
  editFormPopUp.classList.add('pop-up_opened');
});

addButton.addEventListener('click', function () {
  addFormPopUp.classList.add('pop-up_opened');
});

for (let i = 0; i < popUpCloseButtons.length; i++) {
  popUpCloseButtons.item(i).addEventListener('click', function () {popUpCloseButtons.item(i).closest('.pop-up').classList.remove('pop-up_opened')});
}


//Adding functionality to add-form pop-up
const newCardTitle = addForm.querySelector('.form__item_el_title');
const newCardImgLink = addForm.querySelector('.form__item_el_img-link');
const newCardAlt = addForm.querySelector('.form__item_el_alt-text');

function addFormSubmitHandler(evt) {
  evt.preventDefault();

  addCardToList(newCardTitle.value, newCardImgLink.value, '', 'afterbegin');
}

addForm.querySelector('.form__button').addEventListener('click', addFormSubmitHandler);


//Adding functionality to edit-form pop-up
const nameInput = editFormPopUp.querySelector('.form__item_el_name');
const careerInput = editFormPopUp.querySelector('.form__item_el_career');

const profileName = page.querySelector('.profile__name');
const profileCareer = page.querySelector('.profile__career');

function editFormSubmitHandler(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileCareer.textContent = careerInput.value;
}

editFormPopUp.querySelector('.form__button').addEventListener('click', editFormSubmitHandler);


//Cards rendering

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
    alt: 'Слегка заснеженная гора в селе Архыз'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
    alt: 'Маленькое озеро в Челябинске, вокруг всё покрыто снегом'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
    alt: 'Панельные дома в городе Иваново'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
    alt: 'Красивая гора в Камчатке'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
    alt: 'Длинная и пряма железная дорога в Холмогорском районе, по бокам железнодорожных путей – густой лес'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
    alt: 'Большая и красивая гора на берегу озера Байкал'
  }
];


const placeCardsList = page.querySelector('.place-cards__list');

const template = page.querySelector('.template').content;
const cardTemplate = template.querySelector('.card').cloneNode(true);

function addCardToList(cardTitle, imgLink, imgAlt) {
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.card__image').src = imgLink;
  cardElement.querySelector('.card__image').alt = imgAlt;
  cardElement.querySelector('.card__title').textContent = cardTitle;

  placeCardsList.append(cardElement);

  cardElement.querySelector('.card__delete-button').addEventListener('click', function () { // Deleting card on click to trash button
    cardElement.remove();
  });

  cardElement.querySelector('.button_type_like').addEventListener('click', function () { //Changing like button style on click to like button
    cardElement.querySelector('.button_type_like').classList.toggle('button_type_like_active');
  });

  cardElement.querySelector('.card__image').addEventListener('click', function (){ // Changing preview image on click
    page.querySelector('.pop-up__image').src = imgLink;
    page.querySelector('.pop-up__image').alt = imgAlt;
    imagePreview.querySelector('.pop-up').classList.add('pop-up_opened');
  });
}

// Creating default cards
for (let i = 0; i < initialCards.length; i++) {
  addCardToList(initialCards[i].name, initialCards[i].link, initialCards[i].alt);
}

imagePreview.querySelector('.pop-up__close-button').addEventListener('click', function () {  // Close image preview on click
  imagePreview.querySelector('.pop-up').classList.remove('pop-up_opened');
});
