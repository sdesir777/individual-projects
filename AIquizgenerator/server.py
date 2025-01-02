import os
from flask import Flask, request, jsonify
import openai

app = Flask(__name__)

# Use environment variable for API key
openai.api_key = os.getenv('OPENAI_API_KEY')


@app.route('/generate-quiz', methods=['POST'])
def generate_quiz():
    data = request.get_json()
    notes = data.get('notes', '')

    if not notes:
        return jsonify({'error': 'No notes provided'}), 400

    try:
        response = openai.Completion.create(
            engine="text-davinci-003",
            prompt=f"Generate a quiz based on the following notes:\n{notes}",
            max_tokens=150
        )
        quiz = response.choices[0].text.strip()
        return jsonify({'quiz': quiz})
    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)
