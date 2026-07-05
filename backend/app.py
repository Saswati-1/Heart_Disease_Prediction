from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
from db import cursor, db

app = Flask(__name__)
CORS(app)

# Load trained model
model = joblib.load("model.pkl")

@app.route("/")
def home():
    return "Heart Disease Prediction Backend Running"

@app.route("/predict", methods=["POST"])
def predict():

    data = request.json

    user_id = data["user_id"]

    features = [[
        data["age"],
        data["sex"],
        data["cp"],
        data["trestbps"],
        data["chol"],
        data["fbs"],
        data["restecg"],
        data["thalach"],
        data["exang"],
        data["oldpeak"],
        data["slope"],
        data["ca"],
        data["thal"]
    ]]

    prediction = model.predict(features)

    result = (
        "Heart Disease Detected"
        if prediction[0] == 1
        else
        "No Heart Disease"
    )

    cursor.execute(
        """
        INSERT INTO predictions
        (user_id, age, sex, cp, trestbps, chol, prediction)
        VALUES (%s,%s,%s,%s,%s,%s,%s)
        """,
        (
            user_id,
            data["age"],
            data["sex"],
            data["cp"],
            data["trestbps"],
            data["chol"],
            result
        )
    )

    db.commit()

    return jsonify({
        "prediction": result
    })
@app.route("/register", methods=["POST"])
def register():

    data = request.json

    name = data["name"]
    email = data["email"]
    password = data["password"]


    try:

        cursor.execute(
            """
            INSERT INTO users(name,email,password)
            VALUES(%s,%s,%s)
            """,
            (name,email,password)
        )

        db.commit()


        return jsonify({
            "message":"User Registered Successfully"
        })


    except Exception as e:

        return jsonify({
            "message":"Email already exists"
        }),400
@app.route("/login", methods=["POST"])
def login():

    data = request.json

    email = data["email"]
    password = data["password"]

    query = """
    SELECT * FROM users
    WHERE email=%s AND password=%s
    """

    cursor.execute(
        query,
        (email, password)
    )

    user = cursor.fetchone()

    if user:
        return jsonify({
            "message": "Login Successful",
            "user_id": user[0]
        })

    return jsonify({
        "message": "Invalid Credentials"
    }), 401
@app.route("/history/<int:user_id>", methods=["GET"])
def history(user_id):

    cursor.execute(
        """
        SELECT age, sex, cp, trestbps, chol,
               prediction, created_at
        FROM predictions
        WHERE user_id = %s
        ORDER BY created_at DESC
        """,
        (user_id,)
    )

    rows = cursor.fetchall()

    history_data = []

    for row in rows:

        history_data.append({
            "age": row[0],
            "sex": row[1],
            "cp": row[2],
            "trestbps": row[3],
            "chol": row[4],
            "prediction": row[5],
            "created_at": str(row[6])
        })

    return jsonify(history_data)
if __name__ == "__main__":
    app.run(debug=True)
@app.route("/user/<int:user_id>")
def get_user(user_id):

    cursor.execute(
        "SELECT name,email FROM users WHERE id=%s",
        (user_id,)
    )

    user = cursor.fetchone()


    return jsonify({

        "name": user[0],
        "email": user[1]

    })