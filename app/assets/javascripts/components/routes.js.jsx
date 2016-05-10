var Route = ReactRouter.Route;
var DefaultRoute = ReactRouter.DefaultRoute;

this.MyRoutes = (
  <Route handler={App}>
    <DefaultRoute handler={HelloWorld}/>
    <Route handler={AnotherPage} path='page1'/>
    <Route handler={NewPost} path='new_post'/>
    <Route handler={PostList} path='posts'/>
    <Route handler={PostList} path='posts/page/:page_num'/>
    <Route handler={PostEdit} path='posts/:id/edit'/>
  </Route>
);


this.TodoRoutes = (
  <Route handler={App}>
    <DefaultRoute handler={Todo}/>
  </Route>

)