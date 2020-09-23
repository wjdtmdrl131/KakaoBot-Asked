let asked = {};

asked.login = function (id, password) {
	let connection = org.jsoup.Jsoup.connect("https://asked.kr/login.php");
	connection.requestBody("id=" + id + "&pw=" + password + "&lolink=https%3A%2F%2Fasked.kr%2F" + id);
	connection.method(org.jsoup.Connection.Method.POST);
	let response = connection.execute();
	
	if (response.parse().toString().indexOf("location.href") != -1) {
		asked.cookies = response.cookies();
		return true;
	} else {
		return false;
	}
};

asked.reply = function (listnum, userId, content) {
	let connection = org.jsoup.Jsoup.connect("https://asked.kr/query.php?query=5");
	connection.cookies(asked.cookies);
	connection.requestBody("id=" + userId + "&content=" + content + "&listnum=" + listnum);
	let response = connection.post();
	
	return response;
};

asked.getQues = function (userId) {
	let res = "";
	let array1 = org.jsoup.Jsoup.connect("https://asked.kr/" + userId).cookies(asked.cookies).get().select("div[class=card_ask]").toArray();
	let array2 = org.jsoup.Jsoup.connect("https://asked.kr/" + userId).cookies(asked.cookies).get().select("div[class=card_answer]").toArray();
	let array3 = org.jsoup.Jsoup.connect("https://asked.kr/" + userId).cookies(asked.cookies).get().select("a[id=share_down]").toArray();
	let array4 = org.jsoup.Jsoup.connect("https://asked.kr/query.php?query=2&page=0&id=" + userId).cookies(asked.cookies).get().select("div[class=card_ask]").toArray();
	let array5 = org.jsoup.Jsoup.connect("https://asked.kr/query.php?query=2&page=0&id=" + userId).cookies(asked.cookies).get().select("input[name=listnum]").toArray();
	for (let i = 0; i < array4.length; i++) {
		res += "--------------------------답변안됨\n질문: " + array4[i].text() + "\n질문ID: " + array5[i].attr("value") + "\n";
	}
	for (let i = 0; i < array1.length; i++) {
		res += "--------------------------답변됨\n질문: " + array1[i].text() + "\n답변: " + array2[i].text() + "\n질문ID: " + array3[i + 1].attr("data-clipboard-text").split("=")[1] + "\n";
	}
	return res.trim();
};

module.exports = asked;