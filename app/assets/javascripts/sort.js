function initDistanceForm() {
  let formOpen = false;
  const select = document.getElementById('sort_select');
  const form = document.getElementById('postcode_form');
  const input = document.getElementById('q_sorts');
  const urlParams = new URLSearchParams(window.location.search);

  if (urlParams.get('q[sorts]')) {
    select.querySelector('option[value=distance]').selected = true;
    formOpen = true;
    form.style = 'display: inline-flex';
    input.value = urlParams.get('q[sorts]');
  } else {
    select.firstElementChild.selected = true;
  }

  select.addEventListener('change', (e) => {
    formOpen = e.target.value === 'distance';
    form.style = `display: ${formOpen ? 'inline-flex' : 'none'}`;
  });
}
