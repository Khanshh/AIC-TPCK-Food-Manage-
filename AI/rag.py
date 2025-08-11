from langchain import OpenAI
from langchain.text_splitters import RecursiveCharacterTextSplitter, CharacterTextSplitter
from langchain.document_loaders import PyPDFLoader
from langchain.vectorstores import FAISS
from langchain.embeddings import OpenAIEmbeddings
from dotenv import load_dotenv
import os

load_dotenv()
api_key = os.getenv("OPENAI_API_KEY")

DATA_PATH = 'data'
VECTOR_DB_PATH = 'vector_db/faiss'

def create_vector_db():
    loader = PyPDFLoader(DATA_PATH, glob = "*.pdf", loader_cls=PyPDFLoader)
    documents = loader.load()

    text_splitter = RecursiveCharacterTextSplitter(chunk_size=521, chunk_overlap=50)
    chunks = text_splitter.split_documents(documents)

    embeddings = OpenAIEmbeddings(api_key=api_key)
    vector_db = FAISS.from_documents(chunks, embeddings)
    vector_db.save_local(VECTOR_DB_PATH)

create_vector_db()