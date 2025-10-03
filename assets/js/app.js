const cartasJugador = document.getElementById('jugador-cartas'),
      cartasMaquina = document.getElementById('computador-cartas'),
      getCard = document.getElementById('getCard'),
      playerPointsContent = document.getElementById('playerPointsContent'),
      pcPointsContent = document.getElementById('pcPointsContent'),
      stopGame = document.getElementById('stopGame');


let deck = [];

let playerPoints = 0;
let pcPoints = 0;

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
        : Number(value);
}

const createCard = (card, cardContainer) => {
    const imgCard = document.createElement('img');
    imgCard.src = `/assets/cartas/${card}.png`
    imgCard.className = 'carta';
    cardContainer.append(imgCard);
}

const PCTurn = (minPoints) => {
    do{ 
        const card = takeCard();
        const value = cardValue(card);
        createCard(card, cartasMaquina);
        pcPoints += value;
        pcPointsContent.textContent = pcPoints;
        if(minPoints > 21) break;
    }
    while(pcPoints < minPoints && pcPoints < 21);
}

getCard.addEventListener('click', e=> {
    const card = takeCard()
    const value = cardValue(card);
    playerPoints += value;
    playerPointsContent.textContent = playerPoints;
    createCard(card, cartasJugador);

    if(playerPoints > 21){
        console.warn('Perdiste');
        getCard.disabled = true;
        PCTurn(playerPoints)
    }else if(playerPoints === 21){
        console.warn('21, Genial!')
        getCard.disabled = true;
        stopGame.disabled = true;
    }
})

stopGame.addEventListener('click', e=>{
    getCard.disabled = true;
    stopGame.disabled = true;
    PCTurn(playerPoints);
})

