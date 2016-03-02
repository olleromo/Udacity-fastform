
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
    var fieldCount = 11;
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

        //////////////////////////////////////////
        {id: 'autocomplete',
         validated: false,
         visited: false,
         msg: null,
         validate: function () {
             if(this.visited) {
                 this.validated = true;
//                 checkVisited();
             }
         }
        },
        {id: 'street_number',
         validated: false,
         visited: false,
         msg: null,
         validate: function () {
             if(this.visited) {
                 var em = $('#street_number').val();
                 if(em.length == 0) {this.msg = ('Please check that the street number is filled in'); this.validated = false;}
                 else {
                     this.validated = true;
                 }
             }
         }
        },
        {id: 'route',
         validated: false,
         visited: false,
         msg: null,
         validate: function () {
             if(this.visited) {
                 var em = $('#route').val();
                 if(em.length < 2) {this.msg = ('Please check that the address 1 is correct'); this.validated = false;}
                 else {
                 }
             }
         }
        },
        {id: 'locality',
         validated: false,
         visited: false,
         msg: null,
         validate: function () {
             if(this.visited) {
                 var em = $('#locality').val();
                 if(em.length < 2) {this.msg = ('Please check that city is correct'); this.validated = false;}
                 else {
                     this.validated = true;
                 }
             }
         }
        },
        {id: 'administrative_area_level_1',
         validated: false,
         visited: false,
         msg: null,
         validate: function () {
             if(this.visited) {
                 var em = $('#administrative_area_level_1').val();
                 if(em.length < 2) {this.msg = ('Please check that state/province is correct'); this.validated = false;}
                 else {
                     this.validated = true;
                 }
             }
         }
        },
        {id: 'postal_code',
         validated: false,
         visited: false,
         msg: null,
         validate: function () {
             if(this.visited) {
                 var em = $('#postal_code').val();
                 if(em.length < 4) {this.msg = ('Please check that post code is correct'); this.validated = false;}
                 else {
                     this.validated = true;
                 }
             }
         }
        },
        {id: 'country',
         validated: false,
         visited: false,
         msg: null,
         validate: function () {
             if(this.visited) {
                 var em = $('#country').val();
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
    $('#form1').blur(handler);
    
})(jQuery);

