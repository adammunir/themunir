document.addEventListener("DOMContentLoaded", function () {
  var story = document.querySelector("[data-precision-story]");
  if (!story) return;

  var steps = Array.prototype.slice.call(
    story.querySelectorAll("[data-precision-step]")
  );
  var images = Array.prototype.slice.call(
    story.querySelectorAll("[data-precision-image]")
  );
  if (!steps.length || !images.length) return;

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

  function getActiveStepByScrollPosition() {
    var anchor = window.innerHeight * 0.42;
    var current = steps[0];

    for (var i = 0; i < steps.length; i += 1) {
      var rect = steps[i].getBoundingClientRect();

      // If the anchor is inside a step, that step is active.
      if (rect.top <= anchor && rect.bottom >= anchor) {
        return steps[i];
      }

      // Otherwise keep the last step that has crossed the anchor.
      if (rect.top <= anchor) {
        current = steps[i];
      }
    }

    return current;
  }

  function updateFromScroll() {
    ticking = false;
    setActive(getActiveStepByScrollPosition());
  }

  function requestUpdate() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(updateFromScroll);
  }

  // Deterministic scroll sync + resize handling.
  setActive(steps[0]);
  updateFromScroll();
  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate);
});
