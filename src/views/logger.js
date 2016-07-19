export function render(message) {
  let element = document.getElementById('log_details');
  element.innerHTML += `<p>${message}</p>`;
}
