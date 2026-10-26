# Portfolio de Yacine Ben Omrane

Site personnel publié sur [benomrane-yacine.com](https://benomrane-yacine.com) avec GitHub Pages.

Consultant junior en cybersécurité en alternance chez Magellan, étudiant en BUT Réseaux & Télécoms parcours cybersécurité, spécialisé en sécurité Microsoft : Purview, Defender XDR, Intune et Entra ID.

## Structure

```
index.html, css/, js/main.js   Version en ligne, compactée (générée, ne pas modifier à la main)
js/data.js                     TOUT le contenu : postes, formation, compétences, certifications, projets
js/vendor/                     GSAP, ScrollTrigger et Lenis, hébergés sur le site
assets/                        Photo, favicon et polices
_src/                          Sources lisibles (non publiées sur le site)
CNAME                          Nom de domaine pour GitHub Pages
*.html (autres)                Redirections des anciennes adresses vers la page d'accueil
```

Le dossier `_src/` commence par un tiret bas : GitHub Pages ne le publie pas. Les sources lisibles restent dans le dépôt, mais pas sur le site.

## Modifier le contenu

Tout se passe dans `js/data.js`, directement à la racine, sans étape de construction :

- **Ajouter un poste** : ajoute un objet en tête de `experiences` (un modèle est en commentaire).
- **Ajouter une formation** : ajoute un objet dans `formations`.
- **Ajouter une certification** : ajoute une ligne dans `certifications.officielles`, `cisco` ou `learn`. Le champ `lien` accepte une URL de vérification (Credly, Microsoft Learn).
- **Changer la photo** : remplace `assets/yacine.jpg` et `assets/yacine.webp` en gardant les mêmes noms.

## Modifier le design ou les animations

Les fichiers à modifier sont dans `_src/` (`index.html`, `css/style.css`, `js/main.js`). Ensuite :

```
cd _src
npm install
npm run build
```

La construction compacte le code et ajoute un numéro de version à chaque fichier, pour que les visiteurs reçoivent toujours la dernière version au lieu d'une copie en cache.

## Vie privée

Le site ne collecte aucune donnée : pas de cookie, pas de mesure d'audience, pas de formulaire. Les polices et les bibliothèques sont hébergées sur le site, le navigateur du visiteur ne contacte aucun service tiers (Google Fonts, CDN…). Seul GitHub Pages, l'hébergeur, conserve des journaux techniques de connexion, comme tout hébergeur.

## Licences

- GSAP : licence standard GreenSock, gratuite
- Lenis : MIT (`js/vendor/LICENSE-lenis.txt`)
- Bricolage Grotesque, Atkinson Hyperlegible Next : SIL Open Font License 1.1 (`assets/fonts/LICENSE.txt`)
