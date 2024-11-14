const buttonElement = document.getElementById("jokeButton");
const message = document.getElementById("message");
let reportJokes = [];
let currentJoke = "";
let userScore = 0;
let score1 = document.getElementById("score1");
let score2 = document.getElementById("score2");
let score3 = document.getElementById("score3");
export async function getJoke() {
    const url = "https://icanhazdadjoke.com/";
    try {
        const response = await fetch(url, {
            headers: {
                Accept: "application/json",
            },
        });
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        return data.joke;
    }
    catch (error) {
        console.error("Failed to fetch joke:", error);
        return undefined;
    }
}
// Scores
const resetActiveClass = () => {
    score1?.classList.remove("btn-danger");
    score1?.classList.add("btn-warning");
    score2?.classList.remove("btn-danger");
    score2?.classList.add("btn-warning");
    score3?.classList.remove("btn-danger");
    score3?.classList.add("btn-warning");
};
async function getScore(score, n) {
    score.addEventListener("click", async () => {
        resetActiveClass();
        score.classList.add("active");
        score.classList.remove("btn-warning");
        score.classList.add("btn-danger");
        userScore = n;
    });
}
function scores() {
    if (score1) {
        resetActiveClass();
        getScore(score1, 1);
    }
    if (score2) {
        resetActiveClass();
        getScore(score2, 2);
    }
    if (score3) {
        resetActiveClass();
        getScore(score3, 3);
    }
    return 0;
}
// Messages
async function showMessage(msg) {
    try {
        const joke = await getJoke();
        msg.textContent = `"${joke}"`;
        scores();
        currentJoke = joke;
    }
    catch (error) {
        console.error(error);
    }
}
if (message) {
    showMessage(message);
}
if (buttonElement && message) {
    buttonElement.addEventListener("click", async () => {
        showMessage(message);
        if (currentJoke !== "") {
            reportJokes.push({
                joke: currentJoke,
                score: userScore,
                date: new Date(),
            });
        }
        console.log(reportJokes);
    });
}
else {
    console.error("Not found");
}
//# sourceMappingURL=index.js.map