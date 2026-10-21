
$(document).ready(function () {

  // 1. JavaScript: Validate form and show personalized message
  $("#registrationForm").on("submit", function (event) {
    event.preventDefault();

    const name = $("#studentName").val().trim();
    const email = $("#studentEmail").val().trim();
    const selectedEvent = $("#eventSelect").val();
    const message = $("#message");

    message.stop(true, true).hide();

    if (name === "" || email === "" || selectedEvent === "") {
      message
        .removeClass("alert-success")
        .addClass("alert alert-danger")
        .text("Please enter your name, email, and select an event.")
        .fadeIn();
      return;
    }

    // Check that the email format is valid
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      message
        .removeClass("alert-success")
        .addClass("alert alert-danger")
        .text("Please enter a valid email address.")
        .fadeIn();
      return;
    }

    message
      .removeClass("alert-danger")
      .addClass("alert alert-success")
      .text(
        "Congratulations, " + name +
        "! You have successfully registered for " +
        selectedEvent + "."
      )
      .fadeIn();
  });


  // 2. JavaScript: Change card theme
  $("#changeStyle").on("click", function () {
    $("#registrationCard").toggleClass("alternate-theme");
  });


  // 3. jQuery: Show/hide instructions using slideToggle()
  $("#toggleInstructions").click(function () {
    $("#instructions").stop(true, true).slideToggle(400);
  });


  // 4. jQuery: Show/hide details using fadeToggle()
  $("#toggleDetails").click(function () {
    $("#eventDetails").stop(true, true).fadeToggle(400);
  });


  // 5. jQuery: Add selected event to a list
  $("#addEvent").click(function () {
    const selectedEvent = $("#eventSelect").val();

    if (selectedEvent === "") {
      $("#message")
        .removeClass("alert-success")
        .addClass("alert alert-danger")
        .text("Please select an event before adding it to the list.")
        .stop(true, true)
        .fadeIn();
      return;
    }

    // Avoid adding the same event twice
    const alreadyAdded = $("#eventList li").filter(function () {
      return $(this).text() === selectedEvent;
    }).length > 0;

    if (alreadyAdded) {
      $("#message")
        .removeClass("alert-success")
        .addClass("alert alert-danger")
        .text("This event is already in your list.")
        .stop(true, true)
        .fadeIn();
      return;
    }

    $("<li></li>")
      .text(selectedEvent)
      .appendTo("#eventList")
      .hide()
      .fadeIn(300);
  });


  // 6. jQuery: Mouseover event and class selector
  $(".registration-card").on("mouseover", function () {
    $("#hoverMessage").css("color", "#d35400");
  });

  $(".registration-card").on("mouseleave", function () {
    $("#hoverMessage").css("color", "#5969bc");
  });


  // 7. Display complete project source code on the live page
  // The three files must be deployed together on Vercel.
  const sourceFiles = ["index.html", "style.css", "script.js"];

  Promise.all(
    sourceFiles.map(function (file) {
      return fetch(file)
        .then(function (response) {
          if (!response.ok) {
            throw new Error("Could not load " + file);
          }
          return response.text();
        })
        .then(function (code) {
          return "/* FILE: " + file + " */\n\n" + code;
        });
    })
  )
    .then(function (files) {
      $("#sourceCode").text(files.join("\n\n\n"));
    })
    .catch(function () {
      $("#sourceCode").text(
        "Unable to load the source code. Please check that " +
        "index.html, style.css, and script.js are deployed " +
        "together and accessible."
      );
    });

});