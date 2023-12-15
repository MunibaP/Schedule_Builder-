// Added this function to ensure HTML & CSS runs first than, JavaScript
// display the current date using dayjs format
$(document).ready(function() {
  $("#currentDay").text(dayjs().format("dddd, MMMM D, YYYY"));

  // Added this function to change the color to indicate if the hour of timeblock is past, present or future
  // Added loops for the timeblocks
  function colorChange() {
    $(".time_block").each(function() {
      var hour = parseInt($(this).attr("id").split("_")[1]);
      var currentHour = dayjs().hour();;

      if (hour < currentHour) {
        $(this).addClass("past").removeClass("present future");
      }
      else if (hour === currentHour) {
        $(this).addClass("present").removeClass("past future");
      }
      else {
        $(this).addClass("future").removeClass("past present");
      }

    });
  }
// Added saveEvent function to save each even when the button clicks
  function saveEvent(hour, eventText) {
     localStorage.setItem(`${hour}hour_text`, JSON.stringify(eventText));
  } 
// Added displaySavedEvent to display the save events
  function displaySavedEvent(hour) {
    var savedEvent = localStorage.getItem(`${hour}hour_text`);
    if (savedEvent) {
      $(`#hour_${hour} .description`).val(JSON.parse(savedEvent));
     }
  }
// Added the clear function to clear all the events
  function clearAllEvent() {
    for(var hour =9; hour <=17; hour++) {
      localStorage.removeItem(`${hour}hour_text`);
    }

    $(".time_block .description").val("");
    localStorage.clear();
  }
// Added getEvents to retrieve and display save events
  function getEvents() {
    for(var hour =9; hour <=17; hour++) {
     displaySavedEvent(hour);
    }
  }
// Added this function to retrieve save events from each timeblock in the localStorage
  function getSavedEvents() {
    var timeblocks = document.querySelectorAll(".time_block");
    timeblocks.forEach(timeblocks => {
      var hour = timeblocks.getAttribute("id").split("_")[1];
      var eventText = localStorage.getItem(`${hour}hour_text`);
      if (eventText) {
        $(`#${timeblocks.id} .description`).val(JSON.parse(eventText));
      }
    });
  }

    colorChange();
    getEvents();
    getSavedEvents();

  // Added save button to save the events when the button is clicked
  $(".saveBtn").on("click", function() {
     var hour = $(this).siblings(".hour").text().trim().split("")[0];
    var eventText = $(this).siblings(".description").val();

    saveEvent(hour, eventText);

    showNotification("Your Appointment is saved to LocalStorage!");

    colorChange();

  });
// Added clear button to clear all events
 $("#clearBtn").on("click", function() {
    clearAllEvent();

     showNotification("All Appointment cleared!");
  });

  // Added notification function to show a message when events are save in the localStorage
  function showNotification(message) {
    var notification = $("<div>").addClass("notification").text(message);
   $("header").append(notification);

   // Remove the notification after 3 seconds
   setTimeout(function () {
     notification.remove();
    }, 3000);
  }

});