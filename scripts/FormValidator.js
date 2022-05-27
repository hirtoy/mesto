export class FormValidator { 
	constructor(selectors, formElement) { 
		this._selectors = selectors; 
		this._submitButton = formElement.querySelector(selectors.submitButtonSelector); 
		this._formElement = formElement;
		this._inputList = Array.from(this._formElement.querySelectorAll(this._selectors.inputSelector));
	}; 
	// Функция, которая добавляет класс с ошибкой 
	_showInputError(inputElement, errorMessage) { 
	  const errorElement = this._formElement.querySelector(`.${inputElement.name}-error`); 
	  inputElement.classList.add(this._selectors.inputInvalidClass); 
	  errorElement.classList.add(this._selectors.inputSelector); 
	  errorElement.textContent = errorMessage; 
	}; 

	// Функция, которая удаляет класс с ошибкой 
	_hideInputError(inputElement) { 
	  const errorElement = this._formElement.querySelector(`.${inputElement.name}-error`); 
	  inputElement.classList.remove(this._selectors.inputInvalidClass); 
	  errorElement.classList.remove(this._selectors.inputSelector); 
	  errorElement.textContent = " ";
	}; 

	// Функция, которая проверяет валидность поля 
	_checkInputValidity(inputElement) { 
	  if (!inputElement.validity.valid) { 
		// Если поле не проходит валидацию, покажем ошибку 
		this._showInputError(inputElement, inputElement.validationMessage); 
	  } else { 
		// Если проходит, скроем 
		this._hideInputError(inputElement); 
	  } 
	}; 

	//проверяем поля ввода на корректность 
	_hasInvalidInput(_inputList) { 
	  return this._inputList.some(input => !input.validity.valid) 
	}; 
	//функция изменения состояния кнопки 
	_toggleButtonState(_inputList) { 
	  if (this._hasInvalidInput(this._inputList)) { 
		this._submitButton.classList.add(this._selectors.buttonInvalidClass); 
		this._submitButton.setAttribute("disabled", true); 
	  } else { 
		this._submitButton.classList.remove(this._selectors.buttonInvalidClass); 
		this._submitButton.removeAttribute("disabled"); 
	  } 
	}; 

	//функция добавляет обработчики сразу всем полям формы 
	_setEventListeners() { 
	  this._toggleButtonState(); 
	  this._inputList.forEach((inputElement) => { 
		inputElement.addEventListener("input", () => { 
		  this._checkInputValidity(inputElement); 
		  this._toggleButtonState(this._inputList); 
		}); 
	  }); 
	}; 

	//находим и перебираем все формы на странице 
	enableValidation() { 
	  this._setEventListeners(); 
	} 
 
	//Функция сброса ошибок 
	restartFormValidation() { 
	  this._toggleButtonState(this._inputList);
	  this._inputList.forEach((inputElement) => {
		this._hideInputError(inputElement);
	  });
	}
}