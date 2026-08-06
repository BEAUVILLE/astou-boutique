# Audit d’archivage — Passage 2

Date : 6 août 2026
Dépôt : `BEAUVILLE/astou-boutique`

## Objet

Remplacement conservateur de faux médias présents dans le dossier `assets/astou` par des visuels d’illustration provisoires destinés à embellir les pages produits.

## Constat initial

Les quatre fichiers suivants :

- `assets/astou/draps/drap-2-places-saly.jpg`
- `assets/astou/linge-maison/pack-villa-residence-saly.jpg`
- `assets/astou/peignoirs/peignoir-homme-saly.jpg`
- `assets/astou/serviettes/serviette-blanche-6500.jpg`

avaient exactement le même blob Git et contenaient uniquement `test`. Ce n’étaient pas de vraies images.

## Action réalisée

- retrait des quatre faux médias ;
- création de quatre familles de visuels provisoires : draps, serviettes, peignoirs, villas et résidences ;
- déploiement de ces visuels sur les chemins déjà prévus par les six pages produits ;
- conversion en JPEG web léger pour préserver la vitesse de chargement.

## Transparence commerciale

Ces images sont des visuels d’illustration provisoires. Elles ne prétendent pas représenter exactement le stock réel d’Astou Boutique. Les photos réelles fournies par Astou les remplaceront progressivement.

## Protection

L’état antérieur reste conservé dans :

`archive/pre-nettoyage-2026-08-06`

et dans l’historique Git.

## Éléments explicitement préservés

- `index.html`
- toutes les pages éditoriales
- `CNAME`
- carte de visite Astou Boutique
- affiche du clip
- workflow de signature
- `.digiy-card-signatures.json`
- prix, contacts et liens WhatsApp
