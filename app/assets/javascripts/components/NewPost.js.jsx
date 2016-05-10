var NewPost = React.createClass({

  handleSubmit: function(e){
    e.preventDefault()

    $.ajax({
      url: "/posts",
      type: 'POST',
      data: $('#post_form').serializeArray()
    }).done(function(data) {
      Actions.add_post(data)
      window.location.href= "#/posts";
    });

  },
  render: function(){
    return (
      <div>
        <form method='Post' onSubmit={ this.handleSubmit } id='post_form'>
          <input type='text' name='post[title]' placeholder='Title'/>
          <textarea  name='post[body]' placeholder='Body'/>
          <div>
            Yes <input type='radio' name='post[news]' value='1'/>
            No <input type='radio' name='post[news]' value='0'/>
          </div>

          <div>
            <select name='post[country]'>
              <option value='india'>India</option>
              <option value='usa'>USA</option>
            </select>
          </div>
          <input type='submit'/>
        </form>
      </div>
    )
  }
});