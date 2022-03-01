global.setFavourite = function() {
  const favouriteButton = document.getElementById('favourite_button');
  const number = document.querySelector('.favourite-number');

  if (favouriteButton) {
    favouriteButton.addEventListener('ajax:success', () => {
      const icon = favouriteButton.firstElementChild;
      const isUnfavouriting = icon.classList.contains('red');
      icon.classList.toggle('red');
      if (number) number.textContent = ((+number.textContent || 0) + (isUnfavouriting ? -1 : 1)) || "";
    });
  }
}

global.removeElement = function() {
  const removeButtons = document.querySelectorAll('.remove-button');

  if (removeButtons) {
    removeButtons.forEach(button => button.addEventListener('ajax:success', () => {
      button.parentElement.remove();
    }));
  };
}