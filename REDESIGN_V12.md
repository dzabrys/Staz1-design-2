# Oferta — lokalny wariant v12

14 października 2026. Baza: aktualny serwis dzabrys/Staz1, commit `8f6dc36cddfe815be490c51630d62c9e8680c7cb`.

Podgląd: http://127.0.0.1:4180/Staz1/oferta.html

## Kierunek użytkownika

Nagłówek „Wybierz swoją grę”, a pod nim dwa pionowe prostokąty: „Wielkie gry planszowe” i „Inne gry customowe”. Minimalistyczny, nowoczesny wygląd premium, z większą ilością wolnej przestrzeni. Dalsze widoki kategorii i produktów będą dopracowywane według kolejnych wskazówek użytkownika.

## Wykonane zmiany

- Węższa, wyśrodkowana sekcja wyboru i większe marginesy.
- Dwa pionowe kafle ze zdjęciem u góry i tekstem na białej powierzchni poniżej.
- Delikatna ramka, mały promień narożników i subtelny cień.
- Spokojniejsza typografia, krótkie opisy oraz okrągła strzałka.
- Dyskretny efekt najechania i widoczny fokus klawiatury. Ograniczenie ruchu respektowane w CSS.
- Na telefonach kafle układają się pionowo. Treść pozostaje dostępna bez JavaScript.
- Wspólny nagłówek, logo i paleta marki zachowane. Nowe reguły CSS dotyczą wyłącznie `.page-offer`.

Źródła zmiany: `offer-templates.js` (funkcja `offerLanding`) i `offer-landing.css`. Generator w `tools/build.cjs` dołącza nowy arkusz i domyślnie buduje kopię lokalną z `noindex,follow`.

## Kontrola

- Istniejąca kontrola projektu: 28 stron, 899 lokalnych odnośników/zasobów, dwie kategorie i 20 adresów produktów — wynik PASS.
- Sprawdzono układ przy 320, 390, 768, 1366 i 1920 px: brak poziomego przepełnienia i uciętych nagłówków/opisów. Kafle są pionowe w każdym widoku.
- Oba kafle prowadzą do istniejących katalogów.
- Zachowano jeden H1, statyczny HTML, metadane i dane strukturalne. Kopia nie jest przeznaczona do indeksowania.

Nie wykonano publikacji ani zapisu do GitHuba. Źródłowy klon i wcześniejsze lokalne wersje są zachowane. Uruchomienie podglądu: `node tools/serve.cjs`.

## Kafle gier — kolejna poprawka

Zgodnie z kolejną wskazówką użytkownika: gry są osobnymi białymi kartami na białym tle. Jedna ramka i delikatny cień obejmują zdjęcie, nazwę, opis oraz link. Karty mają równe wysokości w każdym rzędzie i dyskretnie unoszą się przy najechaniu. Cała karta pozostaje odnośnikiem. Plansze klasyczne są widoczne w całości.

Wspólny komponent katalogu jest używany w obu kategoriach i sekcjach „Odkryj także”. Sprawdzono szerokości 320–1920 px; długie nazwy i opisy łamią się wewnątrz kart. Zapis poprzedniego CSS: `backups/przed-kaflami-gier`. Zmiana pozostaje lokalna.

## Kategorie z napisami na zdjęciach

Na kolejną prośbę użytkownika zdjęcia wypełniają cały pionowy kafel kategorii na `oferta.html`. Nazwa, opis i strzałka są umieszczone bezpośrednio na obrazie, z granatowym gradientem pod białym tekstem. Napisy pozostają zwykłym tekstem HTML. Zachowano większe marginesy wokół dwóch kategorii, mobilny układ pionowy, fokus oraz ograniczenie ruchu. Poprzedni układ zapisano w `backups/przed-kategoriami-na-zdjeciach`. Zmiany są lokalne.

## Aktualna korekta — miękkie karty i dopasowanie do ekranu

Zgodnie z korektą użytkownika główne kafle są większe i mają promień 26 px, miękki cień, tytuły u góry po lewej i biały przycisk na dole. Usunięto zbędne opisy i etykiety wewnątrz tych dwóch kafli. Zdjęcie wypełnia całą kartę, a kliknięcie w jej środek otwiera odpowiednią kategorię — oba przejścia sprawdzono w przeglądarce.

Oferta mieści się bez przewijania w 1280 × 720, 1366 × 768 i 1920 × 1080. Sprawdzono również telefony 320 i 390 px; tekst i przyciski mieszczą się w kartach. Na telefonie treść przewija się naturalnie.

Karty katalogu mają promień 20 px, delikatną wewnętrzną krawędź zamiast niebieskiej ramki, rozproszony cień i jasny przycisk „Poznaj grę”. Układ siatki jest zachowany. Długie tytuły i opisy nie wychodzą poza karty.

Kopia poprzedniego stanu: `backups/przed-smooth-v13`. Wyniki kontroli: `../smooth-v13-kontrola.json`. Zmiany nie zostały wysłane na GitHuba.

