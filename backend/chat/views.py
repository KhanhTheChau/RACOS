from chat.rag.core import RAG
from dotenv import load_dotenv 
import os
from chat.classification import Classification
import time

load_dotenv()
MONGODB_URI = os.getenv('MONGODB_URI')
DB_NAME = os.getenv('DB_NAME')
LLM_KEY = os.getenv('GEMINI_KEY')
DB_COLLECTION_TKT = os.getenv('DB_COLLECTION_TKT')
DB_COLLECTION_TBK = os.getenv('DB_COLLECTION_TBK')
DB_COLLECTION_CHUNG = os.getenv('DB_COLLECTION_CHUNG')

rag_TKT = RAG(
    mongodbUri=MONGODB_URI, 
    dbName=DB_NAME,
    dbCollection=DB_COLLECTION_TKT,
    llmApiKey=LLM_KEY,
)
rag_TBK = RAG(
    mongodbUri=MONGODB_URI, 
    dbName=DB_NAME,
    dbCollection=DB_COLLECTION_TBK,
    llmApiKey=LLM_KEY,
)
rag_CHUNG = RAG(
    mongodbUri=MONGODB_URI, 
    dbName=DB_NAME,
    dbCollection=DB_COLLECTION_CHUNG,
    llmApiKey=LLM_KEY,
)

from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from chat.closest_sentence import search_sentence_cntt, search_sentence_bk, search_sentence_kt, search_sentence_dhct
layer = Classification()

def template(query, source_information):
    return f"Hãy trở thành chuyên gia tư vấn tuyển sinh cho trường Đại học Cần Thơ. \
            Câu hỏi của người dùng: {query}\nTrả lời câu hỏi dựa vào các thông tin về ngành dưới đây: {source_information}. \
            Nếu không có thông tin thì trả lời: 'Thông tin đang được cập nhật, vui lòng xem chi tiết tại: https://tuyensinh.ctu.edu.vn/', \
            không được đưa ra thông tin sai"

def template_rieng(query, source_information):
    return f"Hãy trở thành chuyên gia tư vấn tuyển sinh cho trường Đại học Cần Thơ. \
            Câu hỏi của người dùng: {query}\nTrả lời câu hỏi dựa vào các thông tin về ngành dưới đây: {source_information}."
            
@api_view(['POST'])
def get_query(request):
    if request.method == 'POST':
        query = request.data["prompt"]
        print("===========================================================================")
        print(f"\n{query}\n")
        start = time.time()
        intent_name = layer.get_intent_name_2lop(query)
        print(f"\nThời gian phân 2 lớp: {time.time() - start}\n")

        
        start_time_info = time.time()
        if (intent_name == "__label__RIENG"):
            start_rieng = time.time()
            intent_name = layer.get_intent_name_DHCT(query)
            print(f"\nThời gian phân 6 lớp: {time.time() - start_rieng}\n")
            
            if (intent_name == "__label__TKT"):
                start_2lop = time.time()
                intent_name = layer.get_intent_name_TKT(query)
                print(f"Thời gian phân loại 2 lớp: {time.time()-start_2lop}")
                if (intent_name == "__label__info_figure"):
                    source_information = rag_TKT.enhance_prompt(query)
                    combined_information = template(query, source_information)
                    
                else:
                    source_information = search_sentence_kt(query)
                    combined_information = template_rieng(query, source_information)

            
            elif (intent_name == "__label__TBK"):
                start_2lop = time.time()
                intent_name = layer.get_intent_name_TBK(query)
                print(f"Thời gian phân loại 2 lớp: {time.time()-start_2lop}")
                if (intent_name == "__label__info_figure"):
                    source_information = rag_TBK.enhance_prompt(query)
                    combined_information = template(query, source_information)
                else:
                    source_information = search_sentence_bk(query)
                    combined_information = template_rieng(query, source_information)
                
            elif (intent_name == "__label__TCNTTTT"):
                start_2lop = time.time()
                intent_name = layer.get_intent_name_TCNTTTT(query)
                print(f"Thời gian phân loại 2 lớp: {time.time()-start_2lop}")
                if (intent_name == "__label__info_figure"):
                    source_information = rag_CHUNG.enhance_prompt(query)
                    combined_information = template(query, source_information)
                else:
                    source_information = search_sentence_cntt(query)
                    combined_information = template_rieng(query, source_information) 
            
            else:
                print(f"\n{intent_name}\n")
                start_2lop = time.time()
                source_information = search_sentence_dhct(query)
                print(f"Thời gian phân loại 2 lớp: {time.time()-start_2lop}")
                combined_information = template_rieng(query, source_information)
        
        else:
            combined_information = f"Hãy trở thành chuyên gia tư vấn tuyển sinh cho trường Đại học Cần Thơ, bạn tên là CAAS. Hãy trả lời câu hỏi sau đây: {query} một cách ngắn gọn."  
       
        print(f"\nThời gian Tổng hợp thông tin: {time.time() - start_time_info}\n")
        
        # add_information = rag_CHUNG.enhance_prompt(query)   
        # combined_information = combined_information + ". Cho biết thêm 1 số thông tin sau: " + add_information
        print("\nThời gian cuối: ", time.time()-start)
        
        return Response({
                    "message": "successful",
                    "answer": combined_information,
                    "success": True
                }, status=status.HTTP_200_OK)



# model = fasttext.load_model('./chat/models/fasttext_model_tcntttt.bin')
# @api_view(['POST'])
# def get_query_simple(request):
#     if request.method == 'POST':
#         query = request.data["prompt"]
#         print(query)

#         start = time.time()
#         labels, probabilities = model.predict(query)
#         print("Thời gian phân lớp: ", time.time() - start)
#         print(f'Predicted label: {labels[0]}')
#         print(f'Probability: {probabilities[0]}')
        
#         if (labels[0] in "__label__info_figure"):
#             source_information = rag_CHUNG.enhance_prompt(query)
#             combined_information = f"Hãy trở thành chuyên gia tư vấn tuyển sinh cho trường Đại học Cần Thơ. \
#             Câu hỏi của người dùng: {query}\nTrả lời câu hỏi dựa vào các thông tin về ngành dưới đây: {source_information}. \
#             Nếu không có thông tin thì trả lời: 'Thông tin đang được cập nhật, vui lòng xem chi tiết tại: https://tuyensinh.ctu.edu.vn/', \
#             không được đưa ra thông tin sai"
#         else:
#             combined_information = f"Hãy trả lời câu hỏi sau đây: {query} một cách ngắn gọn."
            
#         print("Thời gian trích xuất thông tin: ", time.time() - start)

        
#         return Response({
#                     "message": "successful",
#                     "answer": combined_information,
#                     "success": True
#                 }, status=status.HTTP_200_OK)
