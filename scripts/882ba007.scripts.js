!function(a,b){"use strict";void 0!==b&&b.initialize("wHOusfpG1kv1wus81ORw8FNwW7V7NP3qXQMfSYdP","LNTVdhY79CqOwTC8xc1m6FVUN71WsrjFFYMsctuK");var c=a.module("sladsApp",["ngSanitize","ngRoute","mgcrea.ngStrap","parse-angular","parse-angular.enhance"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/login.html",controller:"LoginCtrl"}).when("/main",{templateUrl:"views/main.html",controller:"MainCtrl"}).when("/modal",{templateUrl:"views/modal.html"}).otherwise({redirectTo:"/"})}]);c.directive("hideFullscreen",["$window",function(b){return{link:function(c,d){a.element(b).bind("resize",function(){b.fullScreen||b.innerWidth===b.screen.width&&b.innerHeight===b.screen.height?d.addClass("ng-hide"):d.removeClass("ng-hide")})}}}]),c.factory("parseService",function(){return{login:function(a,c,d){b.User.logIn(a,c,d)},logout:function(){b.User.logOut()},currentUser:b.User.current}}),c.run(["$rootScope","$location","parseService",function(a,b,c){a.$on("$routeChangeStart",function(a){null===c.currentUser()&&(a.preventDefault(),b.path("/"))}),a.$watch(c.currentUser,function(a){a||b.path("/")})}])}(this.angular,this.Parse),function(a){"use strict";var b=a.module("sladsApp");b.controller("MainCtrl",["$scope","parseService",function(a,b){a.currentUser=b.currentUser(),a.page="ladder",a.logout=function(){b.logout()},a.showPage=function(b){a.page=b}}])}(this.angular),function(a){"use strict";var b=a.module("sladsApp");b.controller("LoginCtrl",["$scope","$location","parseService",function(a,b,c){a.formError="",null!==c.currentUser()&&b.path("/main"),a.login=function(d,e){c.login(d,e,{success:function(){a.formError="",b.path("/main")},error:function(b,c){a.formError=c.message}})}}])}(this.angular),function(a,b){"use strict";var c=a.module("sladsApp");c.controller("LadderCtrl",["$scope","parseService","$modal",function(a,c,d){a.players=[],a.matches=[];var e=b.Object.extend({className:"Player",attrs:["firstName","lastName"]}),f=function(){var c=new b.Query(e);c.find().then(function(b){a.players=b})};f();var g=b.Object.extend({className:"Match",attrs:["winner","loser"]}),h=function(){var c=new b.Query(g);c.include("winner","loser"),c.find().then(function(b){a.matches=b})};h();var i=function(a){return a.getFirstName()+" "+a.getLastName()},j=function(){a.ladder=[];var b=a.players.map(function(b){var c={name:i(b)};return c.wins=a.matches.reduce(function(a,c){return c.getWinner().id===b.id?a+1:a},0),c.for=a.matches.reduce(function(a,c){return c.getWinner().id===b.id?a+c.get("winner_goals"):c.getLoser().id===b.id?a+c.get("loser_goals"):a},0),c.losses=a.matches.reduce(function(a,c){return c.getLoser().id===b.id?a+1:a},0),c.against=a.matches.reduce(function(a,c){return c.getLoser().id===b.id?a+c.get("winner_goals"):c.getWinner().id===b.id?a+c.get("loser_goals"):a},0),c.gd=c.for-c.against,c.played=c.wins+c.losses,c.wp=Math.round(c.wins/c.played*1e4)/100,c});b.sort(function(a,b){return b.wp-a.wp}),a.ladder=b};a.$watchCollection("matches",j),a.$watchCollection("players",j),a.playerName=i,a.openMatchModal=function(b){var c=a.$new();c.title="Match";var f=a.players.map(function(a){return{name:a.getFirstName()+" "+a.getLastName(),id:a.id}}),i=b?b.getWinner().id:void 0,j=b?b.getLoser().id:void 0,k=b?b.get("winner_goals"):0,l=b?b.get("loser_goals"):0,m=[{label:"Winner",type:"select",values:f,value:i},{label:"Points",type:"number",value:k},{label:"Loser",type:"select",values:f,value:j},{label:"Points",type:"number",value:l}];c.fields=m;var n=d({template:"views/modal.html",scope:c});c.save=function(a){var c=b||new g;c.set("winner_goals",a[1].value),c.set("loser_goals",a[3].value);var d=new e;d.id=a[0].value,c.set("winner",d);var f=new e;f.id=a[2].value,c.set("loser",f),c.save(null,{success:function(){h(),n.hide()}})}},a.openPlayerModal=function(b){var c=a.$new();c.title="Player";var g=b?b.getFirstName():void 0,i=b?b.getLastName():void 0,j=[{label:"First name",type:"text",value:g,placeholder:"First name"},{label:"Last name",type:"text",value:i,placeholder:"Last name"}];c.fields=j;var k=d({template:"views/modal.html",scope:c});c.save=function(a){var c=b||new e;c.set("firstName",a[0].value),c.set("lastName",a[1].value),c.save(null,{success:function(){f(),h(),k.hide()}})}}}])}(this.angular,this.Parse),function(a,b){"use strict";var c=a.module("sladsApp");c.controller("OrdersCtrl",["$scope","parseService","$modal",function(a,c,d){a.orders=[],a.products=[];var e=b.Object.extend({className:"Order",attrs:["user","products"]}),f=function(){var c=new b.Query(e);c.include("user","products"),c.find().then(function(b){a.orders=b})};f();var g=b.Object.extend({className:"Product",attrs:["name","price"]}),h=function(){var c=new b.Query(g);c.find().then(function(b){a.products=b})};h(),a.order=function(){var b=a.$new();b.title="Order";var h=[];b.fields=h;var i=d({template:"views/modal.html",scope:b});b.save=function(){var a=new e;a.set("user",c.currentUser());var b=new g;b.set("name","Test2"),b.set("price",2),b.save(null,{success:function(){a.add("products",b),a.save(null,{success:function(){f(),i.hide()}})}})}},a.openProductModal=function(b){var c=a.$new();c.title="Product";var e=b?b.getName():void 0,f=b?b.getPrice():void 0,i=[{label:"Name",type:"text",value:e,placeholder:"Name"},{label:"Price",type:"number",value:f,placeholder:"Price"}];c.fields=i;var j=d({template:"views/modal.html",scope:c});c.save=function(a){var c=b||new g;c.set("name",a[0].value),c.set("price",a[1].value),c.save(null,{success:function(){h(),j.hide()}})}}}])}(this.angular,this.Parse);