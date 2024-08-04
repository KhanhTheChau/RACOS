import pymongo
import google.generativeai as genai
# from IPython.display import Markdown
import textwrap
from sentence_transformers import SentenceTransformer

embedding_model = SentenceTransformer("thenlper/gte-large")

def get_embedding(text: str) -> list[float]:
    if not text.strip():
        print("Attempted to get embedding for empty text.")
        return []
    embedding = embedding_model.encode(text)
    return embedding.tolist()

class RAG:
    def __init__(self,
                 mongodbUri: str,
                 dbName: str,
                 dbCollection: str,
                 llmApiKey: str,
                 llmName: str ='gemini-1.5-pro',
                ):
        self.client = pymongo.MongoClient(mongodbUri)
        self.db = self.client[dbName]
        self.collection = self.db[dbCollection]
        # Configure LLM
        genai.configure(api_key=llmApiKey)
        self.llm = genai.GenerativeModel(llmName)

    def get_embedding(self, text):
        print("-Embeding...")
        return get_embedding(text)

    def vector_search(self, user_query: str, limit=5):
        query_embedding = self.get_embedding(user_query)
        # print(f"Query Embedding: {query_embedding}")
        print("-Searching...")
        if not query_embedding:
            print("Invalid query or embedding generation failed.")
            return []

        pipeline = [
            {
                "$vectorSearch": {
                    "index": "vector_index",
                    "path": "embedding",
                    "queryVector": query_embedding,
                    "numCandidates": 100,
                    "limit": limit
                }
            },
            {
                "$project": {
                    "_id": 0,
                    "stt": 1,
                    "ma_nganh": 1,
                    "ten_nganh": 1,
                    "to_hop": 1,
                    "diem_chuan_hoc_ba": 1,
                    "diem_chuan_thpt": 1,
                    "chi_tieu": 1,
                    "hoc_phi": 1,
                    "score": {"$meta": "vectorSearchScore"}
                }
            }
        ]

        results = list(self.collection.aggregate(pipeline))
        # print(f"Search Results: {results}")

        return results

    def enhance_prompt(self, query):
        get_knowledge = self.vector_search(query, 5)
        if not get_knowledge:
            return "Không tìm thấy thông tin liên quan."

        enhanced_prompt = ""
        for i, result in enumerate(get_knowledge, 1):
            enhanced_prompt += f"\n{i}) Tên ngành: {result.get('ten_nganh', 'N/A')}"
            enhanced_prompt += f", Mã ngành: {result.get('ma_nganh', 'N/A')}"
            enhanced_prompt += f", Tổ hợp: {result.get('to_hop', 'N/A')}"
            enhanced_prompt += f", Điểm chuẩn học bạ: {result.get('diem_chuan_hoc_ba', 'N/A')}"
            enhanced_prompt += f", Điểm chuẩn THPT: {result.get('diem_chuan_thpt', 'N/A')}"
            enhanced_prompt += f", Chỉ tiêu: {result.get('chi_tieu', 'N/A')}"
            enhanced_prompt += f", Học phí: {result.get('hoc_phi', 'N/A')}"

        print(f"Enhanced Prompt: {enhanced_prompt}")
        return enhanced_prompt

    def generate_content(self, prompt):
        return self.llm.generate_content(prompt, stream=True)
    

