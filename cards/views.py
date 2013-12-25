from django.shortcuts import render
from django.http import HttpResponse
from django.core import serializers
from cards.models import Card

# Create your views here.
def index(request):
  return HttpResponse("hello world.")

def detail(request, id):
  return render(request, 'cards/card.html', {'id': id})

def json(request, id):
  card = Card.objects.get(pk=id)
  if request.method == 'POST':
    card.graphics = request.POST['graphics']
    card.save();
    return HttpResponse('OK')
  else:
    serialized = serializers.serialize('json', [card])
    return HttpResponse(serialized, mimetype='application/json')