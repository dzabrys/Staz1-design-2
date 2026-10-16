# Wielkie Gry Planszowe — Design 2

Osobna wersja projektu v61, opublikowana niezależnie od repozytorium Staz1.

Strona: https://dzabrys.github.io/Staz1-design-2/

28 głównych stron, lokalne fonty, obrazy WebP i SVG, responsywny układ oraz animacje respektujące prefers-reduced-motion. Treść i nawigacja działają również bez JavaScript. Wersja porównawcza ma noindex,follow, aby nie konkurować w wyszukiwarkach z główną witryną.

Kompozycja zdjęć strony głównej: osobne pola obrazu w kaflach, pełniejszy kadr hero i tekst pod zdjęciem. Style: image-composition.css; markup: homeRefreshed w website-refresh.js.

## Warianty

- /1/ — alternatywa hero
- /2/ — rozwijany katalog
- /3/ — alternatywny formularz

## Budowanie i sprawdzanie

```sh
npm ci
npm run build
npm run check:offer
npm run check:inquiry
npm run check:interaction
```

Domyślny SITE_URL: https://dzabrys.github.io/Staz1-design-2/. Wygenerowane statyczne pliki są gotowe do publikacji przez GitHub Pages z gałęzi main, katalog główny.

Ceny opisane jako poglądowe są przykładami. Formularz korzysta z dotychczasowego endpointu Formspree; publikacja nie zmienia konta ani konfiguracji odbiorcy.
