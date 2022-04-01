// Set up the stage and layer
let stage = new Konva.Stage({
    container: 'konvaCanvas',
    width: window.innerWidth,
    height: window.innerHeight
});

let layer

// This is the main function that will cause the full game to render. It will call a number
// of more specific functions to render the various components of the game.
function render() {
    stage.destroyChildren() // Remove all objects from the stage
    layer = new Konva.Layer() // Create a fresh layer
    stage.add(layer) // Add the new layer to the stage
    addGrid(Konva, layer) // Can be removed/commented when game is complete
    renderChoices()
    renderPlayerHand()
    renderComputerHand()
    //renderDiscardPile()
    //renderDeck()
}

function renderPlayerHand() {
    for (let i = 0; i < model.playerHand.length; i++) {
        let cardImage = new Konva.Image({
            x: i*80,
            y: 0,
            image: getRawCardImage(model.playerHand[i]), 
            draggable: false,
        })
        layer.add(cardImage)

        // Add event listeners
        //cardImage.on('dragstart', handleDragCardStart)
        // cardImage.on('dragend', function() {
        //     handleDragCardEnd(cardImage, i)
        // })
    }
}

function renderComputerHand() {
    for (let i = 0; i < model.compHand.length; i++) {
        if(i== 0){
            var image = getRawCardImage(model.playerHand[i])
        }
        else{
            var image = rawCardBackImage
        }
        let cardImage = new Konva.Image({
            x: i*80,
            y: 500,
            image: image
        })
        layer.add(cardImage)
    }
}

function renderChoices(){
    var hit = new Konva.Text({
        x: 200,
        y: 300, 
        text:'Hit',
        fontSize: 50,
        fill: 'red',
    })
    layer.add(hit)
    var stay = new Konva.Text({
        x: 200,
        y: 400, 
        text:'stay',
        fontSize: 50,
        fill: 'black',
    })
    layer.add(stay)
    hit.on('click', handleHit)
    stay.on('click', handleStay)
}


// function renderDiscardPile() {

//     // We just need to show the top card
//     let topCard = getShowingCard()
//     let cardImage = new Konva.Image({
//         x: 250,
//         y: 250,
//         image: getRawCardImage(topCard)
//     })
//     layer.add(cardImage)
// }

// function renderDeck() {
//     let cardImage = new Konva.Image({
//         x: 350,
//         y: 250,
//         image: rawCardBackImage
//     })
//     cardImage.on('click', handleDeckClick)
//     layer.add(cardImage)
// }
