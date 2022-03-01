global.passwordFeedback = function() {
  const passwordInput = document.getElementById('user_password');
  const passwordConfirmation = document.getElementById('user_password_confirmation');
  const confirmIcons = document.querySelectorAll('.confirm-icon');

  const labels = ["Weak", "OK", "Good", "Strong"];

  if (passwordInput) {
    passwordInput.addEventListener('input', ({ target: { value } }) => {
      const indicator = passwordInput.nextElementSibling;
      const strength = Math.min(Math.floor(value.length / 4), 3);
      indicator.style = `background-color: hsl(${strength * 40},100%,40%); width: ${((strength + 1) * 25) - 1}%`;
      indicator.textContent = labels[strength];
    });

    if (passwordConfirmation && confirmIcons) passwordConfirmation.addEventListener('input', e => {
      confirmIcons.forEach(icon => icon.style = `display: ${passwordInput.value === e.target.value ? 'inline' : 'none'}`);
    });
  }
}