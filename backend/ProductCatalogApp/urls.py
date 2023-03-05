from django.urls import re_path
from ProductCatalogApp import views

urlpatterns=[
    re_path(r'^product$',views.productApi),
    re_path(r'^product/([0-9]+)$',views.productApi),
]

