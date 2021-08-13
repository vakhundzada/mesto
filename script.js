//Main variables
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
const previewPopUp = imagePreview.querySelector('.pop-up');

// Functions
function createCard(name, link, alt) {
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.card__image').src = link;
  cardElement.querySelector('.card__title').textContent = name;
  cardElement.querySelector('.card__image').alt = alt;

  // Deleting card on click to trash button
  cardElement.querySelector('.card__delete-button').addEventListener('click', () => cardElement.closest('.card').remove());

  //Changing like button style on click to like button
  cardElement.querySelector('.button_type_like').addEventListener('click', () => cardElement.querySelector('.button_type_like').classList.toggle('button_type_like_active'));

  // Changing preview image on click
  cardElement.querySelector('.card__image').addEventListener('click', () => {
    changePreview(cardElement.querySelector('.card__image').src, cardElement.querySelector('.card__image').alt);
    openPopUp(previewPopUp);
  });

  return cardElement;
}

function addCard(container, cardElement) {
  container.prepend(cardElement);
}

function changePreview(imgLink, imgAlt) {
  page.querySelector('.pop-up__image').src = imgLink;
  page.querySelector('.pop-up__image').alt = imgAlt;
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
  closePopUp(editFormPopUp);
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

popUpCloseButtons.forEach(function (elem) {
  elem.addEventListener('click', function () {
    closePopUp(previewPopUp);
  });
});

//Adding functionality to add-form pop-up
addForm.querySelector('.form').addEventListener('submit', addFormSubmitHandler);

//Adding functionality to edit-form pop-up
editForm.querySelector('.form').addEventListener('submit', editFormSubmitHandler);

// Creating initial cards
initialCards.forEach(function (elem) {
  addCard(placeCardsList, createCard(elem.name, elem.link, elem.alt));
});

// Close image preview on click
imagePreview.querySelector('.pop-up__close-button').addEventListener('click', function () {
  closePopUp(previewPopUp);
});


