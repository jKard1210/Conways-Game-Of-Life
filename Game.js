'use strict';

var height = 25;
var width = 40;
var grid = [];
var gen = 0;
var start = true;
var inter;
for (var i = 0; i < height; i++) {
  var row = [];
  for (var j = 0; j < width; j++) {
    row.push(true);
  }
  grid.push(row);
}

function handleClick(r, c) {
  grid[r][c] = !grid[r][c];
  ReactDOM.render(React.createElement(Test, null), document.querySelector('.container'));
}

function randomGrid() {
  grid = [];
  for (var i = 0; i < height; i++) {
    var row = [];
    for (var j = 0; j < width; j++) {
      var r = Math.random();
      if (r > .8) {
        row.push(false);
      } else {
        row.push(true);
      }
    }
    grid.push(row);
  }
  ReactDOM.render(React.createElement(Test, null), document.querySelector('.container'));
}
function clearGrid() {
  grid = [];
  gen = 0;
  for (var i = 0; i < height; i++) {
    var row = [];
    for (var j = 0; j < width; j++) {
      row.push(true);
    }
    grid.push(row);
  }
  ReactDOM.render(React.createElement(Test, null), document.querySelector('.container'));
}

function moveContinuous() {
  if (start) {
    start = false;
    $("#start").html("Stop");
    inter = setInterval(moveTurn, 100);
  } else {
    start = true;
    $("#start").html("Start");
    clearInterval(inter);
  }
}
function moveTurn() {
  var newGrid = [];
  if (start) {
    clearInterval(inter);
  }
  gen++;

  for (var i = 0; i < height; i++) {
    var row = [];
    for (var j = 0; j < width; j++) {
      var n = 0;
      var iP = i + 1;
      var iM = i - 1;
      var jP = j + 1;
      var jM = j - 1;

      if (i == 24) {
        iP = 0;
      }
      if (i == 0) {
        iM = 24;
      }
      if (j == 39) {
        jP = 0;
      }
      if (j == 0) {
        jM = 39;
      }
      if (grid[i][jM] == false) {
        n++;
      }
      if (grid[i][jP] == false) {
        n++;
      }
      if (grid[iP][jM] == false) {
        n++;
      }
      if (grid[iP][j] == false) {
        n++;
      }
      if (grid[iP][jP] == false) {
        n++;
      }
      if (grid[iM][jM] == false) {
        n++;
      }
      if (grid[iM][jP] == false) {
        n++;
      }
      if (grid[iM][j] == false) {
        n++;
      }
      console.log(n);
      if (n < 2 || n > 3) {
        row.push(true);
      } else if (n == 3) {
        row.push(false);
      } else if (grid[i][j]) {
        row.push(true);
      } else {
        row.push(false);
      }
    }
    newGrid.push(row);
  }
  grid = newGrid;
  ReactDOM.render(React.createElement(Test, null), document.querySelector('.container'));
}
var Cell = function Cell(_ref) {
  var alive = _ref.alive;
  var r = _ref.r;
  var c = _ref.c;
  return React.createElement('td', { onClick: function onClick() {
      return handleClick(r, c);
    }, className: '' + (alive ? 'clicked' : '') });
};
var Test = React.createClass({
  displayName: 'Test',
  getInitialState: function getInitialState() {
    return {
      grid: grid
    };
  },

  render: function render() {
    return React.createElement(
      'div',
      null,
      React.createElement(
        'h1',
        null,
        'Conway\'s Game of Life'
      ),
      React.createElement(
        'table',
        null,
        this.state.grid.map(function (row, i) {

          return React.createElement(
            'tr',
            null,
            row.map(function (cell, j) {
              return React.createElement(Cell, { alive: grid[i][j], r: i, c: j });
            })
          );
        })
      ),
      React.createElement(
        'h3',
        null,
        'Generation: ',
        gen
      ),
      React.createElement(
        'div',
        { id: 'a' },
        React.createElement(
          'button',
          { id: 'start', onClick: function onClick() {
              return moveContinuous();
            } },
          'Start'
        )
      ),
      React.createElement(
        'div',
        { id: 'a' },
        React.createElement(
          'button',
          { onClick: function onClick() {
              return clearGrid();
            } },
          'Clear'
        )
      ),
      React.createElement(
        'div',
        { id: 'a' },
        React.createElement(
          'button',
          { onClick: function onClick() {
              return randomGrid();
            } },
          'Random'
        )
      )
    );
  }
});
$(document).ready(function () {
  ReactDOM.render(React.createElement(Test, null), document.querySelector('.container'));
});
