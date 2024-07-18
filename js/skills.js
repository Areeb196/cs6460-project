// constants
N = 10

// https://developers.google.com/chart/interactive/docs/gallery/linechart
google.charts.load('current', {
    packages: ['corechart', 'line']
});

if (sessionStorage.getItem("td_bkt") === null) {
    document.getElementById('chart_div').textContent = "No skill data saved ... visit the problem page to track your borrowing skill."
}
else {
    google.charts.setOnLoadCallback(drawSkill);
}

function drawSkill() {
    var data = new google.visualization.DataTable();
    data.addColumn('number', 'Time Step');
    data.addColumn('number', 'Probability');

    let skillDataPoints = averageSkills(JSON.parse(sessionStorage.getItem("td_bkt")))

    var rows = skillDataPoints.map(function(value, index) {
        return [index, value];
    });
    data.addRows(rows);

    var options = {
        hAxis: {
          title: 'Time Step'
        },
        vAxis: {
          title: 'Having Skill Probability',
          minValue: 0,
          maxValue: 1
        }
      };

      var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
      chart.draw(data, options);
}

function averageSkills(skills) {
    let res = [];
    for (let i = skills.length-1; i >= 0; i--) {
        let left = Math.max(i-N+1, 0)
        var sliceArray = skills.slice(left, i+1);
        var sum = sliceArray.reduce(function(total, currentValue) {
            return total + currentValue;
        }, 0);
        
        // Calculate the average
        var average = sum / sliceArray.length;
        res.push(average);
    }
    
    return res.reverse();
}