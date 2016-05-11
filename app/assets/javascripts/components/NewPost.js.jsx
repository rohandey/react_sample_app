var NewPost = React.createClass({

  contextTypes: {
    router: React.PropTypes.func.isRequired
  },

  handleSubmit: function(e){
    e.preventDefault();
    that = this;
    $.ajax({
      url: "/posts",
      type: 'POST',
      data: $('#post_form').serializeArray()
    }).done(function(data) {
      Actions.add_post(data)
      that.context.router.transitionTo('/posts')
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