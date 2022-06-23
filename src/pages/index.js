   import './index.css';

import { initialCards } from"../utils/initialCards.js";
import Card from "../components/card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

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
	elementCard,
	elements,
	profileInputName,
	profileInputDescription} from "../utils/constants.js";


const userInfo = new UserInfo(".profile__name", ".profile__description");

//Попап Профиль
const popupWithInfoForm = new PopupWithForm({
	popupSelector:'#profile-editor',
	handleFormSubmit:(data) => {
		userInfo.setUserInfo(data);
		popupWithInfoForm.close();
	},
});
popupWithInfoForm.setEventListeners();

//слушатель для профиля
profileEditButtonNode.addEventListener('click',() => {
	const getUserInfo = userInfo.getUserInfo();  
	profileInputName.value = getUserInfo.name;  
	profileInputDescription.value = getUserInfo.description; 
	popupWithInfoForm.open();  
});

//Картинки
const popupWithImage = new PopupWithImage(popupPhotoSelector);
popupWithImage.setEventListeners();

//Попап Карточки
const popupWithAddForm = new PopupWithForm({
	popupSelector: '#place-editor',
	handleFormSubmit: (item) => {
  	    cardList.addItem(createCard(item));
		  popupWithAddForm.close();
	}
});
popupWithAddForm.setEventListeners();

//Функция создания карточек
const createCard = (item) => {
	return new Card(item, ".template", (data) => {
		popupWithImage.open(data);
	}).generateCard();
  }

// const createCard = (item) => {
// 	const card = new Card({
// 	    item: item,
// 		cardSelector: ".template",
// 	    handleCardClick:(item) => {
// 		   popupWithImage.open(item)
// 	}});
// 	return card.generateCard();
// }
//   submitElementBtn.addEventListener("click", (event) => {
// 	 	createCard(event)
// 	    });

//Добавление карточек
const cardList = new Section({
	items: initialCards,  
	renderer: (item) => {
	cardList.addItem(createCard(item));
	}}, 
	elements); 
  cardList.renderItems(); 

  profileAddButtonNode.addEventListener("click", () => {
	popupWithAddForm.open();
});


  const formEditProfile = document.querySelector("#profile-editor");
  const formEditProfileValidator = new FormValidator(selectors, formEditProfile, profileAddButtonNode);
  formEditProfileValidator.enableValidation();
  
  const formAddCard = document.querySelector("#place-editor");
  const formAddCardValidator = new FormValidator(selectors, formAddCard);
  formAddCardValidator.enableValidation();
