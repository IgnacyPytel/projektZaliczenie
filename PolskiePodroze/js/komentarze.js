// funkcje dostepne ze stackoverflow zmienione na moje potrzeby
document.addEventListener('DOMContentLoaded', () => {
    // wyszukuje wszystkie elementy formularza z klasa 'comment-form'
    const formElements = document.querySelectorAll('.comment-form');

    formElements.forEach(currentForm => {
        // dodaje zdarzenie submit do kazdego formularza
        currentForm.addEventListener('submit', (evt) => {
            evt.preventDefault(); // zapobiegam domyslnej akcji formularza

            // pobieram ID powiazane z postem z atrybutu formularza
            const relatedPostId = currentForm.getAttribute('data-post-id');
            // pobieram wartosci z odpowiednich pol formularza
            const userName = document.getElementById(`name-${relatedPostId}`).value;
            const userEmail = document.getElementById(`email-${relatedPostId}`).value;
            const userPhone = document.getElementById(`phone-${relatedPostId}`).value;
            const userGender = document.querySelector('input[name="gender"]:checked').value;
            const userComment = document.getElementById(`commentText-${relatedPostId}`).value;

            // tworze nowy obiekt komentarza z pobranymi danymi
            const newEntry = {
                id: Date.now(),
                postId: relatedPostId,
                name: userName,
                email: userEmail,
                phone: userPhone,
                gender: userGender,
                text: userComment,
                timestamp: new Date().toISOString()
            };

            // zapisuje nowy komentarz do localStorage
            storeComment(newEntry);
            // odswiezam komentarze dla aktualnego posta
            refreshComments(relatedPostId);
            // resetuje formularz po dodaniu komentarza
            currentForm.reset();
        });
    });

    // funkcja do walidacji numeru telefonu
    const validatePhoneNumber = (phone) => /^[0-9]{9}$/.test(phone);

    // funkcja do walidacji adresu email
    const validateEmailAddress = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    // funkcja do przechowywania komentarza w localStorage
    const storeComment = (comment) => {
        // pobieram istniejace komentarze lub tworze pusta tablice
        let commentsArray = JSON.parse(localStorage.getItem('comments')) || [];
        // dodaje nowy komentarz do tablicy
        commentsArray.push(comment);
        // zapisuje zaktualizowana tablice do localStorage
        localStorage.setItem('comments', JSON.stringify(commentsArray));
    };

    // funkcja do aktualizacji komentarza w localStorage
    const modifyStorage = (updatedComment) => {
        // pobieram istniejace komentarze
        let commentsArray = JSON.parse(localStorage.getItem('comments')) || [];
        // aktualizuje odpowiedni komentarz
        commentsArray = commentsArray.map(comment => comment.id === updatedComment.id ? updatedComment : comment);
        // zapisuje zaktualizowana tablice do localStorage
        localStorage.setItem('comments', JSON.stringify(commentsArray));
    };

    // funkcja do usuwania komentarza z localStorage
    const removeComment = (commentId, relatedPostId) => {
        // pobieram istniejace komentarze
        let commentsArray = JSON.parse(localStorage.getItem('comments')) || [];
        // usuwam komentarz z tablicy
        commentsArray = commentsArray.filter(comment => comment.id !== commentId);
        // zapisuje zaktualizowana tablice do localStorage
        localStorage.setItem('comments', JSON.stringify(commentsArray));
        // odswiezam komentarze dla aktualnego posta
        refreshComments(relatedPostId);
    };

    // funkcja do odswiezania komentarzy dla konkretnego posta
    const refreshComments = (relatedPostId) => {
        // pobieram wszystkie komentarze z localStorage
        const allComments = JSON.parse(localStorage.getItem('comments')) || [];
        // filtruje komentarze dla konkretnego posta
        const postSpecificComments = allComments.filter(comment => comment.postId === relatedPostId);
        // czyszcze sekcje komentarzy
        const commentSection = document.getElementById(`commentsList-${relatedPostId}`);
        commentSection.innerHTML = '';

        // dodaje kazdy komentarz do sekcji komentarzy
        postSpecificComments.forEach(comment => {
            // tworze blok komentarza
            const commentBlock = document.createElement('div');
            // dodaje klasy do bloku komentarza
            commentBlock.classList.add('d-flex', 'mb-4', 'comment-container');
            // template z stackoverflow wyglada ladnie wiec zostawiam
            const commentTemplate = `
                <div class="ms-3">
                    <div class="fw-bold">${comment.name}
                    <div class="text-muted fst-italic">${new Date(comment.timestamp).toLocaleString()}</div></div>
                    <div><i>Email: ${comment.email}</i></div>
                    <div><i>Telefon: ${comment.phone}</i></div>
                    <p class="comment-text">${comment.text}</p>
                    <button class="btn btn-secondary btn-sm edit-btn" data-id="${comment.id}">Edytuj</button>
                    <button class="btn btn-danger btn-sm delete-btn" data-id="${comment.id}">Usun</button>
                </div>
            `;
            // dodaje template komentarza do bloku komentarza
            commentBlock.innerHTML = commentTemplate;
            // dodaje blok komentarza do sekcji komentarzy
            commentSection.appendChild(commentBlock);
        });

        // dodaje zdarzenie klikniecia do kazdego przycisku edycji
        document.querySelectorAll('.edit-btn').forEach(editButton => {
            // pobieram ID komentarza i ID posta powiazanego z komentarzem
            editButton.addEventListener('click', (evt) => {
                // pobieram ID komentarza
                const commentId = Number(evt.target.getAttribute('data-id'));
                // pobieram ID posta powiazanego z komentarzem
                const relatedPostId = evt.target.getAttribute('data-post-id');
                // znajduje komentarz do edycji
                const commentToEdit = allComments.find(comment => comment.id === commentId);
                // jesli komentarz istnieje
                if (commentToEdit) {
                    // pobieram nowe wartosci dla komentarza
                    const updatedGender = prompt('Edytuj plec (mezczyzna/kobieta/inne)', commentToEdit.gender);
                    const updatedName = prompt('Edytuj imie', commentToEdit.name);
                    const updatedEmail = prompt('Edytuj email', commentToEdit.email);
                    const updatedPhone = prompt('Edytuj numer telefonu', commentToEdit.phone);
                    const updatedText = prompt('Edytuj komentarz', commentToEdit.text);
                    // jesli wszystkie dane sa poprawne
                    if (updatedGender && updatedName && updatedEmail && validateEmailAddress(updatedEmail) && validatePhoneNumber(updatedPhone) && updatedText) {
                        // aktualizuje dane komentarza
                        commentToEdit.gender = updatedGender;
                        commentToEdit.name = updatedName;
                        commentToEdit.email = updatedEmail;
                        commentToEdit.phone = updatedPhone;
                        commentToEdit.text = updatedText;
                        // zapisuje zaktualizowany komentarz
                        modifyStorage(commentToEdit);
                        // odswiezam komentarze dla aktualnego posta
                        refreshComments(relatedPostId);
                    } else {
                        alert('Prosze wprowadzic poprawne dane.');
                    }
                }
            });
        });

        // dodaje zdarzenie klikniecia do kazdego przycisku usuwania
        document.querySelectorAll('.delete-btn').forEach(deleteButton => {
            // pobieram ID komentarza i ID posta powiazanego z komentarzem
            deleteButton.addEventListener('click', (evt) => {
                // pobieram ID komentarza
                const commentId = Number(evt.target.getAttribute('data-id'));
                // pobieram ID posta powiazanego z komentarzem
                const relatedPostId = evt.target.getAttribute('data-post-id');
                // jesli uzytkownik potwierdzi usuniecie komentarza
                if (confirm('Czy na pewno chcesz usunac ten komentarz?')) {
                    // usuwam komentarz
                    removeComment(commentId, relatedPostId);
                }
            });
        });
    };

    // na poczatku odswiezam komentarze dla kazdego formularza
    formElements.forEach(currentForm => {
        // pobieram ID powiazane z postem z atrybutu formularza
        const relatedPostId = currentForm.getAttribute('data-post-id');
        // odswiezam komentarze dla aktualnego posta
        refreshComments(relatedPostId);
    });
});
