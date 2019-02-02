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