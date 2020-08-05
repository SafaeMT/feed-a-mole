# Feed a Mole &middot; [![Netlify Status](https://api.netlify.com/api/v1/badges/aeb63e05-d161-4703-8c54-29ca6d41a82b/deploy-status)](https://app.netlify.com/sites/safaemt-feed-a-mole/deploys) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](LICENSE)

> A build to learn project

Jeu interactif dont le but est de nourrir des taupes. Déployé [ici](https://safaemt-feed-a-mole.netlify.app/).

## Developing

### Developed With

- [Parcel.js 1.x](https://parceljs.org/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)

### Prerequisites

[npm](https://nodejs.org/).

### Setting up Dev

Cloner le dépot, installer les dépendances et lancer le serveur de développement:

```shell
git clone https://github.com/SafaeMT/feed-a-mole.git
cd feed-a-mole/
npm ci
npm run dev
```

L'application est maintenant accessible depuis http://localhost:1234.

### Building

```shell
npm run build -- --no-source-maps
```

Enlever `--no-source-maps` pour inclure celles-ci.

## Licensing

[MIT licensed](LICENSE).
