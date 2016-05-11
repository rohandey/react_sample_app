var PostList = React.createClass({

  contextTypes: {
    router: React.PropTypes.func.isRequired
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

  deleteItem: function(record){
    Actions.delete_post(record);
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
                <PostItem post={post} key={post.id} onDeleteItem={that.deleteItem}/>
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
  deleteItem: function(e){
    e.preventDefault();
    this.props.onDeleteItem(this.props.post);
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
      </tr>
    );
  }
});