(function () {

    const API_URL = "https://campusassist-backend.onrender.com/chat";

    const WHATSAPP_URL =
        "https://wa.me/14155238886?text=Hi%20I%20need%20help";

    // Floating buttonn
    const button = document.createElement("div");

    button.innerHTML = "💬";

    Object.assign(button.style, {
        position: "fixed",
        bottom: "20px",
        right: "20px",
        width: "60px",
        height: "60px",
        borderRadius: "50%",
        background: "#2563eb",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        fontSize: "24px",
        zIndex: "999999",
        boxShadow: "0 4px 10px rgba(0,0,0,0.3)"
    });

    document.body.appendChild(button);

    // Chat box
    const chatbox = document.createElement("div");

    Object.assign(chatbox.style, {
        position: "fixed",
        bottom: "90px",
        right: "20px",
        width: "320px",
        height: "420px",
        background: "white",
        borderRadius: "12px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
        display: "none",
        flexDirection: "column",
        overflow: "hidden",
        zIndex: "999999"
    });

    document.body.appendChild(chatbox);

    // Header
    const header = document.createElement("div");

    header.innerHTML = "CampusAssist AI";

    Object.assign(header.style, {
        background: "#2563eb",
        color: "white",
        padding: "15px",
        fontWeight: "bold",
        textAlign: "center"
    });

    chatbox.appendChild(header);

    // Messages
    const messages = document.createElement("div");

    Object.assign(messages.style, {
        flex: "1",
        padding: "10px",
        overflowY: "auto",
        fontSize: "14px"
    });

    chatbox.appendChild(messages);

    // Input container
    const inputContainer = document.createElement("div");

    Object.assign(inputContainer.style, {
        display: "flex",
        borderTop: "1px solid #ddd"
    });

    // Input
    const input = document.createElement("input");

    input.placeholder = "Ask something...";

    Object.assign(input.style, {
        flex: "1",
        padding: "10px",
        border: "none",
        outline: "none"
    });

    // Send button
    const sendBtn = document.createElement("button");

    sendBtn.innerHTML = "Send";

    Object.assign(sendBtn.style, {
        background: "#2563eb",
        color: "white",
        border: "none",
        padding: "10px 15px",
        cursor: "pointer"
    });

    inputContainer.appendChild(input);
    inputContainer.appendChild(sendBtn);

    chatbox.appendChild(inputContainer);

    // WhatsApp button
    const waBtn = document.createElement("a");

    waBtn.href = WHATSAPP_URL;
    waBtn.target = "_blank";
    waBtn.innerHTML = "Chat on WhatsApp";

    Object.assign(waBtn.style, {
        background: "#25D366",
        color: "white",
        textAlign: "center",
        padding: "12px",
        textDecoration: "none",
        fontWeight: "bold"
    });

    chatbox.appendChild(waBtn);

    // Toggle chat
    button.onclick = () => {
        chatbox.style.display =
            chatbox.style.display === "none" ? "flex" : "none";
    };

    // Send function
    async function sendMessage() {

        const msg = input.value.trim();

        if (!msg) return;

        messages.innerHTML += `
      <div style="margin-bottom:10px;text-align:right;">
        <span style="background:#2563eb;color:white;padding:8px 12px;border-radius:10px;display:inline-block;">
          ${msg}
        </span>
      </div>
    `;

        input.value = "";

        try {

            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    message: msg
                })
            });

            const data = await response.json();

            messages.innerHTML += `
        <div style="margin-bottom:10px;">
          <span style="background:#f1f1f1;padding:8px 12px;border-radius:10px;display:inline-block;">
            ${data.reply}
          </span>
        </div>
      `;

            messages.scrollTop = messages.scrollHeight;

        } catch (error) {

            messages.innerHTML += `
        <div>
          <span style="color:red;">
            Server error
          </span>
        </div>
      `;
        }
    }

    sendBtn.onclick = sendMessage;

    input.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            sendMessage();
        }
    });

})();