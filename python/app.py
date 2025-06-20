from flask import Flask, request, jsonify
from flask_cors import CORS

# Import des modules internes
import request.request as db
import controller.auth.auth as auth
import controller.attraction as attraction_ctrl
import controller.avis as avis_ctrl

# Initialisation de l'application Flask
app = Flask(__name__)
CORS(app)

# Route de test
@app.route('/')
def index():
    return 'Bienvenue sur l’API du parc !'

# ----------------------
# ROUTES ATTRACTIONS
# ----------------------

@app.post('/attraction')
def creer_ou_modifier_attraction():
    # Vérification de l'authentification
    if auth.check_token(request) != True:
        return auth.check_token(request)
    
    data = request.get_json()
    result = attraction_ctrl.add_attraction(data)

    if result:
        return jsonify({"message": "Attraction enregistrée.", "result": result}), 200
    return jsonify({"message": "Erreur lors de l’enregistrement."}), 500

@app.get('/attraction')
def lister_attractions():
    return attraction_ctrl.get_all_attraction(), 200

@app.get('/attraction/<int:attraction_id>')
def obtenir_attraction(attraction_id):
    return attraction_ctrl.get_attraction(attraction_id), 200

@app.delete('/attraction/<int:attraction_id>')
def supprimer_attraction(attraction_id):
    if auth.check_token(request) != True:
        return auth.check_token(request)
    
    if attraction_ctrl.delete_attraction(attraction_id):
        return jsonify({"message": "Attraction supprimée."}), 200
    return jsonify({"message": "Suppression impossible."}), 500

# ----------------------
# ROUTES AUTHENTIFICATION
# ----------------------

@app.post('/login')
def se_connecter():
    credentials = request.get_json()

    if 'name' not in credentials or 'password' not in credentials:
        return jsonify({'messages': ["Identifiants manquants ou invalides."]}), 400

    cur, conn = db.get_db_connection()
    query = "SELECT * FROM users WHERE name = ? AND password = ?"
    cur.execute(query, (credentials['name'], credentials['password']))
    result = cur.fetchone()
    conn.close()

    if result:
        token = auth.encode_auth_token(result[0])
        return jsonify({"token": token, "name": credentials['name']}), 200
    else:
        return jsonify({'messages': ["Identifiants incorrects."]}), 401

# ----------------------
# ROUTES AVIS
# ----------------------

@app.post('/avis')
def ajouter_un_avis():
    data = request.get_json()
    return avis_ctrl.add_avis(data)

@app.get('/avis/<int:attraction_id>')
def lister_avis(attraction_id):
    return avis_ctrl.get_avis(attraction_id)
