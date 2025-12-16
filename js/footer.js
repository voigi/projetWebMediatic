// On sélectionne l'élément du pied de page dans le HTML.
const footer = document.querySelector("footer");

// Cette fonction vérifie si le pied de page doit être visible ou non.
function updateFooterState() {
  // Calcule la hauteur totale de la page web.
  const documentHeight = document.documentElement.scrollHeight;
  // Récupère la hauteur de la fenêtre du navigateur.
  const windowHeight = window.innerHeight;
  // Regarde à quelle position on a fait défiler la page.
  const scrollTop = window.scrollY;

  // Vérifie si la page a une barre de défilement.
  const hasScroll = documentHeight > windowHeight + 5;
  // Vérifie si on est arrivé tout en bas de la page.
  const isBottom = scrollTop + windowHeight >= documentHeight - 5;

  // Si la page n'a pas de barre de défilement ou si on est en bas,
  if (!hasScroll || isBottom) {
    // on rend le pied de page visible.
    footer.classList.add("enabled");
  } else {
    // Sinon, on le cache.
    footer.classList.remove("enabled");
  }
}

// On exécute la fonction quand on fait défiler la page.
window.addEventListener("scroll", updateFooterState);
// On exécute aussi la fonction si on change la taille de la fenêtre.
window.addEventListener("resize", updateFooterState);
// Et on l'exécute une fois que la page est complètement chargée.
window.addEventListener("load", updateFooterState);
