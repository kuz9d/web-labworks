(function () {
    document.addEventListener('DOMContentLoaded', function () {
        const currentPage = window.location.pathname;
        const menuItems = document.querySelectorAll('.nav-links li');

        menuItems.forEach(item => {
            const link = item.querySelector('a');

            if (link && link.pathname === currentPage) {
                item.classList.add('active');
            }
        });
    });
})();