# Text font lab - second selection

Ten new upright sans-serif families replace the previous selection in the
font-lab dropdown. All files come unmodified from the official google/fonts
repository (ofl directories) on 2026-10-11. Original OFL.txt and METADATA.pb
files are retained beside each family. All ten use SIL Open Font License 1.1.

## Active selection

- Wix Madefor Text: https://www.daltonmaag.com/portfolio/custom-fonts/wix-madefor.html
- TikTok Sans: https://github.com/tiktok/TikTokSans
- Mulish: https://fonts.google.com/specimen/Mulish
- Nunito Sans: https://fonts.google.com/specimen/Nunito+Sans
- Rubik: https://fonts.google.com/specimen/Rubik
- Exo 2: https://fonts.google.com/specimen/Exo+2
- Montserrat: https://fonts.google.com/specimen/Montserrat
- Raleway: https://fonts.google.com/specimen/Raleway
- M PLUS 1p: https://fonts.google.com/specimen/M+PLUS+1p
- Overpass: https://fonts.google.com/specimen/Overpass

The brief favors more open, non-condensed text companions to Ferro Grotesk.
Proportions differ between families; compare actual Russian text rather than
assuming all have identical width. Width axes remain at their native normal
defaults, with no CSS stretching or extra tracking. Rethink Sans was rejected
by the audit because the downloaded file lacks Russian characters.

Adobe Fonts search was consulted for a Cyrillic sans-serif cross-check
(Raleway returned among the results). Download and website licensing come
from each family's own open-font files, not an Adobe subscription.

## Reproduce and verify

Run tools/fetch_text_fonts.ps1 to download the official files and licences.
Run python tools/audit_text_fonts.py to inspect them and print manifest JSON.
The audit draws every Russian letter including Yo, digits, ASCII hyphen and
basic punctuation, rejecting missing or blank outlines. The manifest lists
real OS/2 weight classes or variable ranges, including weight 1000 where
available. M PLUS 1p Thin has an OS/2 weight of 250.

Only the lab preview changes. Default scope is descriptive paragraphs and header menu; the
optional scope includes menu, search and other interface text. All headings
stay Ferro Grotesk Medium 500. Font, weight, scope and subtitle size (12/14/16)
persist in the URL. Baseline comparison restores native site styles:
Montserrat Regular 400 for body/UI and Ferro Grotesk Medium 500 for headings.

The previous files remain local but are not in the dropdown. Ferro Grotesk
is still an evaluation font requiring a web licence before publication.
Do not deploy the Ferro trial files.
