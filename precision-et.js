document.addEventListener("DOMContentLoaded", function () {
  var story = document.querySelector("[data-precision-story]");
  if (!story) return;

  var steps = Array.prototype.slice.call(
    story.querySelectorAll("[data-precision-step]")
  );
  var images = Array.prototype.slice.call(
    story.querySelectorAll("[data-precision-image]")
  );
  var activeStep = null;
  var ticking = false;

  function setActive(step) {
    if (!step || step === activeStep) return;
    activeStep = step;
    var imageId = step.getAttribute("data-image");

    steps.forEach(function (item) {
      item.classList.toggle("is-active", item === step);
    });

    images.forEach(function (image) {
      image.classList.toggle(
        "is-active",
        image.getAttribute("data-precision-image") === imageId
      );
    });
  }

  function updateActiveStep() {
    ticking = false;

    var viewportAnchor = window.innerHeight * 0.38;
    var bestStep = steps[0];
    var bestDistance = Infinity;

    steps.forEach(function (step) {
      var rect = step.getBoundingClientRect();
      var stepAnchor = rect.top + Math.min(rect.height * 0.35, 80);
      var distance = Math.abs(stepAnchor - viewportAnchor);

      if (distance < bestDistance) {
        bestDistance = distance;
        bestStep = step;
      }
    });

    setActive(bestStep);
  }

  function requestUpdate() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(updateActiveStep);
  }

  setActive(steps[0]);
  updateActiveStep();
  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate);
});
