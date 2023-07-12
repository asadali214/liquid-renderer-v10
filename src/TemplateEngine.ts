import { Base64 as base64 } from "js-base64";

// use this instead of default export from liquid because its not compiled to ES5
import { Liquid } from "liquidjs";

// @ts-ignore
/* const lexical = liquidjs.lexical;
const withRE = new RegExp(`with\\s+(${lexical.value.source})`);
const staticFileRE = /[^\s,]+/; */

export class LiquidJS {
  liquid;
  constructor(partialTemplates?: { [key: string]: string }) {
    this.liquid = new Liquid({
      relativeReference: false,
      fs: {
        async readFile(fileName: string) {
          return partialTemplates?.[fileName];
        },
        existsSync() {
          return true;
        },
        async exists() {
          return true;
        },
        contains() {
          return true;
        },
        resolve(root: any, fileName: any, ext: any) {
          return fileName;
        }
      }
    });
    // Monkey-patch file-loading mechanism in LiquidJS to allow loading templates from a map.
    // Newer LiquidJS version already implements this so migrating to that is also an option.
    // FIX: Patching __proto__ affects all liquidjs instances which means we are setting all
    // LiquidJS instances to use our "partialTemplates" map (which is wrong).

    this.registerFilters();
  }

  private registerFilters = () => {
    this.registerJsonFileder();
    this.registerGetFileFromDataUrlFilter();
    this.registerBase64EncodeFilter();
  };

  private registerJsonFileder = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.liquid.registerFilter("json", (v: any, i: number | undefined) =>
      JSON.stringify(v, null, i ? 2 : undefined)
    );
  };

  private registerGetFileFromDataUrlFilter = () => {
    /**
     * A filter to get file name from data-URI encoded string
     */
    this.liquid.registerFilter("get_file_from_data_url", (v: string) => {
      const reg = /^data:.*;name=(.*);.*$/g;
      const result = reg.exec(v);
      return result ? result[1] : "";
    });
  };

  private registerBase64EncodeFilter = () => {
    /**
     * Base64 encode a string
     */
    this.liquid.registerFilter("base64_encode", (v: string) =>
      base64.encode(v)
    );
  };

  /**
   * Parsed template
   * @param tpl Template
   */

  /**
   * Render a template with given data context
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render = (tpl: any, ctx: any): Promise<string> => {
    return this.liquid.parseAndRender(tpl, ctx);
  };
}
