import pandas as pd
from sklearn.model_selection import train_test_split

# Đọc dữ liệu từ file CSV vào DataFrame
df = pd.read_csv('data.csv')

# Tách dữ liệu thành tập huấn luyện và tập kiểm tra
train_df, test_df = train_test_split(df, test_size=0.2, random_state=42)

# Lưu tập huấn luyện vào file train.csv
train_df.to_csv('train.csv', index=False)

# Lưu tập kiểm tra vào file test.csv
test_df.to_csv('test.csv', index=False)

print("Đã tách và lưu file thành công.")
