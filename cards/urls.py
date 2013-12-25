from django.conf.urls import patterns, url
from cards import views

urlpatterns = patterns('',
  url(r'^$', views.index, name='index'),
  url(r'^(?P<id>\d+)/$', views.detail, name='detail'),
  url(r'^(?P<id>\d+)/j$', views.json, name='detail'),
)