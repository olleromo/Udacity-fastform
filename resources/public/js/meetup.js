(function($) {

    function getMeetups () {
        $.ajax({
            url: "/attendee/meetups",
            dataType: "json"
        }).done(function (data) {
            var res = data[0].eventname;
            console.log(res);
            $('.meetups').html(makeMeetupHtml(data));
        });
    }

    function makeMeetupHtml (data) {
        var res = "";
        for(i = 0; i < data.length; i++) {
            res += '<div class="align-center grid-block meet-style">' +
                '<div class="row">' +
                '<div class="eventname meet">' + data[i].eventname + '</div>' +
                '<div class="eventtype meet">' + data[i].eventtype + '</div>' +
                '<div class="eventhost meet">' + data[i].eventhost + '</div>' +
                '</div><div class="row">' +
                '<div class="eventstart meet">' + data[i].eventstart + '</div>' +
                '<div class="eventend meet">' + data[i].eventend + '</div>' +
                '</div><div class="row">' +
                // '<div class="eventguestlist meet">' + data[i].eventguestlist + '</div>' +
                // '</div><div class="row">' +
                '<div class="addr1 meet">' + data[i].addr1 + '</div>' +
                '<div class="addr2 meet">' + data[i].addr2 + '</div>' +
                '<div class="addrcity meet">' + data[i].addrcity + '</div>' +
                '</div><div class="row">' +
                '<div class="addrpc meet">' + data[i].addrpc + '</div>' +
                '<div class="addrstate meet">' + data[i].addrstate + '</div>' +
                '<div class="addrcountry meet">' + data[i].addrcountry + '</div>' +
                '</div><div class="row"' +
                '<div class="eventmessage meet">' + data[i].eventmessage + '</div>' +
                '</div></div>'; 
        };
        return res;
    };

    getMeetups();
    
})(jQuery);
