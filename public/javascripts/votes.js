function urlToId() {
  let url = window.location.href;
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
  const upVoteButton = document.getElementById("question_upVote");
  const downVoteButton = document.getElementById("question_downVote");

  const questionId = urlToId();

  upVoteButton.addEventListener("click", async (event) => {
    if (upVoteButton.classList.contains("active")) {
      await fetch(`/api/questions/${questionId}/votes`, {
        method: "delete",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      upVoteButton.classList.remove("active");
    } else if (downVoteButton.classList.contains("active")) {
      await fetch(`/api/questions/${questionId}/votes`, {
        method: "put",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ upvote: true }),
      });
      downVoteButton.classList.remove("active");
      upVoteButton.classList.add("active");

    } else {
      const fetchAnswer = await fetch(`/api/questions/${questionId}/votes`, {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ upvote: true }),
      });

      if (fetchAnswer.redirected) {
        alert('YOU HAVE TO LOG IN')
        return;
      }
      upVoteButton.classList.add("active");
    }
    setVoteCount();
  });

  downVoteButton.addEventListener("click", async (event) => {
    if (downVoteButton.classList.contains("active")) {
      await fetch(`/api/questions/${questionId}/votes`, {
        method: "delete",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      downVoteButton.classList.remove("active");
    } else if (upVoteButton.classList.contains("active")) {
      await fetch(`/api/questions/${questionId}/votes`, {
        method: "put",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ upvote: false }),
      });
      downVoteButton.classList.add("active");
      upVoteButton.classList.remove("active");
    } else {
      const fetchAnswer = await fetch(`/api/questions/${questionId}/votes`, {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ upvote: false }),
      });
      if (fetchAnswer.redirected) {
        alert('YOU HAVE TO LOG IN')
        return;
      }
      downVoteButton.classList.add("active");
    }
    setVoteCount();
  });

  setVoteCount();
});
