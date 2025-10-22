(async () => {
    // 'use strict';
    const playersCardContent  = document.querySelectorAll('.card-content'),
          getCard             = document.getElementById('getCard'),
          playerPointsContent = document.getElementById('playerPointsContent'),
          pcPointsContent     = document.getElementById('pcPointsContent'),
          stopGame            = document.getElementById('stopGame'),
          playersPointSpan    = document.querySelectorAll('span');

    let deck = [];
    const playersPoints = [];

    const types   = ['C', 'D', 'H', 'S'],
          letters = ['A', 'J', 'Q', 'K'];

    const initGame = (players = 2) => {
        deck = createDeck();
        for (let i = 0; i < players; i++) {
            playersPoints.push(0)
        }
        playersCardContent.forEach(item => item.textContent = '');
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

    const createCard = (card, turn) => {
        const imgCard = document.createElement('img');
        imgCard.src = `/assets/cartas/${card}.png`
        imgCard.className = 'carta';
        playersCardContent[turn].append(imgCard);
    }

    const accumulatePoints = (card, turn) => {
        playersPoints[turn] += cardValue(card);
        playersPointSpan[turn].textContent = playersPoints[turn];
        return playersPoints[turn];
    }

    const pCTurn = (minPoints) => {
        let pcPoints = 0;
        const pCTurnNumber = playersPoints.length - 1;
        do {
            const card = takeACard();
            pcPoints = accumulatePoints(card, pCTurnNumber);
            createCard(card, pCTurnNumber);            
            if (minPoints > 21) break;
        }
        while (pcPoints <= minPoints && pcPoints < 21);
        whoIsTheWinner();
    }

    const resetGame = () => {
        deck = [];
        deck = createDeck(); 
        playerPointsContent.textContent = '0';
        pcPointsContent.textContent = '0';
        getCard.disabled = false;
        stopGame.disabled = false;
    }

    const whoIsTheWinner = () => {

        const [minPoints, pcPoints] = playersPoints;
        
        setTimeout(() => {
            if(pcPoints === minPoints){
                alert('Nadie gana');
            }
            else if(minPoints > 21){
                alert('Nadie gana');
            }
            else if(pcPoints > 21){
                alert('Jugador gana');
            }
            else{
                alert('Computadora gana')
            }
        }, 100);

    }

    getCard.addEventListener('click', e => {
        const card = takeACard() 
        let playerPoints = accumulatePoints(card, 0);
        playerPointsContent.textContent = playerPoints;
        createCard(card, 0);

        if (playerPoints > 21) {
            getCard.disabled = true;
            pCTurn(playerPoints);
            setTimeout(() => {
                alert('Perdiste');
            }, 100);
        } else if (playerPoints === 21) {
            getCard.disabled = true;
            stopGame.disabled = true;
            setTimeout(() => {
                alert('21, Genial!');
            }, 100);
        } 
        // else if (pcPoints === playerPoints) {
        //     setTimeout(() => {
        //         alert('Nadie gana');
        //     }, 100);
        // }
    })

    stopGame.addEventListener('click', e => {
        getCard.disabled = true;
        stopGame.disabled = true;
        pCTurn(playersPoints[0]);
    })

    newGame.addEventListener('click', e => {
        resetGame();        
    })
    initGame()
})();
