html:


<!DOCTYPE html>
<html lang="en" ng-app="remider">
<head>
	<meta charset="UTF-8">
	<title>iCloud</title>
	<script src="js/angular.js"></script>
	<script src="js/remider.js"></script>

	<link rel="stylesheet" href="css/index.css">
	<link rel="stylesheet" href="./css/remied.css">
</head>
<body ng-controller="rdCtrl">
	<div class="iCloud">
		<div class="left">
			<div class="left-list">
				<div class="list-top">
					<div class="list-top-left"></div>
					<div class="list-top-right"ng-click="addshijian()"></div>
				</div>
				<div class="list-bottom">
					<div class="bottom-box">
						<div class="watch"ng-class="{active:clistindex==$index}">
							<div class="watch-content">
								<div class="watch-icon"></div>
								<label class="title">已计划</label>
							</div>
						</div>
					</div>
					<div class="new-list">
						<ul class="new-list-content">
							<li ng-repeat="value in shijieliebiao track by $index" ng-click="showshijian($index)"ng-class="{active:clistindex==$index}">
								<span ng-class='value.color'></span>
								<input type="text"ng-model="value.name"ng-blur="save()">
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
		<div class="right">
			<div class="right-box">
				<div class="right-top">
					<div class="search">
						<div class="search-right">
							<!-- <div class="search-text">搜索所有提醒</div> -->
							<input class="search-text"type="text"value="搜索所有提醒">
							 <input type="text"ng-model="value.name"ng-blur="save()">
							 <input type="text"ng-model="shijieliebiao[clistindex].name"ng-blur="save()"> 
							  <button ng-click="deletItem()">删除</button>
							 <span ng-repeat="value in colors" class="yundain"ng-class="value"ng-click="shijieliebiao[clistindex].color=value"></span> 
						</div>
						<div class="search-left">
							<div class="search-logo"></div>
						</div>
					</div>
				</div>
				<div class="right-middle">
					<div class="right-box">
						<div class="right-newlist">
							<div class="right-newlist-text">{{shijieliebiao[clistindex].name}}</div>
							<div class="R-newlist-xuanxiang">
								<label >选项</label>
							</div>
						</div>
					</div>
					<div class="right-bottom">
						<div class="yiwancheng">
							<div class="done-item">已完成:
								<span>{{shijieliebiao[clistindex].items.length}}</span>
							</div>
						</div>
						<div class="new-priject">
							<ul>
								<li ng-repeat="value in shijieliebiao[clistindex].items track by $index"ng-show='value.isDone'>
									<span ng-click="value.isDone=false;save()">{{value.isDone}}</span>
									<input type="text"ng-model="value.name"ng-blur="save()">
									<!-- <button ng-click="deleteTodo($index)">删除</button> -->
								</li>
							</ul>
							<hr>
							<ul>
								<li ng-repeat="value in shijieliebiao[clistindex].items track by $index"ng-hide="value.isDone">
									<span ng-click="value.isDone=true;save()" class="circle">{{value.isDone}}</span>
									<input type="text"ng-model="value.name"ng-blur="save()">
									 <button ng-click="deleteTodo($index)"class="shanchu">删除</button> 
								</li>
							</ul>
							<div class="new-item"ng-click="addTodo()">新项目...
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</body>
</html>


js:


var remider=angular.module('remider',[]);
remider.controller('rdCtrl', ['$scope', function($scope){
	var d = localStorage.data;
	$scope.shijieliebiao=d?JSON.parse(d):[];
	$scope.colors=['purple','green','blue','yellow','brow','pink','orange']	
	$scope.clistindex=0;
	$scope.showshijian=function(index){
		$scope.clistindex=index;
	}
	$scope.deletItem=function(){
		var r=[];
		for(var i=0;i<$scope.shijieliebiao.length;i++){
			if(i!=$scope.clistindex){
				r.push($scope.shijieliebiao[i])
			}
		}
		$scope.shijieliebiao=r;
		$scope.clistindex=0;
		localStorage.data=JSON.stringify($scope.shijieliebiao);
	}
	$scope.addshijian=function(){
		var data={
			name:'新列表'+($scope.shijieliebiao.length+1),
			color:$scope.colors[$scope.shijieliebiao.length%7],
			items:[]
		};
		$scope.shijieliebiao.push(data);
		localStorage.data=JSON.stringify($scope.shijieliebiao);
	}



	$scope.addTodo=function(){
		var cu=$scope.shijieliebiao[$scope.clistindex];
		var data={name:'',isDone:false};
		cu.items.push(data);
		localStorage.data=JSON.stringify($scope.shijieliebiao);
	}
	$scope.deleteTodo=function(index){
		var r=[];
		var cu=$scope.shijieliebiao[$scope.clistindex];
		for(var i=0; i<cu.items.length;i++){
			if(i!=index){
				r.push(cu.items[i])
			}
		}
		$scope.shijieliebiao[$scope.clistindex].items=r;
		localStorage.data=JSON.stringify($scope.shijieliebiao);
	}
	$scope.save=function(){
		localStorage.data=JSON.stringify($scope.shijieliebiao);
	}
}])