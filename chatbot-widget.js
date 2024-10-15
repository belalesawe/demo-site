(function () {
    // Create chatbot button
    const chatbotIcon = document.createElement("div");
    chatbotIcon.id = "chatbot-icon";
    chatbotIcon.style.position = "fixed";
    chatbotIcon.style.bottom = "20px";
    chatbotIcon.style.right = "20px";
    chatbotIcon.style.cursor = "pointer";
    chatbotIcon.style.zIndex = "1000";
    chatbotIcon.innerHTML = '<img src="https://example.com/chatbot-icon.png" alt="Chat with us" style="width: 60px; height: 60px;">';
    document.body.appendChild(chatbotIcon);

    // Create chatbot window
    const chatWindow = document.createElement("div");
    chatWindow.id = "chat-window";
    chatWindow.style.position = "fixed";
    chatWindow.style.bottom = "80px";
    chatWindow.style.right = "20px";
    chatWindow.style.width = "300px";
    chatWindow.style.height = "400px";
    chatWindow.style.border = "1px solid #ccc";
    chatWindow.style.backgroundColor = "#fff";
    chatWindow.style.zIndex = "1000";
    chatWindow.style.display = "none";
    chatWindow.innerHTML = `
        <div id="chat-header" style="background: #007BFF; color: #fff; padding: 10px; display: flex; justify-content: space-between; align-items: center;">
            <h4 style="margin: 0;">Chat with us</h4>
            <span id="close-chat" style="cursor: pointer;">X</span>
        </div>
        <div id="chat-body" style="flex: 1; padding: 10px; display: flex; flex-direction: column;">
            <div id="messages" style="flex: 1; overflow-y: auto; margin-bottom: 10px;"></div>
            <input type="text" id="user-input" placeholder="Type your message..." style="padding: 5px; width: 70%;">
            <button id="send-message" style="padding: 5px; width: 20%;">Send</button>
        </div>
    `;
    document.body.appendChild(chatWindow);

    // Open and close chat window logic
    chatbotIcon.addEventListener("click", () => {
        chatWindow.style.display = "block";
    });

    document.getElementById("close-chat").addEventListener("click", () => {
        chatWindow.style.display = "none";
    });

    // Send message logic
    document.getElementById("send-message").addEventListener("click", () => {
        const userInput = document.getElementById("user-input");
        const message = userInput.value.trim();
        if (message) {
            addMessage("You", message);
            userInput.value = '';
            fetchChatbotResponse(message);
        }
    });

    function addMessage(sender, message) {
        const messages = document.getElementById("messages");
        const messageDiv = document.createElement("div");
        messageDiv.innerText = `${sender}: ${message}`;
        messages.appendChild(messageDiv);
        messages.scrollTop = messages.scrollHeight;
    }

    function fetchChatbotResponse(userMessage) {
        const chatbotAPI = "https://your-backend-url.com/chat"; // Replace with your actual backend URL
        fetch(chatbotAPI, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message: userMessage })
        })
        .then(response => response.json())
        .then(data => {
            addMessage("Bot", data.response);
        })
        .catch(error => {
            console.error("Error:", error);
            addMessage("Bot", "Sorry, something went wrong.");
        });
    }
})();

