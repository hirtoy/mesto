let popup = document.querySelector('.popup');
let btnEditProfile = document.querySelector('.profile__edit-button');
let btnClosePopup = document.querySelector('.popup__close');
let profileEditForm = document.forms['profileEdit'];
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');
const formElement = document.querySelector('.popup__container');

let profileNameInput = document.querySelector('.popup__input_type_name');
let profileJobInput = document.querySelector('.popup__input_type_job');

function popupOpen() {
    popup.classList.add('popup_opened');
    profileNameInput.value = profileName.textContent.trim();
    profileJobInput.value = profileJob.textContent.trim();

}

function popupClose() {
    popup.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    
    profileName.textContent =  profileNameInput.value;
    profileJob.textContent =  profileJobInput.value;
    popupClose();
}

btnEditProfile.addEventListener('click', popupOpen);
btnClosePopup.addEventListener('click', popupClose);
profileEditForm.addEventListener('submit', formSubmitHandler);