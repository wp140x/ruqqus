
  var socket=io();

  $('#chatsend').click(function (event) {

    if (event.which != 1) {
      return
    }
    event.preventDefault();

    console.log('clicked')

    text = $('#input-text').val()
    guild=$('#guildname').val()

    socket.emit('speak', {text: text, guild: guild});
    $('#input-text').val('')

  });

  socket.on('speak', function(json){
    console.log(json);
    username=json['username'];
    text=json['text'];
    ava=json['avatar']

    $('#chat-line-template img').attr('src', ava)
    $('#chat-line-template a').attr('href','/@'+username)
    $('#chat-line-template a').text('@'+username)
    $('#chat-line-template .chat-message').html(text)
    $('#chat-text').append($('#chat-line-template .chat-line').clone())
    window.scrollTo(0,document.body.scrollHeight)
  }
  );

  socket.on('message', function(msg){
    $('#system-template .message').text(msg)
    $('#chat-text').append($('#system-template .system-line').clone())
    window.scrollTo(0,document.body.scrollHeight)
  }
  );

  socket.on('connect',
    function(event) {
      console.log('connected, joining room')
      name=$('#guildname').val();
      socket.emit('join room', {'guild': name });
    }
    )

  document.getElementById('input-text').addEventListener("keyup", function(event) {
      // Number 13 is the "Enter" key on the keyboard
      if (event.keyCode === 13) {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        document.getElementById("chatsend").click();
      }
    }
    )