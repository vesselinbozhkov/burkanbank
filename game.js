$.ionSound({
    sounds: [                       // set needed sounds names
        "button_click_on",
        "bell_ring:0.3",            // :0.3 - individual volume
        "glass",
        "metal_plate",
        "metal_plate_2",
        "pop_cork:0.8",             // :0.8 - individual volume
        "staple_gun",
        "punch",
        "jab",
        "swing"         // :0.4 - individual volume
    ],
    path: "sounds/",                // set path to sounds
    multiPlay: true,               // playing only 1 sound at once
    volume: "0.7"                   // not so loud please
});

if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
 $("body").append('<div class="disabled">');
 var endLeftPos = (windowWidth / 2) - 150;
 var endTopPos = (windowHeight / 2);
 $("#end-result").css('left', endLeftPos)
 				.css('top', endTopPos)
 				.css('display', 'block')
 				.html('Не работи на мобилни устройства.');
}


var $fibankImg = $('#fibank-img');
var $gameWrapper = $('#game-wrapper');
var $coin = $('#coin');

var fieldHeight = $gameWrapper.css('height').replace(/[^-\d\.]/g, '');

var topPosition = 0;
var leftPosition = 0;

var windowWidth = $(window).width();
var windowHeight = $(window).height();

var bankScore = $('#bank-score');
var burkanScore = $('#burkan-score');

var currBurkanScore = 0;
var currBankScore = 30;

var pixelsToMove = 100;
var coinPixelsToMove = 20;

// setInterval(changeFrame, 160);
setInterval(moveButterfly, 300);
setInterval(moveCoins, 100);

function moveCoins() {
	$('.movable-coin').each(function() {
		var currCoinPosition = $(this).css('top').replace(/[^-\d\.]/g, '');
		if (currCoinPosition > windowHeight) {
			$(this).remove();
		}
		else {
			var newCoinPosition = parseInt(currCoinPosition) + parseInt(coinPixelsToMove);
			$(this).css('top', newCoinPosition);
		}
	})
}

function moveButterfly() {
	var direction = getRandom(0, 7);

	if (direction == 1 || direction == 5) {
		leftPosition += pixelsToMove;
	}
	else if (direction == 2 || direction == 6) {
		leftPosition -= pixelsToMove;
	}
	else if (direction == 3) {
		topPosition += pixelsToMove;
	}
	else if (direction == 4) {
		topPosition -= pixelsToMove;
	}

	if (leftPosition > (windowWidth - 200)) {
		leftPosition = windowWidth - 200;
	}
	if (topPosition > (fieldHeight - 103)) { // magic numbers, fuck yeah
		topPosition = (fieldHeight - 103);
	}
	if (leftPosition < 0) { // magic numbers, fuck yeah
		leftPosition = 0;
	}
	if (topPosition < 0) { // magic numbers, fuck yeah
		topPosition = 0;
	}



	$fibankImg.css('left', leftPosition);
	$fibankImg.css('top', topPosition);

}

// function changeFrame() {
// 	var currentFrame = $fibankImg.attr('src');
// 	if (currentFrame == 'fibank1.png') {
// 		$fibankImg.attr('src', 'fibank2.png');
// 	}
// 	else {
// 		$fibankImg.attr('src', 'fibank1.png');
// 	}
// }


// $("body").append('<div class="modalOverlay">');

function getRandom(max, min) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

$fibankImg.mousedown(function(){
	if(getRandom(0, 3) == 1) {
		$.ionSound.play("punch");
	}
	else {
		$.ionSound.play("jab");
	}
	createCoin();
	calculateHit();

	function calculateHit(){
		currBurkanScore++;
		currBankScore--;
		if (currBankScore <= 0) {
			endGame();
			return
		};
		bankScore.html(currBankScore);
		burkanScore.html(currBurkanScore);
	}

	function createCoin() {
		var $currCoin = $coin.clone();

		var coinLeft = leftPosition + 100;
		var coinTop = topPosition + 100;

		$currCoin.css('left', coinLeft);
		$currCoin.css('top', coinTop);
		$currCoin.addClass('movable-coin');
		$currCoin.css('display', 'block');
		$gameWrapper.append($currCoin);
	}

	function endGame(){
		$("body").append('<div class="disabled">');
		var endLeftPos = (windowWidth / 2) - 150;
		var endTopPos = (windowHeight / 2);
		$("#end-result").css('left', endLeftPos)
						.css('top', endTopPos)
						.css('display', 'block');
	}
});


$gameWrapper.mousedown(function(){
	$(this).css('cursor', 'url(salam.png), auto' );
	$.ionSound.play("swing");
	setTimeout(function() {
		$gameWrapper.css('cursor', 'url(salam-ready.png), auto' );	
	},100);
	setTimeout(null, 200);
});

