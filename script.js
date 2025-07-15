(() => {
  const container = document.querySelector('.container');
  const newBtn = document.querySelector('.new');
  const modal = document.querySelector('dialog');
  const form = modal.querySelector('form');
  let library = [];

  container.addEventListener('click', (e) => {
    if (e.target.type === 'checkbox') {
      const book = library.find((book) => book.id === e.target.value);
      book.setRead(e.target.checked);
      displayBooks();
      return;
    }

    if (e.target.className === 'rm') {
      library = library.filter((book) => book.id !== e.target.value);
      displayBooks();
    }
  });

  newBtn.addEventListener('click', () => {
    modal.showModal();
  });

  modal.addEventListener('mousedown', (e) => {
    const rect = modal.getBoundingClientRect();
    const isInModal =
      rect.top <= e.clientY &&
      rect.right >= e.clientX &&
      rect.bottom >= e.clientY &&
      rect.left <= e.clientX;
    if (!isInModal) modal.close();
  });

  form.addEventListener('submit', () => {
    if (!form.checkValidity()) return;
    const [title, author, pages, read] = new FormData(form).values();
    addBookToLibrary(title, author, pages, !!read);
    displayBooks();
    form.reset();
  });

  // TEMP
  addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', '228', false);
  addBookToLibrary('The Lord of the Rings', 'J.R.R. Tolkien', '666', true);
  addBookToLibrary('War & Peace', 'Lev Tolstoy', '9000', false);

  function displayBooks() {
    container.innerHTML = '';
    library.forEach((book) => {
      const card = document.createElement('div');
      card.className = 'card';
      container.appendChild(card);

      const title = document.createElement('h2');
      title.textContent = book.title;
      const details = document.createElement('dl');
      const rmBtn = document.createElement('button');
      rmBtn.className = 'rm';
      rmBtn.textContent = 'Remove';
      rmBtn.type = 'button';
      rmBtn.value = book.id;
      card.append(title, details, rmBtn);

      for (let key of Object.getOwnPropertyNames(book)) {
        if (['id', 'title'].includes(key)) continue;
        const item = document.createElement('div');
        details.appendChild(item);

        const term = document.createElement('dt');
        term.textContent = key[0].toUpperCase() + key.slice(1);
        let desc;
        if (key === 'read') {
          desc = document.createElement('input');
          desc.type = 'checkbox';
          desc.name = 'read';
          desc.value = book.id;
          desc.checked = book[key];
        } else {
          desc = document.createElement('dd');
          desc.textContent = book[key];
        }
        item.append(term, desc);
      }
    });
  }

  function addBookToLibrary(title, author, pages, read) {
    const id = crypto.randomUUID();
    const book = new Book(id, title, author, pages, read);
    library.push(book);
  }

  function Book(id, title, author, pages, read) {
    if (!new.target) {
      throw new Error("'new' must be used to call the constructor");
    }

    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
  Book.prototype.setRead = function (value) {
    this.read = value;
  };

  displayBooks();
})();
