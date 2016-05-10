var PostStore = flux.createStore({
  list: [],

  list_fetched: false,

  actions: [
    Actions.add_post,
    Actions.after_post_update,
    Actions.delete_post
  ],

  add_post:  function(item){
    this.list.push(item)
    this.emit('post.added')
  },

  after_post_update: function(record){
    index = _.findIndex(this.list, function(o) { return o.id == record.id; });

    this.list = React.addons.update(this.list, { $splice: [[index, 1, record]] });
    this.emit('post.updated');
  },

  delete_post: function(record){
    index = _.findIndex(this.list, function(o) { return o.id == record.id; });

    this.list.splice(index, 1);
    this.emit('post.deleted');

    $.ajax({
      url: "/posts/" + record.id,
      method: 'DELETE'
    }).done(function(data) {
      console.log('post deleted')
    });
  },

  exports: {

    fetch_list: function(){
      self = this;

      if(self.list_fetched == false){
        $.ajax({
          url: "/posts"
        }).done(function(data) {
          self.list = data;
          self.emit('loaded.done');
          self.list_fetched = true;
        });
      }else{
        self.emit('loaded.done');
      }


    },

    getLists: function(){
      return this.list;
    },

    single_record: function(id){
      self = this;
      $.ajax({
        url: "/posts/" + id
      }).done(function(data) {
        self.emit('loaded.edit_single_post', data);
      });
    }

  }

});