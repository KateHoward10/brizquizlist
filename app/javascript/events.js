global.setDates = function() {
  const dateContainer = document.getElementById('date_container');

  function removeDate(e) {
    e.currentTarget.parentElement.remove();
  }

  dateContainer.querySelectorAll('.remove-date').forEach(button => button.addEventListener('ajax:success', removeDate));
}

global.setAttending = function() {
  document.querySelectorAll('.attending-toggle').forEach(toggle => toggle.addEventListener('ajax:success', () => {
    const isAttending = toggle.firstElementChild.classList.contains('grey');
    toggle.innerHTML = isAttending ? '<i class="fa fa-check green"></i><span>Attending</span>' : '<i class="fa fa-check grey"></i><span>Attend</span>';
    const attendeeCount = toggle.parentElement.querySelector('.attendee-count');
    const eventAttendees = toggle.parentElement.querySelector('.event-attendees');
    const eventIcon = toggle.parentElement.querySelector('.event-icon');
    const newCount = (attendeeCount ? +attendeeCount.textContent : 0) + (isAttending ? 1 : -1);
    eventAttendees.innerHTML = newCount ? `<span class="attendee-count">${newCount}</span> attending` : '';
    eventIcon.classList.toggle('fa-calendar-check-o');
    eventIcon.classList.toggle('fa-calendar-o');
  }));
}