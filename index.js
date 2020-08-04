// select the two main DOM elements video and button by their ids
const button = document.getElementById("theButton");

// define onClick callback function
const toggleVideoVisibility = () => {
  // create video element
  const video = document.createElement("video");

  //   set attributes of video element
  video.setAttribute("width", "80%");
  video.setAttribute("controls", true);

  //   create source element and add src attribute
  var source = document.createElement("source");
  source.setAttribute(
    "src",
    "https://dip5sgyvj5owd.cloudfront.net/16698/assets/vhpvqfx-output-720-auto.mp4"
  );

  //   append source element as a child node to the video element
  video.appendChild(source);

  //   append the video element to the container just before the button element
  var container = document.getElementById("container");
  container.insertBefore(video, button);

  //   diable button after toggling the video element
  button.disabled = true;

  // set a callback to track time updates of the video
  video.ontimeupdate = () => {
    onVideoTimeUpdate(video);
  };
};

// define the callback function to call on every time update of the video
const onVideoTimeUpdate = (video) => {
  // check for the five conditions to toggle the button
  if (
    //  check if the video is playing
    !video.paused &&
    // check if the current time of the video exceeded 10 seconds
    video.currentTime > 10 &&
    // check if the remaining time of the video exceeds 30 seconds
    video.duration - video.currentTime > 30 &&
    // check if height of the video is more than 450px
    video.offsetHeight > 450 &&
    // check if the video is more than 50% visible
    visibleVideo(video)
  ) {
    // enable button
    button.disabled = false;

    // change button on click callback to open a new tab
    button.onclick = () => {
      const tab = window.open("https://www.adways.com", "_blank");
      tab.focus();
    };
  } else {
    // in any other case make button disabled again
    button.disabled = true;
  }
};

// define function to check if video is more than 50% visible
const visibleVideo = (video) => {
  // knowing that the width of the video is always 80% of page width we only need to check if the height of the video is visible by 50%
  let visibleY =
    //   if window offset relative to document is inferior to video element offset then we assume that the video is visible by 100%
    window.pageYOffset <= video.offsetTop
      ? video.offsetHeight
      : //   if the user scrolls past the offset of the video the we calculate the remaining visible height
        video.offsetHeight + video.offsetTop - window.pageYOffset;
  if (visibleY > video.offsetHeight * 0.5) {
    return true;
  }
  return false;
};
