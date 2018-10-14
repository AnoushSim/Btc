const request  = require('request');
const fs = require('fs');
const app = (require('express'))();

function error_handling (err){
    if(err == 'UnknownCurrency') {
        let obj = {};
        obj["TYPE"] = err;
        obj["ERROR"] = "NO such currency";
        return obj;
    }
}

//Bitcoin currencies
app.get('/currency/BTC', (req , res) => {

    request('https://api.coinbase.com/v2/exchange-rates?currency=BTC' , (err, response, body) => {
        fs.writeFile('BTC_currency.json',body, (err) => {
            if (err)  throw(err);
            console.log('BTC currencies are written in BTC_currency.json');
        })
    });

    let content = fs.readFileSync('BTC_currency.json', 'utf8');
    let obj = JSON.parse(content);
    let obj_tosend = {};
    if(req.query.cur) {
        let cur = req.query.cur.toUpperCase();
        console.log(cur);
        if(obj.data.rates[cur]) {
            obj_tosend[cur] = obj.data.rates[cur];
            return res.send(obj_tosend);
        }
        return res.send(error_handling('UnknownCurrency'));
    }
    obj_tosend["EUR"] = obj.data.rates.EUR;
    obj_tosend["USD"] = obj.data.rates.USD;
    obj_tosend["JPY"] = obj.data.rates.JPY;
    res.send(obj_tosend);

})

//Bitcoincash currencies
app.get('/currency/BCH', (req , res) => {

    request('https://api.coinbase.com/v2/exchange-rates?currency=BCH' , (err, response, body) => {
        fs.writeFile('BCH_currency.json',body, (err) => {
            if (err)  throw(err);
            console.log('BCH currencies are written in BCH_currency.json');
        })
    });

    let content = fs.readFileSync('BCH_currency.json', 'utf8');
    let obj = JSON.parse(content);
    let obj_tosend = {};
    if(req.query.cur) {
        let cur = req.query.cur.toUpperCase();
        if(obj.data.rates[cur]) {
            obj_tosend[cur] = obj.data.rates[cur];
            return res.send(obj_tosend);
        }
        return res.send(error_handling('UnknownCurrency'));
    }
    obj_tosend["EUR"] = obj.data.rates.EUR;
    obj_tosend["USD"] = obj.data.rates.USD;
    obj_tosend["JPY"] = obj.data.rates.JPY;
    res.send(obj_tosend);

})

app.listen(3000, () => console.log('Project listening on port 3000'));
