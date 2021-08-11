//Main variables
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  }
];

const page = document.querySelector('.page'); //Whole page element
const editForm = page.querySelector('.edit-form'); //Name and career edit pop-up section
const addForm = page.querySelector('.add-form'); //Card add form pop-up element
const editFormPopUp = editForm.querySelector('.pop-up'); //Selecting pop-up box in edit form section
const addFormPopUp = addForm.querySelector('.pop-up'); //Selecting pop-up box in edit form section
const popUpCloseButtons = page.querySelectorAll('.pop-up__close-button');
const editButton = page.querySelector('.profile__edit-button');
const addButton = page.querySelector('.button_type_add');
const imagePreview = page.querySelector('.image-preview');
const placeCardsList = page.querySelector('.place-cards__list');
const template = page.querySelector('.template').content;
const cardTemplate = template.querySelector('.card').cloneNode(true);
const newCardTitle = addForm.querySelector('.form__item_el_title');
const newCardImgLink = addForm.querySelector('.form__item_el_img-link');
const nameInput = editFormPopUp.querySelector('.form__item_el_name');
const careerInput = editFormPopUp.querySelector('.form__item_el_career');
const profileName = page.querySelector('.profile__name');
const profileCareer = page.querySelector('.profile__career');

// Functions
function createCard(name, link) {
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.card__image').src = link;
  cardElement.querySelector('.card__title').textContent = name;

  return cardElement;
}

function addCard(container, cardElement) {
  container.prepend(cardElement);
}

function changePreview(imgLink){
  page.querySelector('.pop-up__image').src = imgLink;
}

function addFormSubmitHandler(evt) {
  evt.preventDefault();

  addCard(placeCardsList, createCard(newCardTitle.value, newCardImgLink.value));

  addForm.querySelector('.form').reset();
}

function editFormSubmitHandler(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileCareer.textContent = careerInput.value;
  closePopUp(editForm.querySelector('.pop-up'));
}

function openPopUp(popUp) {
  return popUp.classList.add('pop-up_opened');
}

function closePopUp(popUp) {
  return popUp.classList.remove('pop-up_opened');
}

//Edit and add forms open/close feature
editButton.addEventListener('click', () => openPopUp(editFormPopUp));

addButton.addEventListener('click', () => openPopUp(addFormPopUp));

popUpCloseButtons.forEach(function (elem){
  elem.addEventListener('click', function () {
    closePopUp(elem.closest('.pop-up'));
  });
});

//Adding functionality to add-form pop-up
addForm.querySelector('.form').addEventListener('submit', addFormSubmitHandler);

//Adding functionality to edit-form pop-up
editForm.querySelector('.form').addEventListener('submit', editFormSubmitHandler);

// Creating initial cards
initialCards.forEach(function (elem){
  addCard(placeCardsList, createCard(elem.name, elem.link));
});

// Close image preview on click
imagePreview.querySelector('.pop-up__close-button').addEventListener('click', function () {
  imagePreview.querySelector('.pop-up').classList.remove('pop-up_opened');
});

// Deleting card on click to trash button
page.querySelectorAll('.card__delete-button').forEach(function (elem){
  elem.addEventListener('click', () => elem.closest('.card').remove());
});

//Changing like button style on click to like button
page.querySelectorAll('.button_type_like').forEach(function (elem){
  elem.addEventListener('click', () => elem.classList.toggle('button_type_like_active'));
});

// Changing preview image on click
page.querySelectorAll('.card__image').forEach(function (elem) {
  elem.addEventListener('click', () => {
    changePreview(elem.src);
    imagePreview.querySelector('.pop-up').classList.add('pop-up_opened');
  });
});
