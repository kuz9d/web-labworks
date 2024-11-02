(function () {
    window.addEventListener('load', function () {
        let time = window.performance.timing;
        let pageLoadTime = (time.loadEventStart - time.navigationStart) / 1000;

        let footer = document.querySelector('footer');

        if (footer) {
            let loadTimeElement = document.createElement('span');
            loadTimeElement.style.display = 'block';
            loadTimeElement.innerText = `Page load time: ${pageLoadTime.toFixed(3)} seconds`;

            footer.appendChild(loadTimeElement);
        }
    });
})();
