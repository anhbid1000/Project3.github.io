'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true; //kiem tra có đang còn chơi hay ko nếu có người win thì ko chơi nữa ko bấm được nút nữa

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1.Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    //2.Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    //3.Check for rolled 1: if true, switch to next player
    if (dice !== 1) {
      //Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //Switch to next player
      switchPlayer();
    }
  }
});
btnHold.addEventListener('click', function () {
  if (playing) {
    //1.Add current score to active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //2. Check if player's score is >=100
    if (scores[activePlayer] >= 100) {
      //Finish the game
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--active');
    } else {
      //Switch to next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', function () {
  //Phần hiển thị
  score0El.textContent = 0;
  score1El.textContent = 0;
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  player0El.classList.add('player-active');
  player1El.classList.remove('player-active');
  diceEl.classList.add('hidden');
  //phần ko hiển thị
  playing = true;
  currentScore = 0;
  for (let i = 0; i < scores.length; ++i) {
    scores[i] = 0;
  }

  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];
  activePlayer = 0;

  //thực chất toàn bộ phần này ta có thể viết thành 1 hàm ngay từ đầu và gọi nó mỗi khi cần đưa về trạng thái ban đầu
}); //nhưng với các biến ta cần đem đi thực hiện hành đônnjg thì lại khác 1 chút
//đó là trước khi đưa vào hàm ta phải khai báo khi đó hàm sẽ có chức năng gán giá trị cho biến đã có sẵn còn nếu
// ta chăm chăm khai báo trong hàm thì việc gọi chỉ xảy ra tạm thời và nó sẽ quy phạm scoping tức là nó chỉ sử dụng bên trong hàm
// và bên ngoài hàm thì ko thể sử dụng nó ( tức ngoài hàm nó sẽ được coi là chưa được khai báo [ tương tự trong c++ khi khai báo hàm 1 biến bất kì ta khai báo thì chỉ có tác dụng tính toán trong chính hàm đó thôi])
//mà để dùng được giá thì ta cần khai báo ngoài hàm ( nó giống việc ta khai báo n trong main rồi gọi hàm để nhập gán trị cho n)
/*
cách gọi hàm từ đầu

let scores, currentScore, activePlayer, playing;

const init=function(){
  scores =[0,0];
  currentScore=0;
  activePlayer=0;
  playing=true;

  score0El.textContent=0;
  socre1El.textContent=0;
  current0El.textContent=0;
  current1El.textContent=0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner);
  player0El.classList.remove('player--winner);
  player0El.classList.add('player--active);
  player0El.classList.remove('player--active);

btnNew.addEventListener('click',init);

}

*/
