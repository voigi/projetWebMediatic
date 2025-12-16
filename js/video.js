const video = document.getElementById("videoIntro");

video.addEventListener("ended", () => {
  video.currentTime = 0;
  video.pause();
});
