import '../css/common.css';
import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const player = new Player(document.querySelector('iframe'));

setPlayerTime(player, localStorage.getItem('videoplayer-current-time'));

player.on('timeupdate', throttle(savePlayerTime, 1000));
function savePlayerTime({ seconds }) {
  localStorage.setItem('videoplayer-current-time', seconds);
}
function setPlayerTime(currentPlayer, currentTime) {
  if (localStorage.getItem('videoplayer-current-time')) {
    currentPlayer.setCurrentTime(currentTime);
  }
}
