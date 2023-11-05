from django.contrib.auth.models import User, Group
from rest_framework.decorators import api_view, permission_classes
from rest_framework import viewsets
from rest_framework import permissions
from Api.serializers import UserSerializer, GroupSerializer
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated]


#temporary endpoint for POC

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def fetch_trials(request):
    query_params = request.query_params
    #use for trial api request
    age = query_params.get("age")
    gender = query_params.get("gender")
    return Response({"age": age, "gender": gender})
