import './index.css';

// import { initialCards } from"../utils/initialCards.js";
import Card from "../components/card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from '../components/Api';
import PopupWithConfirmation from '../components/PopupWithConfirmation';

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
    editButtonAvatar,
	profileInputName,
	profileInputDescription} from "../utils/constants.js";

const api = new Api({
		address: "https://mesto.nomoreparties.co/v1/cohort-44",
		token: "497373c8-3f58-4b67-8592-c177fbd661e3"
	});

const userInfo = new UserInfo({
	nameProfile: ".profile__name",
	avatarProfile: ".profile__avatar",
	descriptionProfile: ".profile__description"
});

//Попап Профиль
const popupProfile = new PopupWithForm({
	popupSelector:'.popup_type_profile',
	handleFormSubmit: (data) => {
		popupProfile.setUserForm(true);

		api.setUserProfile(data)
		   .then((dataInfo) => {
			userInfo.setUserInfo(dataInfo);
			popupProfile.close();
		   })
		   .catch((error) => console.log(error))
		   .finally(() => popupProfile.setUserForm(false));
	},
});
popupProfile.setEventListeners();

//слушатель для профиля
profileEditButtonNode.addEventListener('click',() => {
	const userData = userInfo.getUserInfo();  
	popupNameInput.value = userData.name;  
	popupDescriptionInput.value = userData.about; 
	popupProfile.open(); 
	
	formEditProfileValidator.handleAddButtonClick();
});

let myInfo;
Promise.all([api.getUserProfile(), api.getInitialCards()])
    .then(([objectInfo, cardArr]) => {
		myInfo = objectInfo;
		userInfo.setUserInfo(objectInfo);
		cardList.rendererItems(cardArr);
		console.log(objectInfo);
		console.log(cardArr);
	})
	.catch((error) => {
		console.log(error);
	});

//Картинки
const popupWithImage = new PopupWithImage(popupPhotoSelector);
popupWithImage.setEventListeners();

//Попап Карточки
const popupWithAddForm = new PopupWithForm({
	popupSelector: '#place-editor',
	handleFormSubmit: (item) => {
		popupWithAddForm.setUserForm(true);

		api.addNewCard(item)
		.then((itemCard) => {
			const newCard = createCard(itemCard);
			cardList.addItemPrepend(newCard);
			popupWithAddForm.close();
		})
		.catch((error) => console.log(error))
		.finally(() => popupWithAddForm.setUserForm(false));
	},
});
popupWithAddForm.setEventListeners();

profileAddButtonNode.addEventListener("click", () => {
	popupWithAddForm.open();
	formAddCardValidator.handleAddButtonClick();
});

//Функция создания карточек
const createCard = (item) => {
	const card = new Card({
		item: item,
		adminInfo: adminInfo,
		cardSelector: "#card",
		handleCardClick: (card) => popupWithImage.open(card),
		handleDelClick: (cardId) => {
		  popupDelCard.setSubmitAction(() => {
			api.removeCard(cardId)
			  .then(() => {
				card.removeCard();
				popupDelCard.close();
			  })
			  .catch(() => {
				console.log("Ошибка удаления");
			  });
		  });
		  popupDelCard.open();
		},
		handleLikeEl: () => {
		  api.addLikeCard(card.getCurrentCard()._id)
			.then((itemCard) => {
			  card.handleLike(itemCard);
			})
			.catch(() => console.log("Ошибка постановки лайка"));
		},
		handleDelLikeEl: () => {
		  api.removeLikeCard(card.getCurrentCard()._id)
			.then((itemCard) => {
			  card.handleLike(itemCard);
			})
			.catch(() => console.log("Ошибка снятия лайка"));
		},
	  });
	  return card.generateCard();
	};

//Добавление карточек
const cardList = new Section({
	// items: initialCards,  
	renderer: (item) => {
	cardList.addItemAppend(createCard(item));
	}}, 
	elements);

//попап "Удаление карточки"
const popupDelCard = new PopupWithConfirmation({
	popupSelector: ".popup_place_delete",
  });
  popupDelCard.setEventListeners();

//попап "Аватарка"
const popupAvatar = new PopupWithForm({
	popupSelector: "#avatar-editor",
	handleFormSubmit: (data) => {
		popupAvatar.setUserForm(true);
		
		api.editUserAvatar(data)
		  .then((objectInfo) => {
			userInfo.setUserInfo(objectInfo);
			popupAvatar.close();
		  })
		  .catch((error) => console.log(error))
		  .finally(() => popupAvatar.setUserForm(false));
	},
});
popupAvatar.setEventListeners();

editButtonAvatar.addEventListener("click", () => {
	popupAvatar.open();

	formEditAvatarValidator.handleAddButtonClick();
});


  const formEditProfile = document.querySelector("#profile-editor");
  const formEditProfileValidator = new FormValidator(selectors, formEditProfile, profileAddButtonNode);
  formEditProfileValidator.enableValidation();
  
  const formAddCard = document.querySelector("#place-editor");
  const formAddCardValidator = new FormValidator(selectors, formAddCard);
  formAddCardValidator.enableValidation();

  const formEditAvatar = document.querySelector("#avatar-editor");
  const formEditAvatarValidator = new FormValidator(selectors, formEditAvatar);
  formEditAvatarValidator.enableValidation();

  