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

                commentsSection.innerHTML = '';
                const header = document.createElement('h3');
                header.textContent = 'Комментарии';
                commentsSection.appendChild(header);

                data.forEach(comment => {
                    const commentDiv = document.createElement('div');
                    commentDiv.classList.add('comment');

                    const nameParagraph = document.createElement('p');
                    const strongElement = document.createElement('strong');
                    strongElement.textContent = `${comment.name}:`;

                    const bodyText = document.createTextNode(` ${comment.body}`);

                    nameParagraph.appendChild(strongElement);
                    nameParagraph.appendChild(bodyText);

                    commentDiv.appendChild(nameParagraph);
                    commentsSection.appendChild(commentDiv);
                });
            })
            .catch(error => {
                console.error('Error fetching comments:', error);
            });
    }

    fetchComments();
});
