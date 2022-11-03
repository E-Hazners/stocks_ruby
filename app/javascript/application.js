// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails"
import "controllers"
import "chartkick"
import "Chart.bundle"

//= require jquery
//= require jquery_ujs

const inflation = {
    2000: 3.4,
    2001: 4.5,
    2002: 1.6,
    2003: 2.3,
    2004: 1.2,
    2005: 3.4,
    2006: 1.1,
    2007: 2.9,
    2008: 3.8,
    2009: -0.4,
    2010: 1.6,
    2011: 3.2,
    2012: 2.1,
    2013: 1.5,
    2014: 1.6,
    2015: 0.7,
    2016: 1.3,
    2017: 2.1,
    2018: 2.4,
    2019: 1.8,
    2020: 1.2,
    2021: 4.7,
    2022: 8.8
}

const button = document.getElementById('calculateBtn');

let elementClicked = false;

var dateFrom = $("#datepicker1").datepicker({
    changeYear: true,
    yearRange: "2000:2022",
    changeMonth: true,
    dateFormat: 'yy-mm-dd'
}).val();
var dateTo = $("#datepicker2").datepicker({
    changeYear: true,
    yearRange: "2000:2022",
    changeMonth: true,
    dateFormat: 'yy-mm-dd'
}).val();
document.getElementById('calculateBtn').addEventListener("click", myFunction);

async function myFunction() {
    dateFrom = $("#datepicker1").datepicker({}).val();
    dateTo = $("#datepicker2").datepicker({}).val();


    console.log(dateFrom);
    console.log(dateTo);

    const dateFromD = new Date(dateFrom);
    const dateToD = new Date(dateTo);

    console.log(dateFromD);
    console.log(dateToD);

    document.getElementById("date1").innerHTML = "You've selected: From " + dateFrom + " To " + dateTo;
    if (datesValid(dateFromD, dateToD)) {
        // var response = getWiki(dateFromD);
        document.getElementById("dateValidness").innerHTML = "";
        if(dateFrom === dateTo) {
            document.getElementById("inflation").innerHTML = "That's the same day";
        } else {
            var inflationByTime = inflationCalc(dateFrom, dateTo);
            document.getElementById("inflation").innerHTML = "Inflation during that time period: " + inflationByTime + "%";
            // document.getElementById("dateFromHoliday").innerHTML = 
            // document.getElementById("dateToHoliday").innerHTML =
        }

        
    } else {
        document.getElementById("dateValidness").innerHTML = "Dates aren't valid";
        document.getElementById("inflation").innerHTML = "";
    }
}

function datesValid(dateFrom, dateTo) {
    if (dateFrom <= dateTo) {
        return true;
    } else {
        return false;
    }
}

function inflationCalc(dateFrom, dateTo) {
    var sum = 0;

    let dateToYear = dateTo.substring(0, 4);
    let dateFromYear = dateFrom.substring(0, 4);

    for (let i = dateFromYear; i <= dateToYear; i++) {
        sum += inflation[i];
    }
    return Math.round(sum * 100) / 100;
}


// 03.11 nestradaja, Error 400, varbut citu dienu aizies
async function getWiki(date) {
    
    let month = date.getMonth() + 1;
    let day = date.getDate();

    let url = `https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/all/${month}/${day}`;

    let response = await fetch(url,
        {
            headers: {
                'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI4NTM5ZDBjYTRkM2I0MzhmNGYwNGY5NzBkNzdmMjZmZCIsImp0aSI6ImMxZjAxN2VkYTNmNDgxZTJkNmQxMTVmZjI0NGI3MzY2M2Y3MDA0ZmRjYWQxNTMyMTY3YTA4ZTk3N2I4NTM0MjU5ZDhmZTNjOWRjODA5NDNkIiwiaWF0IjoxNjY3NDkxMDk1LjA3NjE0LCJuYmYiOjE2Njc0OTEwOTUuMDc2MTQ0LCJleHAiOjMzMjI0Mzk5ODk1LjA3MzUzLCJzdWIiOiI3MTA4ODgzNiIsImlzcyI6Imh0dHBzOi8vbWV0YS53aWtpbWVkaWEub3JnIiwicmF0ZWxpbWl0Ijp7InJlcXVlc3RzX3Blcl91bml0Ijo1MDAwLCJ1bml0IjoiSE9VUiJ9LCJzY29wZXMiOlsiYmFzaWMiXX0.PGBKdyfRjNDzjTLYWCb1TAPuDxRcsR6Vdl0RngA04FC7sNNks8pSK3dLBywpKYmoL1RrsYPg2dPyNWYZUeh1ZOwwEWSKovsFvZGUm02qcZ9PGch9yxF6YkS0KlKOGSovJq7ysQeoczxH_WdHyB3dhetkAxXKlZzhi13-Wx_IDbYzzMLILguoN__rioGTfAqpivEHOEICRXMzcjwJxF9_H3EnGWjpRRJXSRB15LkhNDsf1vLsb2gp1bA2qNJ6bDkxE4JqXFYGmz6Dsza33OnM86KgBKp6qcaeMclGo0bm308eGDSMJYakE8nzSgV5kN0RyoLoF-XZ7PcDmgUkydIEvUb_sKIDqan75qAWzRxxxvQIEak-jj9zaO4Ijrlrff1dKu8Rw1dFLjw30KIwM-P7TLU0fA9yVK_Cimge88tS2Z0zJ5ezLRFgOHy57gptHLg8zMM666EpVOxc1UjwRC1CMgLuqg-wH7uEuyfSddTxuH96lZIr__PvNLffXeSoEON4ddUChVcy4qDXCJAx8n4RCRLQBm4NmlJfAQG0LZSHwtYRZTpxM2nNcrxpbYpX5ISv23im7_KaJVgCli36LrksiM3OxOpfEMLG4XacVD4vMzKMUQMJZqx_wwwMxe3P0Cno84l_9jdyby3iA8m6pyox7M26Pn7jm1TU4owa5YmyF3U',
                'Api-User-Agent': 'Stocks_Ruby'
            }
        }
    );
    response.json()
        .then(console.log).catch(console.error);
}


