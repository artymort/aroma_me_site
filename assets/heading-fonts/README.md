# Free heading alternatives to Ferro Grotesk

Official unmodified downloads for a local font fitting on 2026-10-11.
The production site is unchanged. These are alternatives, not exact copies.

- Bounded: https://github.com/churkinvlad/Bounded - SIL OFL 1.1.
- Fixel Display: https://github.com/MacPaw/Fixel - SIL OFL 1.1. Native wdth axis 100, not CSS stretching.
- Unageo: https://github.com/RichardSepsi/Unageo - SIL OFL 1.1. Author's ss01 enabled for eastern Cyrillic shapes, including lowercase ve.
- Wix Madefor Display: https://github.com/google/fonts/tree/main/ofl/wixmadefordisplay - SIL OFL 1.1.
- Evolventa: https://github.com/evolventa/evolventa - GPLv2 / LPPL, original notices retained. Source and complete documentation available from the linked upstream repository. Only 400 and 700 exist, no synthesized Medium.
- Unbounded: https://github.com/google/fonts/tree/main/ofl/unbounded - SIL OFL 1.1. Included as a familiar reference, not presented as a new discovery.

Original copyright notices, license files and upstream READMEs accompany each family.
Reproduce downloads with tools/fetch_heading_fonts.ps1.
Audit with python tools/audit_heading_fonts.py. Output is the local manifest.json.
Every selected file was checked for nonempty Russian alphabet outlines, Yo, digits and basic punctuation.
No font outlines, metadata or family names were modified. The dropdown offers real static weights or variable-axis values only.

font-lab.html now fits headings on the real site in an iframe, including its current mobile homepage. Default is 500 with native site sizes and spacing. Montserrat body text stays unchanged. The former text-font selection is retained under the separate description/menu and full-text modes. The Ferro comparison remains local evaluation only.
