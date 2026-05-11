from django.urls import path
from . import views

urlpatterns = [
    path('restaurants/', views.get_restaurants),
    path('rate/', views.add_rating),
    path('recommend/', views.recommend_restaurants),
    path('register/', views.register_user),
]