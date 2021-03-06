// -------- The main data structure of the game ---------------//

let model = {
    deck: [],
    playerHand: [],
    compHand: [],
    //discardPile: [],
    state: "playerTurn",
}

// -------- Functions to initialize the model at the beginning of the game -----------//

function initModel() {
    let sortedDeck = createCardObjects()
    model.deck = shuffle(sortedDeck)

    // Deal the cards.
    // Arrays in JavaScript have a pop() method that will remove and return the last
    // item in the array. This works well for transferring a card from the deck to a
    // player's hand.
    for (let i = 0; i < 2; i++) {
        model.playerHand[i] = model.deck.pop()
        model.compHand[i] = model.deck.pop()
    }

    // Add a card to the discard pile
    //model.discardPile[0] = model.deck.pop()
}

// This function will create an array representing all 52 cards in a standard deck
function createCardObjects() {
    let cards = []
    for (let i = 1; i <= 13; i++) {
        let value = i
        if (i == 1)
            value = "Ace"
        if (i == 11)
            value = "Jack"
        if (i == 12)
            value = "Queen"
        if (i == 13)
            value = "King"

        cards.push({ suit: "Diamonds", value: value })
        cards.push({ suit: "Hearts", value: value })
        cards.push({ suit: "Clubs", value: value })
        cards.push({ suit: "Spades", value: value })
    }
    return cards
}

function shuffle(cards) {
    // Repeat 500 times
    for (let i = 0; i < 500; i++) {
        
        // Choose two random positions
        let index1 = Math.floor(Math.random()*cards.length)
        let index2 = Math.floor(Math.random()*cards.length)

        // Swap the cards at the two positions
        let temp = cards[index1]
        cards[index1] = cards[index2]
        cards[index2] = temp
    }
    return cards
}

function getScore(hand) {
    var total = 0
    for  (let i = 0; i < hand.length; i++) {
        var value = hand[i].value
        if(value == 'Jack'||value == 'Queen' || value =='King'){
            total += 10 
        }
        else if(value == 'Ace'&& total > 11){
            total += 1
        }
        else if(value == 'Ace'&& total <= 11){
            total += 1
        }
        else{
            total = total + value
        }
        
    }
    return total
}

// ------------- Helper Functions - Used to more easily access data in the model ------------ //

// Return the top (ie, visible) card of the discard pile
// function getShowingCard() {
//     let lastIndex = model.discardPile.length-1
//     return model.discardPile[lastIndex]
// }