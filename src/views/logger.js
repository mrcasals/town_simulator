export function render({ logs, turn, ...settlement }) {
  let currentEvents = logs.get(turn)
  if (currentEvents === undefined) {
    return;
  }

  let element = document.getElementById('log_details');
  currentEvents.forEach(event => element.innerHTML += `<p>Year ${turn}: ${getMessage(event, settlement)}</p>`);
}

function getMessage(event, settlement) {
  if (event.message !== undefined) {
    return event.message
  }

  switch(event.get('event')) {
  case 'NEW_MARRIAGE':
    let person1 = settlement.people.get(event.get('peopleIds').get(0))
    let person2 = settlement.people.get(event.get('peopleIds').get(1))
    return `${person1.name} (${person1.age}${person1.gender[0]}) and ${person2.name} (${person2.age}${person2.gender[0]}) got married`;
  }
}
