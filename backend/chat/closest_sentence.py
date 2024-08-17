from transformers import AutoModel, AutoTokenizer
import torch
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
import pandas as pd
import faiss

# Load pre-trained PhoBERT model and tokenizer
model_name = './chat/vinai/phobert-base'
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModel.from_pretrained(model_name)

def encode_sentences(sentences):
    inputs = tokenizer(sentences, return_tensors='pt', truncation=True, padding=True, max_length=128)
    outputs = model(**inputs)
    # Get the embeddings of the [CLS] token
    embeddings = outputs.last_hidden_state[:, 0, :].detach().numpy()
    return embeddings

def find_closest_sentence(input_sentence, db_vectors):
    input_vector = encode_sentences([input_sentence])
    # Sử dụng FAISS để tìm kiếm vector gần nhất
    index = faiss.IndexFlatL2(db_vectors.shape[1])
    index.add(db_vectors)
    D, I = index.search(input_vector, 1)
    closest_index = I[0][0]
    return closest_index

# Read data from Excel file
data_file_dhct = './chat/data/dhct.xlsx'
data_file_kt = './chat/data/kt.xlsx'
data_file_bk = './chat/data/bk.xlsx'
data_file_cntt = './chat/data/cntt.xlsx'
data_file_nn = './chat/data/nn.xlsx'
data_file_mttntn = './chat/data/mttntn.xlsx'

df_dhct = pd.read_excel(data_file_dhct)
df_bk = pd.read_excel(data_file_bk)
df_kt = pd.read_excel(data_file_kt)
df_cntt = pd.read_excel(data_file_cntt)
df_nn = pd.read_excel(data_file_nn)
df_mttntn = pd.read_excel(data_file_mttntn)

database_sentences_dhct = df_dhct['questions'].astype(str).tolist()
database_sentences_bk = df_bk['questions'].astype(str).tolist()
database_sentences_kt = df_kt['questions'].astype(str).tolist()
database_sentences_cntt = df_cntt['questions'].astype(str).tolist()
database_sentences_nn = df_nn['questions'].astype(str).tolist()
database_sentences_mttntn = df_mttntn['questions'].astype(str).tolist()

# Encode all database sentences
db_vectors_dhct = encode_sentences(database_sentences_dhct)
db_vectors_bk = encode_sentences(database_sentences_bk)
db_vectors_kt = encode_sentences(database_sentences_kt)
db_vectors_cntt = encode_sentences(database_sentences_cntt)
db_vectors_nn = encode_sentences(database_sentences_nn)
db_vectors_mttntn = encode_sentences(database_sentences_mttntn)

# Example usage
import time
def search_sentence_dhct(query):
    
    start_time = time.time()
    closest_index = find_closest_sentence(query, db_vectors_dhct)
    closest_sentence = database_sentences_dhct[closest_index]
    info = df_kt.iloc[closest_index]['answers']
    
    
    print("Thời gian tìm câu gần nhất:", time.time() - start_time, "seconds")
    print(f"The closest sentence to '{query}' is '{closest_sentence}'")
    return info


def search_sentence_cntt(query):
    
    start_time = time.time()
    closest_index = find_closest_sentence(query, db_vectors_cntt)
    closest_sentence = database_sentences_cntt[closest_index]
    info = df_cntt.iloc[closest_index]['answers']
    
    print("Thời gian tìm câu gần nhất:", time.time() - start_time, "seconds")
    print(f"The closest sentence to '{query}' is '{closest_sentence}'")
    return info
def search_sentence_bk(query):
    
    start_time = time.time()
    closest_index = find_closest_sentence(query, db_vectors_bk)
    closest_sentence = database_sentences_bk[closest_index]
    info = df_bk.iloc[closest_index]['answers']
    
    
    print("Thời gian tìm câu gần nhất:", time.time() - start_time, "seconds")
    print(f"The closest sentence to '{query}' is '{closest_sentence}'")
    return info

def search_sentence_kt(query):
    
    start_time = time.time()
    closest_index = find_closest_sentence(query, db_vectors_kt)
    closest_sentence = database_sentences_kt[closest_index]
    info = df_kt.iloc[closest_index]['answers']
    
    
    print("Thời gian tìm câu gần nhất:", time.time() - start_time, "seconds")
    print(f"The closest sentence to '{query}' is '{closest_sentence}'")
    return info

def search_sentence_nn(query):
    
    start_time = time.time()
    closest_index = find_closest_sentence(query, db_vectors_kt)
    closest_sentence = database_sentences_nn[closest_index]
    info = df_kt.iloc[closest_index]['answers']
    
    
    print("Thời gian tìm câu gần nhất:", time.time() - start_time, "seconds")
    print(f"The closest sentence to '{query}' is '{closest_sentence}'")
    return info


def search_sentence_mttntn(query):
    
    start_time = time.time()
    closest_index = find_closest_sentence(query, db_vectors_kt)
    closest_sentence = database_sentences_mttntn[closest_index]
    info = df_kt.iloc[closest_index]['answers']
    
    
    print("Thời gian tìm câu gần nhất:", time.time() - start_time, "seconds")
    print(f"The closest sentence to '{query}' is '{closest_sentence}'")
    return info