// The jukebox player. Click cycles: stopped -> 1x -> 2x -> stopped, matching
// the original site. `onPlayingChange` lets the world toggle the note particles.

const ICONS = {
  play: '<svg viewBox="0 0 24 24" aria-hidden="true"><polygon points="8,5 19,12 8,19"></polygon></svg>',
  fast: '<svg viewBox="0 0 24 24" aria-hidden="true"><polygon points="5,5 14,12 5,19"></polygon><polygon points="10,5 19,12 10,19"></polygon></svg>',
  stop: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="6" y="5" width="4" height="14"></rect><rect x="14" y="5" width="4" height="14"></rect></svg>',
};

export function createAudio({ onPlayingChange }) {
  const audio = document.getElementById("audio");
  const btn = document.getElementById("audio-btn");
  const status = document.getElementById("audio-status");

  let state = 0; // 0 stopped, 1 playing 1x, 2 playing 2x

  function render() {
    if (state === 0) {
      btn.innerHTML = ICONS.play;
      btn.setAttribute("aria-pressed", "false");
      status.textContent = "8 min · Play";
    } else if (state === 1) {
      btn.innerHTML = ICONS.fast;
      btn.setAttribute("aria-pressed", "true");
      status.textContent = "Playing · tap for 2×";
    } else {
      btn.innerHTML = ICONS.stop;
      btn.setAttribute("aria-pressed", "true");
      status.textContent = "Playing 2× · tap to stop";
    }
    onPlayingChange && onPlayingChange(state !== 0);
  }

  btn.addEventListener("click", () => {
    if (state === 0) {
      state = 1;
      audio.playbackRate = 1;
      audio.play().catch(() => {});
    } else if (state === 1) {
      state = 2;
      audio.playbackRate = 2;
    } else {
      state = 0;
      audio.pause();
      audio.currentTime = 0;
    }
    render();
  });

  audio.addEventListener("ended", () => {
    state = 0;
    render();
  });

  render();
}
