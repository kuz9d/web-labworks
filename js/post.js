document.addEventListener('DOMContentLoaded', () => {
    const commentsSection = document.querySelector('.comments');
    const preloader = document.createElement('div');
    preloader.classList.add('preloader');
    preloader.innerHTML = '<img src="../images/loading-wtf.gif" alt="Loading...">';
    commentsSection.appendChild(preloader);

    function fetchComments() {
        const randomFilter = Math.random() > 0.5 ? { min: 100, max: 200 } : { min: 200, max: 300 };

        fetch(`https://jsonplaceholder.typicode.com/comments?_start=${randomFilter.min}&_end=${randomFilter.max}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                preloader.style.display = 'none';

                commentsSection.innerHTML = '<h3>Комментарии</h3>';

                data.forEach(comment => {
                    const commentDiv = document.createElement('div');
                    commentDiv.classList.add('comment');
                    commentDiv.innerHTML = `
            <p><strong>${comment.name}:</strong> ${comment.body}</p>
          `;
                    commentsSection.appendChild(commentDiv);
                });
            })
            .catch(error => {
                // Handle errors (e.g., network issues)
                preloader.style.display = 'none';
                const errorMessage = document.createElement('p');
                errorMessage.classList.add('error-message');
                errorMessage.textContent = '⚠ Что-то пошло не так';
                commentsSection.appendChild(errorMessage);
            });
    }

    fetchComments();
});
