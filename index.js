var todo = angular.module('todoList',[]);
todo.controller('mainCtrl',['$scope',function($scope){
	if(localStorage.qd){
		$scope.qingdan = angular.fromJson(localStorage.qd)
	}else{
		$scope.qingdan = [
			{id:1001,name:'购物清单',theme:'blue-icon',color:'blue-text',itemColor:'item-blue',itemColor2:'item-blue2',shixiang:[
				{name:'周边',state:false},
				{name:'服装',state:true},
				{name:'海报',state:false}
			]},
			{id:1002,name:'音乐清单',theme:'green-icon',color:'green-text',itemColor:'item-green',itemColor2:'item-green2',shixiang:[
				{name:'江南调',state:true},
				{name:'醉赤壁',state:false},
				{name:'过桥',state:false}
			]},
			{id:1003,name:'读书清单',theme:'yellow-icon',color:'yellow-text',itemColor:'item-yellow',itemColor2:'item-yellow2',shixiang:[
				{name:'盗墓笔记',state:true},
				{name:'红楼梦',state:false},
				{name:'心理罪',state:true}
			]}
		];
	}
	
	
	$scope.currentQingdan = 0;

	$scope.saveData = function(){
		localStorage.qd = angular.toJson(this.qingdan);
	}

	var colors = ['blue-icon','orange-icon','yellow-icon','purple-icon','green-icon','pink-icon','brown-icon'];
	var color = ['blue-text','orange-text','yellow-text','purple-text','green-text','pink-text','brown-text'];
	var itemColor = ['item-blue','item-orange','item-yellow','item-purple','item-green','item-pink','item-brown'];
	var itemColor2 = ['item-blue2','item-orange2','item-yellow2','item-purple2','item-green2','item-pink2','item-brown2'];
	$scope.addQingdanItem = function(){
		var len = $scope.qingdan.length;
		var id = ( len === 0 ) ? 1001 : (Math.max.apply(null,$scope.qingdan.map(function(v,i){
			return Number(v.id);
		})) + 1);
		var qingdan = {
			id:Number(id),
			name:'新清单' + (len + 1),
			theme:colors[ len % 7 ],
			color:color[ len%7 ],
			itemColor:itemColor[ len%7 ],
			itemColor2:itemColor2[ len%7 ],
			shixiang:[],
		}
		$scope.currentQingdan = qingdan;
		$scope.qingdan.push(qingdan);
		this.saveData();
	}

	$scope.setCurrent = function(index){
		$scope.currentQingdan = $scope.qingdan[index]
	}



	$scope.newItem=function(){
		var nItem=$scope.currentQingdan;
		var data={name:'',state:false};
		nItem.shixiang.push(data);
		localStorage.qd=JSON.stringify($scope.qingdan);
	}


	$scope.deleteItem=function(index){
		var del=[];
		var dItem=$scope.currentQingdan;
		console.log(dItem);
		for(var i=0; i<dItem.shixiang.length;i++){
			if(i!=index){
				del.push(dItem.shixiang[i])
			}
		}
		$scope.currentQingdan.shixiang=del;
		localStorage.qd=JSON.stringify($scope.qingdan);
	}













}])