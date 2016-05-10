var RouteHandler = ReactRouter.RouteHandler;
var Link = ReactRouter.Link;

var App = React.createClass({
  render: function(){

    return (
      <div>
        <nav>
          <ul>
            <li>
              <Link to='/'>Hello World</Link>
            </li>
            <li>
              <Link to='/posts'>Posts</Link>
            </li>
            <li>
              <Link to='/new_post'>New Post</Link>
            </li>
          </ul>
        </nav>
        <RouteHandler {...this.props}/>


      </div>
    );
  }
});


