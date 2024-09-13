import sys
import os
from django.core.wsgi import get_wsgi_application

# Đặt đường dẫn tới thư mục chứa dự án
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# Cấu hình môi trường Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
application = get_wsgi_application()

from chat.models import Query

# Lấy tất cả các bản ghi trong bảng Query
queries = Query.objects.all()

# In ra tất cả các bản ghi
for query in queries:
    print(query.id, query.question, query.intent, query.information)
