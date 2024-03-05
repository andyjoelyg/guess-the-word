const API_URL = 'https://random-word-api.herokuapp.com/word'

export async function getRandomWord(length, lang) {
  try {
    const response = await fetch(`${API_URL}?length=${length}&lang=${lang}`)
    const data = await response.json()
    return removeSpecialChars(data[0].toUpperCase())
  } catch (error) {
    console.error('Error:', error)
  }
}

function removeSpecialChars(word) {
  return word
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z]/g, '')
}
