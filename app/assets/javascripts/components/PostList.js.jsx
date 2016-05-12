var PostList = React.createClass({

  contextTypes: {
    router: React.PropTypes.func.isRequired,
    onInlineEdit: React.PropTypes.func
  },

  childContextTypes: {
    onInlineEdit: React.PropTypes.func,
    deleteItem: React.PropTypes.func
  },

  getInitialState: function(){
    return {
      loaded: false,
      lists: [],
      page_num: (this.props.params.page_num || 1)
    };
  },

  componentWillMount: function(){
    //console.log(this.state.page_num)
    //console.log(this.context.router.getCurrentQuery())
    this.fetch_initial_data()
    PostStore.on('loaded.done', this.setInitialData)
    PostStore.on('post.added', this.listChange)
    PostStore.on('post.deleted', this.listChange)
  },

  componentWillUnmount: function(){
    PostStore.off('loaded.done', this.setInitialData)
    PostStore.off('post.added', this.listChange)
    PostStore.off('post.deleted', this.listChange)
  },

  fetch_initial_data: function(){
    PostStore.fetch_list()
  },

  setInitialData: function () {
    this.setState({ lists: PostStore.getLists() })
    this.setState({ loaded: true })
  },

  listChange: function(){
    this.setState({ lists: PostStore.getLists() })
  },


  getChildContext: function(){
    that = this;
    return {
      onInlineEdit: function(record){
        refer_list = that.state.lists
        record = _.find(that.state.lists, function(o) { return o.id == record.id; });
        index = _.findIndex(that.state.lists, function(o) { return o.id == record.id; });
        record.inline_edit = true
        React.addons.update(refer_list, { $splice: [[index, 1, record]] });

        that.setState({ lists: refer_list })
      },

      deleteItem: function(record){
        Actions.delete_post(record);
      }

    }
  },


  render: function(){
    that = this;

    if(!this.state.loaded){
      return (
        <div>Loading List</div>
      )
    }else{

      arr = []
      arr = this.state.lists.map(function(post){
              return(
                <PostItem post={post} key={post.id} onDeleteItem={that.deleteItem} />
              )
            });

        return (
          <table border='1' >
            <tbody>
            <tr>
              <th>id</th>
              <th>title</th>
              <th>body</th>
              <th>IsNews</th>
              <th>Country</th>
              <th></th>
              <th></th>
            </tr>
            {arr}
            </tbody>
          </table>
        )
      }
  }

});

var PostItem = React.createClass({
  render: function(){
    if(this.props.post['inline_edit']){
      return(
        <PostRowWithEdit post={this.props.post} />
      );

    }else{
      return(
        <PostRow post={this.props.post} />
      );

    }
  }
});

var PostRow = React.createClass({
  contextTypes: {
      onInlineEdit: React.PropTypes.func,
      deleteItem: React.PropTypes.func
  },

  edit_inline: function(e){
    e.preventDefault();
    this.context.onInlineEdit(this.props.post);
  },

  deleteItem: function(e){
    e.preventDefault();
    this.context.deleteItem(this.props.post);
  },

  render: function(){
    return(
      <tr>
        <td>
          { this.props.post['id'] }
        </td>
        <td>
          { this.props.post['title'] }
        </td>
        <td>
          { this.props.post['body'] }
        </td>
        <td>
          { this.props.post['news'] ? 'YES' :  'NO' }
        </td>
        <td>
          { this.props.post['country'] }
        </td>
        <td>
          <Link to={"/posts/" + this.props.post['id'] + "/edit"}> edit </Link>
        </td>
        <td>
          <a href='#' onClick={this.deleteItem}>delete</a>
        </td>
        <td>
          <a href='#' onClick={this.edit_inline}>edit-inline</a>
        </td>

      </tr>
    );
  }
});

var PostRowWithEdit = React.createClass({
  render: function(){
    return(
      <tr>
        <td colspan='8'>
          <table>
            <tr >
              <td >
                  inline
              </td>
            </tr>
            <PostRow post={this.props.post} />
          </table>
        </td>
      </tr>

    );
  }
});