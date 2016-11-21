// all views
var allView = ['#menu-main','#listReport','#listMessage','#setting','#about'
,'#newReportFound','#previewReportFound','#completeReportFound','#showReportFound','#editReportFound','#newReportLost','#previewReportLost','#completeReportLost','#showReportLost','#editReportLost','#showMessage','#listFilterdReport','#newMessage']

var lostOrFound;
var caseid;
var bufferedData;
var currentPage;
var prevPage;
var pinLostAssetLoc = '';
var pinFoundAssetLoc = '';
var $DOMAIN;
$(function(){
  initialize();
});

var initialize = function(){
  //initialize value
  $DOMAIN = $("#domainurl").attr('val');
  // $DOMAIN = 'http://localhost:3000/'
  renderUserInfo();
  //hide all views
  allView.forEach(function(view){
    hideObject(view,"");
  })
  //list all views need to be visiable at begining
  showObject('#menu-main')
  //set all click action
  $('#pinImageLost')
  $('#pinImageFound')
 setMenu();
 setControllerButton();
 setAction();
}

var showReport = function(id,bln){
  //bln determin lost or found, true for found, false for lost
  //currentPage
  //use ajax to get report using report id
  caseid = id;
  $.get($DOMAIN+"/reports/"+id, function(data){
    bufferedData = info.report
    if(bln){
      to = '#showReportFound';
      tmp = '#showReportFoundData';
      target = "#reportShowFound";
    } else{
      to = '#showReportLost';
      tmp = '#showReportLostData';
      target = "#reportShowLost";
    }
    hideObject(currentPage,to);
    // showObject(to);
  })
}
var renderUserInfo = function(){
  //initialize user info from ajax
  bufferedData = user;
  renderMustache('#user-info','#userInfoData');

}

var signoutFunc = function(){
  console.log('signout');
  $.ajax({
    url: $DOMAIN+"/sessions",
    type: 'delete'
  });
}

var notificationFunc = function(){
  //what to do in notification?
  console.log('notify');
}

var locationFunc = function(){
  //what to do with location?
  console.log('location');
}

var resetReportForm = function(){
  caseid = 0;

  $('#pac-report-input').val(""),
  $('#found_last_seen_date').val(""),
  $('#found_note').val(""),
  $('#lost_name').val(''),
  $('#lost_age').val(''),
  $('#pac-report-input-lost').val(''),
  $('#last_seen_date-lost').val(''),
  $('#lost_note').val('');

}
var newLinkedFoundReport = function(){
  //bufferedData was holding a report before
  bufferedData = bufferedData['id'];
  caseid = bufferedData
}

var getReportLost = function(){
  $.get($DOMAIN+"/reports/"+bufferedData, function(data){
    info = data;
    bufferedData = data.report;
    caseid = bufferedData.id;
    console.log('lost:'+bufferedData);
    console.log('get lost report');
    showMarker(bufferedData);

    //before running ajax, bufferedData stored the report id
    //use ajax to update bufferedData, report.find(bufferedData)

    //javascript for putting a pin on map
    renderMustache("#reportShowLost",'#showReportLostData');
  })


}

var getReportFound = function(){

  $.get($DOMAIN+"/reports/"+bufferedData, function(data){
  info = data;
  bufferedData = data.report;
  caseid = bufferedData.id;
  console.log('found:'+bufferedData);
  console.log('get found report');
  showMarker(bufferedData);
  //before running ajax, bufferedData stored the report id
  //use ajax to update bufferedData, report.find(bufferedData)

  //javascript for putting a pin on map
  renderMustache("#reportShowFound",'#showReportFoundData');
  })
}
var sendMessage = function(){
  var reportID = bufferedData;
  bufferedData = {messenger:{},report_id:''};
  bufferedData.messenger.body = $("#messageBody").val();
  bufferedData.report_id = reportID;
  //ajax post to db
  $.post($DOMAIN+"/messengers",bufferedData, function(data){bufferedData = data});
  hideObject(currentPage,'#menu-main');
  // showObject('#menu-main');
}
var getMessage = function(){
  $.get($DOMAIN+"/messengers/"+bufferedData, function(data){
  info = data;
  bufferedData = info.messenger;
  })
  console.log('get:'+bufferedData);
  console.log('show message');
  //before running ajax, bufferedData stored the message id
  //use ajax to get message, message.find(bufferedData)
  renderMustache("#showMessage",'#messageData');
}

