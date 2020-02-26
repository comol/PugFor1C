const pug = require('pug');
const fs = require('fs');
const path = require('path');
const http = require("http");

http.createServer(function (request, response) {

    let data = [];

    request.on('data', chunk => {
        data.push(chunk)
    });

    request.on('end', () => {
        var parameters = JSON.parse(data);

        if (parameters.jsondata == "ping")
        {
            response.writeHead(200, {'Content-Type': 'text/plain'});
            response.end("OK");
            return;
        }
	// ��������� ���������. � 1� ��������� ����������, � ������� ������ ������
        let jsonb = {};
        fs.readdirSync(parameters.jsondata).forEach((file) => {
            let jsonobj = JSON.parse(fs.readFileSync(path.join(parameters.jsondata, file), 'utf8'));
            Object.assign(jsonb, jsonobj);
        });

        fs.writeFileSync(parameters.page, pug.renderFile(parameters.template, jsonb));
        response.writeHead(200, {'Content-Type': 'text/plain'});
        response.end();
    })
}).listen(8282);




