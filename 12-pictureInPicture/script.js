'use strict';

const videoElement = document.querySelector('#video');
const button = document.querySelector('#btn');

// Prompt to select media MediaStream, pass to video element and then play
async function selecMediaStream() {
  try {
    const mediaStream = await navigator.mediaDevices.getDisplayMedia();
    videoElement.srcObject = mediaStream;
    videoElement.onloadedmetadata = () => {
      videoElement.play();
    };
  } catch (e) {
    // Catch Error
    console.log('error: ', e);
  }
}

button.addEventListener('click', async () => {
  //Disable the button
  button.disabled = true;

  // start picture in picture
  await videoElement.requestPictureInPicture();

  // Reset
  button.disabled = false;
});

// On Load
selecMediaStream();
