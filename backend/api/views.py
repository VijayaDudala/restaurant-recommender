import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Restaurant, Rating
from .serializers import RestaurantSerializer, RatingSerializer
from django.contrib.auth.models import User
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes

from sklearn.feature_extraction.text import CountVectorizer




@api_view(['POST'])
def register_user(request):
    username = request.data.get('username')
    password = request.data.get('password')

    user = User.objects.create_user(username=username, password=password)
    return Response({"message": "User created"})

# ✅ GET all restaurants
@api_view(['GET'])
def get_restaurants(request):
    restaurants = Restaurant.objects.all()
    serializer = RestaurantSerializer(restaurants, many=True)
    return Response(serializer.data)




@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_rating(request):
    serializer = RatingSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(user=request.user)
        return Response({"message": "Rating added"})
    return Response(serializer.errors)


@api_view(['GET'])
def recommend_restaurants(request):
    user_id = request.GET.get('user_id')

    # get user's high-rated restaurants
    user_ratings = Rating.objects.filter(user_id=user_id, score__gte=4)

    if not user_ratings.exists():
        return Response({"message": "No ratings yet"})

    # get all restaurants
    restaurants = Restaurant.objects.all()
    df = pd.DataFrame(list(restaurants.values()))

    # combine features
    df['features'] = df['cuisine'] + " " + df['location']

    vectorizer = CountVectorizer()
    vectors = vectorizer.fit_transform(df['features'])

    similarity = cosine_similarity(vectors)

    # get indices of liked restaurants
    liked_ids = [r.restaurant.id for r in user_ratings]
    indices = df[df['id'].isin(liked_ids)].index

    similar_indices = set()

    for idx in indices:
        scores = list(enumerate(similarity[idx]))
        scores = sorted(scores, key=lambda x: x[1], reverse=True)[1:5]

        for i in scores:
            similar_indices.add(i[0])

    recommended = df.iloc[list(similar_indices)]

    restaurants = Restaurant.objects.filter(id__in=recommended['id'])
    serializer = RestaurantSerializer(restaurants, many=True)

    return Response(serializer.data)