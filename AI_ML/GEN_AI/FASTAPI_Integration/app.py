from fastapi import FastAPI
from langchain_core.prompts import ChatPromptTemplate
from langchain_groq import ChatGroq
from langserve import add_routes
import uvicorn
import os
from dotenv import load_dotenv
from langchain_community.chat_models import ChatOllama

load_dotenv()

app=FastAPI(
    title="Langchain Server",
    version="1.0",
    description='Simple API Server'
    )

model=ChatGroq(model="llama-3.1-8b-instant")

llm = ChatOllama(model="llama3.2:latest")

prompt1=ChatPromptTemplate.from_template("Write an essay for topic: {topic} of approximately 100 words")
prompt2=ChatPromptTemplate.from_template("Write an poem for topic: {topic} of approximately 100 words")

add_routes(
    app,
    prompt1|model,
    path="/essay"
)

add_routes(
    app,
    prompt2|llm,
    path="/poem"
)

if __name__ == "__main__":
    uvicorn.run(app,host='localhost',port=8000)