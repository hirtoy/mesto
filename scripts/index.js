import { initialCards } from"./initialCards.js";
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

const profileEditButtonNode = document.querySelector(".profile__edit-button");
const profileEditorNode = document.getElementById("profile-editor");
const imagePopupNode = document.getElementById("image-viewer");
const profileNameNode = document.querySelector(".profile__name");
const profileDescriptionNode = document.querySelector(".profile__description");
const popupNameInput = document.querySelector(".popup__form-item_value_name");
const popupDescriptionInput = document.querySelector(".popup__form-item_value_description");
const placeName = document.querySelector(".popup__form-item_value_place-name");
const placeUrl = document.querySelector(".popup__form-item_value_place-url");
const elementAddButtonNode = document.getElementById("element__add-button");
const popupPlaceEditorNode = document.getElementById("place-editor");
const placeEditorCloseButtonNode = document.getElementById("place__editor_close-button");
const placesContainerElement = document.querySelector(".elements");
const imageViewerCloseButtonNode = document.getElementById("image-viewer_close-button");
const popUpProfileSubmitButtonNode = document.querySelector(".popup__profile-submit");
const profileAddButtonNode = document.querySelector(".profile__add-button");
const profileEditorCloseButtonNode = document.querySelector("#profile__editor_close-button");
const image = document.querySelector("#popup__window_image-viewer");
const imageSubtitle = document.querySelector("#popup__image-subtitle");
const popupForm = document.querySelector(".popup__form_add");
const submitElementBtn = document.getElementById("popup__submit-button_place_elements");

const selectors = {
	formSelector: ".popup__form",
	inputSelector: ".popup__form-item",
	submitButtonSelector: ".popup__submit-button",
	inputInvalidClass: "popup__form-item_state_invalid",
	buttonInvalidClass: "popup__submit-button_invalid"
}

document
	.querySelector("#element__editor")
	.addEventListener("submit", addElement);


profileEditButtonNode.addEventListener("click", (event) => {
	popupNameInput.value = profileNameNode.textContent;
	popupDescriptionInput.value = profileDescriptionNode.textContent;
	openPopUp(profileEditorNode);
});

profileAddButtonNode.addEventListener("click", (event) => {
	openPopUp(popupPlaceEditorNode);
});

function openPopUp(popup) {
	popupForm.reset();
	popup.classList.add("popup_visible");
	document.addEventListener("keyup", handleEscPressOnForm);
	document.addEventListener("mousedown", handleOverlayClick);
}

function closePopUp(popup) {
	popup.classList.remove("popup_visible");
	document.removeEventListener("keyup", handleEscPressOnForm);
	document.removeEventListener("click", handleOverlayClick);
}

function addElement(event) {
	event.preventDefault();
	const myNewCard= { title: placeName.value, link: placeUrl.value };
	addNewCard(myNewCard);
	closePopUp(popupPlaceEditorNode);
	popupForm.reset();
}

profileEditorCloseButtonNode.addEventListener("click", (event) => {
	closePopUp(profileEditorNode);
});

placeEditorCloseButtonNode.addEventListener("click", (event) => {
	closePopUp(popupPlaceEditorNode);
});

imageViewerCloseButtonNode.addEventListener("click", (event) => {
	closePopUp(imagePopupNode);
});

function handleEditButtonClick() {
	popupNameInput.value = profileNameNode.textContent;
	popupDescriptionInput.value = profileDescriptionNode.textContent;
	openPopUp(profileEditorNode);
}
profileEditButtonNode.addEventListener("click", handleEditButtonClick);

function handleAddButtonClick() {
	//Сброс состояния disabled в true
	submitElementBtn.setAttribute("disabled", true);
	
	openPopUp(popupPlaceEditorNode);
}
elementAddButtonNode.addEventListener("click", handleAddButtonClick);

function openImagePopup(title, link) {
	image.src = link;
	image.alt = title;
	imageSubtitle.textContent = title;
	openPopUp(imagePopupNode);
}

//редактирование профиля
function handleProfileFormSubmit(event) {
	event.preventDefault();
	profileNameNode.textContent = popupNameInput.value;
	profileDescriptionNode.textContent = popupDescriptionInput.value;
	closePopUp(profileEditorNode);
}
popUpProfileSubmitButtonNode.addEventListener("click", handleProfileFormSubmit);

function createCard(title, link) {
	const card = new Card(title, link, "#card");
	return card._generateCard();
}

function addNewCard(card) {
	placesContainerElement.prepend(createCard(card.title, card.link));
  }
  initialCards.forEach(card => { addNewCard(card) });


function handleOverlayClick(event) {
	if (event.target.classList.contains("popup")) {
		closePopUp(event.target);
	}
}

function handleEscPressOnForm(event) {
	if (event.key === "Escape") {
		const openedPopUp = document.querySelector(".popup_visible");
		closePopUp(openedPopUp);
	}
}
const formEditProfile = document.querySelector("#profile-editor");
const formEditProfileValidator = new FormValidator(selectors, formEditProfile);
formEditProfileValidator.enableValidation();

const formAddCard = document.querySelector("#place-editor");
const formAddCardValidator = new FormValidator(selectors, formAddCard);
formAddCardValidator.enableValidation();

export { openImagePopup };