-- Suppression des tables si elles existent déjà
DROP TABLE IF EXISTS avis;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS attraction;

-- Création de la table des attractions
CREATE TABLE attraction (
    attraction_id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    difficulte INT,
    visible BOOLEAN DEFAULT TRUE
);

-- Création de la table des utilisateurs
CREATE TABLE users (
    users_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- Création de la table des avis utilisateurs
CREATE TABLE avis (
    avis_id INT AUTO_INCREMENT PRIMARY KEY,
    attraction_id INT NOT NULL,
    texte TEXT NOT NULL,
    note INT CHECK (note BETWEEN 1 AND 5),
    nom VARCHAR(255),
    prenom VARCHAR(255),
    anonyme BOOLEAN DEFAULT FALSE,
    CONSTRAINT fk_attraction FOREIGN KEY (attraction_id)
        REFERENCES attraction(attraction_id)
        ON DELETE CASCADE
);
