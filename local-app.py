import requests
import json

url = "http://localhost:11434/api/generate"  # Adjust if running on a different server

json_document = {
    "title": "Small Business Tax Strategies",
    "content": "Maximizing deductions, tracking expenses, and structuring the business properly can reduce tax liabilities."
}
question = "What are the key tax strategies for small businesses?"

payload = {
    "model": "deepseek-r1:1.5b",  # Change the model as per your Ollama setup
    "prompt": f"Here is a document: {json.dumps(json_document)}.\n\nQuestion: {question}\n\nAnswer:",
    "stream": False
}

response = requests.post(url, json=payload)

if response.status_code == 200:
    print("Response:", response.json().get("response"))
else:
    print("Error:", response.text)
