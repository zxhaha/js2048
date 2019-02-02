function showANumber(x,y,randomNum){
	var numberCell=$("#number-cell-"+x+"-"+y);
	numberCell.css({
		"background-color":getNumberBgColor(board[x][y]),
		"color":getNumberColor(board[x][y])
	});
	numberCell.text(randomNum);
	
	numberCell.css({
		width:"75px",
		height:"75px",
		top:getPosTop(x),
		left:getPosLeft(y)
	},50)
	
}
function moveNumber(fromx,fromy,tox,toy){
	var numberCell=$("#number-cell-"+fromx+"-"+fromy);
	numberCell.animate({
		top:getPosTop(tox,toy),
		left:getPosLeft(tox,toy)
	},1000);
}
