$(document).ready(function(){
   
     $.ajax({
      url: 'http://clist.by/',
      type: 'GET',
      async: false,
      success: function(data){
          scrapeData(data);
      },
      error: function (jqXHR, exception) {
        var msg = '';
        if (jqXHR.status === 0) {
            msg = 'Not connect.\n Verify Network.';
        } else if (jqXHR.status == 404) {
            msg = 'Requested page not found. [404]';
        } else if (jqXHR.status == 500) {
            msg = 'Internal Server Error [500].';
        } else if (exception === 'parsererror') {
            msg = 'Requested JSON parse failed.';
        } else if (exception === 'timeout') {
            msg = 'Time out error.';
        } else if (exception === 'abort') {
            msg = 'Ajax request aborted.';
        } else {
            msg = 'Uncaught Error.\n' + jqXHR.responseText;
        }
        $('#running').append(msg+'<br>');
    }
      
    });
    
    function scrapeData(data){
        var parsedData = $("<div>").html(data)[0].getElementsByTagName("div");
        for(var j=0; j<parsedData.length; j++){
            var classname = parsedData[j].className;
            if(classname === "row contest running"){
                var elements = parsedData[j].getElementsByClassName("col-md-7 col-sm-8 event")[0].getElementsByClassName("addtocalendar atc-style-menu-wb")[0].getElementsByClassName("atc_event")[0].getElementsByTagName("var");
                var site = elements[4].firstChild.nodeValue;
                if(site==="codechef.com" || site==="codeforces.com" || site==="hackerrank.com" || site==="hackerearth.com" || site==="topcoder.com"){
                    var start = elements[0].firstChild.nodeValue;
                    var end = elements[1].firstChild.nodeValue;
                    var name = elements[3].firstChild.nodeValue;
                    var link = elements[5].firstChild.nodeValue;
                    var fstart = parseDate(start);
                    var fend = parseDate(end);
                    if(site === "codechef.com"){
                        $('#running').append('<h4 align="right">CodeChef</h4>');
                    }
                    else if(site === "codeforces.com"){
                        $('#running').append('<h4 align="right">CodeForces</h4>');
                    }
                    else if(site === "hackerrank.com"){
                        $('#running').append('<h4 align="right">HackerRank</h4>');
                    }
                    else if(site === "hackerearth.com"){
                        $('#running').append('<h4 align="right">HackerEarth</h4>');
                    }
                    else if(site === "topcoder.com"){
                        $('#running').append('<h4 align="right">TopCoder</h4>');
                    }
                    $('#running').append('<a style="font-size: 12px" href="' + link + '">' + name + '</a><br>');
                    $('#running').append('<pre><span class="inner-pre" style="font-size: 13px">Start: ' + fstart + '\t\t<br>' + 'End: ' + fend + '\t\t</span></pre><hr>');
                }
            }
        }
        
        for(var j=0; j<parsedData.length; j++){
            var classname = parsedData[j].className;
            if(classname === "row contest coming"){
                var elements = parsedData[j].getElementsByClassName("col-md-7 col-sm-8 event")[0].getElementsByClassName("addtocalendar atc-style-menu-wb")[0].getElementsByClassName("atc_event")[0].getElementsByTagName("var");
                var site = elements[4].firstChild.nodeValue;
                if(site==="codechef.com" || site==="codeforces.com" || site==="hackerrank.com" || site==="hackerearth.com" || site==="topcoder.com"){
                    var start = elements[0].firstChild.nodeValue;
                    var end = elements[1].firstChild.nodeValue;
                    var name = elements[3].firstChild.nodeValue;
                    var link = elements[5].firstChild.nodeValue;
                    var fstart = parseDate(start);
                    var fend = parseDate(end);
                    if(site === "codechef.com"){
                        $('#upcoming').append('<h4 align="right">CodeChef</h4>');
                    }
                    else if(site === "codeforces.com"){
                        $('#upcoming').append('<h4 align="right">CodeForces</h4>');
                    }
                    else if(site === "hackerrank.com"){
                        $('#upcoming').append('<h4 align="right">HackerRank</h4>');
                    }
                    else if(site === "hackerearth.com"){
                        $('#upcoming').append('<h4 align="right">HackerEarth</h4>');
                    }
                    else if(site === "topcoder.com"){
                        $('#upcoming').append('<h4 align="right">TopCoder</h4>');
                    }
                    $('#upcoming').append('<a style="font-size: 12px" href="' + link + '" onclick="javascript:location.href=\''+link+'\'">' + name + '</a><br>');
                    $('#upcoming').append('<pre><span class="inner-pre" style="font-size: 13px">Start: ' + fstart + '\t\t<br>' + 'End: ' + fend + '\t\t</span></pre><hr>');
                }
            }
        }
    }
    
    function parseDate(date){
        var year = date.substr(0,4);
        var month = date.substr(4,2);
        var day = date.substr(6,2);
        var hour = date.substr(9,2);
        var min = date.substr(11,2);
        var final = day+"-"+month+"-"+year+" "+hour+":"+min;
        return final;
    }
   
});