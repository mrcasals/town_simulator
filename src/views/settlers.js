export function render({ people, ...settlement }) {
  let content = '';
  let element = document.getElementById('settlers_details');
  element.innerHTML = '';

  people.forEach(settler => {
    content += `<li>${renderSettler(settler)}</li>`;
  });

  element.innerHTML = `<ul>${content}</ul>`;
}

function renderSettler({ name, age, gender, ...settler }) {
  return `${name} (${age}${gender[0]})`;
}
