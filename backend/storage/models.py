import uuid

from django.db import models


class Timestamp(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Folder(Timestamp):
    name = models.CharField(max_length=250, unique=True)
    folder_id = models.UUIDField(
        unique = True,
        default = uuid.uuid4,
        editable = False
    )


    class Meta:
        ordering = ("name", )

    def __str__(self) -> str:
        return self.name
    


class File(Timestamp):
    folder = models.ForeignKey(
        Folder,
        related_name="files",
        on_delete=models.CASCADE
    )
    name = models.CharField(max_length=250)
    file_id = models.UUIDField(
        unique = True,
        default = uuid.uuid4,
        editable = False
    )
    file = models.FileField(upload_to="media")

    class Meta:
        unique_together = ("folder", "name", )

    def __str__(self) -> str:
        return self.name