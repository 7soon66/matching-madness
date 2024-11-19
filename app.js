/*------------------------constraints-----------------*/

const cards = document.querySelectorAll('.card')
const winScreen = document.querySelector('.win-screen')
const mainMenuButton = document.querySelector('.main-menu')
let messageEl = document.querySelector('.message')
let nextLevelButton = document.getElementById('next-level')
let flippedCards = []
const timerElement = document.getElementById('timer')
let timeLeft = 30
let isTimerStart = false
// nextLevelButton.disabled = true

/*---------------------variables---------------------*/

function startTimer() {
  const timerInterval = setInterval(() => {
    timeLeft--
    timerElement.textContent = timeLeft

    if (timeLeft === 0) {
      clearInterval(timerInterval)

      // Handle time's up scenario, e.g., end the game
      messageEl.innerHTML =
        '<p>Times up you loss, press restart button to repeat this level</p>'
      cards.forEach((card) => card.classList.add('disabled'))
      startTimer = true
    }
  }, 1000)
}

const resetGame = () => {
  cards.forEach((card) => {
    card.classList.remove('flipped', 'matched')
  })
  ;(flippedCards = []),
    (messageEl.innerHTML = ' '),
    cards.forEach((card) => card.classList.remove('disabled')),
    (timeLeft = 30),
    (timerElement.textContent = timeLeft)
}
cards.forEach((card) => {
  card.addEventListener('click', () => {
    if (flippedCards.length < 2 && !card.classList.contains('flipped')) {
      card.classList.toggle('flipped')
      flippedCards.push(card)
      console.log(isTimerStart)
      if (isTimerStart) {
      } else {
        isTimerStart = true
        startTimer()
      }
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
    // clearInterval(timerInterval) it must stop the timing
    // nextLevelButton.disabled = false
  }
}

/*---------------------------------------eventlisitner------------------*/
resetButton.addEventListener('click', resetGame)
