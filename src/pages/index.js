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


const userInfo = new UserInfo({
	nameProfile: ".profile__name",
	descriptionProfile: ".profile__description"});

//Попап Профиль
const popupWithInfoForm = new PopupWithForm({
	popupSelector:'.popup_type_profile',
	handleFormSubmit: (data) => {
		userInfo.setUserInfo(data);
	    popupWithInfoForm.close();
	},
});
popupWithInfoForm.setEventListeners();

//слушатель для профиля
profileEditButtonNode.addEventListener('click',() => {
	const userData = userInfo.getUserInfo();  
	popupNameInput.value = userData.name;  
	popupDescriptionInput.value = userData.description; 
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
function createCard(item) {
	return new Card(item, "#card", (data) => {
		popupWithImage.open(data);
	}).generateCard();
  }

//Добавление карточек
const cardList = new Section({
	items: initialCards,  
	renderer: (item) => {
	cardList.addItem(createCard(item));
	}}, 
	elements); 
  cardList.rendererItems(); 

  profileAddButtonNode.addEventListener("click", () => {
	popupWithAddForm.open();
});


  const formEditProfile = document.querySelector("#profile-editor");
  const formEditProfileValidator = new FormValidator(selectors, formEditProfile, profileAddButtonNode);
  formEditProfileValidator.enableValidation();
  
  const formAddCard = document.querySelector("#place-editor");
  const formAddCardValidator = new FormValidator(selectors, formAddCard);
  formAddCardValidator.enableValidation();
