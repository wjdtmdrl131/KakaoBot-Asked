# KakaoBot-Asked
https://asked.kr

# example
```
var asked = require("asked");
var id = "";
var pw = "";
asked.login(id, pw);

function response(room, msg, sender, isGroupChat, replier, imageDB, packageName) {
  if (msg.startsWith("a답변 ")) {
    replier.reply(asked.reply(msg.split(" ")[1].split(" ")[0], id, msg.split(msg.split(" ")[1].split(" ")[0] + " ")[1]).text());
  }
  if (msg == "a질문목록") {
    replier.reply(asked.getQues(id));
  }
}
```
