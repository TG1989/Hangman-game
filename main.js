const wordE = document.getElementById('word')
const popup = document.getElementById('popup-container')
const wrongL = document.getElementById('wrong-letters')
const items = document.querySelectorAll('.item')
const message = document.getElementById('message')
const repeatedMessage = document.querySelector('.repeated-message')
const playAgain = document.getElementById('btn')



const correctLetters = []
const wrongLetters = []
let selectedWord = getRandomWord()

function getRandomWord() {
  const words = ["apple", "pen", "book", "station", "team", "nurse"]
  return words[Math.floor(Math.random() * words.length)]
}



function displayWord() {
  wordE.innerHTML = `

  ${selectedWord.split('').map(letter => `
  
  <div class="letter">
  ${correctLetters.includes(letter) ? letter : ''}
  </div>
    `).join('')}
    
  `
  const w = wordE.innerText.replace(/\n/g, '');


  if (w === selectedWord) {
    popup.style.display = "flex"
    message.innerText = 'You Win!'

  }
}

function updateWrongLetters() {
  wrongL.innerHTML = `

${wrongLetters.length > 0 ? '<h3>Wrong Letters</h3>' : ''}

${wrongLetters.map(letter => `
<span>${letter}</span>`)}
`
  items.forEach((item, index) => {
    const erroCount = wrongLetters.length

    if (index < erroCount) {
      item.style.display = 'block'
    } else {
      item.style.display = 'none'
    }
  })
  if (wrongLetters.length === items.length) {
    popup.style.display = "flex"
    message.innerText = 'You Lose!'

  }
}

function displayMessage() {
  repeatedMessage.classList.add("show-message")
  setTimeout(function () {
    repeatedMessage.classList.remove("show-message")
  }, 1000)
}

playAgain.addEventListener('click', function(){
  correctLetters.splice(0)
  wrongLetters.splice(0)

  selectedWord = getRandomWord()
  displayWord()
  updateWrongLetters()
  popup.style.display = 'none'
})



window.addEventListener("keydown", function (e) {



  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key

    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter)
        displayWord()
      } else {
        displayMessage()
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter)
        updateWrongLetters()
      } else {
        displayMessage()
      }
    }

  }
})

// displayWord()