from flask import Flask, jsonify, request
from sentiment import data_preprocessing

app = Flask(__name__)
@app.route('/api/sentiment', methods=['GET'])
def hello():
    text = request.args.get('text')
    return data_preprocessing(text)

@app.route('/api/array/sentiment', methods=['POST'])
def arraysentiment_analysis():
    data = request.get_json()  # Get the JSON data from the request body

    results = []
    for item in data:
        text = item['text']
        text_id = item['id']
        result = data_preprocessing(text, text_id)
        results.append(result)

    return jsonify({'processed_results': results})

if __name__ == '__main__':
    app.run()