const cartasJugador = document.getElementById('jugador-cartas'),
    cartasMaquina = document.getElementById('computador-cartas');

let deck = [];

const types = ['C', 'D', 'H', 'S'];
const letters = ['A', 'J', 'Q', 'K'];

const createDeck = () => {
    for (let i = 2; i <= 10; i++) {
        for (const type of types) {
            deck.push(i + type);
        }

    }

    for (const letter of letters) {
        for (const type of types) {
            deck.push(letter + type);
        }
    }

    deck = _.shuffle(deck);
    console.log(deck);
}

createDeck()

const takeCard = () => {
    if (deck.length === 0) throw 'No hay mas cartas';
    return deck.pop();
}

const cardValue = (card) => {
    const value = card.substring(0, card.length - 1)
    return isNaN(value) 
        ? value === 'A' ? 11 : 10
        : points = Number(value);
}

console.log(cardValue(deck[0]))

