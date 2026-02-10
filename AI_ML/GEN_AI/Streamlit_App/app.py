import streamlit as st
from dotenv import load_dotenv
from langchain_groq.chat_models import ChatGroq

st.title("Groq Memory-Based Chatbot")

load_dotenv()

# -------- Sidebar Controls --------
with st.sidebar:
    clear = st.button("🧹 Clear Chat")

    model = st.selectbox(
        "Select Model",
        ["llama-3.1-8b-instant", "llama-3.3-70b-versatile"]
    )

    temperature = st.slider(
        "Temperature",
        min_value=0.0,
        max_value=1.0,
        step=0.1,
        value=0.5
    )

# -------- Session State Init --------
if "model" not in st.session_state:
    st.session_state.model = model

if "temperature" not in st.session_state:
    st.session_state.temperature = temperature

if "messages" not in st.session_state:
    st.session_state.messages = [
        ("system", """You are a calm, respectful assistant.
If a user asks for explicit or unsafe content, politely refuse and redirect
to general, educational, and respectful explanations.
If the user becomes hostile, remain calm and non-judgmental.
Never escalate conflict or shame the user.""")
    ]

# -------- Handle Model Change --------
if model != st.session_state.model:
    st.session_state.model = model
    st.session_state.messages = [st.session_state.messages[0]]
    st.rerun()

# -------- Handle Clear Chat --------
if clear:
    st.session_state.messages = [st.session_state.messages[0]]
    st.rerun()

# -------- LLM Init --------
llm = ChatGroq(
    model=st.session_state.model,
    temperature=st.session_state.temperature
)

# -------- UI --------
st.subheader(f"🧠 Active Model: {st.session_state.model}")


text = st.chat_input("Enter your query", max_chars=1000)
# -------- Chat Logic --------
if text:
    st.session_state.messages.append(("user", text))

    response = llm.invoke(st.session_state.messages).content

    st.session_state.messages.append(("assistant", response))
    st.chat_message("assistant").write(response)

    
for role, msg in st.session_state.messages:
    if role != "system":
        st.chat_message(role).write(msg)