## Powiększenie kafli — v14

Usunięto dopisek pod H1. Zwiększono maksymalną szerokość sekcji do 1800 px, zwężono marginesy i zmniejszono H1. Kafle są szersze i wyższe; na komputerach 1366 × 768 i 1920 × 1080 całość mieści się w ekranie. Na telefonach 320 i 390 px brak poziomego przepełnienia, tekst oraz przyciski mieszczą się w kartach. Kontrola 28 stron i 899 odnośników: PASS. Backup: backups/przed-powiekszeniem-v14. Ta poprawka pozostaje lokalna; publiczna wersja nadal pochodzi z commita d6f49a5.


## Korekta proporcji v15

Zgodnie ze sprostowaniem użytkownika karty mają rosnąć pionowo, zachowując umiarkowane białe marginesy po bokach. Szerokość sekcji ograniczona do 1440 px, a siatka zależy też od wysokości ekranu. Zwężono kafle i zwiększono dostępną dla nich wysokość przez mniejsze odstępy. Podgląd: ../oferta-v15-pionowe-kafle.png. Weryfikacja na komputerze: cały widok mieści się bez przewijania; telefon: tekst i przyciski w kartach, naturalne przewijanie. Poprawka tylko lokalna.


## Strona główna v16 — mniejsze kafle

Dodano home-refinement.css z regułami dotyczącymi wyłącznie page-home. Główna sekcja ma maksymalnie 1640 px i większe boczne marginesy; udział lewej kolumny zmniejszono z 43% do 38%. Na wyższych ekranach kafle zajmują 92% wysokości sekcji, z odstępami nad i pod nimi. Dopasowano napisy i przyciski. Białe tło i stopka. Sprawdzono 1280 × 720: całość mieści się bez przewijania, przyciski nie wychodzą z kart. Telefon 390 × 844: brak poziomego przepełnienia, wszystkie przyciski mieszczą się w kartach. 28 stron / 899 odnośników: PASS. Backup: backups/przed-glowna-v16. Zmiany tylko lokalne.


## Szkoły v18 — dopasowanie do jednego ekranu

Dodano school-refinement.css z regułami tylko dla strony Szkoły na dużych ekranach. Podniesiono polecane gry, zmniejszono wysokość sekcji wstępnej, odstępy w kartach i przed stopką. Opis oferty ma szerszą kolumnę, zdjęcia w kartach lekko bardziej panoramiczne. Zachowano treść, metadane i linki. Sprawdzono: 1920 × 1080 (stopka do 1004 px), 1920 × 944 (stopka do 925 px), telefon 390 × 844 bez poziomego przepełnienia. Kontrola 28 stron / 899 odnośników: PASS. Backup: backups/przed-szkolami-v18. Tylko lokalnie.


## Korekty v19 — tło i odstępy

Szkoły: białe tło strony i stopki, błękit tylko w polecanych grach. Dodatkowo skrócono odstępy dla wysokości 850–980 px. 1920 × 900: stopka kończy się na 862 px, brak przewijania; 1920 × 1080: 1004 px. Oferta: przerwa pod H1 28 px, między kartami 40 px; karty 612 px szerokości zamiast 658 px przy 1920 × 1080. Zachowano pionowe proporcje i pełną klikalność. Sprawdzono też ofertę 1280 × 720 bez przewijania oraz telefon 390 × 844 bez poziomego przepełnienia. Backup: backups/przed-odstepami-v19. Tylko lokalnie. Wyniki: ../v19-kontrola.json.


## Oferta v20 — dopasowanie stylistyki do strony głównej

Zachowano pionowe karty, marginesy, odstępy i pełną klikalność. Usunięto ciemną nakładkę; jasny gradient pozostaje w górnej części pod napisami. Nazwy są granatowe, mniejsze, z pomarańczowym podkreśleniem. Przyciski mają kolor, krój i strzałki jak na stronie głównej. Subtelniejszy cień, promień 24 px. Sprawdzono 1920 × 1080 i 1280 × 720 bez przewijania oraz telefon 390 × 844 bez poziomego przepełnienia. Nagłówki i przyciski mieszczą się w kartach. 28 stron / 899 odnośników: PASS. Backup: backups/przed-jasna-oferta-v20. Zmiana lokalna. Podgląd: ../oferta-v20-styl-marki.png; kontrola: ../oferta-v20-kontrola.json.


## Oferta v22 — lokalny wariant glass

Na prośbę użytkownika dodano delikatne szkło tylko pod nazwami: biel 55%, backdrop-filter blur(8px), cienka jasna krawędź, promień 18 px. Zdjęcia poza obszarem tytułów pozostają ostre i bez gradientu. Sprawdzono działanie blur w przeglądarce oraz dopasowanie na telefonie 320 px. Backup bez szkła: backups/przed-glass-v22. Tylko lokalnie.


## Oferta v24 — białe nagłówki