// 03.11 nestradaja, Error 400, varbut citu dienu aizies
async function getWikiFeature() {
    let today = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();

        let url = `https://api.wikimedia.org/feed/v1/wikipedia/en/featured/${year}/${month}/${day}`;

        let response = await fetch(url,
            {
                headers: {
                    'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI4NTM5ZDBjYTRkM2I0MzhmNGYwNGY5NzBkNzdmMjZmZCIsImp0aSI6ImMxZjAxN2VkYTNmNDgxZTJkNmQxMTVmZjI0NGI3MzY2M2Y3MDA0ZmRjYWQxNTMyMTY3YTA4ZTk3N2I4NTM0MjU5ZDhmZTNjOWRjODA5NDNkIiwiaWF0IjoxNjY3NDkxMDk1LjA3NjE0LCJuYmYiOjE2Njc0OTEwOTUuMDc2MTQ0LCJleHAiOjMzMjI0Mzk5ODk1LjA3MzUzLCJzdWIiOiI3MTA4ODgzNiIsImlzcyI6Imh0dHBzOi8vbWV0YS53aWtpbWVkaWEub3JnIiwicmF0ZWxpbWl0Ijp7InJlcXVlc3RzX3Blcl91bml0Ijo1MDAwLCJ1bml0IjoiSE9VUiJ9LCJzY29wZXMiOlsiYmFzaWMiXX0.PGBKdyfRjNDzjTLYWCb1TAPuDxRcsR6Vdl0RngA04FC7sNNks8pSK3dLBywpKYmoL1RrsYPg2dPyNWYZUeh1ZOwwEWSKovsFvZGUm02qcZ9PGch9yxF6YkS0KlKOGSovJq7ysQeoczxH_WdHyB3dhetkAxXKlZzhi13-Wx_IDbYzzMLILguoN__rioGTfAqpivEHOEICRXMzcjwJxF9_H3EnGWjpRRJXSRB15LkhNDsf1vLsb2gp1bA2qNJ6bDkxE4JqXFYGmz6Dsza33OnM86KgBKp6qcaeMclGo0bm308eGDSMJYakE8nzSgV5kN0RyoLoF-XZ7PcDmgUkydIEvUb_sKIDqan75qAWzRxxxvQIEak-jj9zaO4Ijrlrff1dKu8Rw1dFLjw30KIwM-P7TLU0fA9yVK_Cimge88tS2Z0zJ5ezLRFgOHy57gptHLg8zMM666EpVOxc1UjwRC1CMgLuqg-wH7uEuyfSddTxuH96lZIr__PvNLffXeSoEON4ddUChVcy4qDXCJAx8n4RCRLQBm4NmlJfAQG0LZSHwtYRZTpxM2nNcrxpbYpX5ISv23im7_KaJVgCli36LrksiM3OxOpfEMLG4XacVD4vMzKMUQMJZqx_wwwMxe3P0Cno84l_9jdyby3iA8m6pyox7M26Pn7jm1TU4owa5YmyF3U',
                    'Api-User-Agent': 'Stocks_Ruby'
                }
            }
        );
        response.json()
            .then(console.log).catch(console.error);
        
}
