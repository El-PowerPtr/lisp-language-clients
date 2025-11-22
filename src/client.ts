export let acodeLanguageClient = acode.require("acode-language-client")

export class LanguageServer {
    command: string
    args: string[]
    languages: string[]
    
    constructor(command: string, args: string[], languages: string[]) {
        this.command = command
        this.args = args
        this.languages = languages
    }
    
    setupLangaugeClient() {

        let socket = acodeLanguageClient.getSocketForCommand(this.command, this.args);

        let client = new acodeLanguageClient.LanguageClient({type: "socket", socket});
    
        acodeLanguageClient.registerService(this.languages.join('|'), client);
    }
}