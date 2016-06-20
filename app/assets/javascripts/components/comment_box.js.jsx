var CommentBox = React.createClass({
  getInitialState: function() {
      return {
          data: []
      };
  },
  componentDidMount: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(result) {
        this.setState({data: result.data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status. err.toString());
      }.bind(this)
    });
  },
  handleSubmit: function(comment) {
    this.setState({data: this.state.data.concat([comment])});
    $.ajax({
      url: "/api/v1/tweets/" + this.props.id + "/comments",
      dataType: 'json',
      type: 'POST',
      data: comment,
      success: function(data) {
        this.setState({data: data.data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  render: function() {
    return (
    <div classNmae="commentbox">
      <h1>Comments</h1>
      <CommentList data={this.state.data} />
      <CommentForm onCommentSubmit={this.handleSubmit} />
    </div>
    );
  }
});

var CommentList = React.createClass({
  render: function() {
    var commentNodes = this.props.data.map(function (comment) {
      return (
        <Comment nickname={comment.user.nickname}>
          <p>{comment.text}</p>
        </Comment>
        )
      });
    return (
      <div classNmae="commentList">
        {commentNodes}
      </div>
      );
  }
});

var CommentForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var text = ReactDOM.findDOMNode(this.refs.text).value.trim();
    if (!text) {
      return;
    }
     // TODO: send request to the server
    this.props.onCommentSubmit({text: text});
    ReactDOM.findDOMNode(this.refs.text).value = '';
    return;
  },
  render: function() {
    return (
      <form classNmae="commentForm" onSubmit={this.handleSubmit}>
      <input type="text" placeholder="comment" ref="text" />
      <input type="submit" value="Post" />
      </form>
      );
   }
});

var Comment = React.createClass({
  render: function() {
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          {this.props.nickname}
        </h2>
        {this.props.children}
      </div>
    );
  }
});
