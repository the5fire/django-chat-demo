'''
    author:the5fire
    blog:http://www.the5fire.net
    date:2012-4-6
'''
from django.conf.urls.defaults import patterns, include, url
from django.views.generic.simple import direct_to_template
import settings
from webchat.chat import views_chat
# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()

urlpatterns = patterns('',
     (r'^site_media/(?P<path>.*)$', 'django.views.static.serve',{'document_root': settings.STATIC_DOC_ROOT,'show_indexes': False}),
     (r'^say/$', views_chat.say),
     (r'^chatlog/$', views_chat.chatAllLog),
     (r'^chatlog/(\w+)/$', views_chat.chatLog),
     (r'^$', direct_to_template, {'template': 'chat/chat.html'}),
)