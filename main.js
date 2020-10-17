const { app, BrowserWindow, nativeImage, Menu } = require("electron");

// tirar menu preto padrão do electron
Menu.setApplicationMenu(false);

// habilita o live reload no electron e no frontend da aplicação com o lib electron-reload
// assim que alguma alteração no código é feita
require("electron-reload")(__dirname, {
    // observe que o caminho para o elétron pode variar de acordo com o arquivo principal
    electron: require(`${__dirname}/node_modules/electron`),
});

// função que cria uma janela desktop
function createWindow() {
    // adicionando um ícone na barra de tarefas/dock
    const icon = nativeImage.createFromPath(`${app.getAppPath()}/images/icon.ico`);

    if(app.dock) {
        app.dock.setIcon(icon);
    }

    // cria uma janela de desktop
    const win = new BrowserWindow({
        icon,
        width: 900,
        height: 600,
        webPreferences: {
            // habilita a integração do Node.js no Frontend
            nodeIntegration: true,
        },
    });

    // carrega a janela com o conteúdo dentro de index.html
    win.loadFile("index.html");

    // abre o console do navegador (DevTools),
    // manter apenas quando estiver desenvolvedo a aplicação,
    // pode utilizar variáveis de ambiente do node para executar esse código apenas quando estiver em modo DEV
    // win.webContents.openDevTools(); 
}

// método vai ser chamado assim que o Electron finalizar sua inicialização
// e estiver pronto para abrir e manipular o meu código
// algumas APIs podem ser usadas somente depois que este evento ocorre.
app.whenReady().then(createWindow);

// quando clicarmos no botão de fechar a janela no app desktop
// o evento vai ser ouvido aqui no arquivo main.js e algum procedimento pode ser realizado
// tipo fechar alguma conexão de banco de dados por exemplo.
app.on("window-all-closed", () => {
    // no MacOS quando fecha uma janela, na verdade ela é "minimizada"
    // e o processo executa em segundo-plano tipo um app do celular
    // para fechar e encerrar o app tem que teclar Cmd+Q o no dock (barra de tarefas)
    // clicar com botão direito e encerrar o app
    if(process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    // esse evento é disparado pelo MacOS quando clica no ícone do aplicativo no Dock.
    // basicamente cria a janela se não foi criada.
    if(BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

// abaixo vocÊ pode colocar seus códigos específicos do backend que precisam executar no processo principal
// pode criar pastas e arquivos separados e importar aqui (boa prática).