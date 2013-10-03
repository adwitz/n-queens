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

window.solutionNumbers = {};
window.findNRooksSolution = function(n){
  var storage = [];  //all possible chessboards;
  var solutions = [];
  var rookSearch = function(chessboard, row){
    for (var col = 0; col < n; col++){  //each time we call rookSearch checkout every column
      var newChessboard = new Board(chessboard.attributes);   //make a new board that has the same values as the previous board
      if (newChessboard.attributes[row] !== undefined){
        newChessboard.attributes[row][col] = 1;  //for the current value of column, set that row's column value to be 1
      }
      row = row + 1;  //increase row by one to go to the next row;
      if (row === n){ storage.push(newChessboard); }  //if there are no more next rows add the current chessboard to storage
      else { rookSearch(newChessboard, row); }  //otherwise do the same algorithm to the next row
    }
  };
  rookSearch(new Board({n:n}), 0);
  debugger;
  for (var i=0; i < storage.length; i++){
      if (!(storage[i].hasAnyColConflicts() || storage[i].hasAnyRowConflicts())){
        solutions.push(storage[i]);
      }
    }
  return solutions[0].attributes;
};


// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n){
  // console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return window.solutionNumbers[n];
};



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
