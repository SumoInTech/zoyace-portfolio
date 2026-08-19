(function (Drupal, $) {
  Drupal.behaviors.preventAutoScroll = {
    attach: function (context) {
      console.log("Custom JavaScript behavior attached"); // Debugging log

      $(".views-exposed-form", context)
        .once("preventAutoScroll")
        .each(function () {
          const $form = $(this);

          console.log("Found exposed form:", $form);

          $form.on("submit", function (event) {
            event.preventDefault(); // Prevent default submit behavior
            console.log("Form submitted, triggering Drupal AJAX");

            // Use Drupal's built-in AJAX framework
            $form.trigger("submit");
          });
        });

      // Prevent scrolling after Drupal AJAX completion
      $(document).ajaxComplete(function () {
        console.log("AJAX completed, preventing scroll");
        $("html, body").scrollTop(0); // Adjust this to maintain the current position
      });
    },
  };
})(Drupal, jQuery);
