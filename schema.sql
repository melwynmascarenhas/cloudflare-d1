CREATE TABLE IF NOT EXISTS Stories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL,
  prompt TEXT NOT NULL,
  ai_response TEXT NOT NULL,
  model TEXT NOT NULL,
  temperature REAL NOT NULL,
  max_tokens INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO Stories (email, prompt, ai_response, model, temperature, max_tokens)
VALUES ('user1@example.com', 'Tell me a story about a brave knight.', 'Once upon a time, there was a brave knight...', 'gpt-4', 0.7, 150);

INSERT INTO Stories (email, prompt, ai_response, model, temperature, max_tokens)
VALUES ('user2@example.com', 'What is the capital of France?', 'The capital of France is Paris.', 'gpt-4', 0.5, 50);