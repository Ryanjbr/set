class Deck {
    constructor() {
        this.deck = [];

        const colors = ['Green', 'Blue', 'Red'];
        const numbers = [1, 2, 3];
        const shapes = ['Diamond', 'Squiggle', 'Oval'];
        const shadings = ['Empty', 'Striped', 'Solid'];

        for (let color in colors) {
            for (let number in numbers) {
                for (let shape in shapes) {
                    for (let shading in shadings) {
                        this.deck.push(`${numbers[number]} ${colors[color]} ${shadings[shading]} ${shapes[shape]}`)
                    }
                }
            }
        }
    }
}
const deck1 = new Deck();
console.log(deck1.deck)
console.log(deck1.deck.length)