import store from '@/store'
/**
 * 获取地质储量单位
 */
export function getGeoReservesUnit(){
    /**
     * 地质储量
     *国内：油10^4m3,气10^8m3
     *英制：油MStb，气MMscf
     */
    let unit= "METRIC";

    if(unit==="METRIC"){
        return "10⁴m³"
    }
    else{
        return "MStb"
    }
}
export function getCumRateUnit() {
    //console.log("getCumRateUnit")
    let unit= "METRIC";//"METRIC"//store.state.user.user

   //waterInject lce 请不要改
    if(unit==="METRIC"){
        //公制(米制)
        return {"oilUnit":"10⁴m³","gasUnit":"10⁸m³","waterUnit":"10⁴m³","gas_oilRatio":"m³/m³","waterInject":"10⁴m³","liquid":"m³","gas1Unit":"10⁸m³", "gasValentUnit": "10⁴m³油当量"}
    }
    else{
       return {"oilUnit":"Mstb","gasUnit":"MMscf","waterUnit":"Mstb","gas_oilRatio":"MMscf/Mstb","waterInject":"Mstb","liquid":"Mstb","gas1Unit":"MMscf", "gasValentUnit": "Mstb油当量"}
    }
}
export function getDailyRateUnit()
{
    //console.log("getDailyRateUnit")
    let unit="METRIC";
    //waterInject lce 请不要改
    if(unit==="METRIC"){
        //公制(米制)
        return {"oilUnit":"m³/d","gasUnit":"10⁴m³/d","waterUnit":"m³/d","gas_oilRatio":"m³/m³","waterInject":"m³/d","liquid":"m³/d"}
    }
    else{
        return {"oilUnit":"stb/d","gasUnit":"Mscf/d","waterUnit":"stb/d","gas_oilRatio":"Mscf/stb","waterInject":"stb/d","liquid":"stb/d"}
    }
}
export function getMilliUnit(){
    let unit="METRIC";
    if (unit === "IMPERIAL") {
        return  "inch"
    }
    return "mm"
}

export function getMeterUnit(){
    //console.log("getLengthUnit")
    let unit="METRIC";
    if (unit === "IMPERIAL") {
        return "ft"
    }
    return "m"
}

export function getOilRateUnit() {
    let unit="METRIC"
    if (unit === "IMPERIAL") {
        return "stb/d"
    }
    return "m³/d"
}

export function getGasRateUnit() {
    let unit="METRIC"
    if (unit === "IMPERIAL") {
        return "Mscf/d"
    }
    return "m³/d"
}
