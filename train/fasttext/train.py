import re
import fasttext
from sklearn.model_selection import train_test_split

# Danh sách stopwords tiếng Việt
stopwords = [
    # "ngành","điểm chuẩn","chỉ tiêu"
]

# Hàm tiền xử lý văn bản
def preprocess_text(text):
    text = text.lower()  # Chuyển về chữ thường
    text = re.sub(r'\d+', '', text)  # Loại bỏ chữ số
    text = re.sub(r'\s+', ' ', text)  # Loại bỏ khoảng trắng thừa
    text = re.sub(r'[^\w\s]', '', text)  # Loại bỏ dấu câu
    # Loại bỏ stopwords
    text = ' '.join([word for word in text.split() if word not in stopwords])
    return text

# Đọc dữ liệu từ file txt
def read_data(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        lines = file.readlines()
    return [line.strip() for line in lines]

# Tải và tiền xử lý bộ dữ liệu
data_path = './data/tkt.txt'
data = read_data(data_path)

# Tiền xử lý dữ liệu
processed_data = []
for line in data:
    parts = line.split(' ', 1)
    if len(parts) == 2:
        label, text = parts
        processed_text = preprocess_text(text)
        processed_data.append(f"{label} {processed_text}")

# Chia dữ liệu thành tập huấn luyện và kiểm tra
train_data, test_data = train_test_split(processed_data, test_size=0.05, random_state=42)

# Lưu dữ liệu đã tiền xử lý vào các file
train_data_path = './content/train_data_tkt.txt'
test_data_path = './content/test_data_tkt.txt'

with open(train_data_path, 'w', encoding='utf-8') as f:
    f.write('\n'.join(train_data))

with open(test_data_path, 'w', encoding='utf-8') as f:
    f.write('\n'.join(test_data))

# Train mô hình
model = fasttext.train_supervised(input=train_data_path, epoch=100, lr=1.0, wordNgrams=3, verbose=2, minCount=1, dim=100)

# Lưu mô hình
model.save_model('./models/fasttext_model_tkt.bin')