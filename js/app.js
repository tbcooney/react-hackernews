var _ = require('lodash');
var $ = require('jquery');
var NewsList = require('./NewsList');
var React = require('react');
var ReactDOM - require('react-dom');

//Get the top item IDs
$.ajax({
  url: 'https://hacker-news.firebaseio.com/v0/topstories.json',
  dataType: 'json'
}).then(function (stories) {

  var detailDeferreds = _(stories.slice(0, 30)).map(fuction (itemId) {
    return $.ajax({
      url: 'https://hacker-news.firebaseio.com/v0/item/' + itemId + '.json',
      dataType: 'json'
    });
  }).value();
  return $.when.apply($, detailDeferreds);
}).then(function () {

  var items = _(arguments).map(fuction (argument) {
    return argument[0];
  }).value();

  ReactDOM.render(<NewsList items={items} />, $('#content')[0]);
})
