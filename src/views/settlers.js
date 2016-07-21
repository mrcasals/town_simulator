export function render({ people, ...settlement }) {
  let content = '';
  let element = document.getElementById('settlers_details');
  element.innerHTML = '';

  console.log(`======== TURN ${settlement.turn} ========`);
  people.forEach((settler, id) => {
    content += `<li>${renderSettler(settler, id)}</li>`;
  });

  element.innerHTML = `<ul>${content}</ul>`;
}

function renderSettler({ name, age, gender, ...settler }, id) {
  console.log(id, settler, name, age, gender);
  return `${name} (${age}${gender[0]})`;
}
