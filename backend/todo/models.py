from django.db import models

# Models for todo 
class Todo(models.Model):
    title=models.CharField(max_length=200)
    description = models.TextField()
    completed = models.BooleanField(default=False)
    due_date = models.DateField()
    created_date=models.DateField(auto_now_add=True)

    def __str__(self):
        return self.title

