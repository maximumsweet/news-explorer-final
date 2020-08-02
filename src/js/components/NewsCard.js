import { formattingTime } from '../utils/utils';

export default class NewsCard {
  constructor(api, cardData, keyWord, flagSavedArticles = 0) {
    this._api = api;
    this._keyWord = keyWord;
    this._flagSavedArticles = flagSavedArticles;
    this._cardData = cardData;
    this._template = document.querySelector('.template-card');
    this._savedArticles = document.getElementById('savedArticles');
    this._saveNews = this._saveNews.bind(this);
    this._deleteNews = this._deleteNews.bind(this);
  }

  _setHandlers() {
    this._templateBookmark.addEventListener('mouseover', () => {
      if (this._savedArticles.classList.contains('header__link_none') || this._flagSavedArticles) {
        this._templateAlert.classList.remove('hiddenElement');
      }
    });
    this._templateBookmark.addEventListener('mouseout', () => {
      if (this._savedArticles.classList.contains('header__link_none') || this._flagSavedArticles) {
        this._templateAlert.classList.add('hiddenElement');
      }
    });
    this.newCard.addEventListener('click', this._goToNewsSite.bind(this));
  }

  _goToNewsSite(event) {
    if (event.target.parentElement === this._templateBookmark) this._addAndDeleteBookmarks();
    else if (!this._flagSavedArticles) window.open(this._cardData.url);
    else window.open(this._cardData.link);
  }

  _addAndDeleteBookmarks() {
    if (this._flagSavedArticles) {
      this._id = this._cardData._id;
      this._deleteNews()
        .then((res) => {
          console.log(res);
          this.container.removeChild(this.newCard);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (!this._savedArticles.classList.contains('header__link_none')) {
      if (this._templateBookmark.classList.contains('card__bookmark_active')) {
        this._deleteNews()
          .then((res) => {
            console.log(res);
            this._templateBookmark.classList.remove('card__bookmark_active');
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        this._saveNews()
          .then((res) => {
            this._id = res.data._id;
            this._templateBookmark.classList.add('card__bookmark_active');
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }

  create() {
    this.newCard = document.createElement('div');
    this.newCard.classList.add('card');
    this.newCard.append(this._template.content.cloneNode(true));
    this._templateImage = this.newCard.querySelector('.card__image');
    this._templateDate = this.newCard.querySelector('.card__date');
    this._templateTitle = this.newCard.querySelector('.card__title');
    this._templateText = this.newCard.querySelector('.card__text');
    this._templateSourse = this.newCard.querySelector('.card__sourse');

    if (this._flagSavedArticles) {
      this._templateBookmark = this.newCard.querySelector('.card__bookmark_trash');
      this._templateKeyword = this.newCard.querySelector('.card__keyword');
      this.container = document.querySelector('.result__container');
      this._templateKeyword.textContent = this._keyWord;
      this._templateImage.src = this._cardData.image;
      this._templateDate.textContent = this._cardData.date;
      this._templateSourse.textContent = this._cardData.source;
    } else {
      this._templateBookmark = this.newCard.querySelector('.card__bookmark');
      this._templateDate.textContent = formattingTime(this._cardData.publishedAt);
      this._templateImage.src = this._cardData.urlToImage;
      this._templateSourse.textContent = this._cardData.source.name;
    }
    this._templateAlert = this.newCard.querySelector('.card__alert');
    this._templateTitle.textContent = this._cardData.title;
    this._templateText.textContent = this._cardData.description;

    this._setHandlers();
    return this.newCard;
  }

  _saveNews() {
    return this._api.saveNews(this._keyWord, this._templateTitle.textContent,
      this._templateText.textContent, this._templateDate.textContent,
      this._templateSourse.textContent, this._cardData.url, this._templateImage.src);
  }

  _deleteNews() {
    return this._api.deleteNews(this._id);
  }
}
