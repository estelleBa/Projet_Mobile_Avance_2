export function getRandomJoke () {
  const url = 'https://api.chucknorris.io/jokes/random'
  return fetch(url)
   .then((response) => response.json())
   .catch((error) => console.error(error))
}
export function getCategories () {
  const url = 'https://api.chucknorris.io/jokes/categories'
  return fetch(url)
   .then((response) => response.json())
   .catch((error) => console.error(error))
}
export function getRandomJokeWithCategory (category) {
  const url = 'https://api.chucknorris.io/jokes/random?category=' + category
  return fetch(url)
   .then((response) => response.json())
   .catch((error) => console.error(error))
}
export function getRandomJokeWithText (text) {
  const url = 'https://api.chucknorris.io/jokes/search?query=' + text
  return fetch(url)
   .then((response) => response.json())
   .catch((error) => console.error(error))
}
export function getPosts () {
  const url = 'http://bde66ef7.ngrok.io/posts'
  return fetch(url)
   .then((response) => response.json())
   .catch((error) => console.error(error))
}
export function getPostsCount (n) {
  const url = 'http://bde66ef7.ngrok.io/posts/count/'+n
  return fetch(url)
   .then((response) => response.json())
   .catch((error) => console.error(error))
}
export function getLoc () {
  const url = 'http://bde66ef7.ngrok.io/loc'
  return fetch(url)
   .then((response) => response.json())
   .catch((error) => console.error(error))
}
