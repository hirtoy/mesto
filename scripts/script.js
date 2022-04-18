const editPopup = document.querySelector('.popup_profile');
const closeBtn = editPopup.querySelector('.popup__close-button');
const nameInput = editPopup.querySelector('input[name="name"]');
const jobInput = editPopup.querySelector('input[name="job"]');
const nameInfo = document.querySelector('.profile__name');
const jobInfo = document.querySelector('.profile__job');
const formEdit = editPopup.querySelector('.popup__form_profile');
const editBtn = document.querySelector('.profile__edit-button');

const popupAdd = document.querySelector('.popup_card');
const formAdd = popupAdd.querySelector('.popup__form_card');
const inputPlace = popupAdd.querySelector('.popup__form-input_type_name');
const inputUrl = popupAdd.querySelector('.popup__form-input_type_url');
const closePopupAdd = document.querySelector('.popup__close_card');
const addBtn = document.querySelector('.profile__add-button');

const photoModal = document.querySelector('.popup_photo');
const photoImage = photoModal.querySelector('.popup__image');
const btnCloseModal = photoModal.querySelector('popup_button');
const altModal = photoModal.querySelector('.popup__sign');

const elementsSection = document.querySelector('.elements');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function handlePopupEdit() {
  nameInput.value = nameInfo.textContent;
  jobInput.value = jobInfo.textContent;
  openPopup(editPopup);
}

function handleDeleteCard(evt) {
  evt.target.closest('.element').remove();
}

function handleLikeCard(evt) {
  evt.target.classList.toggle('.element__like_active');
}

function handleProfileSubmit(evt) {
  evt.preventDefault();
  nameInfo.textContent = nameInput.value;
  jobInfo.textContent = jobInput.value;
  closePopup(editPopup);
}

function createCard(item) {
  const templateElement = document.querySelector('#template-element').content;
  const newElement = templateElement.querySelector('.element').cloneNode(true);
  const elementImage = newElement.querySelector('.element__image');
  const elementTitle = newElement.querySelector('.element__title');
  const elementLike = newElement.querySelector('.element__like');
  const elementDelete = newElement.querySelector('.element__delete');

  elementTitle.textContent = item.name;
  elementImage.alt = item.name;
  elementImage.src = item.link;

  elementDelete.addEventListener('click', handleDeleteCard);
  elementLike.addEventListener('click', handleLikeCard);
  elementImage.addEventListener('click', () => handlePreviewImage(item.link, item.name));

  return newElement;
}

function renderList() {
  const result = initialCards.map(item => {
    const newElement = createCard(item);
    return newElement;
  });
  elementsSection.append(...result);
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const element = createCard({name: inputPlace.value, link: inputUrl.value});
  elementsSection.prepend(element);
  closePopup(popupAdd);
  formAdd.reset();
}

function handlePreviewImage(link, alt) {
  photoImage.src = link;
  photoImage.alt = alt;
  altModal.textContent = alt;
  openPopup(photoModal);
}

renderList();

editBtn.addEventListener('click', handlePopupEdit);
addBtn.addEventListener('click', () => openPopup(popupAdd));
closePopupAdd.addEventListener('click', () => closePopup(popupAdd));
formAdd.addEventListener('submit', handleAddCardFormSubmit);
formEdit.addEventListener('submit', handleProfileSubmit);
closeBtn.addEventListener('click', () => closePopup(editPopup));