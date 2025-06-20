-- Données d'exemple pour la table attraction
INSERT INTO attraction (nom, description, difficulte, visible) VALUES 
('Silver Star', 'Grand huit à sensations fortes', 3, TRUE),
('Montagne 8', 'Parcours de montagnes russes sinueux', 4, TRUE);

-- Création d’un utilisateur test
INSERT INTO users (name, password) VALUES 
('toto', 'toto');

-- Avis d’utilisateurs sur les attractions
INSERT INTO avis (attraction_id, texte, note, nom, prenom, anonyme) VALUES 
(1, 'Une expérience géniale, je recommande !', 5, 'Alice', 'Durand', FALSE),
(2, 'Trop de sensations pour moi, mais bien conçu.', 3, NULL, NULL, TRUE);
