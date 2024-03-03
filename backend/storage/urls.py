from django.urls import path

from .views import (
    ListCreateFolders,
    RetrieveUpdateDestroyFolders,
    ListCreateFiles,
    RetrieveUpdateDestroyFiles,
)


urlpatterns = [
    path(
        "list-create-folders/",
        ListCreateFolders.as_view(),
        name="list-create-folder"
    ),
    path(
        "retrieve-update-destroy-folders/<str:folder_id>/",
        RetrieveUpdateDestroyFolders.as_view(),
        name="retrieve-update-destroy-folders"
    ),
    path(
        "list-create-files/",
        ListCreateFiles.as_view(),
        name="list-create-files"
    ),
    path(
        "retrieve-update-destroy-files/<str:file_id>/",
        RetrieveUpdateDestroyFiles.as_view(),
        name="retrieve-update-destroy-files"
    ),
]