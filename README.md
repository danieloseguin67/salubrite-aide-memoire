# Salubribe-aide-memoire: référence rapide sur la salubrité des aliments

Une application Angular 21 réactive avec des résumés en français et en anglais
du guide québécois de l'hygiène et de la salubrité alimentaire, édition 2018.

## Exécuter localement

Nécessite Node.js 22.12+ (Node 22.20 a été utilisé) et npm.

```powershell
npm install
npm start
```

Ouvrez http://localhost:4200. Aucune API, aucun compte, aucune police distante ni
service tiers n'est requis.

## Fonctionnalités

- Barre latérale sur ordinateur, cartes en deux colonnes sur tablette et une
  seule colonne sur téléphone.
- Basculement de langue français/anglais, y compris le contenu de référence
  traduit.
- Recherche insensible à l'accent dans les deux langues, les étapes et le
  tableau de cuisson.
- Catégories, instructions extensibles et liens vers les pages du PDF source.
- Favoris et langue enregistrés dans le stockage local de ce navigateur. Les
  échecs de stockage sont signalés; les préférences continuent ensuite en mémoire
  pour la visite en cours.
- L'impression inclut tous les détails des cartes actuellement filtrées. Réinitialisez
  les filtres avant l'impression pour inclure toutes les cartes.
- Contrôles accessibles au clavier, lien d'évitement et indicateurs de focus
  visibles.

## Source et sécurité

Le contenu dans [guide.ts](src/app/guide.ts) est un résumé original, et non une
transcription complète ni une traduction officielle. Chaque carte indique les pages
source. Les températures de cuisson et les limites de refroidissement ont été vérifiées
à partir des tables numérisées. Le [source.pdf](source.pdf) original est servi tel quel
par la configuration des actifs Angular et demeure la source autoritaire pour ces
résumés.

Cette application est un outil de référence, et non une formation, un conseil
médical, une certification de sécurité ni un journal de conformité. La source
date de 2018 : confirmez les règlements et les procédures d'entrepôt en vigueur
avec votre superviseur, en particulier pour l'étiquetage, l'exclusion des
personnes malades et les processus à risque plus élevé. Les traductions en anglais
sont non officielles.

Le PDF est inclus dans le build. Avant toute publication publique, confirmez que
vous avez l'autorisation de distribuer le document fourni. Les préférences sont
stockées uniquement sur cet appareil ; la suppression du stockage du navigateur
les supprime.

Il n'y a pas de service worker hors ligne : une page déjà chargée peut filtrer
son contenu de référence intégré sans requêtes supplémentaires, mais la réouverture
de l'application et l'ouverture des pages PDF exigent une connectivité.

## Valider et construire

```powershell
npm test -- --watch=false
npm run build
```

Les fichiers de production sont générés dans `dist\salubrite-des-aliments\browser`.
Servez-les à l'aide d'un serveur web statique. Pour y accéder depuis un téléphone
sur un réseau local fiable, exécutez `npm start -- --host 0.0.0.0`, autorisez
l'accès firewall approprié, puis ouvrez `http://YOUR-PC-LAN-IP:4200` sur le
portable. N'exposez pas le serveur de développement à internet public.

## Déploiement sur GitHub Pages

Le dépôt inclut un workflow GitHub Actions qui construit l'application Angular et
la publie sur GitHub Pages. Poussez vers la branche `main` ou lancez le workflow
depuis GitHub Actions pour effectuer le déploiement.

La compilation utilise une base URL associée au dépôt, de sorte que l'application
fonctionne correctement à l'adresse `https://<utilisateur>.github.io/<dossier>/`.

## Mettre à jour le guide

Mettez à jour les deux langues, les lignes de cuisson, les références de pages
et les tests lorsque la source change. Les liens vers les pages du PDF utilisent
des pages PDF physiques numérotées à partir de 1 ; certains lecteurs PDF mobile
peuvent ne pas respecter le fragment de page. Les numéros de page imprimés du guide
correspondent aux pages PDF référencées dans cette édition.
