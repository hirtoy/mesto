   import './index.css';

import { initialCards } from"../utils/initialCards.js";
import { Card } from "../components/card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import  UserInfo from "../components/UserInfo.js";

import { profileEditButtonNode,
	profileNameNode,
	popupNameInput,
	profileDescriptionNode,
	popupDescriptionInput,
	placeName,
	placeUrl,
	placeEditorCloseButtonNode,
	imageViewerCloseButtonNode,
	profileAddButtonNode,
	submitElementBtn,
	profileEditorCloseButtonNode,
	addForm,
	editForm,
	popupPlaceEditorNode,
	popupPhotoSelector,
	selectors,
	elementCard} from "../utils/constants.js";


const userInfo = new UserInfo(profileNameNode, profileDescriptionNode);

const popupWithInfoForm = new PopupWithForm({
	popupSelector:'#profile-editor',
	handleFormSubmit:(data) => {
		userInfo.setUserInfo(data.name, data.info);
		popupWithInfoForm.close(data);
	}
});
popupWithInfoForm.setEventListeners();

profileEditButtonNode.addEventListener('click', function() {
	const userData = userInfo.getUserInfo(); 
	profileNameNode.value = userData.name; 
	profileDescriptionNode.value = userData.info;
	popupWithInfoForm.open(); 
});

editForm.addEventListener('submit', function (event) {
    event.preventDefault();
    profileNameNode.textContent = popupNameInput.value;
    profileDescriptionNode.textContent = popupDescriptionInput.value;
    popupWithInfoForm.close();
})

const popupWithImage = new PopupWithImage(popupPhotoSelector);
popupWithImage.setEventListeners();

const popupWithAddForm = new PopupWithForm({
	popupSelector: '#place-editor',
	handleFormSubmit: () => {
		const card = createCard({
			title: placeName.value,
			link: placeUrl.value
		});
		const cardElement = card;
  	    cardList.addItem(cardElement, "prepend");
  	    popupWithAddForm.close();
	}
});
popupWithAddForm.setEventListeners();

const createCard = (item) => {
	const card = new Card({
	    item: item,
		cardSelector: "#card",
	    handleCardClick:(item) => {
		   popupWithImage.open(item)
	}});
	return card.generateCard();
}
  submitElementBtn.addEventListener("click", (event) => {
	 	createCard(event)
	    });

const cardList = new Section({
	items: initialCards,  
		renderer: (item) => { 
		createCard(item);
		cardList.addItem(createCard(item)) 
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

  const formEditProfile = document.querySelector("#profile-editor");
  const formEditProfileValidator = new FormValidator(selectors, formEditProfile, profileEditButtonNode);
  formEditProfileValidator.enableValidation();
  
  const formAddCard = document.querySelector("#place-editor");
  const formAddCardValidator = new FormValidator(selectors, formAddCard, submitElementBtn);
  formAddCardValidator.enableValidation();
