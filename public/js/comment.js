const commentHandler = async (e) => {
    e.preventDefault();
    const commentContent = document.querySelector("#exampleFormControlTextarea1").value 
    const post_id = document.querySelector("#input").value

    const comment = await fetch (`/api/comment`, {
        method: "POST",
        body: JSON.stringify({post_id, commentContent}),
        headers: {
            'Content-Type': 'application/json' 
        }
    })

    if (comment.ok) {
        document.location.reload()
    } else {
        alert('Failed to post comment'); 
      }


}; 

document.querySelector('#submitBtn').addEventListener('click', commentHandler)

