
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
        {id: 'fname1',
         validated: false,
         visited: false,
         msg: null,
         validate: function () {
             if(this.visited) {
                 if($('#fname1').val().length < 2) {this.msg = ('First name need more than 2 characters'); this.validated = false;}
                 else {
                     this.validated = true;
                 };
             }
         }
        },
        {id: 'lname1',
         validated: false,
         visited: false,
         msg: null,
         validate: function () {
             if(this.visited) {
                 if($('#lname1').val().length < 2) {this.msg = ('Last name need more than 2 characters'); this.validated = false;}
                 else {
                     this.validated = true;
                 }
             }
         }
        },
        {id: 'email',
         validated: false,
         visited: false,
         msg: null,
         validate: function () {
             if(this.visited) {
                 var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
                 var em = $('#email').val();
                 if(!filter.test(em)) {this.msg = ('Please check that the email address is correct'); this.validated = false;}
                 else {
                     this.validated = true;
                 }
             }
         }
        },
        {id: 'password',
         validated: false,
         visited: false,
         msg: null,
         validate: function () {
             if(this.visited) {
                 console.log('validating password: ' + $('#password').val());
                 if($('#password').val().length < 6)
                  {this.msg = 'password need to be at lease 6 characters long'; this.validated = false;}
                 if(/[A-Z]/.test($('#password').val()) != true)
                  {this.msg = 'password need at least one uppercase character'; this.validated = false;}
                 if(/[a-z]/.test($('#password').val()) != true)
                  {this.msg = 'password need at least one lowercase character'; this.validated = false;}
                 if(/[\d]/.test($('#password').val()) != true)
                  {this.msg = 'password need at least one number'; this.validated = false;}
                 if(/[\!\@\#\$\%\^\&\*]/.test($('#password').val()) != true)
                  {this.msg = 'password need at least one of the symbols'; this.validated = false;}
             }
         }
        },
        {id: 'password2',
         validated: false,
         visited: false,
         msg: null,
         validate: function () {
             if(this.visited) {
                 if($('#password2').val() != $('#password').val()) {this.msg = ('passwords does not match'); this.validated = false;}
                 else {
                     this.validated = true;
                 }
             }
         }
        },
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

