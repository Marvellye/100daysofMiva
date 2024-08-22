from flask import Flask, jsonify
import mysql.connector
from mysql.connector import Error

app = Flask(__name__)

# Database connection parameters
db_config = {
    'host': 'localhost',
    'user': 'marvell1_info',
    'password': 'H9y2P8ez5yBM@Ef',
    'database': 'marvell1_miva'
}

def get_db_connection():
    try:
        connection = mysql.connector.connect(**db_config)
        if connection.is_connected():
            print('Connected to the database.')
            return connection
    except Error as e:
        print(f"Error while connecting to MySQL: {e}")
        return None

@app.route('/getlinks', methods=['GET'])
def get_links():
    connection = get_db_connection()
    if connection is None:
        return jsonify({'error': 'Failed to connect to database'}), 500

    cursor = connection.cursor(dictionary=True)
    cursor.execute("SELECT github, linkedin, devto, portfolio FROM links")

    links = cursor.fetchall()
    cursor.close()
    connection.close()

    return jsonify(links)

if __name__ == '__main__':
    app.run(port=3000)