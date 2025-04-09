const bookmarkButton = document.querySelector('[data-js="card__bookmark"]');
const answerButton = document.querySelector('[data-js="answer__button"]');

const answer = document.querySelector('[data-js="card__answer"]');
const form = document.querySelector('[data-js="form"]');

/*
We need a if statement to check if the element exists before adding an event listener

Note: or we create a sep. js file for the form js
 */

if (bookmarkButton) {
  bookmarkButton.addEventListener("click", (event) => {
    event.preventDefault();
    event.currentTarget.classList.toggle("card__bookmark--active");
  });
}

if (answerButton && answer) {
  answerButton.addEventListener("click", (event) => {
    event.preventDefault();
    if (answer.hasAttribute("hidden")) {
      answer.removeAttribute("hidden");
      answerButton.innerText = "Hide";
    } else {
      answer.setAttribute("hidden", "");
      answerButton.innerText = "Answer";
    }
  });
}

if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log(event);
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    console.log("FormData: ", data);

    const newCard = createCard(data);
    document.body.append(newCard);

    event.target.reset();
  });
}

function createCard(data) {
  // card container
  const card = document.createElement("div");
  card.classList.add("card");

  // create questions element
  const questionElement = document.createElement("h2");
  questionElement.classList.add("card__question");
  questionElement.textContent = data.question || "Default Frage?";
  card.append(questionElement);

  // add answer button
  const answerButton = document.createElement("button");
  answerButton.classList.add("button");
  answerButton.setAttribute("data-js", "answer__button");
  answerButton.textContent = "Show Answer";
  card.append(answerButton);

  // hidden answer
  const answerElement = document.createElement("p");
  answerElement.classList.add("card__answer");
  answerElement.setAttribute("data-js", "card__answer");
  answerElement.setAttribute("hidden", "");
  answerElement.textContent = data.answer || "Default Antwort";
  card.append(answerElement);

  // Event Listener for answer button
  answerButton.addEventListener("click", (event) => {
    event.preventDefault();
    if (answerElement.hasAttribute("hidden")) {
      answerElement.removeAttribute("hidden");
      answerButton.textContent = "Hide";
    } else {
      answerElement.setAttribute("hidden", "");
      answerButton.textContent = "Show Answer";
    }
  });

  // Bookmark Button
  const bookmarkButton = document.createElement("button");
  bookmarkButton.classList.add("card__bookmark");
  bookmarkButton.setAttribute("aria-label", "Bookmark this question");
  bookmarkButton.setAttribute("data-js", "card__bookmark");

  // SVG Icon
  bookmarkButton.innerHTML = `<a href="#">
    <svg class="card__bookmark__icon lucide lucide-bookmark-icon lucide-bookmark" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"></path>
    </svg>
  </a>`;
  card.append(bookmarkButton);

  // Event Listener for Bookmark Button
  bookmarkButton.addEventListener("click", (event) => {
    event.preventDefault();
    bookmarkButton.classList.toggle("card__bookmark--active");
  });

  // Tag-Container
  const tagContainer = document.createElement("div");
  tagContainer.classList.add("card__tags");

  // Tag
  const tagElement = document.createElement("span");
  tagElement.classList.add("tag");
  tagElement.textContent = data.tag;
  tagContainer.append(tagElement);

  card.append(tagContainer);

  return card;
}
