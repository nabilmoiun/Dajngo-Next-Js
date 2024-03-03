from rest_framework import parsers
from rest_framework import generics
from rest_framework import permissions

from .models import (
    Folder,
    File
)
from .serializers import (
    FolderSerializer,
    FileSerializer
)


class ListCreateFolders(generics.ListCreateAPIView):
    model = Folder
    serializer_class = FolderSerializer
    queryset = Folder.objects.all()
    permission_classes = (permissions.AllowAny, )


class RetrieveUpdateDestroyFolders(generics.RetrieveUpdateDestroyAPIView):
    model = Folder
    serializer_class = FolderSerializer
    queryset = Folder.objects.all()
    permission_classes = (permissions.AllowAny, )
    lookup_field = "folder_id"


class ListCreateFiles(generics.ListCreateAPIView):
    model = File
    serializer_class = FileSerializer
    queryset = File.objects.all()
    permission_classes = (permissions.AllowAny, )
    parser_classes = (parsers.MultiPartParser, parsers.FormParser, )


class RetrieveUpdateDestroyFiles(generics.RetrieveUpdateDestroyAPIView):
    model = File
    serializer_class = FileSerializer
    queryset = File.objects.all()
    permission_classes = (permissions.AllowAny, )
    parser_classes = (parsers.MultiPartParser, parsers.FormParser, parsers.JSONParser, )
    lookup_field = "file_id"

    def put(self, request, *args, **kwargs):
        return super().put(request, partial=True, *args, **kwargs)

