#encoding=utf-8
'''
    author:the5fire
    blog:http://www.the5fire.net
    date:2012-4-6
'''
from django.conf.urls.defaults import patterns, include, url
from django.views.generic.simple import direct_to_template
import settings
from chat import views_chat

urlpatterns = patterns('',
     (r'^site_media/(?P<path>.*)$', 'django.views.static.serve',{'document_root': settings.STATIC_DOC_ROOT,'show_indexes': False}),
     (r'^chat/$', views_chat.chat),    # 注意与前端代码关联: chat.js 中 ChatList() 对应
     (r'^chat/(\w+)$', views_chat.chatDelete),
     (r'^$', views_chat.loadpage),
)
