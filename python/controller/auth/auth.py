import datetime
import jwt
from flask import jsonify

SECRET_KEY = "AAAAB3NzaC1yc2EAAAADAQABAAABAQC3AXRA84GNbptx2Mr8EWxlHWYUvacaBPDMm2jO8+u0gXMVMiBHtH9DdNYrmOWVbCjPKUuqwup5t3Z7sDWkGQThEWf6+VdfjcEdndM1/WOdAyyMSBGXxCrXkjhXnc/IV1haNEqNZAdt+QjNvODBJH1m4ChTdGhAQupggQaC5zblXgmWGwXK7gxHekWJ02OtZqC6DZsmN6pTo7gJdZzfdS0AXj7yCY2ZSo9OnuDccVklKbq11p7UiF7NB+wmIcOxO9KnnSipHm0uR7d2O/0KNtjIG1GeUgzaWK53WL8tzV8Kek3yoyOmDvFMgULG1HHLWBqjfyaEDGoheIklxlvr7RvZ"

def générer_token_utilisateur(user_id):
    try:
        contenu = {
            'exp': datetime.datetime.utcnow() + datetime.timedelta(days=1),
            'iat': datetime.datetime.utcnow(),
            'sub': user_id
        }
        token = jwt.encode(contenu, SECRET_KEY, algorithm='HS256')
        return token
    except Exception as e:
        return str(e)

def verifier_token_utilisateur(token):
    try:
        jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
        return True
    except jwt.ExpiredSignatureError:
        return "Votre session a expiré, veuillez vous reconnecter."
    except jwt.InvalidTokenError:
        return "Le jeton fourni est invalide."

def controle_token_requete(req):
    auth_header = req.headers.get("Authorization", "")
    if not auth_header:
        return jsonify({"message": "Aucun jeton d'authentification fourni."}), 401

    token_clean = auth_header.replace("Token ", "").strip().replace('"', '')
    validation = verifier_token_utilisateur(token_clean)

    if validation is not True:
        return jsonify({"message": validation}), 401

    return True
