function urlToId(url) {
  let urlParts = url.split("/");
  const questionId = urlParts[urlParts.length - 1];
  return questionId;
}

async function setVoteCount() {
  const questionVoteCountSpan = document.getElementById("question-vote__count");

  const questionId = urlToId();

  const res = await fetch(`/api/questions/${questionId}/votes`);
  const data = await res.json();

  let votes = 0;

  data.votesArr.forEach((ele) => {
    if (ele.upvote) {
      votes++;
    } else {
      votes--;
    }
  });

  questionVoteCountSpan.innerHTML = votes;
}

window.addEventListener("load", (event) => {
  const contianer = document.querySelector(".questionList__container");

  let arrOfVoteDivs = Array.from(contianer.children).map((el) => {
    return Array.from(el.children)[1];
  });

  console.log(arrOfVoteDivs);

  let arrOfIds = Array.from(contianer.children)
    .map((el) => {
      return Array.from(el.children)[0].href;
    })
    .map((el) => {
      return urlToId(el);
    });

  arrOfIds.forEach(async (id, idx) => {
    const res = await fetch(`/api/questions/${id}/votes`);
    const data = await res.json();
    let votes = 0;

    data.votesArr.forEach((ele) => {
      if (ele.upvote) {
        votes++;
      } else {
        votes--;
      }
    });

    arrOfVoteDivs[idx].innerHTML = `votes: ${votes}`;
  });
});
