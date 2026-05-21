export function setCurrentSeller(seller) {

  localStorage.setItem(
    'currentSeller',
    JSON.stringify(seller)
  );
}

export function getCurrentSeller() {

  return JSON.parse(
    localStorage.getItem('currentSeller')
  );
}

export function logoutSeller() {

  localStorage.removeItem('currentSeller');
}