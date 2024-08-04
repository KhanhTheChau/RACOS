import fasttext

model = fasttext.load_model('./models/fasttext_model_dhct.bin')

# Evaluate the model on the training data (or use a separate validation dataset if available)
nexamples, precision, recall = model.test("./content/test_data_dhct.txt")

# Print evaluation results
print(f'Precision: {precision}')
print(f'Recall: {recall}')
print(f'Number of examples: {nexamples}')

# Đưa câu vào để kiểm tra và phân loại
import time
start = time.time()
test_sentence = "chỉ tiêu ngành cơ khí ô tô lấy bao nhiêu"
labels, probabilities = model.predict(test_sentence)

# In kết quả phân loại
print(f'Sentence: {test_sentence}')
print(f'Predicted label: {labels[0]}')
print(f'Probability: {probabilities[0]}')
print("Thời gian: ", time.time() - start)