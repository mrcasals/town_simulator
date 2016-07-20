export function render({ people, ...settlement }) {
  let content = '';
  let element = document.getElementById('settlers_details');
  element.innerHTML = '';

  console.log(`======== TURN ${settlement.turn} ========`);
  people.forEach(settler => {
    content += `<li>${renderSettler(settler)}</li>`;
  });

  element.innerHTML = `<ul>${content}</ul>`;
}

function renderSettler({ name, age, gender, ...settler }) {
  console.log(settler, name, age, gender);
  return `${name} (${age}${gender[0]})`;
}
