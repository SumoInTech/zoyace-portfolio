// Hero Header
function smoothTranslate(selector, duration) {
  const elements = document.querySelectorAll(selector);
  elements.forEach((element) => {
    let progress = 0; // Start at 0%
    let direction = -0.1; // Move by -2% each frame

    function animate() {
      // Update progress
      progress += direction;

      // Reset progress when reaching -100%
      if (progress <= -100) {
        progress = 0;
      }

      // Apply translation
      element.style.transform = `translateX(${progress}%)`;

      // Use requestAnimationFrame for smooth animation
      requestAnimationFrame(animate);
    }

    animate();
  });
}

// Call the function for both headers with a specified speed
smoothTranslate(".header-1, .header-2", 500);

document.addEventListener("scroll", () => {
  const header = document.querySelector(".header"); // Select the header
  const scrollThreshold = window.innerHeight * 0.3; // 30% of the screen height
  const headerContainer = document.querySelector(".header .inner-container");
  const navbarBrand = document.querySelector(".navbar-brand");
  const primaryMenu = document.querySelector(".header-toogle-menu");
  const toggleButton = document.querySelector(".header-toogle-btn");

  if (window.scrollY > scrollThreshold) {
    header.classList.add("sticky-header");
    navbarBrand.style.display = "none";
    primaryMenu.classList.remove("d-md-block");
    headerContainer.classList.add("justify-content-end");
    toggleButton.classList.remove("btn-dot-left");
    toggleButton.classList.remove("scale-0");
    toggleButton.classList.add("scale-1");
    toggleButton.classList.add("sticky-menu-btn");
  } else {
    header.classList.remove("sticky-header");
    navbarBrand.style.display = "";
    headerContainer.classList.remove("justify-content-end");
    primaryMenu.classList.add("d-md-block");
    toggleButton.classList.add("btn-dot-left");
    toggleButton.classList.remove("sticky-menu-btn");
    // toggleButton.classList.remove("d-block");
    toggleButton.classList.remove("scale-1");
    toggleButton.classList.add("scale-0");
  }
});

let highestProgress = 0;
let lastProgress = 0;
let isLocked = false;
const SMOOTH_FACTOR = 0.08; // Slightly reduced for smoother animation
const SPRING_FACTOR = 0.15; // Controls the bounciness

function springInterpolation(start, end, factor, springFactor) {
  const distance = end - start;
  const acceleration = distance * factor;
  const spring = Math.sin(distance * Math.PI) * springFactor;
  return start + acceleration + spring;
}

function getTimelineLineMetrics(timelineList) {
  const markers = timelineList.querySelectorAll(".timeline-marker");
  if (!markers.length) {
    return null;
  }

  const timelineRect = timelineList.getBoundingClientRect();
  const firstRect = markers[0].getBoundingClientRect();
  const lastRect = markers[markers.length - 1].getBoundingClientRect();
  const lineTop = firstRect.top + firstRect.height / 2 - timelineRect.top;
  const lineBottom = lastRect.top + lastRect.height / 2 - timelineRect.top;

  return {
    markers,
    lineTop,
    lineHeight: Math.max(lineBottom - lineTop, 0),
  };
}

function updateTimelineLinePosition(timelineList) {
  const metrics = getTimelineLineMetrics(timelineList);
  if (!metrics) {
    return null;
  }

  timelineList.style.setProperty("--line-top", `${metrics.lineTop}px`);
  timelineList.style.setProperty("--line-height", `${metrics.lineHeight}px`);
  return metrics;
}

function initTimelineLine() {
  const timelineList = document.querySelector(".timeline-list");
  if (!timelineList) {
    return;
  }

  updateTimelineLinePosition(timelineList);
}

document.addEventListener("DOMContentLoaded", initTimelineLine);
window.addEventListener("resize", initTimelineLine);

document.addEventListener("scroll", () => {
  const timelineList = document.querySelector(".timeline-list");
  if (!timelineList) return;

  const timelineRect = timelineList.getBoundingClientRect();
  const windowHeight = window.innerHeight;
  const metrics = updateTimelineLinePosition(timelineList);
  if (!metrics) return;

  if (timelineRect.top <= windowHeight && timelineRect.bottom >= 0) {
    timelineList.classList.add("active");

    if (isLocked) {
      timelineList.style.setProperty("--progress", 1);
      return;
    }

    const sectionHeight = timelineRect.height * 1.2;
    const viewportCenter = windowHeight / 2;
    const elementCenter = timelineRect.top + timelineRect.height / 2;
    const distanceFromCenter = viewportCenter - elementCenter;

    let targetProgress = Math.min(
      Math.max((distanceFromCenter + sectionHeight / 2) / sectionHeight, 0),
      1
    );

    if (targetProgress > 0.99) {
      targetProgress = 1;
      isLocked = true;
    }

    targetProgress = Math.max(targetProgress, highestProgress);
    highestProgress = targetProgress;

    // Apply spring interpolation for bouncy effect
    let smoothProgress = springInterpolation(
      lastProgress,
      targetProgress,
      SMOOTH_FACTOR,
      SPRING_FACTOR
    );

    // Ensure progress stays within bounds
    smoothProgress = Math.min(Math.max(smoothProgress, 0), 1);
    lastProgress = smoothProgress;

    timelineList.style.setProperty("--progress", smoothProgress);

    const { markers, lineTop, lineHeight } = metrics;
    const lastMarkerIndex = markers.length - 1;
    const timelineTop = timelineRect.top + lineTop;

    markers.forEach((marker, index) => {
      const markerRect = marker.getBoundingClientRect();
      const markerProgress =
        (markerRect.top + markerRect.height / 2 - timelineTop) / lineHeight;

      // Special handling for last marker
      if (index === lastMarkerIndex) {
        if (smoothProgress >= 0.9) {
          if (!marker.classList.contains("active")) {
            marker.classList.add("active");
            marker.style.animation = "none";
            marker.offsetHeight;
            marker.style.animation = null;
          }
        }
      } else {
        // Regular markers
        if (
          smoothProgress >= markerProgress &&
          !marker.classList.contains("active")
        ) {
          marker.classList.add("active");
          marker.style.animation = "none";
          marker.offsetHeight;
          marker.style.animation = null;
        } else if (
          smoothProgress < markerProgress &&
          marker.classList.contains("active")
        ) {
          marker.classList.remove("active");
        }
      }
    });

    // Complete the line after last marker
    if (smoothProgress >= 0.9) {
      targetProgress = 1;
      isLocked = true;
    }
  } else {
    if (timelineRect.top > windowHeight) {
      timelineList.classList.remove("active");
      timelineList.style.setProperty("--progress", 0);
      lastProgress = 0;
      highestProgress = 0;
      isLocked = false;
      timelineList.querySelectorAll(".timeline-marker").forEach((marker) => {
        marker.classList.remove("active");
      });
    }
  }
});
