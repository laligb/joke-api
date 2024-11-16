const buttonElement = document.getElementById("jokeButton");
const message = document.getElementById("message");
interface reportObject {
  joke: string;
  score: number;
  date: Date;
}
let reportJokes: Array<reportObject> = [];
let currentJoke: string = "";
let userScore: number = 0;

let score1 = document.getElementById("score1");
let score2 = document.getElementById("score2");
let score3 = document.getElementById("score3");

async function getJoke() {
  const url: string = "https://icanhazdadjoke.com/";
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
  } catch (error) {
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

async function getScore(score: HTMLElement, n: number) {
  score.addEventListener("click", async () => {
    resetActiveClass();
    score.classList.add("active");
    score.classList.remove("btn-warning");
    score.classList.add("btn-danger");
    userScore = n;
  });
}

const scores = () => {
  userScore = 0;

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
};

// Messages
async function showMessage(msg: HTMLElement) {
  try {
    //const joke: string = await getJoke();
    const joke: string = await showJoke();
    msg.textContent = `"${joke}"`;
    scores();

    currentJoke = joke;
  } catch (error) {
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
} else {
  console.error("Not found");
}

// Weather API
async function getWeather() {
  let lat: number = 41.39;
  let lon: number = 2.15;
  let api: string = "14266b3728f231cd23550d7d89e0977d";
  const url: string = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
}

async function displayWeather() {
  let weatherData = await getWeather();
  let celsius = document.getElementById("celsius");
  let weather = document.getElementById("weather");

  if (celsius) {
    celsius.textContent = (weatherData.main.temp - 273.15).toFixed(0) + " °C";
  }

  if (weather) {
    weather.textContent = weatherData.weather[0].main + " | ";
  }
}

displayWeather();

// Jokes
async function getNewJoke() {
  const url: string = "https://official-joke-api.appspot.com/jokes/random";

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
}

async function newJoke() {
  const joke = await getNewJoke();
  return joke.setup + " " + joke.punchline;
}

async function showJoke() {
  const randomJoke = Math.random() < 0.5;
  return randomJoke ? await getJoke() : await newJoke();
}
