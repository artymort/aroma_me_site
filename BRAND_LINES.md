# Линейки ароматов: проверка источников

В `New Base Aroma/perfumes_full.json` нет поля с линейкой. Прежний фильтр опирался только на пять вручную заданных демонстрационных ароматов; он скрыт до проверки принадлежности каждого аромата.

Линейка - название коллекции или семейства, которое использует сам бренд. Она не равна парфюмерной группе, концентрации или совпадению слов в названии. У некоторых брендов есть два уровня: крупная коллекция и семейство внутри неё. Например, Tom Ford разделяет Signature и Private Blend, а внутри Signature показывает Black Orchid и Grey Vetiver как отдельные коллекции.

| Бренд | Подтверждённые примеры | Официальный источник |
| --- | --- | --- |
| Dior | La Collection Privée, Miss Dior, J'adore, Dior Addict, Poison, Sauvage | https://www.dior.com/en_gb/beauty/fragrance/womens-fragrance/la-collection-privee и https://www.dior.com/en_us/beauty/fragrance/mens-fragrance/la-collection-privee |
| Chanel | Chance, Les Exclusifs de Chanel, Les Eaux de Chanel | https://www.chanel.com/us/fragrance/the-chance-line/c/7x3x5/ и https://www.chanel.com/us/fragrance/exceptional-fragrances/c/7x1x8x66/les-exclusifs-de-chanel/ и https://www.chanel.com/us/fragrance/les-eaux-de-chanel/ |
| Tom Ford | Signature и Private Blend; внутри них могут быть семейства отдельных ароматов | https://www.tomfordbeauty.com/collections/signature и https://www.tomfordbeauty.com/collections/private-blend |
| Dolce&Gabbana | Light Blue, Devotion, The One, Dolce и другие семейства | https://www.dolcegabbana.com/en-us/beauty/light-blue/ и https://boutique.dolcegabbana.com/united-states/las-vegas/c-o-bellagio/las-vegas-bellagio/perfumes |
| Creed | Aventus Collection | https://www.creedfragrance.com/c/fragrances/aventus-collection/ |
| Maison Francis Kurkdjian | Baccarat Rouge 540 Collection | https://www.franciskurkdjian.com/us-en/baccarat-rouge-540-collection/landing-BaccaratRouge540.html |
| Le Labo | Classic Collection (включает Santal 33) | https://www.lelabofragrances.com/classic-collection.html |

Для будущего фильтра нужно хранить проверенное соответствие по ID аромата: `line`, при необходимости `collection`, и URL страницы бренда. Ароматы без подтверждения остаются без линейки. Названия не следует определять простым поиском префикса: у брендов различается структура каталогов, а исторические выпуски могут отсутствовать в текущей продаже.
