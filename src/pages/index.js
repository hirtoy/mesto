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
	popupNameInput,
	popupDescriptionInput,
	profileAddButtonNode,
	popupPhotoSelector,
	selectors,
	elements,
    editButtonAvatar,
	} from "../utils/constants.js";

const api = new Api({
	url: "https://mesto.nomoreparties.co/v1/cohort-44",
	headers: {
		Authorization: "497373c8-3f58-4b67-8592-c177fbd661e3",
		'Content-Type': 'application/json',
  },
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

		api.setUserProfile(data)
		   .then((dataInfo) => {
			userInfo.setUserInfo(dataInfo);
			popupProfile.close();
		   })
		   .catch((error) => console.log(error))
		   .finally(() => popupProfile.showLoadingStatus(false));
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

 let adminInfo = '';
Promise.all([api.getUserProfile(), api.getInitialCards()])
    .then(([objectInfo, cardArr]) => {
		adminInfo = objectInfo._id;
		userInfo.setUserInfo(objectInfo);
		cardList.rendererItems(cardArr);
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
	handleFormSubmit: (data) => {

		api.addNewCard(data)
		.then((item) => {
		  cardList.addItemPrepend(createCard(item));
		  popupWithAddForm.close();
		})
		.catch((error) => console.log(error))
		.finally(() => popupWithAddForm.showLoadingStatus(false));
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
		cardSelector: ".template",
		handleCardClick: () => { popupWithImage.open({name: item.name, link: item.link});
	},
		handleDelClick: (id, element) => {
			popupDelCard.open();
			popupDelCard.getCard(id, element);
		  },
		  handleLikeEl: {
		    handleLikeElement: (_id) => {
		       api.addLikeCard(_id)
			    .then((res) => {
			       card.updateLikes(res.likes.length);
			})
			    .catch(() => console.log("Ошибка постановки лайка"));
			},
		handleDelLikeElement: (_id) => {
		  api.removeLikeCard(_id)
			.then((res) => {
			  card.updateLikes(res.likes.length);
			})
			.catch(() => console.log("Ошибка снятия лайка"));
		},
	},
	  });
	  return card.generateCard();
	};

//Добавление карточек
const cardList = new Section({
	renderer: (item) => {
	cardList.addItemAppend(createCard(item));
	}}, 
	elements);

//попап "Удаление карточки"
const popupDelCard = new PopupWithConfirmation({
	popupSelector: ".popup_place_delete",
	handleSubmitDelete: (id, element) => {
		api.removeCard(id)
		   .then(() => {
			element.remove();
			element = '';
			popupDelCard.close();
		   })
		   .catch((error) => {
			console.log(error);
		   })
	}
  });
  popupDelCard.setEventListeners();

//попап "Аватарка"
const popupAvatar = new PopupWithForm({
	popupSelector: "#avatar-editor",
	handleFormSubmit: (data) => {
		// popupAvatar.setUserForm(true);
		
		api.editUserAvatar(data)
		  .then((objectInfo) => {
			userInfo.setUserInfo(objectInfo);
			popupAvatar.close();
		  })
		  .catch((error) => console.log(error))
		  .finally(() => popupAvatar.showLoadingStatus(false));
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

  