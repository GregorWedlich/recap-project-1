const bookmarkButton = document.querySelector('[data-js="card__bookmark"]');
const answerButton = document.querySelector('[data-js="answer__button"]');

const answer = document.querySelector('[data-js="card__answer"]');

bookmarkButton.addEventListener("click", (event) => {
  event.preventDefault();

  event.currentTarget.classList.toggle("card__bookmark--active");
});

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
