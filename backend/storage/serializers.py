from rest_framework import serializers

from .models import (
    Folder,
    File
)


class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = File
        fields = ("id", "folder", "name", "file_id", "file", "created_at", "updated_at")


class FolderSerializer(serializers.ModelSerializer):
    files = serializers.SerializerMethodField(method_name="get_files", read_only=True)

    class Meta:
        model = Folder
        fields = ("id", "name", "folder_id", "files", )

    def get_files(self, obj):
        qs = obj.files.all()
        files = FileSerializer(qs, many=True).data
        return files