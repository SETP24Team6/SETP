function toggleObjectives() {
    const objectives = document.getElementById('objectives');
    if (objectives.classList.contains('hidden')) {
        objectives.classList.remove('hidden');
    } else {
        objectives.classList.add('hidden');
    }
}