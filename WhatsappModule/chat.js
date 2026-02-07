import { processMessage } from './gemini.js';
import readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('=== Gemini Chat Terminal ===');
console.log('Type your messages to test the intent recognition system');
console.log('Type "exit" or "quit" to close\n');

function askQuestion() {
    rl.question('You: ', async (input) => {
        const message = input.trim();
        
        if (message.toLowerCase() === 'exit' || message.toLowerCase() === 'quit') {
            console.log('Goodbye!');
            rl.close();
            process.exit(0);
        }
        
        if (!message) {
            askQuestion();
            return;
        }
        
        try {
            console.log('Processing...');
            const response = await processMessage(message);
            
            console.log('\n--- Response ---');
            console.log(JSON.stringify(response, null, 2));
            console.log('----------------\n');
            
        } catch (error) {
            console.error('Error:', error.message);
        }
        
        askQuestion();
    });
}

askQuestion();
