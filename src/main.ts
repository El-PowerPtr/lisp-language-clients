import type { WCPage } from "acode/editor/page"
import plugin from '../plugin.json'
import { acodeLanguageClient, type LanguageServer} from "./client"

class LispLanguageClients {
    public baseUrl: string | undefined;
    
    async init(): Promise<void> {
        // Method to ensure Acode Language Client is setup before continuing
        if (acodeLanguageClient) {
            const langs: LanguageServer[] = []
            langs.forEach(lang => lang.setupLangaugeClient())
        } else {
            window.toast("Acode Language Client is not installed", 3000)
            /*window.addEventListener("plugin.install", ({detail}: any) => {
                if (detail.name === "acode-language-client") {
                    acodeLanguageClient = acode.require("acode-language-client")
                }
            })*/
        }
    }

    async destroy() {
    }
}

if(window.acode) {
    const lispLangClients = new LispLanguageClients();
    acode.setPluginInit(plugin.id, async (baseUrl: string, $page: WCPage, { cacheFileUrl, cacheFile }: any) => {
        if(!baseUrl.endsWith('/')) {
            baseUrl += '/';
        }
        lispLangClients.baseUrl = baseUrl;
        await lispLangClients.init();
    });
    acode.setPluginUnmount(plugin.id, () => {
        lispLangClients.destroy();
    });
}