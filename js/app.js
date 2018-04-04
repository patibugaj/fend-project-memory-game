/*
 * Create a list that holds all of your cards
 */
const deck = document.getElementById("card-deck");
let card = document.getElementsByClassName("card");
let cards = [...card];
console.log(cards);

let openedCards = [];

let countMoves = 0;
let moves = document.querySelector(".moves");
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

document.body.onload = startGame();

function startGame() {
	cards = shuffle(cards);

    //reset timer
    second = 0;
    minute = 0;
    hour = 0;
    var timer = document.querySelector(".timer");
    timer.innerHTML = "0 mins 0 secs";
    clearInterval(interval);

	for (var i = 0; i < cards.length; i++){
        deck.innerHTML = "";
        [].forEach.call(cards, function(item) {
            deck.appendChild(item);
        });
	  //remove action classes
	  cards[i].classList.remove("open", "show", "match");
	  //add event 'click' to flip a card
	  cards[i].addEventListener("click", flipCard);
	  cards[i].addEventListener("click", openedCard);
	};

}

function flipCard() {
	this.classList.add("open", "show");
}

function matched(openedCard) {
	openedCard.classList.add("match");
}

function unmatched(openedCard) {
	openedCard.classList.add("unmatch");
	setTimeout(function(){
		openedCard.classList.remove("open", "show", "unmatch");
	}, 1000);
}

function openedCard() {
	openedCards.push(this);
	let len = openedCards.length;
	if(len===2) {
		console.log(openedCards);
		moveCounter();
		if(openedCards[0].className == openedCards[1].className) {
			openedCards.forEach(matched);
			openedCards = [];
		} else {
			openedCards.forEach(unmatched);
			openedCards = [];
		}
	}

}

function moveCounter() {
	countMoves++;

	if(countMoves==1) {
		moves.innerHTML = countMoves + ' Move';
		//start game timer on first click on a card
		startTimer();
	} else {
		moves.innerHTML = countMoves + ' Moves';
	}

	if(second==0 && minute==0 && hour==0){
		startTimer();
	}

	//rating score
	if(countMoves>=7&&countMoves<=13) {
		const star3 = document.getElementById('star3').childNodes[0];
		star3.className= 'fa fa-star-o';
	}else if(countMoves>=14&&countMoves<=20) {
		const star2 = document.getElementById('star2').childNodes[0];
		star2.className= 'fa fa-star-o';
	}else if(countMoves>=21){
		const star1 = document.getElementById('star1').childNodes[0];
		star1.className= 'fa fa-star-o';
		// setTimeout(function(){
		// 	openedCard.classList.remove("open", "show");
		// }, 1000);
	}
}

// @description game timer
var second = 0, minute = 0; hour = 0;
var timer = document.querySelector(".timer");
var interval;
function startTimer(){
    interval = setInterval(function(){
        timer.innerHTML = minute+"mins "+second+"secs";
        second++;
        if(second == 60){
            minute++;
            second=0;
        }
        if(minute == 60){
            hour++;
            minute = 0;
        }
    },1000);
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
