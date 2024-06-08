// skrypt do wczytywania asynchronicznie linku z filmem youtube z pliku JSON
document.addEventListener('DOMContentLoaded', function() {
    
    // uzywam funkcji fetch, aby pobrac plik videos.json z serwera
    fetch('videos.json')
        .then(response => {
            // konwertuje odpowiedz z serwera do formatu JSON
            return response.json();
        })
        .then(data => {
            // przechwytuje dane z pliku JSON, ktore zawieraja link do youtube
            const youtubeLink = data.youtubeLink;
            
            // tworze element iframe, aby osadzic wideo z youtube na stronie
            const iframe = document.createElement('iframe');
            
            // ustawiam szerokosc iframe na 600 pikseli (zalecenia z template'u)
            iframe.setAttribute('width', '600');
            
            // ustawiam wysokosc iframe na 400 pikseli (zalecenia z template'u)
            iframe.setAttribute('height', '400');
            
            // ustawiam atrybut src iframe na link do youtube z pliku JSON
            iframe.setAttribute('src', youtubeLink);
            
            // ustawiam tytul iframe na 'YouTube video player'
            iframe.setAttribute('title', 'YouTube video player');
            
            // ustawiam ramke iframe na 0, aby usunac obramowanie
            iframe.setAttribute('frameborder', '0');
            
            // ustawiam atrybut allow z wartosciami pozwalajacymi na rozne akcje w iframe
            iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
            
            // ustawiam polityke referrer dla iframe
            iframe.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
            
            // ustawiam atrybut allowfullscreen, aby pozwolic na pelnoekranowy tryb
            iframe.setAttribute('allowfullscreen', '');
            
            // dodaje iframe do elementu o id 'youtube-container' na stronie
            document.getElementById('youtube-container').appendChild(iframe);
        })
        .catch(error => {
            // w przypadku bledu podczas pobierania lub przetwarzania JSON, wyswietlam blad w konsoli
            // przydatne do testowania
            console.error('blad z fetchowaniem filmiku yt na strone:', error);
        });
});
