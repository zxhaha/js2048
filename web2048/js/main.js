$(document).ready(function() {
	newGame();
})

var board = new Array(); //用来记录块
var score = 0; //记录分数
//积分规则，每合并一个增加一次分数
function newGame() {
	init();
	//新建两个元素
	generateOneNumber();
	generateOneNumber();
	score=0;
	$("#score").text(score);

}

function init() {
	for(var i = 0; i < 4; i++) {
		for(var j = 0; j < 4; j++) {
			var gridCell = $("#grid-cell-" + i + "-" + j);
			gridCell.css("top", getPosTop(i));
			gridCell.css("left", getPosLeft(j))
		}
	}
	//初始化表格
	for(var i = 0; i < 4; i++) {
		board[i] = new Array();
		for(var j = 0; j < 4; j++) {
			board[i][j] = 0;

		}
	}
	updateBoardView();
}

function updateBoardView() {
	$(".number-item").remove();
	for(var i = 0; i < 4; i++) {
		for(var j = 0; j < 4; j++) {
			$("#main-container").append('<div class="number-item" id="number-cell-' + i + '-' + j + '"></div>');
			var numberCell = $("#number-cell-" + i + "-" + j);
			console.log(i);
			console.log(j);
			console.log(board[i][j]);
			if(board[i][j] == 0) {
				numberCell.css({
					"width": "0px",
					"height": "0px",
					"top": getPosTop(i),
					"left": getPosLeft(j)
				})
			} else {
				numberCell.css({
					"width": "75px",
					"height": "75px",
					"top": getPosTop(i),
					"left": getPosLeft(j),
					"background-color": getNumberBgColor(board[i][j]),
					"color": getNumberColor(board[i][j]),
					"font-size":getNumberSize(board[i][j])
				})
				numberCell.text(board[i][j]);
			}
		}
	}
}

function generateOneNumber() {
	//如果没有空间了返回false
	if(noSpace()) return false;
	//随机一个位置
	var randx = parseInt(Math.floor(Math.random() * 4)); //0123
	var randy = parseInt(Math.floor(Math.random() * 4));
	//判断随机位置是否为空
	while(true) {
		if(board[randx][randy] == 0) {
			break;
		}
		var randx = parseInt(Math.floor(Math.random() * 4)); //0123
		var randy = parseInt(Math.floor(Math.random() * 4));
	}
	//随机初始化一个2或者4
	var randomNum = Math.random() < 0.5 ? 2 : 4;
	board[randx][randy] = randomNum;
	//在位置上显示数字
	showANumber(randx, randy, randomNum);
	return true;
}

$(document).keydown(function() {
	switch(event.keyCode) {
		case 37: //left
			if(moveLeft(board)) {
				generateOneNumber();
				isGameover();
			}
			break;
		case 38: //up
			if(moveTop(board)) {
				generateOneNumber();
				isGameover();
			}
			break;
		case 39: //right
			if(moveRight(board)) {
				generateOneNumber();
				isGameover();
			}
			break;
		case 40: //down
			if(moveBottom(board)) {
				generateOneNumber();
				isGameover();
			}
			break;
	}
})

function isGameover() {
	if(noSpace(board) && noMove(board)) {
		gameOver();
	}
}

function gameOver() {
	alert("GameOver!");
}

function noSpace() {
	for(var i = 0; i < 4; i++) {
		for(var j = 0; j < 4; j++) {
			if(board[i][j] == 0) return false;
		}
	}
	return true;
}

function noMove() {
	if(canMoveLeft(board) || canMoveRight(board) || canMoveTop(board) || canMoveBottom(board)) {
		return false;
	}
	return true;
}

function getPosTop(i) {
	return 12 + i * 87;
}

function getPosLeft(j) {
	return 12 + j * 87;
}

function getNumberBgColor(number) {
	switch(number) {
		case 2:
			return "#eee4da";
			break;
		case 4:
			return "#eee4da";
			break;
		case 8:
			return "#f26179";
			break;
		case 16:
			return "#f59563";
			break;
		case 32:
			return "#f67c5f";
			break;
		case 64:
			return "#f65e36";
			break;
		case 128:
			return "#edcf72";
			break;
		case 256:
			return "#edcc61";
			break;
		case 512:
			return "#9c0";
			break;
		case 1024:
			return "#3365a5";
			break;
		case 2048:
			return "#09c";
			break;
		case 4096:
			return "#a6bc";
			break;
		case 8192:
			return "#93c";
			break;
		case 16384:
			return "#708090"
			break;
		case 32768:
			return "#008080"
			break;
		case 65536:
			return "#800080"
			break;
	}
	return "black";
}
function getNumberSize(number){
	if(number<100){
		return "48px";
	}else if(number<1000){
		return "40px";
	}else if(number<10000){
		return "32px";
	}else if(number<100000){
		return "26px";
	}else{
		return "22px";
	}
}
function getNumberColor(number) {
	if(number <= 4) {
		return "#776e65";

	} else {
		return "white";
	}
}
function updateScore(addScore){
	score+=addScore;
	$("#score").text(score);
}



