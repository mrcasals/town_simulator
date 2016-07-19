export function render(logs, turn) {
  if (logs === undefined) {
    return;
  }

  let element = document.getElementById('log_details');
  logs.forEach(log => element.innerHTML += `<p>Year ${turn}: ${log.message}</p>`);
}
