(function($) {

    function getMeetups () {
        $.ajax({
            url: "/attendee/meetups",
            dataType: "json"
        }).done(function (data) {
            var res = data[0].eventname;
            $('.meetups').html(makeMeetupHtml(data));
        });
    }

    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    function formatDate (dt) {
        var dateArr = dt.split('-');
        var year = dateArr[0];
        var month = dateArr[1];
        var tmp = dateArr[2].split('T');
        var day = tmp[0];
        var time = tmp[1];
        return months[month-1] + ' ' + day + ' ' + year + ' at: ' + time;
    }

    function makeMeetupHtml (data) {
        var res = "";
        for(i = 0; i < data.length; i++) {
            res += '<div class="grid-frame meet-style">' +
                '<div class="grid-content">' +
                '<div class="eventname meet">' + data[i].eventname + '</div>' +
                '<div class="eventtype meet">' + data[i].eventtype + '</div>' +
                '<div class="eventhost meet">' + data[i].eventhost + '</div>' +
                '</div><div class="row">' +
                '<div class="eventstart meet">' + 'From: ' + formatDate(data[i].eventstart) + '</div>' +
                '<div class="eventend meet">' + 'To: ' + formatDate(data[i].eventend) + '</div>' +
                '</div><div class="row">' +
                '<div class="addr1 meet">' + data[i].addr1 + '</div>' +
                '<div class="addr2 meet">' + data[i].addr2 + '</div>' +
                '<div class="addrcity meet">' + data[i].addrcity + '</div>' +
                '</div><div class="row">' +
                '<div class="addrpc meet">' + data[i].addrpc + '</div>' +
                '<div class="addrstate meet">' + data[i].addrstate + '</div>' +
                '<div class="addrcountry meet">' + data[i].addrcountry + '</div>' +
                '</div><div class="row">' +
                '<div class="eventmessage meet">' + data[i].eventmessage + '</div>' +
                '</div></div>'; 
        };
        return res;
    };

    getMeetups();
    
})(jQuery);
