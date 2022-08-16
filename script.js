/* code to create a deck adapted from William Vincent https://wsvincent.com/javascript-object-oriented-deck-cards/ */
class Deck {
    constructor() {
        this.deck = [];
        this.reset();
        this.shuffle()
    }
    shuffle() {
        const { deck } = this;
        let m = deck.length, i;

        while (m) {
            i = Math.floor(Math.random() * m--);

            [deck[m], deck[i]] = [deck[i], deck[m]];    
        }
        return this;
    }
    deal() {
        return this.deck.pop();
    }
    reset() {
        this.deck = [];

        const colors = ['Green', 'Blue', 'Red'];
        const numbers = [1, 2, 3];
        const shapes = ['Diamond', 'Squiggle', 'Oval'];
        const shadings = ['Empty', 'Striped', 'Solid'];

        for (let color in colors) {
            for (let number in numbers) {
                for (let shape in shapes) {
                    for (let shading in shadings) {
                        this.deck.push({
                            'number': `${numbers[number]}`,
                            'color': `${colors[color]}`,
                            'shading': `${shadings[shading]}`,
                            'shape': `${shapes[shape]}`
                        })
                    }
                }
            }
        }
    }
}
const deck1 = new Deck();

const cardContainer = document.querySelector('.cardContainer')
const scoreboard = document.querySelector('.scoreboard')

let leftInDeck = scoreboard.appendChild(document.createElement('div'))
leftInDeck.classList.add('leftInDeck')
leftInDeck.textContent = `Cards remaining in deck: ${deck1.deck.length}`

let points = 0;

let pointsDisplay = scoreboard.appendChild(document.createElement('div'))
pointsDisplay.classList.add('points')
pointsDisplay.textContent = `Points: ${points}`

let timer = scoreboard.appendChild(document.createElement('div'))
timer.classList.add('timer')

const timeOnLoad = new Date()

var timerFunc = setInterval(function() {
    const now = new Date()
    var difference = now - timeOnLoad
    var hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((difference % (1000 * 60)) / 1000);
    timer.textContent = hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0')
}, 1000)

function fillTable() {
    let currentCard;
    for (let i = 0; i < 12; i++) {
        let card = cardContainer.appendChild(document.createElement('div'))
        card.className = `card`;
        // may want to use full card description here
        card.id = `card${i}`
        drawCard(card);
    }
};

fillTable();

// select all card elements
let selectedCards = [];
const cards = document.querySelectorAll('.card');
cards.forEach((card) => {

    card.addEventListener('click', () => {
        card.classList.add('selected');
        // add card to a 'selected' array
        selectedCards.push(card.dataset)
        if (selectedCards.length === 3) {
            if (calculateSet(selectedCards)) {
                points++
                let set = document.querySelectorAll('.selected')
                set.forEach(card => {
                    drawCard(card)
                    // add condition for if deck is empty
                    // if deck1.deck = []?
                });
                selectedCards = [];
                pointsDisplay.textContent = `Points: ${points}`
            }
            else {
                points--
                let set = document.querySelectorAll('.selected')
                set.forEach(card => {
                    card.classList.remove('selected')
                });
                selectedCards = [];
                pointsDisplay.textContent = `Points: ${points}`
            }
        }
    })
});

// returns true if the array of cards sent to it is either
// all the same or all different for each card parameter
function calculateSet(cards) {
    let numbers = [], colors = [], shadings = [], shapes = [];
    cards.forEach(card => {
        Object.keys(card).forEach(key =>{
            eval(key + "s.push(card['" + key + "']);") 
        });
    })
    if (allSame(numbers) || allUnique(numbers)) {
        if (allSame(colors) || allUnique(colors)) {
            if (allSame(shadings) || allUnique(shadings)) {
                if (allSame(shapes) || allUnique(shapes)) {
                    return true;
                }
            }
        }
    }
    return false;
}

function allSame(array) {
    for (let element of array) {
        if (element !== array[0]) {
            return false;
        }
    }
    return true;
}


function allUnique(array) {
    tmp = []
    for (let element of array) {
        if (tmp.includes(element) === false) {
            tmp.push(element)
        }
    }
    return array.length === tmp.length;
}

// send this function an HTML element stored in a variable
// it will fill its text and data variables with card info dealt from the deck.
function drawCard(htmlElement) {
    while (htmlElement.firstChild) {
        htmlElement.removeChild(htmlElement.firstChild)
    }
    htmlElement.classList.remove("selected");
    let currentCard = deck1.deal();
    var keys = Object.keys(currentCard);
    var cardString = '';
    // access individual properties with, for example, card.dataset.number
    keys.forEach(key=>{
        cardString += currentCard[key]
        htmlElement.dataset[`${key}`] = currentCard[key]
    })
    var img = htmlElement.appendChild(document.createElement('img'))
    img.src = (`cards/${cardString}.svg`)
    img.style.height = "100%";
    img.style.width = "100%";
    leftInDeck.textContent = `Cards remaining in deck: ${deck1.deck.length}`;

}