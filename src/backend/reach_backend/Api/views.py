from django.contrib.auth.models import User, Group
from rest_framework.decorators import api_view
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from Api.serializers import UserSerializer, GroupSerializer
from Api.trial_fetcher import TrialFetcher

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
def fetch_trials(request):
    query_params = request.query_params
    #use for trial api request
    age = int(query_params.get("age", 0))
    address = query_params.get("address", None)
    condition = query_params.get("condition")
    trials = TrialFetcher.search_studies(conditions=[condition], age=age, address=address)
    return Response(trials)
