(function () {
    // Create chatbot button (icon)
    const chatbotIcon = document.createElement("img");
    chatbotIcon.id = "chatbot-icon";
    chatbotIcon.src = "https://demosite-links.s3.amazonaws.com/chat-icon2.svg";
    chatbotIcon.style.position = "fixed";
    chatbotIcon.style.bottom = "20px";
    chatbotIcon.style.right = "20px";
    chatbotIcon.style.cursor = "pointer";
    chatbotIcon.style.zIndex = "1000";
    chatbotIcon.style.width = "70px";
    chatbotIcon.style.height = "70px";
    document.body.appendChild(chatbotIcon);

    // Add CSS for hover effect dynamically
    const style = document.createElement("style");
    style.innerHTML = `
    #chatbot-icon {
        transition: transform 0.3s ease; /* Smooth transition for scaling */
    }
    #chatbot-icon:hover {
        transform: scale(1.2); /* Enlarge to 120% on hover */
    }
    `;
    document.head.appendChild(style);

    // Create chatbot window
    const chatWindow = document.createElement("div");
    chatWindow.id = "chat-window";
    chatWindow.style.position = "fixed";
    chatWindow.style.bottom = "20px";
    chatWindow.style.right = "20px";
    chatWindow.style.width = "350px";
    chatWindow.style.height = "550px";
    chatWindow.style.borderRadius = "15px";
    chatWindow.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.15)";
    chatWindow.style.backgroundColor = "#fff";
    chatWindow.style.zIndex = "1000";
    chatWindow.style.display = "none";
    chatWindow.style.overflow = "hidden";
    chatWindow.style.fontFamily = "'Arial', sans-serif";

    chatWindow.innerHTML = `
        <div id="chat-header" style="background: #4CAF50; color: #fff; padding: 15px; display: flex; justify-content: space-between; align-items: center; border-top-left-radius: 15px; border-top-right-radius: 15px;">
            <div style="display: flex; align-items: center;">
                <img src="https://demosite-links.s3.amazonaws.com/profile-img.png" alt="Support" style="width: 40px; height: 40px; border-radius: 50%; margin-right: 10px;">
                <div>
                    <h4 style="margin: 0; font-size: 1.0em; font-family: 'Roboto', sans-serif; color: #fff;">Maria</h4>
                    <p style="margin: 0; font-size: 0.85em; font-family: 'Roboto', sans-serif; color: #fff;">Customer Service</p>
                </div>
            </div>
            <span id="close-chat" style="cursor: pointer; font-size: 1.5em;">&#x2715;</span>
        </div>
        <div id="chat-body" style="padding: 10px; display: flex; flex-direction: column; height: calc(100% - 160px); overflow: hidden;">
            <div id="messages" style="flex: 1; overflow-y: auto; margin-bottom: 10px; padding-right: 10px;">
                <!-- Messages will be displayed here -->
            </div>
            <div id="typing-indicator" style="display: none; font-size: 0.9em; color: #888; text-align: left; margin-bottom: 5px;">
                Maria is typing...
            </div>
        </div>
        <div id="chat-footer" style="padding: 10px; border-top: 1px solid #b7ebb9; display: flex; align-items: center;">
            <input type="text" id="user-input" placeholder="Your message" style="flex: 1; padding: 10px; border-radius: 25px; border: 1px solid #b7ebb9; margin-right: 10px; outline: none;">
            <button id="send-message" style="background: #ffffff; color: #fff; width: 40px; height: 40px; border: none; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center;">
                <img src="https://demosite-links.s3.amazonaws.com/send-icon.png" alt="Send" style="width: 35px; height: 35px; object-fit: contain;">
            </button>
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

    document.getElementById("send-message").addEventListener("click", () => {
        sendMessage();
    });

    document.getElementById("user-input").addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            sendMessage();
        }
    });

    function sendMessage() {
        const userInput = document.getElementById("user-input");
        const message = userInput.value.trim();
        if (message) {
            addMessage("You", message, "user");
            userInput.value = '';
            setTimeout(() => {
                showTypingIndicator();
                setTimeout(() => {
                    fetchChatbotResponse(message);
                });
            }, 3000); // Delay before showing typing indicator
        }
    }

    function addMessage(sender, message, type = "user") {
        const messages = document.getElementById("messages");

        const messageWrapper = document.createElement("div");
        messageWrapper.style.display = "flex";
        messageWrapper.style.alignItems = "flex-start";
        messageWrapper.style.marginBottom = "10px";

        if (type === "agent") {
            // Bot message
            const profilePic = document.createElement("img");
            profilePic.src = "https://demosite-links.s3.amazonaws.com/profile-img.png";
            profilePic.style.width = "30px";
            profilePic.style.height = "30px";
            profilePic.style.borderRadius = "50%";
            profilePic.style.marginRight = "10px";

            const messageContent = document.createElement("div");
            messageContent.style.display = "flex";
            messageContent.style.flexDirection = "column";

            const nameDiv = document.createElement("div");
            nameDiv.style.fontWeight = "bold";
            nameDiv.style.color = "#4CAF50";
            nameDiv.style.marginBottom = "4px";
            nameDiv.innerText = sender;

            const messageDiv = document.createElement("div");
            messageDiv.style.background = "#4CAF50";
            messageDiv.style.color = "#fff";
            messageDiv.style.padding = "10px";
            messageDiv.style.borderRadius = "10px";
            messageDiv.style.maxWidth = "80%";
            messageDiv.style.position = "relative";

            const arrowDiv = document.createElement("div");
            arrowDiv.style.position = "absolute";
            arrowDiv.style.left = "-10px";
            arrowDiv.style.top = "10px";
            arrowDiv.style.width = "0";
            arrowDiv.style.height = "0";
            arrowDiv.style.borderTop = "10px solid transparent";
            arrowDiv.style.borderBottom = "10px solid transparent";
            arrowDiv.style.borderRight = "10px solid #4CAF50";

            messageDiv.innerText = message;
            messageDiv.appendChild(arrowDiv);

            messageContent.appendChild(nameDiv);
            messageContent.appendChild(messageDiv);

            messageWrapper.appendChild(profilePic);
            messageWrapper.appendChild(messageContent);
        } else {
            // User message
            const messageDiv = document.createElement("div");
            messageDiv.style.background = "#b7ebb9";
            messageDiv.style.color = "#000";
            messageDiv.style.padding = "10px";
            messageDiv.style.borderRadius = "10px";
            messageDiv.style.maxWidth = "80%";
            messageDiv.style.alignSelf = "flex-end";
            messageDiv.style.position = "relative";

            const arrowDiv = document.createElement("div");
            arrowDiv.style.position = "absolute";
            arrowDiv.style.right = "-10px";
            arrowDiv.style.top = "10px";
            arrowDiv.style.width = "0";
            arrowDiv.style.height = "0";
            arrowDiv.style.borderTop = "10px solid transparent";
            arrowDiv.style.borderBottom = "10px solid transparent";
            arrowDiv.style.borderLeft = "10px solid #b7ebb9";

            messageDiv.innerText = message;
            messageDiv.appendChild(arrowDiv);

            messageWrapper.appendChild(messageDiv);
            messageWrapper.style.justifyContent = "flex-end"; // Align user messages to the right
        }

        messages.appendChild(messageWrapper);
        scrollToBottom(); // Scroll to the bottom after adding a new message
    }

    function fetchChatbotResponse(userMessage) {
        const chatbotAPI = "http://localhost:5000/chat";
        const requestData = {
            chat_id: 123470,  // Replace with actual chat ID
            customer_response: userMessage,
            account_id: 101487,  // Replace with actual account ID
            operator_name: "Maria",  // Replace with actual operator name
            vdp_vin: "1HGCM82633A123456"  // Replace with actual vehicle VIN
        };
    
        fetch(chatbotAPI, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "accept": "application/vnd.coxauto.v1+json",
                "accept-Encoding": "application/gzip"
            },
            body: JSON.stringify(requestData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            hideTypingIndicator();
            data.response.forEach((response, index) => {
            // If one response
            if (index === 0) {
                // First Case - Single Response
                // Show the typing indicator
                showTypingIndicator();
                // Wait 3000ms and then hide the typing indicator and show the response
                setTimeout(() => {
                    hideTypingIndicator();
                    addMessage("Maria", data.response[0], "agent");
                }, 2000);
            } else {
                // If multiple responses
                setTimeout(() => {
                    // Show the typing indicator after an initial delay
                    showTypingIndicator();
                    // Delay again before showing the response and hiding the typing indicator
                    setTimeout(() => {
                        hideTypingIndicator();
                        addMessage("Maria", response, "agent");
                    }, 4000);
                }, 10000);
            }
            });
        })
        .catch(error => {
            console.error("Error:", error);
            hideTypingIndicator();
            addMessage("Maria", "Sorry, something went wrong.", "agent");
        });
    }
    
    function showTypingIndicator() {
        const typingIndicator = document.getElementById("typing-indicator");
        typingIndicator.style.display = "block";
        scrollToBottom(); // Scroll to the bottom when typing indicator shows
    }

    function hideTypingIndicator() {
        const typingIndicator = document.getElementById("typing-indicator");
        if (typingIndicator) {
            typingIndicator.style.display = "none";
        }
    }

    function scrollToBottom() {
        const messages = document.getElementById("messages");
        messages.scrollTop = messages.scrollHeight;
    }

})();
