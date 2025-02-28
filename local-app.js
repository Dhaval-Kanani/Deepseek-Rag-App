const axios = require('axios');
const readline = require('readline');

const url = "http://localhost:11434/api/generate"; // Adjust if running on a different server

const jsonDocument = {
    title: "Small Business Tax Strategies",
    content: "Maximizing deductions, tracking expenses, and structuring the business properly can reduce tax liabilities."
};

const chatHistory = [];

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function askQuestion() {
    rl.question("You: ", (question) => {
        chatHistory.push({ role: "user", content: question });
        
        const payload = {
            model: "deepseek-r1:1.5b", // Change the model as per your Ollama setup
            prompt: `Here is a document: ${JSON.stringify(jsonDocument)}.\n\nChat History: ${JSON.stringify(chatHistory)}\n\nQuestion: ${question}\n\nAnswer:`,
            stream: false
        };

        axios.post(url, payload)
            .then(response => {
                const answer = response.data.response;
                console.log("AI:", answer);
                chatHistory.push({ role: "assistant", content: answer });
                askQuestion();
            })
            .catch(error => {
                console.error("Error:", error.response ? error.response.data : error.message);
                askQuestion();
            });
    });
}

askQuestion();
