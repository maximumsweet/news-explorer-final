const form = document.querySelector('.popup__form_login');
const formReg = document.querySelector('.popup__form_registration');
const popupReg = document.querySelector('.popup_registration');
const popupRegClose = popupReg.querySelector('.popup__close');
const popupRegButton = popupReg.querySelector('.popup__button');
const popupRegToggle = popupReg.querySelector('.popup__toggle-link');
const popupLogin = document.querySelector('.popup_login');
const popupLoginOpen = document.querySelector('.header__button_auth');
const popupLoginClose = popupLogin.querySelector('.popup__close');
const popupLoginButton = popupLogin.querySelector('.popup__button');
const popupLoginToggle = popupLogin.querySelector('.popup__toggle-link');
const popupSuccess = document.querySelector('.popup_success');
const popupSuccessClose = popupSuccess.querySelector('.popup__close');
const popupSuccessToggle = popupSuccess.querySelector('.popup__toggle-link');

const registrationConst = {
  popup: popupReg,
  popupButton: popupRegButton,
  arrayClose: [popupRegClose, popupRegToggle],
  arrayOpen: [popupLoginToggle],
};
const loginConst = {
  popup: popupLogin,
  popupButton: popupLoginButton,
  arrayClose: [popupLoginClose, popupLoginToggle],
  arrayOpen: [popupRegToggle, popupLoginOpen, popupSuccessToggle],
};
const successConst = {
  popup: popupSuccess,
  popupButton: undefined,
  arrayClose: [popupSuccessClose, popupSuccessToggle],
  arrayOpen: undefined,
  flagSuccess: 1,
};

export {
  loginConst, registrationConst, successConst, popupSuccess, form, formReg,
};
