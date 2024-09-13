import os
from chat.rag.ragpdf import RAG_PDF
from dotenv import load_dotenv
load_dotenv()
api_key = os.getenv("GEMINI_KEY")


pdf_docs_dhct = ["./chat/data/dhct.pdf", "./chat/data/ktx.pdf"]
pdf_docs_kt = ["./chat/data/cntt.pdf"]
pdf_docs_bk = ["./chat/data/cntt.pdf"]
pdf_docs_cntt = ["./chat/data/cntt.pdf"]
pdf_docs_nn = ["./chat/data/cntt.pdf"]
pdf_docs_mttntn = ["./chat/data/cntt.pdf"]

rag_pdf_dhct = RAG_PDF(api_key)
rag_pdf_kt = RAG_PDF(api_key)
rag_pdf_bk = RAG_PDF(api_key)
rag_pdf_cntt = RAG_PDF(api_key)
rag_pdf_nn = RAG_PDF(api_key)
rag_pdf_mttntn = RAG_PDF(api_key)

rag_pdf_dhct.process_pdfs(pdf_docs_dhct)
rag_pdf_kt.process_pdfs(pdf_docs_kt)
rag_pdf_bk.process_pdfs(pdf_docs_bk)
rag_pdf_cntt.process_pdfs(pdf_docs_cntt)
rag_pdf_nn.process_pdfs(pdf_docs_nn)
rag_pdf_mttntn.process_pdfs(pdf_docs_mttntn)



import time
def search_sentence_dhct(query):
    
    start_time = time.time()
    response = rag_pdf_dhct.query(query)
    print(response)
    
    print("Thời gian tìm câu trong pdf:", time.time() - start_time, "seconds")
    
    return response


def search_sentence_cntt(query):
    
    start_time = time.time()
    response = rag_pdf_dhct.query(query)
    print(response)
    
    print("Thời gian tìm câu trong pdf:", time.time() - start_time, "seconds")
    
    return response
def search_sentence_bk(query):
    
    start_time = time.time()
    response = rag_pdf_bk.query(query)
    print(response)
    
    print("Thời gian tìm câu trong pdf:", time.time() - start_time, "seconds")
    
    return response

def search_sentence_kt(query):
    
    start_time = time.time()
    response = rag_pdf_kt.query(query)
    print(response)
    
    print("Thời gian tìm câu trong pdf:", time.time() - start_time, "seconds")
    
    return response

def search_sentence_nn(query):
    
    start_time = time.time()
    response = rag_pdf_nn.query(query)
    print(response)
    
    print("Thời gian tìm câu trong pdf:", time.time() - start_time, "seconds")
    
    return response


def search_sentence_mttntn(query):
    
    start_time = time.time()
    response = rag_pdf_mttntn.query(query)
    print(response)
    
    print("Thời gian tìm câu trong pdf:", time.time() - start_time, "seconds")
    
    return response