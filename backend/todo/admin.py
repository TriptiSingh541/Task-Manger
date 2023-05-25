from django.contrib import admin
from .models import Todo

class TodoAdmin(admin.ModelAdmin):
    list_display=("title","description","completed","due_date","created_date")


#Register model 

admin.site.register(Todo,TodoAdmin)    

