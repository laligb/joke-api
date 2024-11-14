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
const buttonElement = document.getElementById("jokeButton");
const message = document.getElementById("message");
if (message) {
    try {
        const joke = await getJoke();
        message.textContent = joke;
        console.log(joke);
    }
    catch (error) {
        console.error(error);
    }
}
if (buttonElement && message) {
    buttonElement.addEventListener("click", async () => {
        try {
            const joke = await getJoke();
            message.textContent = joke;
            console.log(joke);
        }
        catch (error) {
            console.log(error);
        }
    });
}
else {
    console.error("Not found");
}
//# sourceMappingURL=index.js.map