var setRedirect = function(target,fro,to){
  //set redirect function for a button
  $(target).click(function(){
    hideObject(fro,to);
    // showObject(to);
  });
}
var setDeligate = function(deligateTar,target,func,fro,to){
  $(deligateTar).on('click',target,function(){
    //store id to bufferedData
    bufferedData = $(this).data('id');
    func();
    hideObject(fro,to);
    // showObject(to);
  });
}

var setRedirectWithFunction = function(target,fro,to,func){
  //set redirect function for a button
  $(target).click(function(){
    func();
    hideObject(fro,to);
    // showObject(to);
  });
}

var hideObject= function(targetHide,targetShow){
  // $(target).hide();
  var CHGTIME = 300;
  // $(targetHide).hide("slide", { direction: "left" }, 0);
  $(targetHide).slideUp('fast');
  // setTimeout(function(){ showObject(targetShow); }, CHGTIME);
  showObject(targetShow);
}
var showObject= function(target){
  // $(target).show();
  $(target).show("slide", { direction: "left" }, 300);
  currentPage = target;
}
var renderLists = function(reports,template,list){
  var reportTemplate = $(template).html();
  var reportList = $(list);
  Mustache.parse(reportTemplate);
  if(reports && reports.length){
    var reportHTML = reports
    .map(function (report) {
      return Mustache.render(reportTemplate, report);
    }).join('');
  }
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
  bufferedData = {
    breed: $('#lost_breed option:selected').text(),
    color: $('#lost_colour option:selected').val(),
    name: $('#lost_name').val(),
    age: $('#lost_age').val(),
    sex: $('#lost_sex option:selected').text(),
    pet_type: $('#lost_pet_type option:selected').text(),
    last_seen_address: $('#pac-report-input-lost').val(),
    last_seen_date: $('#last_seen_date-lost').val(),
    note: $('#lost_note').val()
  }
  lostOrFound="Lost";
  tmp = "#reportShowLost";
  target = '#previewReportLostData';

  //javascript for putting a pin on map?
  renderMustache(tmp,target);
}

var renderPreviewFound = function(){
  //bufferedData might hold the case id if it is a linked report
  //use jquery to access fiends from edit/new form
  bufferedData = {
    pet_type: $('#found_pet_type option:selected').text(),
    last_seen_address: $('#pac-report-input').val(),
    last_seen_date: $('#found_last_seen_date').val(),
    color: $('#color option:selected').val(),
    note: $('#found_note').val(),
    related_id: caseid
  };
  lostOrFound = "Found";
  tmp = "#reportShowFound";
  target = '#previewReportFoundData';
  //javascript for putting a pin on map?
  renderMustache(tmp,target);
}

var postReport = function(){
  //use ajax to pass report info to rails for save
  data = {};
  data.report=bufferedData;
  data.report.report_type = lostOrFound;
  console.log(lostOrFound);
  //
  //use ajax to get report id from using report details
  //or use ajax to get user.report.last?

  //before running ajax, bufferedData stored a report detail
  $.post($DOMAIN+"/reports",data, function(data){
    info = data;
    addMarker(data.report);
    if(lostOrFound == 'Lost'){
      renderMustache("#reportShowLost",'#showReportLostData');
    } else {
      renderMustache("#reportShowFound",'#showReportFoundData');
    }
  });

  //after running ajax, bufferedData will store a report id
  console.log('pass to db');
  //javascript for putting a pin on map
}
var addReport = function(){
  var reportlist;
  //use ajax to get alist of my lost report
  $.get($DOMAIN+"/reports/user/lost",function(data){
    // reportlist=;
    renderLists(data.reports,'#report-summary','#list-lost');

  });

  // reports = [report1,report2];

  //use ajax to get a list of my found report

  $.get($DOMAIN+"/reports/user/found",function(data){
    // reportlist=data.reports;
    renderLists(data.reports,'#report-summary','#list-found');
  });
  // reports = [report1,report2];

}

var getLinkedReport = function(){
  // data.case_id = bufferedData.id;
  //use ajax to get linked report with same case id
  $.get($DOMAIN+"/reports/case/linked",{related_id:caseid},function(data){
    bufferedData = data.reports
    renderFilterReports(bufferedData);
  });
}
var renderFilterReports = function(reports){
  renderLists(reports,'#report-summary','#list-filterd');
}

