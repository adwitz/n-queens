/*           _                    
   ___  ___ | |_   _____ _ __ ___ 
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n){
  var aboard = new Board({n:n});
  aboard = aboard.rows();
  var breadcrumbs;
  var solutions = [];
  var traverse = function(board, rowNum, breadcrumbs){
    if (rowNum === n){
      solutions.push(board);
      return;
    }
    for (var col = 0; col < n; col++){
      if (!(breadcrumbs["col" + col])){
        var newBoard = copy(board);
        newBoard[rowNum][col] = 1;
        newBoard.breadcrumbs = breadcrumbs.clone();
        newBoard.breadcrumbs["col" + col] = true;
        traverse(newBoard, rowNum+1, newBoard.breadcrumbs);
      }
    }
  };
  traverse(aboard, 0, {});
  return solutions[0];
};

window.copy = function(arr){
  var results = [];
  for (var i=0; i<arr.length; i++){
    results.push(arr[i].slice(0));
  }
  return results;
};

Object.prototype.clone = function(){
  var newObj = {};
  for (var key in this){
    newObj[key] = this[key];
  }
  return newObj;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n){
  var aboard = new Board({n:n});
  aboard = aboard.rows();
  var breadcrumbs;
  var solutions = [];
  var traverse = function(board, rowNum, breadcrumbs){
    if (rowNum === n){
      solutions.push(board);
      return;
    }
    for (var col = 0; col < n; col++){
      if (!(breadcrumbs["col" + col])){
        var newBoard = copy(board);
        newBoard[rowNum][col] = 1;
        newBoard.breadcrumbs = breadcrumbs.clone();
        newBoard.breadcrumbs["col" + col] = true;
        traverse(newBoard, rowNum+1, newBoard.breadcrumbs);
      }
    }
  };
  traverse(aboard, 0, {});
  return solutions.length;
  // console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
};

window.makeArray = function(chessObj){
  var array = [];
  obj = chessObj.attributes;
  for ( var i = 0; i < obj.n; i ++){
    array.push(obj[i]);
  }
  return array;
};


// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n){
  var aboard = new Board({n:n});
  aboard = aboard.rows();
  var breadcrumbs;
  var solutions = [];
  var setTrail = function(board, row, col){
    debugger;
    board.breadcrumbs["col" + col] = true;
    var j = row + 1;
    for (var i = col+1; i < n; i++, j++){
      board.breadcrumbs[i + "" + j] = true;
    }
    j = row + 1;
    for (i = col-1; i > -1; i--, j++){
      board.breadcrumbs[i + "" + j] = true;
    }
    return board.breadcrumbs;
  };

  var traverse = function(board, rowNum, breadcrumbs){
    if (rowNum === n){
      if (board.counter()){
        solutions.push(board);
      }
      return;
    }
    for (var col = 0; col < n; col++){
      if (!(breadcrumbs["col" + col] || breadcrumbs[col + "" + rowNum])){
        var newBoard = copy(board);
        newBoard[rowNum][col] = 1;
        newBoard.breadcrumbs = breadcrumbs.clone();
        newBoard.breadcrumbs = setTrail(newBoard, rowNum, col);
        traverse(newBoard, rowNum+1, newBoard.breadcrumbs);
      }
    }
  };
  traverse(aboard, 0, {});
  if ( solutions[0] ){
    return solutions[0];
  } else {
    return new Board({n:n}).rows();
  }
};

Array.prototype.counter = function(){
  var results = 0;
  for(var i=0; i<this.length; i++){
    for (var j=0; j<this[i].length; j++){
      this[i][j] && results++;
    }
  }
  if (results === this.length){ return true; }
  return false;
};

Array.prototype.hasMajorDiagonalConflictAt = function(majorDiagonalColumnIndexAtFirstRow){
      var count = 0;
      var colIn = majorDiagonalColumnIndexAtFirstRow;
      var chessboard = this;
      for (var row = 0; row < chessboard.length; row++){
        chessboard[row][colIn] && count++;
        colIn++;
        if (count > 1) { return true; }
      }
      return false; // fixme
    };

    // test if any major diagonals on this board contain conflicts
Array.prototype.hasAnyMajorDiagonalConflicts = function(){
      var chessboard = this;
      var length = chessboard.length;
      for ( var i = 0; i < length; i++ ) {
        if (this.hasMajorDiagonalConflictAt(i)) { return true; }
      }
      return false; // fixme
    };

Array.prototype.hasMinorDiagonalConflictAt = function(minorDiagonalColumnIndexAtFirstRow){
      var chessboard = this;
      var colIn = minorDiagonalColumnIndexAtFirstRow;
      var length = chessboard.length;
      var count = 0;
      for ( var row = 0; row < length; row++ ){
        chessboard[row][colIn] && count++;
        colIn--;
        if (count > 1) { return true; }
      }
      return false;
    };

    // test if any minor diagonals on this board contain conflicts
Array.prototype.hasAnyMinorDiagonalConflicts = function(){
      var chessboard = this;
      var length = chessboard.length;
      for ( var i=length-1 ; i > -1; i--){
        if(this.hasMinorDiagonalConflictAt(i)) { return true; }
      }
      return false;
    };


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n){
  var aboard = new Board({n:n});
  aboard = aboard.rows();
  var breadcrumbs;
  var solutions = [];
  var setTrail = function(board, row, col){
    board.breadcrumbs["col" + col] = true;
    var j = row + 1;
    for (var i = col+1; i < n; i++, j++){
      board.breadcrumbs[i + "" + j] = true;
    }
    j = row + 1;
    for (i = col-1; i > -1 && j < n; i--, j++){
      board.breadcrumbs[i + "" + j] = true;
    }
    debugger;
    return board.breadcrumbs;
  };

  var traverse = function(board, rowNum, breadcrumbs){
    if (rowNum === n){
      if (board.counter()){
        solutions.push(board);
      }
      return;
    }
    for (var col = 0; col < n; col++){
      if (!(breadcrumbs["col" + col] || breadcrumbs[col + "" + rowNum])){
        var newBoard = copy(board);
        newBoard[rowNum][col] = 1;
        newBoard.breadcrumbs = breadcrumbs.clone();
        newBoard.breadcrumbs = setTrail(newBoard, rowNum, col);
        traverse(newBoard, rowNum+1, newBoard.breadcrumbs);
      }
    }
  };
  traverse(aboard, 0, {});
  return solutions.length;
};
