from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse

from ProductCatalogApp.models import Products
from ProductCatalogApp.serializers import ProductSerializer

from django.core.files.storage import default_storage

# Create your views here.

@csrf_exempt
def productApi(request,id=0):
    if request.method=='GET':
        products = Products.objects.all()
        products_serializer=ProductSerializer(products,many=True)
        return JsonResponse(products_serializer.data,safe=False)
    elif request.method=='POST':
        product_data=JSONParser().parse(request)
        print("product_data:", product_data)
        products_serializer=ProductSerializer(data=product_data)
        print(products_serializer.is_valid())
        if products_serializer.is_valid():
            products_serializer.save()
            return JsonResponse("Added Successfully",safe=False)
        return JsonResponse("Failed to Add",safe=False)
    elif request.method=='PUT':
        product_data=JSONParser().parse(request)
        product=Products.objects.get(id=product_data['id'])
        products_serializer=ProductSerializer(product,data=product_data)
        if products_serializer.is_valid():
            products_serializer.save()
            return JsonResponse("Updated Successfully",safe=False)
        return JsonResponse("Failed to Update")
    elif request.method=='DELETE':
        product=Products.objects.get(id=id)
        product.delete()
        return JsonResponse("Deleted Successfully",safe=False)

