import requests
import streamlit as st

def get_groq_response(input_text):
    response=requests.post("http://localhost:8000/essay/invoke",
                           json={'input':{'topic':input_text}})
    return response.json()['output']['content']

def get_llama_response(input_text):
    response=requests.post("http://localhost:8000/poem/invoke",
                           json={'input':{'topic':input_text}})
    return response.json()['output']['content']

st.title("Practive with FastAPI")
input_text1=st.text_input("Write essay on : ")
input_text2=st.text_input("Write poem on : ")

if input_text1:
    st.write(get_groq_response(input_text1))

if input_text2:
    st.write(get_llama_response(input_text2))   