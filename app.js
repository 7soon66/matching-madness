/*------------------------constraints-----------------*/

const cards = document.querySelectorAll('.card')
const winScreen = document.querySelector('.win-screen')
const nextLevelButton = document.querySelector('.next-level')
const mainMenuButton = document.querySelector('.main-menu')
let messageEl = document.querySelector('.message')
let flippedCards = []

/*---------------------variables---------------------*/

const resetGame = () => {
  cards.forEach((card) => {
    card.classList.remove('flipped', 'matched')
  })
  ;(flippedCards = []), (messageEl.innerHTML = ' ')
}
cards.forEach((card) => {
  card.addEventListener('click', () => {
    if (flippedCards.length < 2 && !card.classList.contains('flipped')) {
      card.classList.toggle('flipped')
      flippedCards.push(card)

      if (flippedCards.length === 2) {
        setTimeout(() => {
          if (flippedCards[0].id === flippedCards[1].id) {
            // Cards match, keep them flipped
            flippedCards[0].classList.add('matched')
            flippedCards[1].classList.add('matched')
          } else {
            // Cards don't match, flip them back
            flippedCards[0].classList.remove('flipped')
            flippedCards[1].classList.remove('flipped')
          }
          checkWin(), (flippedCards = [])
        }, 500)
      }
    }
  })
})

/*---------------------------------functions------------------------------------*/
const resetButton = document.querySelector('.reset')
const checkWin = () => {
  if (Array.from(cards).every((card) => card.classList.contains('matched'))) {
    messageEl.innerHTML = '<p>you are a winner !!!</p>'
  }
}

/*---------------------------------------eventlisitner------------------*/
resetButton.addEventListener('click', resetGame)
