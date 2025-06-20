import request.request as db

def enregistrer_attraction(donnees):
    # Vérification des champs obligatoires
    if not donnees.get("nom") or not donnees.get("description") or donnees.get("difficulte") is None:
        return False

    # Valeur par défaut pour 'visible'
    visible = donnees.get("visible", True)

    # Mise à jour si un ID est présent
    if "attraction_id" in donnees and donnees["attraction_id"]:
        maj = (
            f"UPDATE attraction SET nom = ?, description = ?, difficulte = ?, visible = ? "
            f"WHERE attraction_id = ?"
        )
        db.insert_in_db(maj, (donnees["nom"], donnees["description"], donnees["difficulte"], visible, donnees["attraction_id"]))
        return donnees["attraction_id"]
    
    # Insertion sinon
    insertion = "INSERT INTO attraction (nom, description, difficulte, visible) VALUES (?, ?, ?, ?)"
    return db.insert_in_db(insertion, (donnees["nom"], donnees["description"], donnees["difficulte"], visible))

def liste_attractions():
    return db.select_from_db("SELECT * FROM attraction")

def recuperer_attraction(attraction_id):
    if not attraction_id:
        return False

    resultats = db.select_from_db("SELECT * FROM attraction WHERE attraction_id = ?", (attraction_id,))
    return resultats[0] if resultats else []

def supprimer_attraction(attraction_id):
    if not attraction_id:
        return False

    db.delete_from_db("DELETE FROM attraction WHERE attraction_id = ?", (attraction_id,))
    return True
