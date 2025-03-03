document.addEventListener("DOMContentLoaded", function () {
    console.log("works.js loaded");
  
    // Select main video elements
    const mainVideoPlayer = document.getElementById("main-video-player");
    const mainVideoTitle = document.getElementById("main-video-title");
    const mainVideoDesc = document.getElementById("main-video-desc");
  
    // Select all thumbnails
    const thumbnails = document.querySelectorAll(".thumb");
    console.log(thumbnails.length + " thumbnails found");
  
    // For each thumbnail, update the main video on click
    thumbnails.forEach(thumb => {
      thumb.addEventListener("click", function () {
        console.log("Thumbnail clicked:", this);
  
        // Extract data attributes from the thumbnail
        let newTitle = this.getAttribute("data-title");
        let newDesc = this.getAttribute("data-desc");
        let newVideoSrc = this.getAttribute("data-video");
  
        // Safety check: make sure we have everything
        if (!newTitle || !newDesc || !newVideoSrc) {
          console.error("Missing data attributes on thumbnail:", this);
          return;
        }
  
        // If the newVideoSrc isn't an embed URL, convert it
        if (!newVideoSrc.includes("embed")) {
          let match = newVideoSrc.match(/v=([^&]+)/);
          if (match && match[1]) {
            let videoId = match[1];
            newVideoSrc = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
          } else {
            console.error("Cannot extract video ID from:", newVideoSrc);
            return;
          }
        }
  
        // Update the main video
        mainVideoTitle.textContent = newTitle;
        mainVideoDesc.textContent = newDesc;
        mainVideoPlayer.setAttribute("src", newVideoSrc);
  
        console.log("Main video updated to:", newVideoSrc);
      });
    });
  });
  