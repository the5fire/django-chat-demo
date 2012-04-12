#coding=utf-8
'''
    author:the5fire
    blog:http://www.the5fire.net
    date:2012-4-09
'''
from models import Chat
from django.http import HttpResponse
from django.shortcuts import render_to_response
from django.utils import simplejson
import time

def say(request):
    req = simplejson.loads(request.raw_post_data)
    username = req['username']
    content = req['content']
    
    if not content:
        return HttpResponse(simplejson.dumps({'success':False}), mimetype = 'application/json')
        
    chat = Chat()
    chat.content = content
    chat.username = username
    chat.save()
    
    return HttpResponse(simplejson.dumps({'success':True}), mimetype = 'application/json')
 

def chatLog(request,dateOffset):
    pass

def chatAllLog(request):
    chatList = Chat.objects.all()
    chatlist_dict = []
    
    for chat in chatList:
        chatlist_dict.append({'id':chat.id,'content':chat.content,
                              'username':chat.username,
                              'date':str(chat.date).split('.')[0]
                              })

    return HttpResponse(simplejson.dumps(chatlist_dict), mimetype = 'application/json')