var TweetIndex = React.createClass({
   getInitialState: function() {
    return {data: []};
  },
  loadTweetsFromServer: function() {
    $.ajax({
          url: this.props.url,
          dataType: 'json',
          success: function(result) {
          this.setState({data: result.data});
          }.bind(this),
          error: function(xhr, status, err) {
            console.error(this.props.url, status, err.toString());
          }.bind(this)
        });
    },
    componentDidMount: function() {
      this.loadTweetsFromServer();
      setInterval(this.loadTweetsFromServer, this.props.pollInterval);
    },
  render: function() {
    console.log(this.state)
    return (
        <TweetList data={this.state.data} />
    );
  }
});

var TweetList = React.createClass({
  render: function() {
    var tweetNodes = this.props.data.map(function (tweet){
      return (
        <TweetContent nickname={tweet.user.nickname}>
          <p>{tweet.text}</p>
        </TweetContent>
      );
    });
    return (
      <div className="contents row">
        {tweetNodes}
      </div>
      );
    }
});

var TweetContent = React.createClass({
  render: function() {
    console.log(this.props.name)
    console.log(this.props)
    console.log(this.props.id)
    return (
    <div className="content_post">
      <span className="name">
        <span>投稿者</span>
        <a href="/users/{this.props.id}"></a>
        <p>{this.props.nickname}</p>
        {this.props.children}
      </span>
      </div>
      )
  }
});
