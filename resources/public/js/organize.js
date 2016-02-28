
// $(document).foundation();

var eventStarthandlerFlag = false;
var eventEndHandlerFlag = false;

function handlerSignal () {
    console.log('handler signal');
    handlerFlag = true;
}

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
                 console.log('validating eventname: ' + $('#eventname').val());
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
                 console.log('validating eventtype: ' + $('#eventtype').val());
                 if($('#eventtype').val().length < 2) {this.msg = ('Last name need more than 2 characters'); this.validated = false;}
                 else {
                     //     progressCount++;
                     //     updateProgress();
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
                 console.log('validating eventhost');
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
             if(this.visited) {
                 if(/[\d]+[-][\d]+[-][\d]+T[\d]+:[\d]+/.test($('#eventstart').val()) == false) {
                     this.msg = ('Please check the event start date and time');
                     console.log('validating eventstart failed');
                     this.validated = false;}
                 else {
                     console.log('validating eventstart succeeded');
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
             console.log('visiting  eventend');
             if(this.visited) {
                 if(/[\d]+[-][\d]+[-][\d]+T[\d]+:[\d]+/.test($('#eventend').val()) == false) {
                     this.msg = ('Please check the event end date and time');
                     console.log('validating eventend failed');
                     this.validated = false;}
                 else {
                     console.log('validating eventend succeeded');
                     this.validated = true;
                 }
             }
         }
        },
        // {id: 'eventguestlist',
        //  validated: false,
        //  visited: false,
        //  msg: null,
        //  validate: function () {
        //      if(this.visited) {
        //          console.log('validating eventguestlist');
        //          progressCount++;
        //          updateProgress();
        //          this.validated = true;
        //      }
        //  }
        // },
        {id: 'addr1',
         validated: false,
         visited: false,
         msg: null,
         validate: function () {
             if(this.visited) {
                 console.log('validating addr1');
                 progressCount++;
                 updateProgress();
                 this.validated = true;
             }
         }
        },
        {id: 'addr2',
         validated: false,
         visited: false,
         msg: null,
         validate: function () {
             if(this.visited) {
                 console.log('validating addr2');
                 progressCount++;
                 updateProgress();
                 this.validated = true;
             }
         }
        },
        {id: 'lname2',
         validated: false,
         visited: false,
         msg: null,
         validate: function () {
             if(this.visited) {
                 console.log('validating lname2');
                 progressCount++;
                 updateProgress();
                 this.validated = true;
             }
         }
        },
        {id: 'addr1',
         validated: false,
         visited: false,
         msg: null,
         validate: function () {
             if(this.visited) {
                 if (!this.validated) {
                     console.log('validating addr1');
                     progressCount++;
                     updateProgress();
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
                 console.log('validating addr2');
                 progressCount++;
                 updateProgress();
                 this.validated = true;
             }
         }
        },
        {id: 'addrcity',
         validated: false,
         visited: false,
         msg: null,
         validate: function () {
             if(this.visited) {
                 console.log('validating addrcity');
                 progressCount++;
                 updateProgress();
                 this.validated = true;
             }
         }
        },
        {id: 'addrstate',
         validated: false,
         visited: false,
         msg: null,
         validate: function () {
             if(this.visited) {
                 console.log('validating addrstate');
                 progressCount++;
                 updateProgress();
                 this.validated = true;
             }
         }
        },
        {id: 'addrpc',
         validated: false,
         visited: false,
         msg: null,
         validate: function () {
             if(this.visited) {
                 console.log('validating addrpc');
                 progressCount++;
                 updateProgress();
                 this.validated = true;
             }
         }
        },
        {id: 'addrcountry',
         validated: false,
         visited: false,
         msg: null,
         validate: function () {
             if(this.visited) {
                 console.log('validating addrcountry');
                 progressCount++;
                 updateProgress();
                 this.validated = true;
             }
         }
        },
        {id: 'eventmessage',
         validated: false,
         visited: false,
         msg: null,
         validate: function () {
             if(this.visited) {
                 console.log('validating eventmessage');
                 progressCount++;
                 updateProgress();
                 this.validated = true;
             }
         }
        }
    ];

    function displayErrors () {
        var mess = false;
        for(i = 0; i < fieldArray.length; i++) {
            if(fieldArray[i].msg != null) {
                $('#flsh').html('<div data-alert class="alert-box alert round static-warning">' + fieldArray[i].msg + '</div>');
                console.log('msg: ' + fieldArray[i].msg);
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
  //              console.log('checkVisited: ' + fieldArray[i].id);
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
                    console.log('target id: ' + target[0].id);
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

    //    $('#form1').click(handler);
    blurNotify();
    $('#eventstart').blur(handler);
    $('#eventend').blur(handler);
//    $("input[name=datetime-local]").blur(function() { alert("hi"); });


    
})(jQuery);

