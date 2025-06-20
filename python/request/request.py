import mariadb
from datetime import datetime

# Connexion unique à la base de données
def ouvrir_connexion():
    connexion = mariadb.connect(
        user="mysqlusr",
        password="mysqlpwd",
        host="database",
        port=3306,
        database="parc"
    )
    curseur = connexion.cursor()
    return connexion, curseur

# Insertion de données avec récupération de l'ID
def inserer(requete, valeurs=()):
    conn, cur = ouvrir_connexion()
    cur.execute(requete, valeurs)
    conn.commit()
    id_ajoute = cur.lastrowid
    conn.close()
    return id_ajoute

# Lecture de données (SELECT)
def recuperer(requete, valeurs=()):
    conn, cur = ouvrir_connexion()
    cur.execute(requete, valeurs)
    lignes = cur.fetchall()

    colonnes = [desc[0] for desc in cur.description]
    resultats = []

    for ligne in lignes:
        enregistrement = {}
        for idx, val in enumerate(ligne):
            if isinstance(val, datetime):
                enregistrement[colonnes[idx]] = val.strftime('%d/%m/%Y')
            else:
                enregistrement[colonnes[idx]] = val
        resultats.append(enregistrement)

    conn.close()
    return resultats

# Suppression d’un enregistrement
def supprimer(requete, valeurs=()):
    conn, cur = ouvrir_connexion()
    cur.execute(requete, valeurs)
    conn.commit()
    conn.close()

# Mise à jour d’un enregistrement
def modifier(requete, valeurs=()):
    conn, cur = ouvrir_connexion()
    cur.execute(requete, valeurs)
    conn.commit()
    conn.close()
