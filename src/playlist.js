((SC) => {
  console.clear();
  SC.initialize({
    client_id: 'a9d29aaf9a0cc170e7ee6ab980a6ad49'
  });

  let _current = null;
  let _is_playing = false;

  function isPlaying() {
    return _is_playing;
  }
  function getCurrentPlayer() {
    return _current;
  }
  function stop() {
    if (isPlaying()) {
      getCurrentPlayer().pause();
    }
  }

  function setCurrentPlayer(player) {
    stop();
    _current = player;
    return _current;
  }

  document.querySelectorAll('button[name="stop"]')
    .forEach( btn => btn.addEventListener('click', stop));


  Array.from(document.querySelectorAll('button[name="play"]'))
    .map( btn => SC.resolve(btn.value)
      .then( track => SC.stream(`/tracks/${track.id}`))
      .then( player => {
        btn.addEventListener('click', (e) => {
          setCurrentPlayer(player).play();
          // TODO: replace with event listener on player
          _is_playing = true;
        });
      })
    );
})(SC);
