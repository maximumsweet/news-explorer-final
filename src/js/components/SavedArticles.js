export default class SavedArticles {
  constructor(api, createCard) {
    this._api = api;
    this._createCard = createCard;
    this._container = document.querySelector('.result__container');
    this._titleGreeting = document.querySelector('.articles-info__subtitle');
    this._titleKeyWords = document.querySelector('.articles-info__words');
    this._titleInfoKey = document.querySelector('.articles-info__key');
    this._buttonSavedArticles = document.querySelector('.header__button_savedArticles');
    this._savedArticles = [];
    this._keywords = [];
    this._numberSavedArticles = 0;
    this._makeGreeting.bind(this);
    this._makeTitleKeyWords.bind(this);
    this.addCard.bind(this);
    this._getSavedArticles();
  }

  addCard(keyWord) {
    this._savedArticles.forEach((article) => {
      const news = this._createCard(this._api, article, article.keyword);
      const cardElement = news.create();
      this._container.append(cardElement);
    });
  }

  _getSavedArticles() {
    this._api.getNews()
      .then((res) => {
        res.data.forEach((article) => {
          this._savedArticles.push(article);
          this._numberSavedArticles += 1;
          const recurringNews = this._keywords.find((item) => item.keyword === article.keyword);
          if (recurringNews !== undefined) {
            recurringNews.number += 1;
          } else {
            this._keywords.push({
              keyword: article.keyword,
              number: 1,
            });
          }
        });
        this._makeGreeting();
        this._makeTitleKeyWords();
        this.addCard();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  _makeGreeting() {
    if (this._numberSavedArticles === 0) {
      this._titleGreeting.textContent = `${this._buttonSavedArticles.textContent} у вас нет сохранённых статей`;
      this._container.parentElement.classList.add('hiddenElement');
    } else {
      this._titleGreeting.textContent = `${this._buttonSavedArticles.textContent} у вас ${this._numberSavedArticles} сохранённых статей`;
      this._container.parentElement.classList.remove('hiddenElement');
    }
  }

  _makeTitleKeyWords() {
    this._keywords = this._keywords.sort((a, b) => {
      if (a.number < b.number) return 1;
      if (a.number === b.number) return 0;
      return -1;
    });
    this._titleInfoKey.classList.remove('hiddenElement');
    if (this._keywords.length === 1) {
      this._titleKeyWords.textContent = this._keywords[0].keyword;
    } else if (this._keywords.length === 0) {
      this._titleInfoKey.classList.add('hiddenElement');
    } else if (this._keywords.length === 2) {
      this._titleKeyWords.textContent = `${this._keywords[0].keyword} `;
      this._titleKeyWords.insertAdjacentHTML('beforeend', '<span class="articles-info__key">и</span>');
      this._titleKeyWords.insertAdjacentText('beforeend', ` ${this._keywords[1].keyword}`);
    } else if (this._keywords.length === 3) {
      this._titleKeyWords.textContent = `${this._keywords[0].keyword}, ${this._keywords[1].keyword} `;
      this._titleKeyWords.insertAdjacentHTML('beforeend', '<span class="articles-info__key">и</span>');
      this._titleKeyWords.insertAdjacentText('beforeend', ` ${this._keywords[2].keyword}`);
    } else {
      this._titleKeyWords.textContent = `${this._keywords[0].keyword}, ${this._keywords[1].keyword} `;
      this._titleKeyWords.insertAdjacentHTML('beforeend', '<span class="articles-info__key">и</span>');
      this._titleKeyWords.insertAdjacentText('beforeend', ` ${this._keywords.length - 2} другим`);
    }
  }
}
