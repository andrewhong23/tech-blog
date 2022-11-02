
async function newFormHandler (e) {
  e.preventDefault()
console.log('clicked')
  const title = document.querySelector("#titleInput1").value
  const content = document.querySelector("#contentTextarea1").value
  await fetch ("/api/blogs", {
      method: "POST",
      body: JSON.stringify({title, content}), 
      headers: {
          'Content-Type': 'application/json' 
      }
  })

  document.location.replace('/dashboard')
} 

document.querySelector("#btn").addEventListener('click', newFormHandler
); 

  
