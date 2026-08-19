// Select all elements with the class '.move-link'
const moveLinks = document.querySelectorAll(".move-link");

moveLinks.forEach((link) => {
  link.style.willChange = "transform";

  link.addEventListener("mousemove", function (e) {
    const rect = link.getBoundingClientRect();
    const linkX = rect.left + rect.width / 2;
    const linkY = rect.top + rect.height / 2;

    const mouseX = e.clientX;
    const mouseY = e.clientY;

    const deltaX = mouseX - linkX;
    const deltaY = mouseY - linkY;

    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const maxDistance = 50;
    const movement = Math.min(maxDistance, distance / 5);

    link.style.transform = `translate3d(${Math.round(
      deltaX / 5
    )}px, ${Math.round(deltaY / 5)}px, 0)`;
  });

  link.addEventListener("mouseleave", function (e) {
    link.style.transform = "translate3d(0, 0, 0)";
  });
});

// Header Menu
const nav = document.querySelector(".header-nav");

nav.addEventListener("mouseenter", function () {
  const links = nav.querySelectorAll("a.active");
  links.forEach((link) => link.classList.remove("active-dot"));
});

nav.addEventListener("mouseleave", function () {
  const links = nav.querySelectorAll("a.active");
  links.forEach((link) => link.classList.add("active-dot"));
});

// Offcanvas Menu
const offcanvasNav = document.querySelector(".mobile-nav-item .header-nav");

offcanvasNav.addEventListener("mouseenter", function () {
  const links = offcanvasNav.querySelectorAll("a.active");
  links.forEach((link) => link.classList.remove("active-dot"));
});

offcanvasNav.addEventListener("mouseleave", function () {
  const links = offcanvasNav.querySelectorAll("a.active");
  links.forEach((link) => link.classList.add("active-dot"));
});

//Mouse Cursor
document.querySelectorAll(".cursor-circle").forEach((element) => {
  let circleX = 0,
    circleY = 0;
  let targetX = 0,
    targetY = 0;
  const speed = 0.1; // Adjust this value for smoother/slower movement

  let animationFrameId;

  function animateCursor() {
    circleX += (targetX - circleX) * speed;
    circleY += (targetY - circleY) * speed;

    element.style.setProperty("--cursor-x", `${circleX}px`);
    element.style.setProperty("--cursor-y", `${circleY}px`);

    animationFrameId = requestAnimationFrame(animateCursor);
  }

  element.addEventListener("mouseenter", (e) => {
    // Set initial positions to the cursor's position when entering
    circleX = e.clientX;
    circleY = e.clientY;
    targetX = e.clientX;
    targetY = e.clientY;

    element.classList.add("hovering");
    cancelAnimationFrame(animationFrameId);
    requestAnimationFrame(animateCursor);
  });

  element.addEventListener("mousemove", (e) => {
    targetX = e.clientX;
    targetY = e.clientY;
  });

  element.addEventListener("mouseleave", () => {
    element.classList.remove("hovering");
    cancelAnimationFrame(animationFrameId);
    circleX = targetX;
    circleY = targetY;
    element.style.setProperty("--cursor-x", `${circleX}px`);
    element.style.setProperty("--cursor-y", `${circleY}px`);
  });
});

//Mouse Cursor
document.querySelectorAll(".cursor-circle-expand").forEach((element) => {
  let circleX = 0,
    circleY = 0;
  let targetX = 0,
    targetY = 0;
  const speed = 0.1; // Adjust this value for smoother/slower movement

  let animationFrameId;

  function animateCursor() {
    circleX += (targetX - circleX) * speed;
    circleY += (targetY - circleY) * speed;

    element.style.setProperty("--cursor-x", `${circleX}px`);
    element.style.setProperty("--cursor-y", `${circleY}px`);

    animationFrameId = requestAnimationFrame(animateCursor);
  }

  element.addEventListener("mouseenter", (e) => {
    // Set initial positions to the cursor's position when entering
    circleX = e.clientX;
    circleY = e.clientY;
    targetX = e.clientX;
    targetY = e.clientY;

    element.classList.add("hovering");
    cancelAnimationFrame(animationFrameId);
    requestAnimationFrame(animateCursor);
  });

  element.addEventListener("mousemove", (e) => {
    targetX = e.clientX;
    targetY = e.clientY;
  });

  element.addEventListener("mouseleave", () => {
    element.classList.remove("hovering");
    cancelAnimationFrame(animationFrameId);
    circleX = targetX;
    circleY = targetY;
    element.style.setProperty("--cursor-x", `${circleX}px`);
    element.style.setProperty("--cursor-y", `${circleY}px`);
  });
});
