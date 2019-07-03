import * as Knex from 'knex';
var request = require("request");

export class Line {

  getMessage(knex: Knex, pattern) {
    return knex('reply')
      .where('pattern', pattern)
  }

  saveMessage(knex: Knex, data) {
    return knex('reply')
      .insert(data);
  }

  getMenu(knex: Knex) {
    return knex('menu')
  }

  replyMessage(replyToken, message) {
    var options = {
      method: 'POST',
      url: 'https://api.line.me/v2/bot/message/reply',
      headers:
      {
        'Authorization': 'Bearer 2ntgtCSq4KE1M01kQoFDZy59kUI7jV0Y1W5Us+T2Kmls3tLK/KGoUyynaMj8jWU7/stwJT6ArMyGFFehNoTASnhUj/KxzhGnl/t/X1xjWUNdTKF5CKPJuA/2ibEEhqPVKOlziIxAdCh7fiD8uPsWbQdB04t89/1O/w1cDnyilFU=',
        'Content-Type': 'application/json'
      },
      body:
      {
        replyToken: replyToken,
        messages: message
      },
      json: true
    };

    request(options, function (error, response, body) {
      if (error) throw new Error(error);
      console.log(body);
    });
  }

  pushMessage(id, message) {
    var options = {
      method: 'POST',
      url: 'https://api.line.me/v2/bot/message/push',
      headers:
      {
        'Authorization': 'Bearer 2ntgtCSq4KE1M01kQoFDZy59kUI7jV0Y1W5Us+T2Kmls3tLK/KGoUyynaMj8jWU7/stwJT6ArMyGFFehNoTASnhUj/KxzhGnl/t/X1xjWUNdTKF5CKPJuA/2ibEEhqPVKOlziIxAdCh7fiD8uPsWbQdB04t89/1O/w1cDnyilFU=',
        'Content-Type': 'application/json'
      },
      body:
      {
        to: id,
        messages: message
      },
      json: true
    };

    request(options, function (error, response, body) {
      if (error) throw new Error(error);
      console.log(body);
    });
  }

}