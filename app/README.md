# ! IMPORTANT : project is under building process.. NOT COMPELETE YET..!


# 🎓 AI College Guide Chatbot

A domain-specific AI chatbot for **Government Polytechnic Dehradun**, built using a lightweight **RAG-lite architecture** with streaming support and modular backend design.

---

# 🚀 Project Overview

This chatbot answers **only college-related queries** using structured data and controlled LLM responses.

It is designed to:

* Avoid hallucinations
* Be token-efficient (free-tier friendly)
* Support real-time streaming responses
* Work in both console and API modes
* Be easily integrated with a frontend (React)

---

# 🧠 Core Features

### ✅ Domain-Specific AI

* Answers only questions related to the college
* Rejects out-of-scope queries

### ⚡ RAG-Lite Architecture

* No embeddings
* No vector database
* Uses manual section-based retrieval

### 🔄 Streaming Support

* Real-time token streaming from LLM
* Supports **Stop Generation** (AbortController)

### 🧩 Modular Backend Design

* Clean separation of concerns
* Easily extendable

### 💬 Multi-turn Conversation Handling

* Follow-up query resolution
* Topic memory using `lastSections`
* Suggestion handling for ambiguous queries

---

# 🏗️ Architecture

## Directory Structure

```
backend/

  data/
    overview.js
    sections.js

  logic/
    normalize.js
    retriever.js
    intent.js
    followup.js

  services/
    chatCore.js
    llmClient.js
    modelRouter.js

  controllers/
    chatController.js

  routes/
    chatRoutes.js

  console/
    consoleChat.js

  app.js
  server.js
  startServer.js
```

---

# 🔁 System Flow

```
User Input
    ↓
Normalize
    ↓
Follow-up Resolver
    ↓
Retriever (section-based)
    ↓
Intent Detection
    ↓
Model Router
    ↓
LLM (Streaming / Full Response)
    ↓
Response Output (API / Console)
```

---

# 🤖 LLM Integration

Uses **Hugging Face Router API**

### Models Used

| Type  | Model                                    |
| ----- | ---------------------------------------- |
| FAST  | meta-llama/Llama-3.1-8B-Instruct         |
| SMART | meta-llama/Llama-3.3-70B-Instruct (Groq) |

---

# 🧠 Model Routing Logic

```
if retrievedSections.length > 0
    → FAST model

else if intent == GENERAL
    → SMART model

else
    → fallback / refuse
```

---

# ⚙️ chatCore (Central Engine)

Supports both:

* Streaming mode
* Non-streaming mode

```js
chatCore(message, {
  stream: true,
  onChunk: fn,
  shouldStop: fn
});
```

---

# 🌐 API Usage

### Endpoint

```
POST /chat
```

### Request Body

```json
{
  "message": "What are the hostel facilities?"
}
```

---

## 🔄 Streaming Response

The API returns **chunked text stream**.

### Frontend Example

```js
const response = await fetch("/chat", {
  method: "POST",
  body: JSON.stringify({ message }),
  signal: controller.signal
});

const reader = response.body.getReader();
const decoder = new TextDecoder();

while (true) {
  const { done, value } = await reader.read();
  if (done) break;

  const chunk = decoder.decode(value);
  console.log(chunk);
}
```

---

# 🛑 Stop Generation

### Frontend

```js
controller.abort();
```

### Backend

* Detects `req.on("close")`
* Stops streaming loop safely

---

# 💻 Console Mode

Run chatbot in terminal:

```
node backend/server.js
```

### Commands

```
/stream  → streaming mode
/full    → full response mode
```

---

# 🧠 Conversation Handling

### ✔️ Follow-up Resolution

Handles vague inputs like:

```
"ok"
"go on"
"continue"
```

Uses:

* `lastSections` (topic memory)
* `suggestedSections` (clarification)

---

# 🔐 Design Principles

* LLMs are stateless → memory handled manually
* Retrieval defines knowledge
* Context is ephemeral (not stored in history)
* Cheap model first → heavy model only when needed
* Modular architecture over frameworks

---

# ⚠️ Current Limitations

* No session-based memory (global state)
* Keyword-based retrieval (no semantic understanding)
* No section scoring (priority not handled)
* No query logging yet

---

# 🛠️ Setup

## 1️⃣ Install dependencies

```
npm install
```

## 2️⃣ Environment variables

Create `.env`:

```
MODE=api
PORT=3000
HF_API_KEY=your_key_here
```

---

## 3️⃣ Run

### Console mode

```
MODE=console node backend/server.js
```

### API mode

```
MODE=api node backend/server.js
```

---

# 🔮 Future Improvements

* Session-based chat memory
* Query rewriting (better follow-ups)
* Section scoring system
* Logging & evaluation
* Frontend UI improvements
* Response smoothing (typing effect)

---

# 📌 Tech Stack

* Node.js
* Express
* Hugging Face Router API
* Llama Models (Groq)
* JavaScript (ES Modules)

---

# 💡 Key Learning Outcomes

* Built a chatbot **without LangChain or vector DB**
* Understood **RAG fundamentals deeply**
* Implemented **streaming LLM pipeline**
* Designed **modular backend architecture**
* Handled **multi-turn conversations manually**

---

# 🙌 Author

Built as a learning project to understand **how real AI chat systems work internally**.

---

⭐ If you found this useful, consider starring the repo!
