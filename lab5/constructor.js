function getRandomSubject(language) {
    const subjects = language === 'ru'
        ? ['Математика', 'Русский', 'Физика', 'Химия', 'История', 'Биология', 'География', 'Информатика', 'Литература', 'Английский']
        : ['Math', 'Physics', 'Chemistry', 'History', 'Biology', 'Geography', 'Computer Science', 'Literature', 'English', 'PE'];
    return subjects[Math.floor(Math.random() * subjects.length)];
}

function generateSchedule(days, lessons, language) {
    const container = document.getElementById('scheduleContainer');
    container.innerHTML = '';

    const weekDays = language === 'ru'
        ? ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота']
        : ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const table = document.createElement('table');
    const header = table.createTHead();
    const headerRow = header.insertRow();

    const emptyCell = document.createElement('th');
    headerRow.appendChild(emptyCell);
    for (let i = 0; i < days; i++) {
        const th = document.createElement('th');
        th.textContent = weekDays[i];
        headerRow.appendChild(th);
    }

    const body = table.createTBody();

    for (let i = 0; i < lessons; i++) {
        const row = body.insertRow();
        const lessonHeader = document.createElement('th');
        lessonHeader.textContent = language === 'ru' ? `Урок ${i + 1}` : `Lesson ${i + 1}`;
        row.appendChild(lessonHeader);

        for (let j = 0; j < days; j++) {
            const cell = row.insertCell();
            cell.textContent = getRandomSubject(language);
        }
    }

    container.appendChild(table);
}

document.getElementById('scheduleForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const days = parseInt(document.getElementById('days').value, 10);
    const lessons = parseInt(document.getElementById('lessons').value, 10);
    const language = document.getElementById('language').value;

    if (isNaN(days) || isNaN(lessons) || days < 1 || lessons < 1) {
        alert('Введите корректные значения для дней и уроков.');
        return;
    }

    localStorage.setItem('scheduleParams', JSON.stringify({days, lessons, language}));

    generateSchedule(days, lessons, language);
});

window.addEventListener('load', function () {
    const savedParams = JSON.parse(localStorage.getItem('scheduleParams'));

    if (savedParams) {
        document.getElementById('days').value = savedParams.days;
        document.getElementById('lessons').value = savedParams.lessons;
        document.getElementById('language').value = savedParams.language;

        generateSchedule(savedParams.days, savedParams.lessons, savedParams.language);
    }
});
