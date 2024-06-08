// funkcja asynchroniczna pobierajaca dane pogodowe dla okreslonej szerokosci i dlugosci geograficznej
async function fetchWeather(latitude, longitude) {
    // wysyla "żądanie" do api open-meteo, aby pobrac prognoze pogody
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max&timezone=Europe/Warsaw`);
    
    // konwertuje odpowiedz z serwera do formatu json
    const data = await response.json();
    
    // zwraca maksymalna temperature z dzisiejszego dnia
    return data.daily.temperature_2m_max[0];
}

// funkcja asynchroniczna aktualizujaca temperature dla okreslonych lokalizacji
async function updateWeather() {
    // definiowanie lokalizacji z ich szerokoscia i dlugoscia geograficzna oraz identyfikatorami elementow html
    // sprawdzalem i te lokalizacje sa w odpowiednich miejscach
    const locations = [
        { name: 'mazury', latitude: 53.8, longitude: 21.5, elementId: 'mazury-temperature' },
        { name: 'zakopane', latitude: 49.3, longitude: 19.95, elementId: 'zakopane-temperature' },
        { name: 'morze baltyckie', latitude: 54.4, longitude: 18.6, elementId: 'baltyk-temperature' }
    ];

    // iterowanie przez lokalizacje i aktualizowanie temperatury
    for (const location of locations) {
        // pobiera temperature dla danej lokalizacji
        const temperature = await fetchWeather(location.latitude, location.longitude);
        
        // aktualizuje tekst odpowiedniego elementu html, aby wyswietlic temperature
        document.getElementById(location.elementId).textContent = `ok. ${temperature}°c`;
    }
}

// wywoluje funkcje updateWeather po zaladowaniu strony, aby zaktualizowac temperature -> wyswietla maksymalna temperature dla danego dnia
// czyli stale aktualizuje co zaladowanie, ale USTAWIA tylko te najwieksza ktora byla
window.onload = updateWeather;
