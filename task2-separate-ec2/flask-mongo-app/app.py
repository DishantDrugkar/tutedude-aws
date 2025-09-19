from flask import Flask, render_template, request
from pymongo import MongoClient
import certifi  # <--- add this

app = Flask(__name__)

# Use certifi to fix SSL certificate verification
client = MongoClient(
    "mongodb+srv://dishantdrugkar1_db_user:bC7DXVUyuHEdx8mK@cluster0.jy5z4tk.mongodb.net/?retryWrites=true&w=majority",
    tls=True,
    tlsCAFile=certifi.where()
)

db = client["test_db"]
collection = db["users"]

@app.route('/')
def index():
    return render_template("form.html")

@app.route('/submit', methods=['POST'])
def submit():
    name = request.form.get("name")
    email = request.form.get("email")
    try:
        collection.insert_one({"name": name, "email": email})
        return f"Data submitted successfully: {name}, {email}"
    except Exception as e:
        return f"Error: {e}"

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)