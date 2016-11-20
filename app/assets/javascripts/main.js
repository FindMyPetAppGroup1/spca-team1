// all views
var allView = ['#menu-main','#listReport','#listMessage','#setting','#about'
,'#newReportFound','#previewReportFound','#completeReportFound','#showReportFound','#editReportFound','#newReportLost','#previewReportLost','#completeReportLost','#showReportLost','#editReportLost','#showMessage']


var userID;
var bufferedData;

$(function(){
  initialize();
});

var initialize = function(){
  //initialize value
  renderUserInfo();
  //hide all views
  allView.forEach(function(view){
    hideObject(view);
  })
  //list all views need to be visiable at begining
  showObject('#menu-main')
  //set all click action
 setMenu();
 setBack();
 setAction();
}


var renderUserInfo = function(){
  //initialize user info from ajax
  bufferedData = user;
  renderMustache('#user-info','#userInfoData');
  userID = 1;
}
var setAction = function(){
  //found route
  setRedirectWithFunction('#button-sumbitNewReportFound','#newReportFound','#previewReportFound',renderPreviewFound);
  setRedirectWithFunction('#button-sumbitPreviewReportFound','#previewReportFound','#completeReportFound',getReportId);
  setRedirectWithFunction('#button-sumbitCompleteReportFound','#completeReportFound','#showReportFound',getReportFound);
  //set message

  //lost route
  setRedirectWithFunction('#button-sumbitNewReportLost','#newReportLost','#previewReportLost',renderPreviewLost);
  setRedirectWithFunction('#button-sumbitPreviewReportLost','#previewReportLost','#completeReportLost',getReportId);
  setRedirectWithFunction('#button-sumbitCompleteReportLost','#completeReportLost','#showReportLost',getReportLost);
  //set message


  //set deligate
  setDeligate('#list-lost','li',getReportLost,'#listReport','#showReportLost');
  setDeligate('#list-found','li',getReportFound,'#listReport','#showReportFound');
  setDeligate('#list-message','li',getMessage,'#listMessage','#showMessage');
}

var signoutFunc = function(){
  console.log('signout');
  //connect to controler and redirect?
}

var notificationFunc = function(){
  //what to do in notification?
  console.log('notify');
}

var locationFunc = function(){
  //what to do with location?
  console.log('location');
}


var getReportLost = function(){
  console.log('lost:'+bufferedData);
  console.log('get lost report');
  //before running ajax, bufferedData stored the report id
  //use ajax to update bufferedData, report.find(bufferedData)
  bufferedData = report1;

  //javascript for putting a pin on map
  renderMustache("#reportShow",'#showReportLostData');
}
var getReportFound = function(){
  console.log('found:'+bufferedData);
  console.log('get found report');
  //before running ajax, bufferedData stored the report id
  //use ajax to update bufferedData, report.find(bufferedData)
  bufferedData = report1;

  //javascript for putting a pin on map
  renderMustache("#reportShow",'#showReportFoundData');
}

var getMessage = function(){
  console.log('get:'+bufferedData);
  console.log('show message');
  //before running ajax, bufferedData stored the message id
  //use ajax to get message, message.find(bufferedData)
  bufferedData = message1
  renderMustache("#showMessage",'#messageData');
}

var setRedirect = function(target,fro,to){
  //set redirect function for a button
  $(target).click(function(){
    hideObject(fro);
    showObject(to);
  });
}
var setDeligate = function(deligateTar,target,func,fro,to){
  $(deligateTar).on('click',target,function(){
    //store id to bufferedData
    bufferedData = $(this).data('id');
    func();
    hideObject(fro);
    showObject(to);
  });
}
var setRedirectWithFunction = function(target,fro,to,func){
  //set redirect function for a button
  $(target).click(function(){
    func();
    hideObject(fro);
    showObject(to);
  });
}

var hideObject= function(target){
  $(target).hide();
}
var showObject= function(target){
  $(target).show();
}
var renderLists = function(reports,template,list){
  var reportTemplate = $(template).html();
  var reportList = $(list);
  Mustache.parse(reportTemplate);
  var reportHTML = reports
    .map(function (report) {
      return Mustache.render(reportTemplate, report);
    }).join('');
  reportList.html(reportHTML);
}

var renderMustache = function(tmp,target){
  //bufferedData will be updated by ajax before calling renderMustache
  var reportDetailsTmpl = $(tmp).html();
  var reportDetails = $(target);
  reportDetails.html(Mustache.render(reportDetailsTmpl,bufferedData));
}

var renderPreviewLost = function(){
  //use jquery to access fiends from edit/new form
  bufferedData = report1;

  tmp = "#reportShow";
  target = '#previewReportLostData';

  //javascript for putting a pin on map?
  renderMustache(tmp,target);
}

var renderPreviewFound = function(){
  //use jquery to access fiends from edit/new form
  bufferedData = report1;

  tmp = "#reportShow";
  target = '#previewReportFoundData';

  //javascript for putting a pin on map?
  renderMustache(tmp,target);
}

var getReportId = function(){
  //use ajax to pass report info to rails for save
  //use ajax to get report id from using report details
  //or use ajax to get user.report.last?

  //before running ajax, bufferedData stored a report detail
  bufferedData = 1;
  //after running ajax, bufferedData will store a report id

  //javascript for putting a pin on map
}
var addReport = function(){
  //use ajax to get alist of my lost report
  reports = [report1,report2];
  renderLists(reports,'#report-summary','#list-lost');
  //use ajax to get a list of my found report
  reports = [report1,report2];
  renderLists(reports,'#report-summary','#list-found');
}

var addMessage = function(){
  //use ajax to get a list of my message-summary
  messages = [message1,message2];
  renderLists(messages,'#message-summary','#list-message');
}

var setBack = function(){
  $('.button-back').click(function(){
    $(this).parent().parent().hide();
    $('#menu-main').show();
  })
  $('#button-MessageFound').click(function(){
    //before changing, bufferedData stored the report object
    bufferedData = bufferedData['id'];
    //after changing, bufferedData holds the report id
    console.log('redirect to message with case id = '+bufferedData);
  })
  $('#button-MessageLost').click(function(){
    //before changing, bufferedData stored the report object
    bufferedData = bufferedData['id'];
    //after changing, bufferedData holds the report id
    console.log('redirect to message with case id = '+bufferedData);
  })
}

var setMenu = function(){
  //set all redirect function for main menu
  setRedirect('#button-newLost','#menu-main','#newReportLost');
  setRedirect('#button-newFound','#menu-main','#newReportFound');

  setRedirectWithFunction('#button-listReport','#menu-main','#listReport',addReport);
  setRedirectWithFunction('#button-listMessage','#menu-main','#listMessage',addMessage);
  setRedirect('#button-setting','#menu-main','#setting');
  setRedirect('#button-about','#menu-main','#about');
  setRedirectWithFunction('#button-signout','#setting','#setting',signoutFunc);
  setRedirectWithFunction('#button-notification','#setting','#setting',notificationFunc);
  setRedirectWithFunction('#button-location','#setting','#setting',locationFunc);
}

var report1 = {
  'id' : 1,
  "pet_type":'dog',
  'breed' : 'breed1',
  'name' : 'name',
  'age' : 12,
  'color' : 'orange',
  'sex' :'male',
  'last_seen_address' : 'earth',
  'note' : '123',
  'photo' : '',
  'report_type':'lost'
}

var report2 = {
  'id' : 2,
  "pet_type":'dog2',
  'name' : 'name2',
  'breed' : 'breed2',
  'age' : 12,
  'color' : 'orange',
  'sex' :'male',
  'last_seen_address' : 'earth',
  'note' : '456',
  'photo' : '',
  'report_type':'lost'
}

var report3 = {
  'id' : 3,
  "pet_type":'dog2',
  'name' : 'name2',
  'breed' : 'breed2',
  'age' : 12,
  'color' : 'orange',
  'sex' :'male',
  'last_seen_address' : 'earth',
  'note' : '456',
  'photo' : '',
  'report_type':'found'
}

var message1 = {
  'photo1' : '',
  'body' : 'body1'
}
var message2 = {
  'photo1' : '',
  'body' : 'body2'
}

var user = {
  'avator' : '',
  'first_name' :'first',
  'last_name' : 'last'
}
