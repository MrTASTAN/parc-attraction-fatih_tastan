# Parc d'Attractions - Projet Étudiant
**Auteurs** : Projet collectif - BUT Informatique

## Environnement utilisé
- **Angular** pour le frontend.
- **Flask (Python)** pour le backend.
- **MariaDB** pour la base de données relationnelle.
- **Docker & Docker Compose** pour le conteneurisation et l'orchestration.

---

##  Structure du projet

###  1. Dossier `parc`
Code source de l'application **Angular** (frontend).

- Situé dans `parc/src/app/`
  - `*.component.ts` : composants Angular
  - `*.component.html` : templates HTML
  - `*.component.scss` : styles CSS
  - `*.service.ts` : services appelant l'API
- Lancement via Docker sur [http://localhost:4200](http://localhost:4200)

###  2. Dossier `python`
Code source de l'API backend **Flask**.

- `app.py` : point d'entrée Flask
- `controller/` : routes API pour attractions, avis, utilisateurs
- `request/request.py` : gestion des requêtes SQL
- `sql_file/init.sql` et `create.sql` : création et peuplement des tables
- API accessible via [http://localhost:5000](http://localhost:5000)

### ⚙️ 3. `docker-compose.yml`
Fichier de configuration Docker pour lancer tous les services :

- `web` (Angular)
- `api` (Flask)
- `database` (MariaDB)

---

## 🐳 Démarrage rapide avec Docker

1. Ouvrir un terminal à la racine du projet
2. Lancer les services avec :
```bash
docker-compose up --build
```
3. Initialiser la base de données avec :
```bash
cd python
python3 init.py
```
4. Accéder à l'application :
   - Frontend : [http://localhost:4200](http://localhost:4200)
   - Backend : [http://localhost:5000](http://localhost:5000)

---

## 🗄️ Schéma simplifié de la base de données

- `attraction` : attractions disponibles
- `users` : utilisateurs pouvant se connecter
- `avis` : avis laissés sur les attractions

Toutes les relations sont correctement liées, avec suppression en cascade des avis si une attraction est supprimée.

---

##  Objectifs du projet

- Permettre à un utilisateur authentifié d’ajouter, modifier ou supprimer une attraction.
- Afficher toutes les attractions disponibles, avec détails.
- Permettre à tout utilisateur de laisser un avis (anonyme ou non).
- Gérer les données via une API Flask connectée à une base MariaDB.
- Afficher les données et interagir avec l’utilisateur via une SPA Angular.

---

##  Fonctionnalités clés

- Ajout, modification, suppression d’attractions (authentification requise)
- Affichage dynamique des attractions avec leurs détails
- Formulaire d’ajout d’avis avec gestion de l’anonymat
- Authentification avec génération de token JWT

---

##  Sécurité & Bonnes pratiques

- Vérification du token avant action sensible
- CORS activé pour communication Angular/Flask
- Champs obligatoires validés côté backend et frontend

---

##  Améliorations possibles

- Ajout d’un panneau admin
- Authentification via OAuth
- Upload d’images
- Système de réponse aux avis
- Optimisation des performances

---

ce projet a été conçu pour répondre à un cahier des charges pédagogique. Il est basé sur une architecture claire, maintenable et modulaire. Toute contribution ou amélioration est la bienvenue.

---

📁 *Dernière mise à jour : 20 Juin 2025*
