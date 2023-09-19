from django.shortcuts import render
from django.http import JsonResponse
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Song
from .serializers import SongSerializer
# Create your views here.

@api_view(["GET"])
def songList(request):
    songs=Song.objects.all()
    serializer=SongSerializer(songs,many=True)

    return JsonResponse(serializer.data,safe=False)

@api_view(["GET","DELETE","PUT"])
def singleSong(request,id):
    try:
        song = Song.objects.get(pk=id)
    except Song.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method=="GET":
        serializer=SongSerializer(song)
        return Response(serializer.data)
    elif request.method=="PUT":
        serializer=SongSerializer(song,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(status=status.HTTP_400_BAD_REQUEST)
    elif request.method=="DELETE":
        song.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(["POST"])
def addSong(request):
    serializer=SongSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data,status=status.HTTP_201_CREATED)
    return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(["POST"])
def searchSongs(request):
    songs=Song.objects.get(title__contains=request.data.title)
    serializer=SongSerializer(songs,many=True)

    return JsonResponse(serializer.data,safe=False)