Zrealizowano wybraną opcję 1: nazwa na osobnym białym nagłówku, fotografia poniżej i pomarańczowy przycisk na dole. Usunięto szkło i rozmycie. Zachowano dwie pionowe, w całości klikalne karty. Sprawdzono 1920 × 1080 oraz 1280 × 720 bez przewijania; telefon 320 px bez poziomego przepełnienia. Nazwy i przyciski mieszczą się w kartach. Kontrola 28 stron / 899 odnośników PASS. Backup: backups/przed-bialym-naglowkiem-v24. Zmiana tylko lokalna. Podgląd: ../oferta-v24-biale-naglowki.png.


## Oferta v25 — miękkie łączenie nagłówka i fotografii

Usunięto pomarańczowe podkreślenia nazw. Po przejrzeniu przykładów kart wybrano wąską maskę przejścia do bieli przy górnej krawędzi zdjęcia: 56 px na dużym ekranie, 40 px na telefonie i niższym ekranie. Reszta fotografii bez rozmycia i zmiany barw. Inspiracja: https://www.smashingmagazine.com/2021/02/responsive-image-effects-css-gradients-aspect-ratio/ ; dokumentacja: https://web.dev/articles/css-masking . Zachowano czytelne nazwy na białym tle i pełną klikalność. Kontrola 1920 × 1080 bez przewijania, telefon 390 px bez poziomego przepełnienia, brak podkreśleń w computed CSS i działająca maska. Backup: backups/przed-miekkim-laczeniem-v25. Tylko lokalnie.


## Alternatywa hero /1/ — publikacja osobnej kopii

Na wyraźne polecenie użytkownika utworzono osobny wariant strony głównej w katalogu 1. Bazą jest aktualny lokalny układ z mniejszymi lewymi kaflami i wyrównanym prawym banerem. Od 1201 px sekcja i stopka są węższe o 10%: przy 1920 px szerokość 1476 px, marginesy 222 px. 1920 × 1080 i 1280 × 720 bez przewijania, telefon 390 px bez poziomego przepełnienia. Oddzielny CSS, noindex i canonical do głównej; nawigacja prowadzi do głównego serwisu. Sprawdzono 37 publicznych odnośników/zasobów. Publikacja obejmuje tylko 1/index.html, 1/site.css i 1/README.md. Commit 0609d1840607d3f0f1a3b48c188b44713cef3ce9. Publiczny adres: https://dzabrys.github.io/Staz1/1/ . Generator: work/build-hero-alternative-v1.cjs. Główna strona i lokalne poprawki innych podstron nie są częścią publikacji.


## Alternatywa /1/ — mniejszy navbar

Wyłącznie w alternatywie hero navbar ma szerokość taką jak sekcja główna, wysokość 92 px, logo maks. 300 px, ikony 34 px i etykiety 13–15 px. Zmiana dotyczy szerokości od 1201 px; nawigacja na telefonie i pozostałych podstronach zachowana. Sprawdzono 1920 × 1080 oraz 1280 × 720: brak uciętych etykiet i przewijania. Backup: backups/przed-navbar-alternatywa-1. Zapisano na GitHubie jako commit 758824fdf182490e9c486ff2a795b92478d13b75; publikacja obejmuje tylko katalog 1.


## Cztery propozycje nagłówków oferty

Powrót do normalnej oferty; przygotowano cztery niezależne lokalne pliki w oferta-propozycje/: a.html — kompaktowy biały pasek; b.html — granatowy pasek z białymi nazwami; c.html — mała nieprzezroczysta biała etykieta na fotografii; d.html — nazwa nad osobnym zaokrąglonym zdjęciem. W żadnym wariancie nie ma szkła ani podkreśleń. Obecna oferta.html i wariant hero /1/ pozostają zachowane. Sprawdzono cztery warianty w 1920 × 1080 bez przewijania oraz telefon 320 px bez poziomego przepełnienia i uciętych nazw. Screeny: ../oferta-opcja-{a,b,c,d}-calosc.png. Tylko lokalnie, użytkownik wybierze wariant. Generator: work/build-offer-header-options.cjs.


## Publikacja bieżącej strony — ee8b39e

Użytkownik wybrał duże białe napisy na zdjęciach zgodnie ze screenem. Przywrócono ten układ w głównej ofercie, zachowując odstępy, pomarańczowe przyciski i pełną klikalność. Opublikowano również mniejsze kafle strony głównej, wyrównany baner, dopracowaną stronę Szkoły i cztery propozycje nagłówków w osobnym katalogu oferta-propozycje/. Alternatywa hero /1/ jest zachowana. Publiczne strony mają index,follow, podglądy propozycji noindex i canonical do oferty. Kontrola 28 stron / 899 odnośników PASS; arkusz publiczny identyczny z lokalnym podglądem; napisy i przyciski mieszczą się na telefonie 320 px. Commit: ee8b39e963c0dcb97559fe52573e7eda0c473119.

