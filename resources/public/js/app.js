
// $(document).foundation();
(function ($) {
    
    var progressCount = 0;
    var fieldCount = 17;
    var progressPercent = 0;
    var fieldArray = [
        {id: 'fname1',
         validated: false,
         visited: false,
         msg: null,
         validate: function () {
             if(this.visited) {
                     console.log('validating first name: ' + $('#fname1').val());
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
                     console.log('validating last name: ' + $('#lname1').val());
                     if($('#lname1').val().length < 2) {this.msg = ('Last name need more than 2 characters'); this.validated = false;}
                     else {
                     //     progressCount++;
                     //     updateProgress();
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
                     console.log('validating email');
                     var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
                     var em = $('#email').val();
                     if(!filter.test(em)) {this.msg = ('Please check that the email address is correct'); this.validated = false;}
                     else {
                     //     progressCount++;
                     //     updateProgress();
                     this.validated = true;
                     }
             }
         }
        },
        {id: 'ccname',
         validated: false,
         visited: false,
         msg: null,
         validate: function () {
             if(this.visited) {
                     console.log('validating ccname');
                     progressCount++;
                     updateProgress();
                     this.validated = true;
                 }
         }
        },
        {id: 'ccnumber',
         validated: false,
         visited: false,
         msg: null,
         validate: function () {
             if(this.visited) {
                     console.log('validating ccnumber');
                     progressCount++;
                     updateProgress();
                     this.validated = true;
                 }
         }
        },
        {id: 'ccdate',
         validated: false,
         visited: false,
         msg: null,
         validate: function () {
             if(this.visited) {
                     console.log('validating ccdate');
                     progressCount++;
                     updateProgress();
                     this.validated = true;
                 }
         }
        },
        {id: 'cccvv',
         validated: false,
         visited: false,
         msg: null,
         validate: function () {
             if(this.visited) {
                     console.log('validating cccvv');
                     progressCount++;
                     updateProgress();
                     this.validated = true;
                 }
         }
        },
        {id: 'fname2',
         validated: false,
         visited: false,
         msg: null,
         validate: function () {
             if(this.visited) {
                     console.log('validating fname2');
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
         {id: 'addrPC',
          validated: false,
          visited: false,
          msg: null,
          validate: function () {
              if(this.visited) {
                  console.log('validating addrPC');
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
            if($('#'+fieldArray[i].id).val().length > 0) { fieldArray[i].visited = true;}
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
                    console.log('target id: ' + target[0].id);
                    fieldArray[i].visited = true;
                }
            }
        });
        
//        checkVisited();
        
        for(i = 0; i < fieldArray.length; i++) {
            fieldArray[i].validate();
        };
        
        displayErrors();
        updateProgress();
    };

    $('#form1').click(handler);
    
})(jQuery);

