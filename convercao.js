import X2JS from "x2js";


export function converterXmlParaJson(xml){
    const x2js = new X2JS();
    const jsonObj = x2js.xml2js( xml );
    return jsonObj
}