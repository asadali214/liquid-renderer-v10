import "./styles.css";
import { LiquidJS } from "./TemplateEngine";

// update this template to generate desired code sample
let template = {
  Model: {
    showFullCode: true,
    skipSslCertVerification: null,
    config: {
      BasicAuthUserName: "BasicAuthUserName",
      BasicAuthPassword: "BasicAuthPassword",
      port: "80",
      suites: 1
    },
    environment: "testing",
    auth: null,
    call: {
      additionalQueryParams: null,
      additionalFieldParams: null,
      args: {}
    }
  },
  PartialTemplates: {},
  Template:
    '{% if showFullCode %}using BATester.Standard.Controllers;\nusing BATester.Standard.Exceptions;\nusing BATester.Standard.Models;\nusing BATester.Standard.Utilities;\nusing System;\nusing System.Collections.Generic;\nusing System.Globalization;\nusing System.Threading.Tasks;\n\nnamespace Testing\n{\n    public class Program\n    {\n        public static async Task Main()\n        {\n{% if showFullCode %}            {% endif %}{% if showFullCode != true %}BATester.Standard.{% endif %}BATesterClient client = new {% if showFullCode != true %}BATester.Standard.{% endif %}BATesterClient.Builder()\n{% if showFullCode %}            {% endif %}    .BasicAuthCredentials({% if config["BasicAuthUserName"] != nil %}"{{ config["BasicAuthUserName"] | replace: "\\\\", "\\\\" | replace: \'"\', \'\\\\"\' | replace: "\\n", "\\\\n" }}"{% else %}null{% endif %}, {% if config["BasicAuthPassword"] != nil %}"{{ config["BasicAuthPassword"] | replace: "\\\\", "\\\\" | replace: \'"\', \'\\\\"\' | replace: "\\n", "\\\\n" }}"{% else %}null{% endif %}){% if environment != "testing" or showFullCode == false %}\n{% if showFullCode %}            {% endif %}    .Environment(BATester.Standard.{% case environment %}{% when "production" %}Environment.Production{% when "testing" %}Environment.Testing{% else %}envrr{% endcase %}){% endif %}{% if config["port"]  != "80" or showFullCode == false %}\n{% if showFullCode %}            {% endif %}    .Port({% if config["port"] != nil %}"{{ config["port"] | replace: "\\\\", "\\\\" | replace: \'"\', \'\\\\"\' | replace: "\\n", "\\\\n" }}"{% else %}null{% endif %}){% endif %}{% if config["suites"]  != "1" or showFullCode == false %}\n{% if showFullCode %}            {% endif %}    .Suites({% case config["suites"] %}{% when 1 %}SuiteCodeEnum.Hearts{% when 2 %}SuiteCodeEnum.Spades{% when 3 %}SuiteCodeEnum.Clubs{% when 4 %}SuiteCodeEnum.Diamonds{% when nil %}null{% else %}envrr{% endcase %}){% endif %}\n{% if showFullCode %}            {% endif %}    .Build();\n\n{% if showFullCode %}            {% endif %}APIController aPIController = client.APIController;\n\n{% endif %}{% if showFullCode %}            {% endif %}try\n{% if showFullCode %}            {% endif %}{\n{% if showFullCode %}            {% endif %}    string result = await aPIController.GetBasicAuthTestAsync();\n{% if showFullCode %}            {% endif %}}\n{% if showFullCode %}            {% endif %}catch (ApiException e)\n{% if showFullCode %}            {% endif %}{\n{% if showFullCode %}            {% endif %}    // TODO: Handle exception here\n{% if showFullCode %}            {% endif %}    Console.WriteLine(e.Message);\n{% if showFullCode %}            {% endif %}}{% if showFullCode %}\n        }\n    }\n}{% endif %}\n'
};

const liquid = new LiquidJS(template.PartialTemplates);

liquid.render(template.Template, template.Model).then((o) => {
  console.log(
    "*************************************************************************************"
  );
  console.log(o);
});

export default function App() {
  return (
    <div className="App">
      <h1>Liquid Renderer</h1>
      <h2>Check the console for output</h2>
    </div>
  );
}
