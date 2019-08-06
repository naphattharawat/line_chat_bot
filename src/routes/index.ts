import * as express from 'express';
import { Router, Request, Response } from 'express';
import { Line } from '../models/line';
import * as HttpStatus from 'http-status-codes';

const line = new Line();
const router: Router = Router();

router.get('/', (req: Request, res: Response) => {
  let d = "add";
  console.log(d.split(','));

  res.send({ ok: true, message: 'Welcome to RESTful api server!', code: HttpStatus.OK });
});

// router.post('/webhook', async (req: Request, res: Response) => {
//   let replyToken = req.body.events[0].replyToken
//   const event = req.body.events[0];
//   if (event.type === 'message') {
//     let message = [];
//     if (event.message.type == 'text') {
//       if(event.message.text == 'hi'){
//         message.push({ type: 'text', text: 'hello'});
//       }

//       if (message.length) {
//         await line.sendMessage(replyToken, message);
//       }
//     }
//   }

//   res.sendStatus(200);
// });

router.post('/webhook', async (req: Request, res: Response) => {
  const db = req.db;
  if (req.body.events.length) {
    let replyToken = req.body.events[0].replyToken
    const event = req.body.events[0];
    if (event.type == 'follow') {
      console.log(`follow - ${event.destination}`);
    } else if (event.type === 'message') {
      const text = event.message.text;
      let messages = [];
      if (event.message.type == 'text') {
        if (text.substr(0, 3) == 'add') {
          addMessage(db, text);
        } else if (text.substr(0, 7) == 'useq4u=') {
          const hospcode = text.substr(7, text.length - 7);
          const hc = await line.getHospital(db, hospcode);
          if (hc.length) {
            messages.push({ type: 'text', text: `ขอบคุณ ${hc[0].hosname} ที่ใช้ Q4U` });
            await line.saveQ4U(db, { 'hospcode': hospcode });
          }
        } else {
          const rs = await line.getMessage(db, text);
          if (rs.length) {
            for (const i of rs) {
              if (i.reply.substr(0, 4) == "IMG=") {
                const img = i.reply.substr(4, i.reply.length - 4);
                messages.push({ type: 'image', originalContentUrl: img, previewImageUrl: img });
              } else {
                const _i = i.reply.replace(/#/g, '\r\n');
                messages.push({ type: 'text', text: _i });
              }
            }
            messages.push({ type: 'text', text: 'รพ.ไหนใช้ Q4U แล้ว รบกวนพิมพ์ \r\n useq4u=41124(hospcode)' });
          }
        }
        if (messages.length) {
          await line.replyMessage(replyToken, messages)
        }

      }
    }
  }

  res.sendStatus(200);
});

async function addMessage(db, text) {
  const _text = text.split(',');
  if (_text[0] == 'add') {
    const p = _text[1].substr(2, _text[1].length - 2);
    const r = _text[2].substr(2, _text[2].length - 2);
    const obj = {
      pattern: p,
      reply: r
    }
    await line.saveMessage(db, obj)
  }
}


export default router;