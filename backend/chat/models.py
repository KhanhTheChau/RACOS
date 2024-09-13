from django.db import models

class Query(models.Model):
    id = models.AutoField(primary_key=True)
    question = models.CharField(max_length=255)
    intent = models.CharField(max_length=100)
    information = models.TimeField(max_length=500)
    
    def __str__(self):
        return self.question
