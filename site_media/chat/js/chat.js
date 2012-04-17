/*
    author:the5fire
    blog:http://www.the5fire.net
    date:2012-04-10
*/
function  get_time()
    {
        var today,hour,second,minute,year,month,date,time;
          
        today=new Date();
      
        year = today.getFullYear();
        month = today.getMonth()+1;
        date = today.getDate();
        hour = today.getHours();
        minute =today.getMinutes();
        second = today.getSeconds();
        if(minute < 10) minute = '0' + minute;
        if(second < 10) second = '0' + second;
        time = year + "-" + month + "-" + date +" " + hour + ":" + minute + ":" + second;
        return time;
    }
    function show_time(){
        $("#nowdate").html(get_time());
    }
    setInterval(show_time,1000);
    
$(function(){
    var Chat = Backbone.Model.extend({
        urlRoot:'',
        defualts: {
            content:'',
            username:'',
            date:''
        },
        clear: function(){
            this.destroy();
        }
    });
    
    var ChatList = Backbone.Collection.extend({
        url:'/chat/',
        model:Chat
    });
    
    var chatList = new ChatList;
    
    var ChatView = Backbone.View.extend({
        tagName:'li',
        template:_.template($('#item-template').html()),
        
        events:{
            'click #destroy' : 'clear'
        },
        
        initialize:function(){
            _.bindAll(this,'render','remove');
            this.model.bind('change', this.render);
            this.model.bind('destroy', this.remove)
        },
        
        render: function(){
            $(this.el).html(this.template(this.model.toJSON()));
            return this;
        },
        
        clear: function(){
            this.model.clear();
        }
    });
    
    var AppView = Backbone.View.extend({
        el:$('.main'),
        
        events: {
            "click #send": "say"
        },
        
        initialize: function() {
            _.bindAll(this,'addOne','addAll');
            this.nickname = this.$('#nickname');
            this.textarea = this.$("#content");
            
            chatList.bind('add', this.addOne);
            chatList.bind('reset', this.addAll);
            
            chatList.fetch();
            setInterval(function() {
                chatList.fetch({add: true});
            }, 5000);
        },
        
        addOne: function(chat) {
            //页面所有的数据都来源于server端，如果不是server端的数据，不应添加到页面上
            if(!chat.isNew()) {  
                var view = new ChatView({model:chat});
                this.$(".chat_list").append(view.render().el);
                $('#screen').scrollTop($(".chat_list").height() + 200);
            }
        },
        
        addAll: function() {
            chatList.each(this.addOne);
        },
        
        say: function(event) {
            chatList.create(this.newAttributes());
            //为了满足IE和FF以及chrome
            this.textarea.text('');
            this.textarea.val('');
            this.textarea.html('');
        },
        
        newAttributes: function() {
            var content = this.textarea.val();
            if (content == '') {
                content = this.textarea.text();
            }
            
            return {
              content: content,
              username: this.nickname.val(),
              date: get_time()
            };
        }
    });
    
    var appView = new AppView;
});