//具体操作
function moveLeft(board) {
	if(!canMoveLeft(board)) return false;
	//向左移动
	//一种是左边没有障碍物可以向左移，另一种是可以合并
	for(var i = 0; i < 4; i++) {
		for(var j = 1; j < 4; j++) {
			if(board[i][j] != 0) {
				for(var k = 0; k < j; k++) {
					if(board[i][k] == 0 && noBlockH(i, k, j, board)){
						moveNumber(i,j,i,k);
						board[i][k] =board[i][j];
						board[i][j]=0;
						continue;
					}else if(board[i][k]==board[i][j]&&noBlockH(i,k,j,board)){
						moveNumber(i,j,i,k);
						board[i][k]+=board[i][j];
						updateScore(board[i][k]);
						board[i][j]=0;
						continue;
					}
				}
			}
		}
	}
	setTimeout("updateBoardView()",200);
	return true;
}
function moveRight(board) {
	if(!canMoveRight(board)) return false;
	
	for(var i = 0; i < 4; i++) {
		for(var j = 2; j >=0; j--) {
			if(board[i][j] != 0) {
				for(var k = 3; k > j; k--) {
					if(board[i][k] == 0 && noBlockH(i, j, k, board)){
						moveNumber(i,j,i,k);
						board[i][k] =board[i][j];
						board[i][j]=0;
						continue;
					}else if(board[i][k]==board[i][j]&&noBlockH(i,j,k,board)){
						moveNumber(i,j,i,k);
						board[i][k]+=board[i][j];
						updateScore(board[i][k]);
						board[i][j]=0;
						continue;
					}
				}
			}
		}
	}
	setTimeout("updateBoardView()",200);
	return true;
}
function moveTop(board) {
	if(!canMoveTop(board)) return false;
	
	for(var j = 0; j < 4; j++) {
		for(var i = 1; i < 4; i++) {
			if(board[i][j] != 0) {
				for(var k = 0; k < i; k++) {
					if(board[k][j] == 0 && noBlockV(j, k, i, board)){
						moveNumber(i,j,k,j);
						board[k][j] =board[i][j];
						board[i][j]=0;
						continue;
					}else if(board[k][j]==board[i][j]&&noBlockV(j,k,i,board)){
						moveNumber(i,j,i,k);
						board[k][j]+=board[i][j];
						updateScore(board[k][j]);
						board[i][j]=0;
						continue;
					}
				}
			}
		}
	}
	setTimeout("updateBoardView()",200);
	return true;
}
function moveBottom(board) {
	if(!canMoveBottom(board)) return false;
	
	for(var j = 0; j < 4; j++) {
		for(var i = 2; i >=0; i--) {
			if(board[i][j] != 0) {
				for(var k = 3; k > i; k--) {
					if(board[k][j] == 0 && noBlockV(j, i, k, board)){
						moveNumber(i,j,k,j);
						board[k][j] =board[i][j];
						board[i][j]=0;
						continue;
					}else if(board[k][j]==board[i][j]&&noBlockV(j,i,k,board)){
						moveNumber(i,j,i,k);
						board[k][j]+=board[i][j];
						updateScore(board[k][j]);
						board[i][j]=0;
						continue;
					}
				}
			}
		}
	}
	setTimeout("updateBoardView()",200);
	return true;
}

function noBlockH(row, col1, col2, board) {
	for(var i = col1 + 1; i < col2; i++) {
		if(board[row][i] != 0) return false;
	}
	return true;
}

function noBlockV(col,row1,row2,board) {
	for(var i = row1 + 1; i < row2; i++) {
		if(board[i][col] != 0) return false;
	}
	return true;
}

function canMoveLeft(board) {
	for(var i = 0; i < 4; i++) {
		for(var j = 1; j < 4; j++) {
			if(board[i][j] != 0) {
				if(board[i][j - 1] == 0 || board[i][j - 1] == board[i][j])
					return true;
			}
		}
	}
	return false;
}

function canMoveRight(board) {
	for(var i = 0; i < 4; i++) {
		for(var j = 0; j < 3; j++) {
			if(board[i][j] != 0) {
				if(board[i][j + 1] == 0 || board[i][j + 1] == board[i][j])
					return true;
			}
		}
	}
	return false;
}

function canMoveTop(board) {
	for(var i = 1; i < 4; i++) {
		for(var j = 0; j < 4; j++) {
			if(board[i][j] != 0) {
				if(board[i - 1][j] == 0 || board[i - 1][j] == board[i][j])
					return true;
			}
		}
	}
	return false;
}

function canMoveBottom(board) {
	for(var i = 0; i < 3; i++) {
		for(var j = 0; j < 4; j++) {
			if(board[i][j] != 0) {
				if(board[i + 1][j] == 0 || board[i + 1][j] == board[i][j])
					return true;
			}
		}
	}
	return false;
}