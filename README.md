# RACOS: AI-Routed Chat-Voice Admission Consulting Support System

### Thanh Ma, The-Khanh Chau, Phu-An Thai, Tri-Min Tram, Khuong Huynh, and Thanh-Nghi Do (CICT, Can Tho University, Vietnam)
#### {mtthanh,hgkhuong,dtnghi}@ctu.edu.vn, {khanhb2207528,anb2207512,minb2207541}@student.ctu.edu.vn


## Abstract. 
Admission counseling is crucial for guiding parents and students in future planning. Each institution uses a tailored dataset for its counseling system. Leveraging Large Language Models (e.g., ChatGPT, Gemini) and machine learning algorithms, we develope RACOS, an AI-Routed chat-voice framework for Admission COunseling Support at Can Tho University. This framework employs a tiered model to differentiate between general and institution-specific information. General queries are handled by the LLM, while specific inquiries are addressed using customized strategies. We create six response models for five specialized faculties and one for CTU’s general knowledge (a.k.a. a semantic router). The system first performs binary classification, then uses major-specific models for detailed responses. Our experiments showed 99.32% accuracy for the first tier and 99.87% for the second tier. We also develop a web application for model deployment.


## Keywords: 
Support Admissions · Artificial Intelligence · Chat-Voice · Speech Recognition· Text Classification · RAG

## Technologies Used:
- Python 3.10.x
- Django 4.2
- Next.js
- React