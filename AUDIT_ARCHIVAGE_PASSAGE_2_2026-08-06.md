# Audit d’archivage — Passage 2

Date : 6 août 2026
Dépôt : `BEAUVILLE/astou-boutique`

## Objet

Nettoyage conservateur de faux médias présents dans le dossier `assets/astou`.

## Constat

Les quatre fichiers suivants :

- `assets/astou/draps/drap-2-places-saly.jpg`
- `assets/astou/linge-maison/pack-villa-residence-saly.jpg`
- `assets/astou/peignoirs/peignoir-homme-saly.jpg`
- `assets/astou/serviettes/serviette-blanche-6500.jpg`

avaient exactement le même blob Git :

`9daeafb9864cf43055ae93beb0afd6c7d144bfa4`

Chaque fichier pesait 5 octets et contenait uniquement :

```text
test
```

Aucune référence à ces quatre noms n’a été trouvée dans les fichiers indexés du dépôt.

## Action proposée

Retrait de ces quatre faux fichiers image de la branche active.

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
- tous les autres fichiers du dépôt
