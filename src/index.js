document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:3000/dogs')
      .then(response => response.json())
      .then(data => {
        const tableBody = document.getElementById('table-body');
        data.forEach(dog => {
          const row = document.createElement('tr');
  
          const nameCell = document.createElement('td');
          nameCell.textContent = dog.name;
          row.appendChild(nameCell);
  
          const breedCell = document.createElement('td');
          breedCell.textContent = dog.breed;
          row.appendChild(breedCell);
  
          const sexCell = document.createElement('td');
          sexCell.textContent = dog.sex;
          row.appendChild(sexCell);
  
          const editCell = document.createElement('td');
          const editButton = document.createElement('button');
          editButton.textContent = "Edit Dog";
          editButton.dataset.dogId = dog.id;
          editCell.appendChild(editButton);
          row.appendChild(editCell);
  
          tableBody.appendChild(row);
  
          editButton.addEventListener('click', handleEditButtonClick);
        });
      });
  });
  
  function handleEditButtonClick(event) {
    const editButton = event.target;
    const clickedRow = editButton.parentNode.parentNode;
    const name = clickedRow.querySelector('td:nth-child(1)').textContent;
    const breed = clickedRow.querySelector('td:nth-child(2)').textContent;
    const sex = clickedRow.querySelector('td:nth-child(3)').textContent;
    const dogId = editButton.dataset.dogId;
  
    const nameInput = document.querySelector('input[name="name"]');
    const breedInput = document.querySelector('input[name="breed"]');
    const sexInput = document.querySelector('input[name="sex"]');
  
    nameInput.value = name;
    breedInput.value = breed;
    sexInput.value = sex;
  
    const dogForm = document.querySelector("#dog-form");
    dogForm.removeEventListener('submit', handleFormSubmit);
    dogForm.addEventListener('submit', handleFormSubmit.bind(null, clickedRow, dogId));
  }
  
  function handleFormSubmit(clickedRow, dogId, event) {
    event.preventDefault();
  
    const nameInput = document.querySelector('input[name="name"]');
    const breedInput = document.querySelector('input[name="breed"]');
    const sexInput = document.querySelector('input[name="sex"]');
  
    fetch(`http://localhost:3000/dogs/${dogId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: nameInput.value,
        breed: breedInput.value,
        sex: sexInput.value
      })
    })
      .then(response => response.json())
      .then(updatedDog => {
        const updatedName = updatedDog.name;
        const updatedBreed = updatedDog.breed;
        const updatedSex = updatedDog.sex;
        const nameCell = clickedRow.querySelector('td:nth-child(1)');
        const breedCell = clickedRow.querySelector('td:nth-child(2)');
        const sexCell = clickedRow.querySelector('td:nth-child(3)');
  
        nameCell.textContent = updatedName;
        breedCell.textContent = updatedBreed;
        sexCell.textContent = updatedSex;
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };