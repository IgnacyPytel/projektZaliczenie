
document.addEventListener('DOMContentLoaded', () => {
    // pobiera element formularza kontaktowego
    const contactForm = document.getElementById('contactForm');

    // dodaje event listener dla zdarzenia 'submit' formularza kontaktowego
    contactForm.addEventListener('submit', (event) => {
        // zapobiega domyslnej akcji wysylania formularza
        event.preventDefault();
        // pobiera wartosc wybranej plci
        const gender = document.querySelector('input[name="gender"]:checked').value;
        // pobiera wartosc imienia
        const name = document.getElementById('name-3').value;
        // pobiera wartosc adresu e-mail
        const email = document.getElementById('email-3').value;
        // pobiera wartosc numeru telefonu
        const phone = document.getElementById('phone-3').value;
        // pobiera wartosc tekstu kontaktu
        const commentText = document.getElementById('commentText-3').value;
        // tworzy nowy obiekt kontaktu
        const newComment = {
            id: Date.now(),
            gender,
            name,
            email,
            phone,
            commentText
        };
        // zapisuje nowy kontakt
        saveComment(newComment);
        // resetuje formularz kontaktowy
        contactForm.reset();
    });
    // funkcja zapisujaca kontakt w local storage
    function saveComment(comment) {
        // pobiera istniejące kontakty z localStorage lub inicjuje pusta tablice
        let comments = JSON.parse(localStorage.getItem('comments')) || [];
        // dodaje nowy kontakt do tablicy
        comments.push(comment);
        // zapisuje zaktualizowana tablice kontaktow do localStorage
        localStorage.setItem('comments', JSON.stringify(comments));
    }
    // funkcja walidujaca formularz
    function validateForm() {
        // pobiera element input imienia
        const nameInput = document.getElementById('name-3');
        // pobiera element input adresu e-mail
        const emailInput = document.getElementById('email-3');
        // pobiera element input numeru telefonu
        const phoneInput = document.getElementById('phone-3');
        // sprawdza poprawnosc imienia
        if (!nameInput.checkValidity()) {
            alert('Proszę podać poprawne imię.');
            return false;
        }
        // sprawdza poprawnosc adresu e-mail
        if (!emailInput.checkValidity()) {
            alert('Proszę podać poprawny adres e-mail.');
            return false;
        }
        // sprawdza poprawnosc numeru telefonu
        if (!phoneInput.checkValidity()) {
            alert('Proszę podać poprawny numer telefonu (9 cyfr bez spacji).');
            return false;
        }
        // zwraca true, jesli formularz jest poprawny
        return true;
    }
});