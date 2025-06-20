from flask import jsonify, request
import request.request as db

def enregistrer_avis(donnees):
    connexion, cursor = db.get_db_connection()

    requete = """
        INSERT INTO avis (attraction_id, texte, note, nom, prenom, anonyme)
        VALUES (%s, %s, %s, %s, %s, %s);
    """
    champs = (
        donnees.get("attraction_id"),
        donnees.get("texte"),
        donnees.get("note"),
        donnees.get("nom"),
        donnees.get("prenom"),
        donnees.get("anonyme")
    )

    cursor.execute(requete, champs)
    connexion.commit()
    connexion.close()

    return {"message": "Votre avis a bien été enregistré."}, 200

def avis_par_attraction(id_attraction):
    connexion, cursor = db.get_db_connection()

    requete = """
        SELECT texte, note, nom, prenom, anonyme
        FROM avis
        WHERE attraction_id = %s;
    """
    cursor.execute(requete, (id_attraction,))
    resultats = cursor.fetchall()
    connexion.close()

    if not resultats:
        return jsonify([]), 200

    avis_formates = []
    for ligne in resultats:
        avis_formates.append({
            "texte": ligne[0],
            "note": ligne[1],
            "nom": ligne[2] or "Anonyme",
            "prenom": ligne[3] or "",
            "anonyme": ligne[4]
        })

    return jsonify(avis_formates), 200
