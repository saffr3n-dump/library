(() => {
  const container = document.querySelector('.container');
  const newBtn = document.querySelector('.new');
  const modal = document.querySelector('dialog');
  const form = modal.querySelector('form');
  const library = [];

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
      card.append(title, details);

      for (let key in book) {
        if (['id', 'title'].includes(key)) continue;
        const item = document.createElement('div');
        details.appendChild(item);

        const term = document.createElement('dt');
        term.textContent = key[0].toUpperCase() + key.slice(1);
        const desc = document.createElement('dd');
        desc.textContent = book[key];
        item.append(term, desc);
      }
    });
  }
  displayBooks();

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
})();
