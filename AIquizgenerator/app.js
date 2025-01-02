document.getElementById('generateQuizBtn').addEventListener('click', () => {
    const notes = document.getElementById('notesInput').value;
    if (!notes) {
        alert('Please paste your notes before generating a quiz.');
        return;
    }

    // Placeholder for backend call
    fetch('/generate-quiz', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ notes })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('quizContainer').innerHTML = data.quiz || 'No quiz generated';
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to generate quiz.');
    });
});
