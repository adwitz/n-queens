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
    if (row === n){
        solutions.push(chessboard);
    } else {
      for (var col = 0; col < n; col++){
        var newChessboard = new Board(makeArray(chessboard));
        debugger;
        newChessboard.attributes[row][col] = 1;
        var blah = newChessboard.hasAnyColConflicts();
        var bleh = newChessboard.hasAnyRowConflicts();
        rookSearch(newChessboard, row+1);
      }
    }
  };
  rookSearch(new Board({n:n}), 0);
  debugger;
  return solutions[0].attributes;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n){
  // console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return ;
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
