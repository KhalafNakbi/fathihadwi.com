document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid')
    let squares = Array.from(document.querySelectorAll('.grid div'))
    const scoreDisplay = document.querySelector('#score')
    const startBtn = document.querySelector('#start-button')
    const width = 10
    let nextRandom = 0
    let timerId
    let score = 0
    const colors = [
      'orange',
      'red',
      'purple',
      'green',
      'blue',
      'yellow',
      'pink'
    ]
  
    //The Tetrominoes
    const lTetromino = [
      [1, width+1, width*2+1, width*2+2],
      [width+2, width*2, width*2+1, width*2+2],
      [1, width+1, width*2+1, 0],
      [width, width+1, width+2, width*2]
    ]

    const jTetromino = [
      [1, width+1, width*2+1, width*2],
      [width, width*2, width*2+1, width*2+2],
      [1, width+1, width*2+1, 2],
      [width, width+1, width+2, width*2+2]

    ]
  
    const zTetromino = [
      [0,1,width+1,width+2],
      [1, width,width+1,width*2],
      [0,1,width+1,width+2],
      [1, width,width+1,width*2]

    ]

    const sTetromino = [
      [0,width,width+1,width*2+1],
      [width+1, width+2,width*2,width*2+1],
      [0,width,width+1,width*2+1],
      [width+1, width+2,width*2,width*2+1]
    ]
  
    const tTetromino = [
      [width,width+1,width+2,width*2+1],
      [1,width,width+1,width*2+1],
      [1,width,width+1,width+2],
      [1,width+1,width+2,width*2+1],
   
    ]
  
    const oTetromino = [
      [0,1,width,width+1],
      [0,1,width,width+1],
      [0,1,width,width+1],
      [0,1,width,width+1]
    ]
  
    const iTetromino = [
      [width,width+1,width+2,width+3],
      [1,width+1,width*2+1,width*3+1],
      [width,width+1,width+2,width+3],
      [1,width+1,width*2+1,width*3+1]
    ]
  
    const theTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino,sTetromino,jTetromino]
  
    let currentPosition = 4
    let currentRotation = 0
  
    //randomly select a Tetromino and its first rotation
    let random = Math.floor(Math.random()*theTetrominoes.length)
    let current = theTetrominoes[random][currentRotation]
  
    //draw the Tetromino7
    function draw() {
      for (var i = 0; i < current.length; i++) {
          // squares[currentPosition+current[i]].classList.add('tetromino')
          squares[currentPosition+current[i]].style.backgroundColor = colors[random];
      }
  }
    //undraw the Tetromino
    // function undraw() {
    //   current.forEach(index => {
    //     squares[currentPosition + index].classList.remove('tetromino')
    //     squares[currentPosition + index].style.backgroundColor = ''
    //   })
    // }
    function undraw(){
      for(var i=0;i<current.length;i++){
          // squares[currentPosition+current[i]].classList.remove('tetromino')
          squares[currentPosition+current[i]].style.backgroundColor=''
      }
      }
    //assign functions to keyCodes
    function control(e) {
      if(e.keyCode === 37) {
        moveLeft()
      } else if (e.keyCode === 38) {
        rotate()
      } else if (e.keyCode === 39) {
        moveRight()
      } else if (e.keyCode === 40) {
        moveDown()
      }
      // else if (e.keycode=== 32 ) {
      //   movedownfast()
      // }
    }
    document.addEventListener('keyup', control)
    //move down function
    function moveDown() {
      undraw()
      currentPosition += width
      draw()
      freeze()
    }
    //freeze function
    function freeze() {
      if(current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
        current.forEach(index => squares[currentPosition + index].classList.add('taken'))
        //start a new tetromino falling
        // var random1 = random
        random = nextRandom

        // do{

        nextRandom = Math.floor(Math.random() * theTetrominoes.length)
        // } while (nextRandom != random1)
        current = theTetrominoes[random][currentRotation]
        currentPosition = 4
        draw()
        displayShape()
        addScore()
        gameOver()
      }
    }
   
  
  
    //move the tetromino left, unless is at the edge or there is a blockage
    function moveLeft() 
    {
      undraw()
      const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0)
      if(!isAtLeftEdge) currentPosition -=1
      if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
        currentPosition +=1
      }
      draw()
     }
  //   function isAtLeftEdge() {
  //     for (var i = 0; i < current.length; i++) {
  //         var index = current[i];
  //         if ((currentPosition + index) % width === 0) {
  //             return true;
  //         }
  //     }
  //     return false;
  // }
  
  // function isBlockTakenToLeft() {
  //     for (var i = 0; i < current.length; i++) {
  //         var index = current[i];
  //         if (squares[currentPosition + index - 1].classList.contains('taken')) {
  //             return true;
  //         }
  //     }
  //     return false;
  // }
  
  // function moveLeft() {
  //     undraw();
  
  //     if (!isAtLeftEdge()) {
  //         currentPosition -= 1;
  //     }
  
  //     if (isBlockTakenToLeft()) {
  //         currentPosition += 1;
  //     }
  //     draw();
  // }
    //move the tetromino right, unless is at the edge or there is a blockage
    function moveRight() {
      undraw()
      const isAtRightEdge = current.some(index => (currentPosition + index) % width === width -1)
      if(!isAtRightEdge) currentPosition +=1
      if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
        currentPosition -=1
      }
      draw()
    }
    ///FIX ROTATION OF TETROMINOS A THE EDGE 
    function isAtRight() {
      return current.some(index=> (currentPosition + index + 1) % width === 0)  
    }
    function isAtLeft() {
      return current.some(index=> (currentPosition + index) % width === 0)
    }
    function checkRotatedPosition(P){
      //P = P || currentPosition       
      if ((P+1) % width < 4) {              
        if (isAtRight()){             
          currentPosition += 1    
         checkRotatedPosition(P) 
          }
      }
      else if (P % width > 5) {
        if (isAtLeft(P)){
          currentPosition -= 1
          checkRotatedPosition(currentPosition)
        }
      }
    }
    //rotate the tetromino
    function rotate() {
      undraw()
      currentRotation ++
      if(currentRotation === current.length) { //if the current rotation gets to 4, make it go back to 0
        currentRotation = 0
      }
      current = theTetrominoes[random][currentRotation]
      checkRotatedPosition(currentPosition)
      draw()
    }
  
  
    //-------------------------------------------------------------------//
    
    //show up-next tetromino in mini-grid display
    const displaySquares = document.querySelectorAll('.mini-grid div')
    const displayWidth = 4
    const displayIndex = 1
  
    //the Tetrominos without rotations
    const upNextTetrominoes = [
      [1, displayWidth+1, displayWidth*2+1, displayWidth*2+2], //lTetromino
      [1, displayWidth+1,displayWidth*2+1, displayWidth*2],//jTetromino
      [0,1,displayWidth+1,displayWidth+2], //zTetromino
      [0,displayWidth,displayWidth+1,displayWidth*2+1],//sTetromino
      [displayWidth,displayWidth+1,displayWidth+2,displayWidth*2+1], //tTetromino
      [1, 2, displayWidth+1, displayWidth+2], //oTetromino
      [displayWidth*2,displayWidth*2+1,displayWidth*2+2,displayWidth*2+3] //iTetromino
    ]
  
    //display the shape in the mini-grid display
    function displayShape() {
      //remove any trace of a tetromino form the entire grid
      displaySquares.forEach(square => {
        square.style.backgroundColor = ''
      })
      upNextTetrominoes[nextRandom].forEach( index => {
        displaySquares[displayIndex + index].style.backgroundColor = colors[nextRandom]
      })
    }
  
    //add functionality to the button
    startBtn.addEventListener('click', () => {
      toggleAudio();
      if (timerId) {
        clearInterval(timerId)
        timerId = null
      } else {
        draw()
        timerId = setInterval(moveDown,1000)
        nextRandom = Math.floor(Math.random()*theTetrominoes.length)
        displayShape()
      }})
  
    //add score
    function addScore() {
      for (let i = 0; i < 199; i +=width) {
        const row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9]
  
        if(row.every(index => squares[index].classList.contains('taken'))) {
          score +=10
          scoreDisplay.innerHTML = score
          row.forEach(index => {
            squares[index].classList.remove('taken')
            squares[index].classList.remove('tetromino')
            squares[index].style.backgroundColor = ''
          })
          const squaresRemoved = squares.splice(i, width)
          squares = squaresRemoved.concat(squares)
          squares.forEach(cell => grid.appendChild(cell))
        }
      }
    }
  
    //game over
    function gameOver() {
      if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
        scoreDisplay.innerHTML = 'end'
        clearInterval(timerId)
        alert("Game Over!")
      }
    }
    document.addEventListener('keydown', function(event) {
      // Prevent scrolling when up or down arrow keys are pressed
      if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
        event.preventDefault();
      }
    });
  })
