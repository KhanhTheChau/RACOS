import sys
import os
from django.core.wsgi import get_wsgi_application

# Đặt đường dẫn tới thư mục chứa dự án
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# Cấu hình môi trường Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
application = get_wsgi_application()

from user.models import User
from user.serializers import UserSerializer

def create_user(username, password, department):
    # Tạo đối tượng serializer với dữ liệu người dùng
    serializer = UserSerializer(data={
        'username': username,
        'password': password,
        'department': department
    })
    
    # Kiểm tra tính hợp lệ của dữ liệu
    if serializer.is_valid():
        # Lưu người dùng mới vào cơ sở dữ liệu
        user = serializer.save()
        print(f'User created successfully: {user}')
    else:
        # In ra lỗi nếu dữ liệu không hợp lệ
        print('Error creating user:', serializer.errors)

# Ví dụ tạo người dùng mới
create_user('adtcntt', '123456789', 'Trường CNTT&TT')