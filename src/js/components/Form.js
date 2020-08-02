import {
  validationLenght, validationLenghtName, validationEmail, validationRequiredField,
} from '../constants/validation-errors';

export default class FormValidation {
  constructor(form, api, popupSuccess = null) {
    this._api = api;
    this._form = form;
    this._email = this._form.elements.email;
    this._password = this._form.elements.password;
    this._name = this._form.elements.name;
    this._popupSuccess = popupSuccess;
    this._error = this._form.querySelector('.error_popup');
    this._button = this._form.querySelector('.popup__button');
    this._setHandlers = this._setHandlers.bind(this);
    this._setHandlers();
  }

  _registration() {
    this._form.elements.forEach((input) => {
      if (input !== this._button) input.setAttribute('disabled', 'disabled');
    });
    this._button.textContent = 'Регистрируемся...';
    this._api.signup(this._email.value, this._password.value, this._name.value)
      .then((res) => {
        this._form.elements.forEach((input) => {
          if (input !== this._button) input.removeAttribute('disabled');
        });
        this._button.textContent = 'Зарегистрироваться';
        this._popupSuccess.classList.add('popup_is-opened');
        this._form.parentElement.parentElement.classList.remove('popup_is-opened');
      })
      .catch((err) => {
        this._form.elements.forEach((input) => {
          if (input !== this._button) input.removeAttribute('disabled');
        });
        this._setServerError('такой пользователь уже есть');
        this._button.textContent = 'Зарегистрироваться';
      });
  }

  _login() {
    this._button.textContent = 'Выполняем вход...';
    this._form.elements.forEach((input) => {
      if (input !== this._button) input.setAttribute('disabled', 'disabled');
    });
    this._api.signin(this._email.value, this._password.value)
      .then((res) => {
        this._form.elements.forEach((input) => {
          if (input !== this._button) input.removeAttribute('disabled');
        });
        this._button.textContent = 'Войти';
        const event = new Event('login');
        document.dispatchEvent(event);
        this._form.parentElement.parentElement.classList.remove('popup_is-opened');
      })
      .catch((err) => {
        this._form.elements.forEach((input) => {
          if (input !== this._button) input.removeAttribute('disabled');
        });
        this._setServerError('Неправильные почта или пароль');
        this._button.textContent = 'Войти';
      });
  }

  _setHandlers() {
    this._form.elements.forEach((input) => {
      if (input !== this._button) input.addEventListener('input', this._checkInputValidity.bind(this));
    });
    this._button.addEventListener('click', this._formSubmission.bind(this));
  }

  _checkInputValidity(event) {
    this._error.textContent = '';
    this._validateForm();
    this._resetError(event.target);
    this._validateInputElement(event.target);
  }

  _validateInputElement(element) {
    const errorElement = this._form.querySelector(`.error__${element.name}`);

    if (!element.checkValidity()) {
      if (!element.value) {
        errorElement.textContent = validationRequiredField;
      }
      if (element.classList.contains('popup__input_type-email')) {
        errorElement.textContent = validationEmail;
      }
      if (element.classList.contains('popup__input_type-password')) {
        errorElement.textContent = validationLenght;
      }
      if (element.classList.contains('popup__input_type-name')) {
        errorElement.textContent = validationLenghtName;
      }
      return false;
    }
    return true;
  }

  _validateForm() {
    let flagValid = true;
    this._form.elements.forEach((elem) => {
      if (elem.classList.contains('popup__input')) {
        if (!(this._validateInputElement(elem, this._form))) flagValid = false;
      }
    });
    this._setSubmitButton(flagValid);
  }

  _formSubmission(event) {
    this._validateForm();
    if (event.target.classList.contains('popup__button_active')) {
      if (this._form.classList.contains('popup__form_registration')) {
        this._registration();
      } else this._login();
    }
  }

  _setServerError(message) {
    this._error.textContent = message;
  }

  _resetError(input) {
    const errorElement = this._form.querySelector(`.error__${input.name}`);
    errorElement.textContent = '';
  }

  _setSubmitButton(flag) {
    if (flag) {
      this._button.classList.add('popup__button_active');
      this._button.removeAttribute('disabled');
    } else {
      this._button.classList.remove('popup__button_active');
      this._button.setAttribute('disabled', 'disabled');
    }
  }
}
