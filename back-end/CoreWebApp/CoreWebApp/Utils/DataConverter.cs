using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Xml;

namespace CoreWebApp.Utils
{
    public static class DataConverter
    {
        public static string ConvertDatatableToXML(DataTable dt)
        {
            MemoryStream str = new MemoryStream();
            dt.WriteXml(str, true);
            str.Seek(0, SeekOrigin.Begin);
            StreamReader sr = new StreamReader(str);
            string xmlstr;
            xmlstr = sr.ReadToEnd();
            return (xmlstr);
        }

        public static JToken ConvertXMLToJToken(string xmlStr)
        {
            XmlDocument doc = new XmlDocument();
            doc.LoadXml(xmlStr);
            string jsonText = JsonConvert.SerializeXmlNode(doc);
            JObject data = JObject.Parse(jsonText);
            return data["DocumentElement"];
        }

        public static JToken Convert(DataTable dt)
        {
            string xmlStr = ConvertDatatableToXML(dt);
            JToken result = ConvertXMLToJToken(xmlStr);
            return result;
        }
    }
}
