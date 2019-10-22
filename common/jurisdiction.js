export default function(suc) {
	uni.getSystemInfo({
		success: (res) => {
			
			if (res.brand == 'iPhone') {
				var cllocationManger = plus.ios.importClass("CLLocationManager");
				var enable = cllocationManger.locationServicesEnabled();
				var status = cllocationManger.authorizationStatus();
				console.log("enable:" + enable);
				console.log("status:" + status);
				if (enable && status != 2) {
					suc()
				} else {
					console.log("手机系统的定位没有打开");
					//  定位没有开启时  提示用户是否开启  
					plus.nativeUI.confirm("定位权限没有开启，是否去开启？", function(e) {

						var UIApplication = plus.ios.importClass("UIApplication");
						var application2 = UIApplication.sharedApplication();
						var NSURL2 = plus.ios.importClass("NSURL");
						var setting2 = NSURL2.URLWithString("app-settings:"); // 打开应用权限  
						application2.openURL(setting2);
						plus.ios.deleteObject(setting2);
						plus.ios.deleteObject(NSURL2);
						plus.ios.deleteObject(application2);

					}, {
						"buttons": ["不开启", "去设置"],
						"verticalAlign": "center"
					});
				}
				plus.ios.deleteObject(cllocationManger);
			}else{
				uni.getLocation({
					success:()=>{
						suc()
					},
					fail:()=> {
						uni.showToast({
							title:'我们需要您的定位权限,请去开启',
							icon:'none'
						})
					}
				})
			}
		}
	});




}
