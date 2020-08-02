export default class Popup {
  constructor(popup, button, arrayForClose, arrayForOpen) {
    this._popup = popup;
    this._button = button;
    this._inputs = this._popup.querySelectorAll('.popup__input');
    this._open = this._open.bind(this);
    this._close = this._close.bind(this);
    this._clearContent = this._clearContent.bind(this);
    this._setHandlers(arrayForClose, arrayForOpen);
  }

  _open(event) {
    event.stopPropagation();
    this._popup.classList.add('popup_is-opened');
    this._button.classList.remove('popup__button_active');
    this._button.setAttribute('disabled', 'disabled');
    this._clearContent();
    this._inputs[0].focus();
  }

  _close(event) {
    event.stopPropagation();
    this._popup.classList.remove('popup_is-opened');
  }

  _setHandlers(arrayForClose, arrayForOpen) {
    this._popup.addEventListener('click', (event) => {
      if (event.target.classList.contains('popup')) {
        this._popup.classList.remove('popup_is-opened');
      }
    });
    if (arrayForClose !== undefined) {
      arrayForClose.forEach((el) => {
        el.addEventListener('click', this._close);
      });
    }
    if (arrayForOpen !== undefined) {
      arrayForOpen.forEach((el) => {
        el.addEventListener('click', this._open);
      });
    }
  }

  _clearContent() {
    this._inputs.forEach((input) => {
      input.value = '';
    });
  }
}
