from django.shortcuts import render
from django.http import JsonResponse
from rest_framework import status
from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response
from rest_framework import generics
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny,IsAuthenticated,IsAdminUser
from .models import Song,Users
from .serializers import SongSerializer,RegisterSerializer
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
@permission_classes([IsAdminUser])
def addSong(request):
    serializer=SongSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data,status=status.HTTP_201_CREATED)
    return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(["POST"])
def searchSongs(request):
    songs=Song.objects.filter(title__contains=request.data["title"])
    serializer=SongSerializer(songs,many=True)

    return JsonResponse(serializer.data,safe=False)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getLikedSongs(request):
    try:
        user=Users.objects.get(user=request.user)
    except Users.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    likedSongs=user.likedSongs.all()
    serializer=SongSerializer(likedSongs,many=True)
    return Response(serializer.data,status=status.HTTP_200_OK)

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def addToLikedSongs(request):
    data=request.data
    try:
        user=Users.objects.get(user=request.user)
        song=Song.objects.get(pk=data['songId'])
    except Users.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    except Song.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    user.likedSongs.add(song)
    return Response({"message":"added succesfully"},status=status.HTTP_200_OK)

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def deleteFromLikedSongs(request):
    data=request.data
    try:
        user=Users.objects.get(user=request.user)
        song=Song.objects.get(pk=data['songId'])
    except Users.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    except Song.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    user.likedSongs.remove(song)
    return Response({"message":"delete succesfully"},status=status.HTTP_200_OK)

class RegisterView(generics.CreateAPIView):
    ori_user_set = User.objects.all()
    my_user_set = Users.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer