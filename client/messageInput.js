
Template.messageInput.events({
    "click button[name=sendMessage]" (evt,tmpl) {
        tmpl.sendMessage();
    },
    "keyup input[name=messageText]" (evt,tmpl) {
        if(evt.keyCode == 13){
            tmpl.sendMessage();
        }
    }
});

Template.messageInput.onCreated(function(){
    var instance = this;
    instance.sendMessage = ()=>{
        var txtBox = instance.find("input[name=messageText]");
        var message = txtBox.value;
        if(!message) return;

        var messageObj = {
            timestamp : (new Date()).getTime(),
            msg : message,
            roomId : Session.get("currentRoom"),
            owner : Meteor.userId(),
            username : Meteor.user().username !== 'undefined' ? Meteor.user().username : Meteor.user().profile.name,
            emails : typeof Meteor.user().emails === 'object' ?  Meteor.user().emails[0].address : Meteor.user().emails
        };

        /* Messages.insert(messageObj); 기존 코드 삭제 */
        Meteor.call("insertMessage",messageObj); /* 메소드 호출로 변경 */

        txtBox.value = "";
        txtBox.focus();
    };

});
