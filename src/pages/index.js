  import './index.css';

import { initialCards } from"../utils/initialCards.js";
import { Card } from "../components/card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";

import { profileEditButtonNode } from "../utils/constants.js";
import { profileNameNode } from "../utils/constants.js";
import { popupNameInput } from "../utils/constants.js";
import { profileDescriptionNode } from "../utils/constants.js";
import { popupDescriptionInput } from "../utils/constants.js";

import { placeName } from "../utils/constants.js";
import { placeUrl } from "../utils/constants.js";

import { placeEditorCloseButtonNode } from "../utils/constants.js";
import { imageViewerCloseButtonNode } from "../utils/constants.js";
import { profileAddButtonNode } from "../utils/constants.js";
import { submitElementBtn } from "../utils/constants.js";
import { profileEditorCloseButtonNode } from "../utils/constants.js";

import { addForm } from "../utils/constants.js";
import { editForm } from "../utils/constants.js";

import { popupPhotoSelector } from "../utils/constants.js";
import { selectors } from "../utils/constants.js";

const userInfo = new UserInfo(profileNameNode, profileDescriptionNode);


const popupWithAddForm = new PopupWithForm('#place-editor', {
 	submit: (data) => {
 		const card = createCard(data);
 		const cardElement = card.generateCard();
 		cardList.addItem(cardElement, 'prepend');
 	}
 });

const popupWithInfoForm = new PopupWithForm('#profile-editor', {
	submit: (data) => {
		userInfo.setUserInfo(data);
	}
});
popupWithInfoForm.setEventListeners();

const popupWithImage = new PopupWithImage(popupPhotoSelector);
popupWithImage.setEventListeners();

  const createCard = (data) => {
	const card = new Card(data, ".template", {
		handleCardClick: () => {
            popupWithImage.open(data);
		}
	});
	return card.generateCard();
  }

const cardList = new Section({
	  items: initialCards,
	  renderer: (item) => {
		const element = createCard(item)
		cardList.addItem(element)
  }},
  '.elements');
cardList.renderItems();


profileAddButtonNode.addEventListener("click", () => {
	popupWithAddForm.open();
});
profileEditorCloseButtonNode.addEventListener("click", () => {
	popupWithInfoForm.close();
});

placeEditorCloseButtonNode.addEventListener("click", () => {
	popupWithAddForm.close();
});

imageViewerCloseButtonNode.addEventListener("click", () => {
	popupWithImage.close();
});

profileEditButtonNode.addEventListener('click', () => {
	const userData = userInfo.getUserInfo();
	profileNameNode.value = userData.name;
	profileDescriptionNode.value = userData.info;
	popupWithInfoForm.open();
})

//форма Edit
function editElement(event) {
	event.preventDefault();
	profileNameNode.textContent = popupNameInput.value;
 	profileDescriptionNode.textContent = popupDescriptionInput.value;
}

profileAddButtonNode.addEventListener('click', (event) => {
	editElement(event);
	profileNameNode.value = popupNameInput.textContent;
 	profileDescriptionNode.value = popupDescriptionInput.textContent;
 	popupWithInfoForm.close();
});
//форма Add
document
.querySelector("#element__editor")

const addElement = (event) => {
	event.preventDefault();

	const card = createCard({
		titile: placeName.value,
		link: placeUrl.value
	});

	const cardElement = card;
	cardList.addItem(cardElement, "prepend");
	popupWithAddForm.close();
}
submitElementBtn.addEventListener("click", (event) => {
	addElement(event)
});

const setFormListner = () => {
	editForm.addEventListener('submit', editElement);
    addForm.addEventListener('submit', addElement);
}
setFormListner();

  const formEditProfile = document.querySelector("#profile-editor");
  const formEditProfileValidator = new FormValidator(selectors, formEditProfile, profileEditButtonNode);
  formEditProfileValidator.enableValidation();
  
  const formAddCard = document.querySelector("#place-editor");
  const formAddCardValidator = new FormValidator(selectors, formAddCard, submitElementBtn);
  formAddCardValidator.enableValidation();


  // const handleAddButtonClick = () => {
// 	//Сброс состояния disabled в true
//  	submitElementBtn.setAttribute("disabled", true);
	
//  	 open(popupPlaceEditorNode);
//  };
//  handleAddButtonClick();

//редактирование профиля
// function handleProfileFormSubmit(event) {
// 	event.preventDefault();
// 	profileNameNode.textContent = popupNameInput.value;
// 	profileDescriptionNode.textContent = popupDescriptionInput.value;
// 	close(profileEditorNode);
// }
// popUpProfileSubmitButtonNode.addEventListener("click", handleProfileFormSubmit);
//  elementAddButtonNodec, handleAddButtonClick);

// profileEditButtonNode.addEventListener("click", (event) => {
// 	popupNameInput.value = profileNameNode.textContent;
// 	popupDescriptionInput.value = profileDescriptionNode.textContent;
// 	open(profileEditorNode);
// });

// function handleEditButtonClick() {
// 	popupNameInput.value = profileNameNode.textContent;
// 	popupDescriptionInput.value = profileDescriptionNode.textContent;
// 	open(profileEditorNode);
// }
// profileEditButtonNode.addEventListener("click", handleEditButtonClick);
  // function addNewCard(card) {
// 	placesContainerElement.prepend(createCard(card.title, card.link));
//   }
//   initialCards.forEach(card => { addNewCard(card) });

//   function openImagePopup(title, link) {
// 	image.src = link;
// 	image.alt = title;
// 	imageSubtitle.textContent = title;
// 	openPopUp(imagePopupNode);
// }
/*
function handleEscPressOnForm(event) {
	if (event.key === "Escape") {
		const openedPopUp = document.querySelector(".popup_visible");
		closePopUp(openedPopUp);
	}
}


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

function handleOverlayClick(event) {
	if (event.target.classList.contains("popup")) {
		closePopUp(event.target);
	}
}

*/