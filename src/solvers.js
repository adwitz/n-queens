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
}


// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n){
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n){
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
