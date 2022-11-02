const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
      const title = document.querySelector("#titleInput1").value;
      const content = document.querySelector("#contentTextarea1").value;

      const response = await fetch(`/api/blogs/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to delete project');
      }
    }
  };

  document
  .querySelector('#deleteBtn')
  .addEventListener('click', delButtonHandler);

const updateButtonHandler = async (event) => {
  event.preventDefault()
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id'); 
    const title = document.querySelector("#titleInput1").value
    const content = document.querySelector("#contentTextarea1").value

    const sucessfulUpdate = await fetch(`/api/blogs/${id}`, {
      method: 'PUT',
      body: JSON.stringify({title, content}),
      headers: {
        'Content-Type': 'application/json'
      }
    }); 

    if(sucessfulUpdate.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to update project'); 
    }
  }
}; 

document.querySelector("#updateBtn").addEventListener("click", updateButtonHandler)