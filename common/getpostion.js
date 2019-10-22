import {areas} from './areas.js'
var Allareas = {}
for(var i=0;i<areas.length;i++){
		Allareas[areas[i].id] = areas[i]
		//this.cityname[areas[i].name] = areas[i]
}
function getpostion (id){
	var item1 = Allareas[id]
	if(item1.parentId){
		var item2 = Allareas[item1.parentId]
		if(item2.parentId){
			var item3 = Allareas[item2.parentId]
			return item3.name +'-'+ item2.name +'-'+ item1.name
		}else{
			return item2.name +'-'+  item1.name
		}
	}else{
		return  item1.name
	}
}
export default getpostion