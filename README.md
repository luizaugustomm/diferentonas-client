# Diferentonas

Só minha cidade que investe verba federal assim?

Usamos dados dos convênios que os municípios celebram com o governo federal e a sua execução, cruzados com dados socioeconômicos sobre os municípios do Brasil para examinar no que uma cidade é diferentona com relação aos convênios que celebrou com o governo federal. Melhor explicado aqui: https://vimeo.com/162919268 .

Este repositório contém o aplicativo cliente. Um servidor com a API REST existe aqui: https://github.com/nazareno/diferentonas-server . Você pode acessar uma versão html do app atual aqui: https://luizaugustomm.github.io/diferentonas-client . Deixe usuário e senha em branco. E lembre que o leiaute foi feito para a tela de um celular.

## Contribua com a gente

O Diferentonas está em pleno desenvolvimento. Mantemos o nossos planos nos issues do github, inclusive com um roadmap. Apenas o `ionic` é necessário para rodar a aplicação.

### Instalação e configuração do ambiente

Primeiro, é necessário ter instalado o npm em sua máquina. Você pode ver como fazer isso [aqui](https://docs.npmjs.com/getting-started/installing-node).

Agora, você deve instalar o ionic e o cordova.

```
$ sudo npm install -g cordova
$ sudo npm install -g ionic
```

Faça um clone do repositório.

```
$ git clone https://github.com/luizaugustomm/diferentonas-client.git
$ cd diferentonas-client
```

Instale os pacotes necessários.

```
$ npm install
$ ionic state reset
```

Para testar o aplicativo no browser, é preciso executar os seguintes comandos:

```
$ gulp deploy-ionic-serve
$ ionic serve
```


### Para fazer Build

Caso queira criar apks para android, é preciso instalar o sdk do Android, o JDK 8 e a versão mais recente do CrossWalk.

```
$ cordova plugin rm cordova-plugin-crosswalk-webview
$ cordova plugin add cordova-plugin-crosswalk-webview@2.2.0
```

Para fazer a build, execute o seguinte comando:

```
$ ionic build
```
