//var LinkedStateMixin = require('react-addons-linked-state-mixin');
var PostEdit = React.createClass({

  mixins: [React.addons.LinkedStateMixin],

  getInitialState: function(){
    return { post: {}}
  },

  componentWillMount: function(){
    this.fetch_record();
    PostStore.on('loaded.edit_single_post', this.set_edit_data);
    PostStore.on('post.updated', this.listChange)
  },

  componentWillUnmount: function(){
    PostStore.off('loaded.edit_single_post', this.set_edit_data);
    PostStore.off('post.updated', this.listChange);
  },

  fetch_record: function(){
    PostStore.single_record(this.props.params.id)
  },

  set_edit_data: function(data){
    this.setState({ post: data })
  },

  listChange: function(){
    this.setState({ lists: PostStore.getLists() });
    window.location.href= "#/posts";
  },

  handleSubmit: function(e){
    e.preventDefault();
    self = this
    $.ajax({
      url: "/posts/" + self.refs.post_id.value,
      type: 'PUT',
      data: $('#post_form').serializeArray()
    }).done(function(data) {
      Actions.after_post_update(data)
    });

  },

  titlePropChange: function(event){
    old_state = this.state.post;
    old_state.title = event.target.value;
    this.setState({ post: old_state });
  },

  bodyPropChange: function(event){
    old_state = this.state.post;
    old_state.body = event.target.value;
    this.setState({ post: old_state });
  },

  newsPropChange: function(event){
    old_state = this.state.post;
    old_state.news = event.target.value == '1' ? true : false;
    this.setState({ post: old_state });
  },

  countryPropChange: function(event){
    old_state = this.state.post;
    old_state.country = event.target.value;
    this.setState({ post: old_state });
  },

  render: function(){
    return (

      <div>
        Edit Post

        <form method='Post' onSubmit={ this.handleSubmit } id='post_form'>
          <input type='hidden' name='post[id]' value={this.state.post.id} ref='post_id'/>

          <input type='text' name='post[title]' placeholder='Title' value={this.state.post.title} ref='post_title' onChange={this.titlePropChange}/>

          <textarea  name='post[body]' placeholder='Body' value={this.state.post.body} onChange={this.bodyPropChange} ref='post_body'/>

          <div>
            Yes <input type='radio' name='post[news]' value='1'  onChange={this.newsPropChange} checked={this.state.post.news === true}/>
            No <input type='radio' name='post[news]' value='0' onChange={this.newsPropChange} checked={this.state.post.news === false}/>
          </div>

          <div>
            <select name='post[country]' value={this.state.post.country} onChange={this.countryPropChange}>
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