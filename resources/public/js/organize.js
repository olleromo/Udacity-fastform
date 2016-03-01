
var eventStartHandlerFlag = false;
var eventEndHandlerFlag = false;

function eventStartHandlerSignal () {
    eventStartHandlerFlag = true;
};

function eventEndHandlerSignal () {
    eventEndHandlerFlag = true;
};

(function ($) {
    
    var progressCount = 0;
    var fieldCount = 10;
    var progressPercent = 0;
    var fieldArray = [
        {id: 'eventname',
         validated: false,
         visited: false,
         msg: null,
         validate: function () {
             if(this.visited) {
                 if($('#eventname').val().length < 2) {this.msg = ('First name need more than 2 characters'); this.validated = false;}
                 else {
                     this.validated = true;
                 };
             }
         }
        },
        {id: 'eventtype',
         validated: false,
         visited: false,
         msg: null,
         validate: function () {
             if(this.visited) {
                 if($('#eventtype').val().length < 2) {this.msg = ('Last name need more than 2 characters'); this.validated = false;}
                 else {
                     this.validated = true;
                 }
             }
         }
        },
        {id: 'eventhost',
         validated: false,
         visited: false,
         msg: null,
         validate: function () {
             if(this.visited) {
                 var em = $('#eventhost').val();
                 if($('#eventhost').val().length < 2) {this.msg = ('Please check that the eventhost is correct'); this.validated = false;}
                 else {
                     this.validated = true;
                 }
             }
         }
        },
        {id: 'eventstart',
         validated: false,
         visited: false,
         msg: null,
         validate: function () {
             console.log('visiting  eventstart');
             if(eventStartHandlerFlag) {
                 if(/[\d]+[-][\d]+[-][\d]+T[\d]+:[\d]+/.test($('#eventstart').val()) == false) {
                     this.msg = ('Please check the event start date and time');
                     this.validated = false;}
                 else {
                     this.validated = true;
                 }
             }
         }
        },
        {id: 'eventend',
         validated: false,
         visited: false,
         msg: null,
         validate: function () {
             if(eventEndHandlerFlag) {
                 if(/[\d]+[-][\d]+[-][\d]+T[\d]+:[\d]+/.test($('#eventend').val()) == false) {
                     this.msg = ('Please check the event end date and time');
                     this.validated = false;}
                 else {
                     this.validated = true;
                 }
             }
         }
        },
        {id: 'addr1',
         validated: false,
         visited: false,
         msg: null,
         validate: function () {
             if(this.visited) {
                 var em = $('#addr1').val();
                 if(em.length < 2) {this.msg = ('Please check that the address 1 is correct'); this.validated = false;}
                 else {
                     this.validated = true;
                 }
             }
           }
        },
        {id: 'addr2',
         validated: false,
         visited: false,
         msg: null,
         validate: function () {
             if(this.visited) {
                 var em = $('#addr2').val();
                 if(em.length < 2) {this.msg = ('Please check that the address 2 is correct'); this.validated = false;}
             }
         }
        },
        {id: 'addrcity',
         validated: false,
         visited: false,
         msg: null,
         validate: function () {
             if(this.visited) {
                 var em = $('#addrcity').val();
                 if(em.length < 2) {this.msg = ('Please check that city is correct'); this.validated = false;}
                 else {
                     this.validated = true;
                 }
             }
         }
        },
        {id: 'addrstate',
         validated: false,
         visited: false,
         msg: null,
         validate: function () {
             if(this.visited) {
                 var em = $('#addrstate').val();
                 if(em.length < 2) {this.msg = ('Please check that state is correct'); this.validated = false;}
                 else {
                     this.validated = true;
                 }
             }
         }
        },
        {id: 'addrpc',
         validated: false,
         visited: false,
         msg: null,
         validate: function () {
             if(this.visited) {
                 var em = $('#addrpc').val();
                 if(em.length != 5) {this.msg = ('Please check that post code is correct'); this.validated = false;}
                 else {
                     this.validated = true;
                 }
             }
         }
        },
        {id: 'addrcountry',
         validated: false,
         visited: false,
         msg: null,
         validate: function () {
             if(this.visited) {
                 var em = $('#addrcountry').val();
                 if(em.length < 2) {this.msg = ('Please check that country is correct'); this.validated = false;}
                 else {
                     this.validated = true;
                 }
             }
         }
        }
    ];

    function displayErrors () {
        var mess = false;
        for(i = 0; i < fieldArray.length; i++) {
            if(fieldArray[i].msg != null) {
                $('#flsh').html('<div data-alert class="alert-box alert round static-warning">' + fieldArray[i].msg + '</div>');
                fieldArray[i].msg = null;
                mess = true;
            };
            if(mess == false) { $('#flsh').html('<div data-alert class="alert-box alert round"></div>')}; 
        };
    };

    function checkVisited () {
        for(i = 0; i < fieldArray.length; i++) {
            if($('#'+fieldArray[i].id).val()) {
                fieldArray[i].visited = true;
                };
        };
    };
    
    function updateProgress () {
        progressCount = 0;
        for(i = 0; i < fieldArray.length; i++) {
            if(fieldArray[i].validated) { progressCount++;}
        };
        progressPercent = Math.round((100 / fieldCount) * progressCount);
        $('.progress-meter').css({'width': progressPercent + '%'});
        $('.progress-meter-text').html(progressPercent + '%');
        if (progressPercent == 0) {$('.progress-meter-text').html('');} // no text if zero percent
    };

    function handler (event) {
        var target = $(event.target);
//        console.log('target: ' + targer[0].id);
        checkVisited();
        $(target[0]).keypress( function () {
            for(i = 0; i < fieldArray.length; i++) {
                if(fieldArray[i].id == target[0].id) {
                    fieldArray[i].visited = true;
                }
            }
        });
        for(i = 0; i < fieldArray.length; i++) {
            fieldArray[i].validate();
        };
        displayErrors();
        updateProgress();
    };
    
    function blurNotify () {
        for(i = 0; i < fieldArray.length; i++) {
            $('#'+fieldArray[i].id).blur(handler);
        };
    };

    blurNotify();
    $('#eventstart').blur(handler);
    $('#eventend').blur(handler);
    
})(jQuery);

