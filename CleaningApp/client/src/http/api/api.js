export async function getIp() {
  const ip = await fetch("https://ipapi.co/json");
  const response = await ip.json();
  return response;
}

export async function getJoke() {
  const joke = await fetch("https://official-joke-api.appspot.com/random_joke");
  return joke.json();
}
