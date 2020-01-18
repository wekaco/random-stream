var play = document.querySelector('.play');
var stop = document.querySelector('.stop');

((play, stop) => {
  // use XHR to load an audio track, and
  // decodeAudioData to decode it and stick it in a buffer.
  // Then we put the buffer into the source
  function getBufferSource(uri, audioCtx, cb) {
    const request = new XMLHttpRequest();
    request.open('GET', uri, true);
    request.responseType = 'arraybuffer';

    request.onload = () => {
      audioCtx.decodeAudioData(request.response, (buffer) => {
        const source = audioCtx.createBufferSource();
        var gain = audioCtx.createGain();
        source.loop = true;
        source.buffer = buffer;
  
        // Connect source to gain.
        source.connect(gain);
        cb(null, { uri, gain, source });
      },
      (err) => {
        console.error("Error with decoding audio data" + err);
        cb(err);
      });

    }
    request.send();
  }
  function getBufferSources(uris, ctx, cb) {
    uris.forEach( uri => getBufferSource(uri, ctx, cb));
  }

  function getCtx(cb) {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    // If closed already resume with reject promise
    // or else it is suspended and expected to resume
    if (ctx.state !== 'running') {
      // Web/API/AudioContext.resume
      ctx.resume()
        .then(()=>cb(null, ctx))
        .catch(cb);
      return;
    }
    cb(null, ctx);
  }

  stop.setAttribute('disabled', 'disabled');
  // wire up buttons to stop and play audio
  play.onclick = function() {
    play.setAttribute('disabled', 'disabled');

    getCtx((err, ctx) => {
      if (err) {
        play.removeAttribute('disabled');
        return console.error(err);
      }
      console.log(ctx.state);
      getBufferSources([ '/data/WKC013.m4a' ], ctx, (err, { uri, gain, source }) => {
        if (err) {
          play.removeAttribute('disabled');
          return console.error(err);
        }
        source.connect(ctx.destination);
        source.start(0);
        stop.removeAttribute('disabled');
        stop.onclick = () => {
          source.stop(0);
          play.removeAttribute('disabled');
          stop.setAttribute('disabled', 'disabled');
        }
      });
    });
  }
})(play, stop);
