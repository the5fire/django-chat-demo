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
        url:'/say/',
        defualts: {
            content:'',
            username:'',
            date:''
        }
    });
    
    var ChatList = Backbone.Collection.extend({
        url:'/chatlog/',
        model:Chat
    });
    
    var chatList = new ChatList;
    var chatListOld = new ChatList;
    
    var ChatView = Backbone.View.extend({
        tagName:'li',
        template:_.template($('#item-template').html()),
        
        initialize:function(){
            _.bindAll(this,'render');
            this.model.bind('change', this.render);
        },
        
        render: function(){
            $(this.el).html(this.template(this.model.toJSON()));
            return this;
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
                chatList.fetch({date:{page:1}}); 
            }, 10000);
        },
        
        addOne: function(chat) {
            var view = new ChatView({model:chat});
            this.$(".chat_list").append(view.render().el);
        },
        
        addAll: function() {
            chatList.each(this.addOne);
            chatListOld = chatList;
        },
        
        say: function() {
            chatList.create(this.newAttributes());
            this.textarea.html('');
        },
        
        newAttributes: function() {
            return {
              content: 'text',
              username: this.nickname.val(),
              date: get_time()
            };
        }
    });
    
    var appView = new AppView;
});
