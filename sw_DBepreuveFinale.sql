create DATABASE IF NOT EXISTS sw_epreuve_finale;

USE sw_epreuve_finale;

drop DATABASE sw_epreuve_finale;
DROP TABLE IF EXISTS sous_taches;
DROP TABLE IF EXISTS taches;
DROP TABLE IF EXISTS usager;
/*users a place utilisateur me suis perdu dans mon code car user utilisateur*/
CREATE TABLE utilisateur (
   id SERIAL PRIMARY KEY,
   nom VARCHAR(30),
   prenom VARCHAR(30),
   courriel VARCHAR(255),
   cle_api VARCHAR(64),
   password VARCHAR(100)
);

CREATE TABLE taches (
   id SERIAL PRIMARY KEY,
   utilisateur_id INT,
   titre VARCHAR(100),
   description VARCHAR(50),
   date_debut DATE,
   date_echeance DATE,
   complete BOOLEAN,

   FOREIGN KEY (utilisateur_id) REFERENCES utilisateur(id)
);

CREATE TABLE sous_taches (
   id SERIAL PRIMARY KEY,
   tache_id INT,
   titre VARCHAR(100),
   complete BOOLEAN,

   FOREIGN KEY (tache_id) REFERENCES taches(id)
);






