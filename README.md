<div align="center">

# Hadi.

**Personal portfolio of Alanis Hadama, full-stack developer.**

Four languages, light and dark themes, and a site that moves like a single frame.

[**▶ Visit the live site: hadama.com.br**](https://hadama.com.br/)

<br />

<img src="src/assets/images/readme.gif" alt="Portfolio preview" width="820" />

<br />

![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-0AE448?style=for-the-badge&logo=greensock&logoColor=black)
![Three.js](https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=threedotjs&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white)

</div>

---

## About

A portfolio built to feel like one framed screen instead of a long scrolling page. You move between sections (Home, About, Projects and Contact) from the menu, and each one enters and leaves with its own transition.

## Highlights

- **Four languages:** English, Portuguese, French and Japanese, with a language selector and a per-language résumé.
- **Light and dark themes** that apply to every section, including the hover effects.
- **Framed, fixed-screen sections** with navigation through a full-screen menu and entrance/exit animations.
- **Projects:** a media stage with crossfade and a scrolling list; hovering a media blurs it and shows the description.
- **About:** a profile photo that animates on hover, language flag buttons, a bordered education/experience grid and a tech stack with a sliding icon bar.
- **Interaction details:** a custom smooth cursor, outlined text with a gradient hover, an animated background and optional sound.
- **Tested** with Vitest and Testing Library.

## Tech stack

| Area | Tools |
| --- | --- |
| UI | React 19, CSS Modules |
| Build | Vite |
| Animation | GSAP, Motion |
| 3D and effects | Three.js (react-three-fiber, drei) |
| Sound | Howler, use-sound |
| Quality | Vitest, Testing Library, ESLint |

## Project structure

```text
src/
├── components/
│   ├── layout/      # header, section stack, menu, background, cursor
│   └── sections/    # Hero, About, Projects, Contact
├── context/         # language, theme, navigation and sound providers
├── data/            # projects, contacts, résumé files
├── i18n/            # translations (en, pt, fr, ja)
└── assets/          # images, videos, sounds
```

## Contact

- Site: [hadama.com.br](https://hadama.com.br/)
- GitHub: [@hadamas](https://github.com/hadamas)

## License

This repository is a portfolio showcase: the code is public to be read and evaluated, but it is **not** open source. All rights reserved. Copying or reusing it requires written permission. See [LICENSE](LICENSE).
