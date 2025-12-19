## Contexte rapide

Ce dépôt est un site web statique (HTML/CSS/JS) pour une plateforme d'e‑learning. Il n'y a pas de framework côté serveur, pas de build step visible, et les pages sont rendues directement depuis les fichiers HTML dans la racine du projet.

Principaux fichiers/répertoires à connaître
- `index.html`, `contact.html`, `cours.html`, `ia.html`, `team.html` : pages HTML principales.
- `css/style.css` : feuille de style principale (globales, layout, cards, footer animé).
- `css/styles_s.css` : styles supplémentaires (page équipe, cartes flip, typographie).
- `js/footer.js` : logic d'apparition/masquage du footer (scroll/resize/load).
- `js/video.js` : logique minimale de la vidéo d'intro (reset quand la vidéo se termine).
- `images/`, `video/` : assets statiques (images, vidéos). Vérifier chemins relatifs quand on modifie les pages.

## Pourquoi ces choix structurels
- Projet simple et statique : facilité de déploiement (copiage des fichiers sur un serveur web ou un hébergement statique).
- Pas de moteur de templates : la navigation et le header/footer sont dupliqués dans chaque page HTML. Toute modification du header/navigation doit être propagée manuellement sur toutes les pages.

## Flux de données & intégrations
- Aucune API ou backend détectés. Les formulaires (ex. `contact.html`) utilisent `action="#"` — il n'y a pas d'envoi serveur configuré.
- Fonts / icônes sont chargés depuis des CDN (Font Awesome, Phosphor). Les pages dépendent de la disponibilité des CDN.

## Bonnes pratiques spécifiques au dépôt (concrètes)
- Navigation : le `nav` est hard-coded dans chaque page. Exemple : modifier `index.html` ne mettra pas à jour `team.html` automatiquement. Rechercher et éditer toutes les pages quand on change la nav.
- Vidéo d'accueil : le fichier `index.html` contient `<video id="videoIntro" src="video/ed_tech.mp4" ...>` et `js/video.js` attend un élément `#videoIntro` (éviter de renommer l'ID sans mettre à jour le JS).
- Footer animé : `footer.js` sélectionne `document.querySelector("footer")`. Si vous changez l'ID ou la structure du footer, adaptez le JS.
- Modals & ancrages : les cartes de cours utilisent des ancres (`href="#course1-modal"`) + éléments `.modal` visibles via CSS. Ne pas convertir ces liens en routes sans adapter le comportement.

## Workflow développeur (rapide & concret)
- Prévisualisation locale (aucun build requis) :
  - Avec Python (serveur simple) :
    - `python3 -m http.server 8000` depuis la racine du projet puis ouvrir `http://localhost:8000`.
  - Ou utiliser une extension "Live Server" dans VS Code.
- Tester vidéos : placez les fichiers `.mp4` dans `video/` et vérifiez `js/video.js` et les attributs `playsinline controls` dans le `<video>`.
- Tester responsive : utiliser les outils de dev du navigateur (Chrome/Firefox) — la meta viewport est déjà présente.

## Patterns de code observés (à répliquer ou maintenir)
- CSS : `css/style.css` est la source principale. Utilisez les classes existantes (`card`, `course-card`, `.rowCard`, `.footer-hint`) quand vous ajoutez du markup pour rester cohérent.
- Layout : header/nav en `nav`, contenu principal dans `#page`, footer en `footer` (fixé/animé via CSS + JS).
- Animations/Interactions : préférer la logique légère côté client (ex. `footer.js`, `video.js`) et conserver la séparation : JS minimal pour interactions, CSS pour styles.

## Exemples concrets (quelques cas d'usage)
- Changer le logo de navigation : mettre la nouvelle image dans `images/` et modifier le `src` dans chaque page HTML (ex. `index.html`, `contact.html`, `cours.html`, `ia.html`, `team.html`).
- Ajouter un nouveau cours : copier la structure d'une `course-card` dans `cours.html`, ajouter l'image dans `images/` et, si nécessaire, une section `.modal` avec l'ID correspondant.
- Rendre le formulaire opérationnel : remplacer `form action="#"` par l'URL du backend et gérer CORS/validation côté serveur (pas de backend fourni ici).

## Contrat rapide pour les changements demandés aux agents
- Inputs : fichiers HTML/CSS/JS modifiés (chemins relatifs), nouveaux assets placés dans `images/` ou `video/`.
- Outputs attendus : pages statiques fonctionnelles dans un serveur HTTP local, pas d'étapes de build.
- Modes d'échec : vidéo manquante (404), footer qui ne s'affiche pas si DOM structure modifiée, dégradation si CDN inacessible.

## Edge cases à vérifier lors d'un fix
- Chemins relatifs cassés quand on bouge des pages dans des sous-dossiers.
- Vidéos lourdes : vérifier encodage et formats (mp4 recommandé) et test sur mobile.
- CSS `position: fixed` du footer peut couvrir du contenu — tester sur différentes résolutions.
- Modifications de navigation doivent être répliquées sur toutes les pages (pas de template automatique).

## Notes pour l'agent
- Quand l'utilisateur demande de modifier le site, vérifiez toujours : existe-t-il une duplication (nav/footer) à mettre à jour sur plusieurs fichiers ? Si oui, mentionnez-le et proposez d'appliquer la modification partout.
- Proposez des améliorations non risquées en PR séparée (ex. factoriser le header/footer via un simple include côté build si le mainteneur veut évoluer vers une génération statique), mais ne les imposer pas sans validation humaine.
- Indiquez explicitement les fichiers modifiés dans la PR et comment tester localement (ouvrir `http://localhost:8000` après `python3 -m http.server 8000`).

---
Si une section est incomplète ou si vous voulez que j'ajoute des exemples de PR (diff courts) ou un script simple pour synchroniser le header entre pages, dites‑le et je l'ajoute.
