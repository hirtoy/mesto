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
	},
  ];

const editButtonNode = document.querySelector(".profile__edit-button");
const profileEditorNode = document.getElementById("profile-editor");
const popup = document.querySelectorAll(".popup");
const imagePopupNode = document.getElementById("image-viewer");
const formNode = document.querySelector(".popup__form-item");
const popupCloseButtonNode = document.getElementById("profile__editor_close-button");
const profileNameNode = document.querySelector(".profile__name");
const profileDescriptionNode = document.querySelector(".profile__description");
const popupNameInput = document.querySelector(".popup__form-item_value_name");
const popupDescriptionInput = document.querySelector(".popup__form-item_value_description");
const popupPlaceNameNode = document.querySelector(".popup__form-item_value_place-name");
const popupPlaceUrlNode = document.querySelector(".popup__form-item_value_place-url");
const addButtonNode = document.getElementById("element__add-button");
const popupPlaceEditorNode = document.getElementById("place-editor");
const placeEditorCloseButtonNode = document.getElementById("place__editor_close-button");
const createButtonNode = document.getElementById("popup__submit-button_place_elements");
const placesContainerElement = document.querySelector(".elements");
const templateElement = document.querySelector(".template");

const imageViewerCloseButtonNode = document.getElementById("image-viewer_close-button");

const popUpProfileSubmitButtonNode = document.querySelector(".popup__profile-submit");

const closeButtonNodes = document.querySelectorAll(".popup__close-button");
const openButtonNodes = document.querySelectorAll(".popup__open-button");

const placeImageNodes = document.querySelectorAll(".element__image");
const profileAddButtonNode = document.querySelector(".profile__add-button");
const profileEditorCloseButtonNode = document.querySelector("#profile__editor_close-button");

const image = document.querySelector("#popup__window_image-viewer");
const imageSubtitle = document.querySelector("#popup__image-subtitle");
const popupPlaceEditorForm = popupPlaceEditorNode.querySelector(".popup__form");


function createElement(element) {
	const newElement = templateElement.content.cloneNode(true);
	const elementTitle = newElement.querySelector(".element__title");
	const elementImage = newElement.querySelector(".element__image");
	elementTitle.textContent = element.name;
	elementImage.src = element.link;
	elementImage.alt = element.name;

	newElement
		.querySelector(".element__heart-icon")
		.addEventListener("click", addLike);
	newElement
		.querySelector(".element__remove-button")
		.addEventListener("click", deleteElement);
	newElement
		.querySelector(".element__image")
		.addEventListener("click", openImagePopup);
	return newElement;
}

function addElement(event) {
	event.preventDefault();
	const placeName = popupPlaceNameNode.value;
	const placeUrl = popupPlaceUrlNode.value;
	const newPlace = createElement({ name: placeName, link: placeUrl });
	placesContainerElement.prepend(newPlace);
	popupPlaceEditorForm.reset();
	setButtonState(createButtonNode, false, validationConfig);
	closePopUp(popupPlaceEditorNode);
}

document
	.querySelector("#element__editor")
	.addEventListener("submit", addElement);

function addLike(event) {
	event.target.classList.toggle("element__heart-icon_active");
}

function deleteElement(event) {
	event.target.closest(".element").remove();
}

editButtonNode.addEventListener("click", (event) => {
	popupNameInput.value = profileNameNode.textContent;
	popupDescriptionInput.value = profileDescriptionNode.textContent;
	openPopUp(profileEditorNode);
});

profileAddButtonNode.addEventListener("click", (event) => {
	openPopUp(popupPlaceEditorNode);
});

function openPopUp(popup) {
	popup.classList.add("popup_visible");
	document.addEventListener("keyup", handleEscPressOnForm);
	document.addEventListener("click", handleOverlayClick);
}

function closePopUp(popup) {
	popup.classList.remove("popup_visible");
	document.removeEventListener("keyup", handleEscPressOnForm);
	document.removeEventListener("click", handleOverlayClick);
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
	openPopUp(profileEditorNode);
	popupNameInput.value = profileNameNode.textContent;
	popupDescriptionInput.value = profileDescriptionNode.textContent;
}

editButtonNode.addEventListener("click", handleEditButtonClick);

addButtonNode.addEventListener("click", handleAddButtonClick);

function handleAddButtonClick() {
	openPopUp(popupPlaceEditorNode);
}

function openImagePopup(e) {
	openPopUp(imagePopupNode);
	image.src = e.target.src;
	imageSubtitle.textContent = e.target.alt;
}

popUpProfileSubmitButtonNode.addEventListener("click", handleProfileFormSubmit);

function handleProfileFormSubmit(event) {
	event.preventDefault();
	profileNameNode.textContent = popupNameInput.value;
	profileDescriptionNode.textContent = popupDescriptionInput.value;
	closePopUp(profileEditorNode);
}

function renderList() {
	const elements = initialCards.map(createElement);
	placesContainerElement.append(...elements);
}

function handleOverlayClick(event) {
	if (event.target.classList.contains("popup")) {
		const openedPopUp = document.querySelector(".popup_visible");
		closePopUp(openedPopUp);
	}
}

function handleEscPressOnForm(event) {
	if (event.key === "Escape") {
		const openedPopUp = document.querySelector(".popup_visible");
		closePopUp(openedPopUp);
	}
}

enableValidation(validationConfig);
renderList();
