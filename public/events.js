const getCatPic = async () => {
    try {
        let img = document.querySelector(".cat-pic");
        document.querySelector(".loader").innerHTML = "<p>Loading..</p>";
        img.src = "";

        let res = await fetch("/kitten/image");
        if (!res.ok) throw res;
        let data = await res.json();

        img.src = data.src;
        document.querySelector(".loader").innerHTML = "";
    } catch (error) {
        let data = await error.json();
        alert(data.message);
    }
};

const getScore = async () => {
    try {
        let score = document.querySelector(".score");
        let response = await fetch("/kitten/image");
        if (!response.ok) throw response;
        let data = await response.json();
        score.innerHTML = `${data.score}`;
        console.log(data);
    } catch (error) {
        let data = await error.json();
        alert(data.message);
    }
};

const upvote = async () => {
    try {
        let response = await fetch("/kitten/upvote", { method: "PATCH" });
        if (!response.ok) throw response;
        let data = await response.json();
        let scoreSpan = document.querySelector(".score");
        scoreSpan.innerHTML = `${data.score}`;
    } catch (error) {
        let data = await error.json();
        alert(data.message);
    }
};

const downvote = async () => {
    try {
        let response = await fetch("/kitten/downvote", { method: "PATCH" });
        if (!response.ok) throw response;
        let data = await response.json();
        let scoreSpan = document.querySelector(".score");
        scoreSpan.innerHTML = `${data.score}`;
    } catch (error) {
        let data = await error.json();
        alert(data.message);
    }
};

const addComment = async () => {
    try {
        let comment = document.querySelector(".user-comment").value;
        let body = {
            comment: comment,
        };
        let response = await fetch("/kitten/comments", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });
        if (!response.ok) throw response;
        let data = await response.json();

        showComments(data);
    } catch (err) {
        let data = await error.json();
        alert(data.message);
    }
};

const showComments = (data) => {
    let commentsDiv = document.querySelector(".comments");
    console.log(data);
    let comment = data.comments.pop();
    commentsDiv.innerHTML += `<p>${comment}</p>`;
};

let button = document.querySelector("#new-pic");
let upvoteBtn = document.querySelector("#upvote");
let downvoteBtn = document.querySelector("#downvote");
let form = document.querySelector(".comment-form");

window.addEventListener("DOMContentLoaded", () => {
    getCatPic();
    getScore();
});
button.addEventListener("click", getCatPic);
upvoteBtn.addEventListener("click", upvote);
downvoteBtn.addEventListener("click", downvote);
form.addEventListener("submit", (e) => {
    e.preventDefault();
    addComment();
});
