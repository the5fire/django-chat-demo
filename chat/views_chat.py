#coding=utf-8
'''
    author:the5fire
    blog:http://www.the5fire.net
    date:2012-4-09
'''
from .models import Chat
from django.http import HttpResponse
from django.shortcuts import render_to_response
from django.utils import simplejson
import time

'''
public
@desc 页面载入或者刷新的时候，重置记录指针为0
@return
'''
def loadpage(request):
    request.session['record_offset'] = 0
    return render_to_response('chat/chat.html',{})

'''
public
@desc 简单的控制添加和查询
'''
def chat(request):
    if request.method == 'POST':
        return say(request)
    elif request.method == 'GET':
        return chatAllLog(request)
    else:
        return HttpResponse('<h1>access deny</h1>')

'''
public
@desc 删除指定条目
'''
def chatDelete(request,delete_id):
    Chat.objects.get(id=delete_id).delete()
    record_offset = request.session.get('record_offset')
    request.session['record_offset'] = record_offset - 1
    return HttpResponse(simplejson.dumps({'success':True}), mimetype = 'application/json')

'''
public
@desc 保存用户的消息到数据库中
@param POST中的，username和content
'''
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


'''
public
@desc 根据session中的record_offset的数值获取以该数值为起始的所有记录
@return 返回对应的对象的字典形式
'''
def chatAllLog(request):
    if 'record_offset' in request.session:
        record_offset = request.session.get('record_offset')
    else:
        record_offset = 0
        request.session['record_offset'] = 0

    chatList = Chat.objects.all()[record_offset:]
    chatlist_dict = []

    request.session['record_offset'] = len(chatList) + record_offset

    for chat in chatList:
        chatlist_dict.append({'id':chat.id,'content':chat.content,
                              'username':chat.username,
                              'date':str(chat.date).split('.')[0]
                              })

    return HttpResponse(simplejson.dumps(chatlist_dict), mimetype = 'application/json')
