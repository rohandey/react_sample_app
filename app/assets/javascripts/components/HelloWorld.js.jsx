
var HelloWorld = React.createClass({
  componentDidMount: function(){
    console.log('111')
  },
  render: function() {
    return (
      <div>Hello {this.props.foo}!</div>
    );
  }
});