import os
from PyPDF2 import PdfReader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_google_genai import GoogleGenerativeAIEmbeddings
import google.generativeai as genai
from langchain.vectorstores import FAISS
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.chains.question_answering import load_qa_chain
from langchain.prompts import PromptTemplate
from dotenv import load_dotenv
import time
load_dotenv()
api_key = os.getenv("GEMINI_KEY")

class RAG_PDF:
    def __init__(self, api_key):
        self.api_key = api_key
        genai.configure(api_key=api_key)
        self.embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
        self.vector_store = None

    def process_pdfs(self, pdf_docs):
        text = self._get_pdf_text(pdf_docs)
        chunks = self._get_text_chunks(text)
        self._create_vector_store(chunks)

    def _get_pdf_text(self, pdf_docs):
        text = ""
        for pdf in pdf_docs:
            pdf_reader = PdfReader(pdf)
            for page in pdf_reader.pages:
                text += page.extract_text()
        return text

    def _get_text_chunks(self, text):
        splitter = RecursiveCharacterTextSplitter(chunk_size=5000, chunk_overlap=1000)
        return splitter.split_text(text)

    def _create_vector_store(self, chunks):
        self.vector_store = FAISS.from_texts(chunks, embedding=self.embeddings)
        self.vector_store.save_local("faiss_index")

    def _get_context(self, user_question, k=1):
        if not self.vector_store:
            self.vector_store = FAISS.load_local("faiss_index", self.embeddings, allow_dangerous_deserialization=True)

        docs = self.vector_store.similarity_search(user_question, k=k)
        context = "\n".join([doc.page_content for doc in docs])
        return context

    def query(self, user_question, k=1):
        context = self._get_context(user_question, k)
        return context



