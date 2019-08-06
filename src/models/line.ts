import * as Knex from 'knex';
var request = require("request");

export class Line {
  token = process.env.TOKEN_LINE;
  getMessage(knex: Knex, pattern) {
    return knex('reply')
      .where('pattern', pattern)
  }

  saveMessage(knex: Knex, data) {
    return knex('reply')
      .insert(data);
  }

  saveQ4U(knex: Knex, data) {
    return knex('use_q4u')
      .insert(data);
  }

  getHospital(knex: Knex, hospcode) {
    return knex('chospital')
      .where('hoscode', hospcode)
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
        'Authorization': `Bearer ${this.token}`,
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
        'Authorization': `Bearer ${this.token}`,
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