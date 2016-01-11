var fs = require('fs');

var issues = [];
var months = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];

module.exports = function(req, res, next) {
  var userName = req.body.user_name;
  var input = req.body.text;
  var botPayload = {};

  fs.readFile('aaeditcal_issues.json', function(err, data) {
    if (err) {
      console.log("Error");
    } else {
      issues = JSON.parse(data);
      botPayload.text = processQuery(input);

      if (userName !== 'slackbot') {
        return res.status(200).json(botPayload);
      } else {
        return res.status(200).end();
      }
    }
  });
};

Array.prototype.contains = function(x) {
  for (var i in this) {
    if (this[i] == x) {
      return true;
    }
  }
  return false;
};

function getIssueName(x) {
  console.log("getIssueName");
  var iss_date;
  if (x.contains('ISSUE')) {
    var query_issue_name1 = x[x.indexOf('ISSUE') - 2];
    var query_issue_name2 = x[x.indexOf('ISSUE') - 1];

    issues.forEach(function(iss) {
      var iss_name = iss.issue_name.split(" ");
      if (iss_name.contains(query_issue_name1) && iss_name.contains(query_issue_name2)) {
        console.log(iss.issue_month + " " + iss.issue_date);
        iss_date = iss.issue_month + " " + iss.issue_date;
      }
    });
  }
  return iss_date;
}

function getIssueDate(x) {
  console.log("getIssueDate");
  var iss_name;
  months.forEach(function(mon) {
    if (x.contains(mon)) {
      var iss_month = mon;
      var iss_date = x[x.indexOf(mon) + 1];

      issues.forEach(function(iss) {
        if (iss.issue_month === iss_month && iss.issue_date === iss_date) {
          console.log(iss.issue_name);
          iss_name = iss.issue_name;
        }
      });
    }
  });
  return iss_name;
}

function getNextIssue(x) {
  var today = new Date();
  var today_month = months[today.getUTCMonth()];
  var today_date = today.getUTCDate();

  var iss = findNextIssue(today_month, today_date);

  if (x.contains('WHEN')) {
    return iss.issue_month + " " + iss.issue_date;
  } else {
    return iss.issue_name;
  }
}

function findNextIssue(m, d) {
  var iss = [];
  var today_val = (months.indexOf(m)*30) + d;

  issues.forEach(function(i) {
    var iss_val = (parseInt(months.indexOf(i.issue_month), 10)*30) + parseInt(i.issue_date, 10);
    if (iss_val > today_val) {
      iss.push(i);
    }
  });

  return iss[0];
}

function processQuery(query) {
  var q = query.toUpperCase().split(" ");
  if (q.contains('NEXT')) {
    return getNextIssue(q);
  } else if (q.contains('WHEN')) {
    console.log("when");
    return getIssueName(q);
  } else {
    console.log("what");
    return getIssueDate(q);
  }
}
