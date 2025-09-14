
const chatBody = document.getElementById('chat-body');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

// Conversation tree with predefined suggestions
const conversationTree = {
  start: {
    message: "👋 Welcome to Heritage Hub! What would you like to explore?",
    suggestions: [
      "Explore Festivals",
      "Traditional Food",
      "Cultural Wear",
      "Etiquette Guide",
      "AI Cultural Buddy",
      "Translator"
    ]
  },
  "Explore Festivals": {
    message: "✨ Great! Which festival are you curious about?",
    suggestions: ["Diwali", "Holi", "Cherry Blossom", "Back to main menu"]
  },
  "Diwali": {
    message: "🪔 Diwali is the Festival of Lights, celebrated in India and beyond.",
    suggestions: ["More about Diwali", "Back to Explore Festivals"]
  },
  "More about Diwali": {
    message: "✨ Diwali is a major Hindu festival symbolizing the victory of light over darkness. Families decorate homes with lamps, burst fireworks, and share sweets. It usually lasts 5 days.",
    suggestions: ["Back to Explore Festivals", "Back to main menu"]
  },
  "Holi": {
    message: "🌈 Holi is the Festival of Colors, celebrated with joy across India.",
    suggestions: ["More about Holi", "Back to Explore Festivals"]
  },
  "More about Holi": {
    message: "🌸 Holi marks the arrival of spring and victory of good over evil. People throw colored powders, dance, and enjoy festive foods like gujiya and thandai.",
    suggestions: ["Back to Explore Festivals", "Back to main menu"]
  },
  "Cherry Blossom": {
    message: "🌸 Cherry Blossom Festivals are famous in Japan and worldwide.",
    suggestions: ["More about Cherry Blossom", "Back to Explore Festivals"]
  },
  "More about Cherry Blossom": {
    message: "🌸 In Japan, 'Hanami' is the tradition of enjoying cherry blossoms. Families and friends gather under blooming trees for picnics, symbolizing the beauty and fleeting nature of life.",
    suggestions: ["Back to Explore Festivals", "Back to main menu"]
  },
  "Traditional Food": {
    message: "🍲 You can discover cuisines like Indian Thali, Japanese Sushi, or Middle Eastern Mezze!",
    suggestions: ["Back to main menu"]
  },
  "Cultural Wear": {
    message: "👘 Explore cultural attire like Sarees, Kimonos, Hanboks, and more.",
    suggestions: ["Back to main menu"]
  },
  "Etiquette Guide": {
    message: "📖 Learn greetings, gestures, and traditions across cultures.",
    suggestions: ["Back to main menu"]
  },
  "AI Cultural Buddy": {
    message: "🤖 Ask me anything about global cultures, traditions, and heritage!",
    suggestions: ["Back to main menu"]
  },
  Translator: {
    message: "🌐 Choose your translation pair:",
    suggestions: [
      "English ➝ Hindi",
      "Hindi ➝ English",
      "Japanese ➝ English",
      "English ➝ French",
      "Back to main menu"
    ]
  },
  "English ➝ Hindi": {
    message: "✍️ Type something in English and I’ll translate it to Hindi.",
    suggestions: ["Back to Translator"]
  },
  "Hindi ➝ English": {
    message: "✍️ Type something in Hindi and I’ll translate it to English.",
    suggestions: ["Back to Translator"]
  },
  "Japanese ➝ English": {
    message: "✍️ Type Japanese text and I’ll translate it to English.",
    suggestions: ["Back to Translator"]
  },
  "English ➝ French": {
    message: "✍️ Type something in English and I’ll translate it to French.",
    suggestions: ["Back to Translator"]
  },
  "Back to Translator": "Translator",
  "Back to main menu": "start"
};

let currentMode = "chat";
let currentLangPair = "";

function addMessage(text, sender) {
  const msgDiv = document.createElement('div');
  msgDiv.classList.add('message', sender === 'user' ? 'user-msg' : 'bot-msg');
  msgDiv.textContent = text;
  chatBody.appendChild(msgDiv);
  chatBody.scrollTop = chatBody.scrollHeight;
}

function showSuggestions(suggestions) {
  const suggestionDiv = document.createElement('div');
  suggestionDiv.classList.add('suggestions');
  suggestions.forEach(suggestion => {
    const btn = document.createElement('button');
    btn.textContent = suggestion;
    btn.onclick = () => handleUserSelection(suggestion);
    suggestionDiv.appendChild(btn);
  });
  chatBody.appendChild(suggestionDiv);
  chatBody.scrollTop = chatBody.scrollHeight;
}

function clearSuggestions() {
  chatBody.querySelectorAll('.suggestions').forEach(s => s.remove());
}

function handleUserSelection(selection) {
  clearSuggestions();
  addMessage(selection, 'user');
  const nextKey = typeof conversationTree[selection] === 'string' ? conversationTree[selection] : selection;
  const node = conversationTree[nextKey];

  if (!node) {
    addMessage("⚠️ Sorry, I don’t have info on that yet.", 'bot');
    return;
  }

  addMessage(node.message, 'bot');
  if (node.suggestions) showSuggestions(node.suggestions);

  // Translator mode handling
  if (nextKey.includes("➝")) {
    currentMode = "translate";
    currentLangPair = nextKey;
  } else {
    currentMode = "chat";
    currentLangPair = "";
  }
}

// Real translation function using Google Translate API
async function realTranslate(text, pair) {
  let target = "hi"; 
  let source = "en";

  if (pair === "English ➝ Hindi") {
    source = "en"; target = "hi";
  } else if (pair === "Hindi ➝ English") {
    source = "hi"; target = "en";
  } else if (pair === "Japanese ➝ English") {
    source = "ja"; target = "en";
  } else if (pair === "English ➝ French") {
    source = "en"; target = "fr";
  }

  try {
    const res = await fetch(
      "https://translation.googleapis.com/language/translate/v2?key=YOUR_API_KEY_HERE",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          q: text,
          source: source,
          target: target,
          format: "text"
        })
      }
    );

    const data = await res.json();
    if (data.data && data.data.translations) {
      return data.data.translations[0].translatedText;
    } else {
      return "⚠️ Translation failed.";
    }
  } catch (err) {
    console.error("Translation error:", err);
    return "⚠️ Translation error.";
  }
}

sendBtn.addEventListener('click', () => {
  const input = userInput.value.trim();
  if (!input) return;
  addMessage(input, 'user');
  userInput.value = '';

  if (currentMode === "translate" && currentLangPair) {
    realTranslate(input, currentLangPair).then(translated => {
      let resultMsg = `🌐 Translation Result:\n\nOriginal: ${input}\nTranslated: ${translated}`;
      addMessage(resultMsg, 'bot');
    });
  } else {
    addMessage("🤖 (Chat mode placeholder response)", 'bot');
  }
});

userInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') sendBtn.click();
});

window.onload = () => {
  const root = conversationTree['start'];
  addMessage(root.message, 'bot');
  showSuggestions(root.suggestions);
};
