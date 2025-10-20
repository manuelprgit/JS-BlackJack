(async () => {
    // 'use strict';
    const cartasJugador       = document.getElementById('jugador-cartas'),
          cartasMaquina       = document.getElementById('computador-cartas'),
          getCard             = document.getElementById('getCard'),
          playerPointsContent = document.getElementById('playerPointsContent'),
          pcPointsContent     = document.getElementById('pcPointsContent'),
          stopGame            = document.getElementById('stopGame');
        
    let deck = [];
    const playersPoints = [];
    
    const types = ['C', 'D', 'H', 'S'],
          letters = ['A', 'J', 'Q', 'K'];

    const initGame = (players = 2) => {
        deck = createDeck();
        for(let i = 0; i < players; i++){
            playersPoints.push(0)
        }
        console.log({playersPoints})
    }
    
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
    
        return _.shuffle(deck);        
    }
    
    const takeACard = () => {
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
    
    const PCTurn = () => {
        do {
            const card = takeACard();
            const value = cardValue(card);
            createCard(card, cartasMaquina);
            pcPoints += value;
            pcPointsContent.textContent = pcPoints;
            if (playerPoints > 21) break;
        }
        while (pcPoints <= playerPoints && pcPoints < 21);
        if (pcPoints <= 21 && pcPoints > playerPoints) {
            setTimeout(() => {
                alert('La computadora ganó!')
            }, 100);
        } else if (pcPoints > 21) {
            setTimeout(() => {
                alert('Jugador gana!')
            }, 100);
        }
    }
    
    const resetGame = () => {
        deck = [];
        createDeck();
        cartasJugador.textContent = '';
        cartasMaquina.textContent = '';
        playerPointsContent.textContent = '0';
        pcPointsContent.textContent = '0';
        getCard.disabled = false;
        stopGame.disabled = false;
        playerPoints = 0;
        pcPoints = 0;
    }
    
    getCard.addEventListener('click', e => {
        const card = takeACard()
        const value = cardValue(card);
        playerPoints += value;
        playerPointsContent.textContent = playerPoints;
        createCard(card, cartasJugador);
    
        if (playerPoints > 21) {
            getCard.disabled = true;
            PCTurn(playerPoints);
            setTimeout(() => {
                alert('Perdiste');
            }, 100);
        } else if (playerPoints === 21) {
            getCard.disabled = true;
            stopGame.disabled = true;
            setTimeout(() => {
                alert('21, Genial!');
            }, 100);
        } else if (pcPoints === playerPoints) {
            setTimeout(() => {
                alert('Nadie gana');
            }, 100);
        }
    })
    
    stopGame.addEventListener('click', e => {
        getCard.disabled = true;
        stopGame.disabled = true;
        PCTurn(playerPoints);
    })
    
    newGame.addEventListener('click', e => {
        resetGame();
    })
    initGame()
})();