var addMessage = function(){
  // var messages;
  //use ajax to get a list of my message-summary
  $.get($DOMAIN+"/messengers", function(data){
    // bufferedData = data.messenger;
    renderLists(data.messenger,'#message-summary','#list-message');
  });
  //messages = [message1,message2];

}

var setControllerButton = function(){
  $('.button-back').click(function(){
    // $(this).parent().parent().hide();
    // $('#menu-main').show();
    hideObject(currentPage,'#menu-main');
    // showObject('#menu-main');
  })
  $('.button-backNewFound').click(function(){
    // $(this).parent().parent().hide();
    // $('#menu-main').show();
    hideObject(currentPage,'#newReportFound');
    // showObject('#newReportFound');
  })
  $('.button-backNewLost').click(function(){
    // $(this).parent().parent().hide();
    // $('#menu-main').show();
    hideObject(currentPage,'#newReportLost');
    // showObject('#newReportLost');
  })

  $('.button-facebook').click(function(){
    //ajax?
    //share to facebook
  })

  $('.button-newMessage').click(function(){
    //set the message image to report photo1
    $('#messageIMG')

    //before changing, bufferedData stored the report object
    bufferedData = bufferedData.report.id;
    //after changing, bufferedData holds the report id
    console.log('redirect to message with case id = '+bufferedData);

    hideObject(currentPage,'#newMessage');
    // showObject('#newMessage');
  })
}

var setMenu = function(){
  //set all redirect function for main menu
  setRedirectWithFunction('#button-newLost','#menu-main','#newReportLost',resetReportForm);
  setRedirectWithFunction('#button-newFound','#menu-main','#newReportFound',resetReportForm);

  setRedirectWithFunction('#button-listReport','#menu-main','#listReport',addReport);
  setRedirectWithFunction('#button-listMessage','#menu-main','#listMessage',addMessage);
  setRedirect('#button-setting','#menu-main','#setting');
  setRedirect('#button-about','#menu-main','#about');
  setRedirectWithFunction('#button-signout','#setting','#setting',signoutFunc);
  setRedirectWithFunction('#button-notification','#setting','#setting',notificationFunc);
  setRedirectWithFunction('#button-location','#setting','#setting',locationFunc);
}

var setAction = function(){
  //found route
  setRedirectWithFunction('#button-sumbitNewReportFound','#newReportFound','#previewReportFound',renderPreviewFound);
  setRedirectWithFunction('#button-sumbitPreviewReportFound','#previewReportFound','#completeReportFound',postReport);
  setRedirectWithFunction('#button-sumbitCompleteReportFound','#completeReportFound','#showReportFound',getReportFound);
  setRedirectWithFunction('#button-reportAnotherFound','#showReportFound','#newReportFound',newLinkedFoundReport);
  setRedirectWithFunction('#button-trackPet','#showReportFound','#listFilterdReport',getLinkedReport);

  //set message
  setRedirectWithFunction('.button-sendMessage','#newMessage','#menu-main',sendMessage);

  //lost route
  setRedirectWithFunction('#button-sumbitNewReportLost','#newReportLost','#previewReportLost',renderPreviewLost);
  setRedirectWithFunction('#button-sumbitPreviewReportLost','#previewReportLost','#completeReportLost',postReport);
  setRedirectWithFunction('#button-sumbitCompleteReportLost','#completeReportLost','#showReportLost',getReportLost);

  //set deligate
  setDeligate('#list-lost','li',getReportLost,'#listReport','#showReportLost');
  setDeligate('#list-found','li',getReportFound,'#listReport','#showReportFound');
  setDeligate('#list-message','li',getMessage,'#listMessage','#showMessage');
  setDeligate('#list-filterd','li',getReportFound,'#listFilterdReport','#showReportFound');

}

var report1 = {
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

var report4 =   {
  name: '12345',
  breed: '12345',
  pet_type: '12345',
  age: '2',
  color: '12345',
  sex: '12345',
  photo1: '12345',
  photo2: '12345',
  photo3: '12345',
  last_seen_date: '12345',
  last_seen_address: '12345',
  latitude: 1231243.2132,
  longitude: 123454.32,
  note: '12345',
  report_type: 'Lost'
}

var message_test = {
  body: '12434345'
}
