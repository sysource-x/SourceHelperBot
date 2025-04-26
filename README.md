# SourceHelperBot

Um bot do Discord que automaticamente detecta perguntas de programação e fornece explicações concisas e correções de código.

## Características

- **Detecção automática de perguntas**: Identifica quando alguém está perguntando sobre programação
- **Explicação de conceitos**: Fornece explicações claras para conceitos de programação
- **Correção de código**: Identifica problemas em snippets de código e oferece correções
- **Suporte a múltiplas linguagens**: Detecta automaticamente a linguagem de programação utilizada
- **Canal dedicado**: Opera exclusivamente no canal `helperbot-chat`

## Comandos

- `!help` - Exibe a mensagem de ajuda com todos os comandos
- `!explain [conceito]` - Explica um conceito de programação
- `!fix` - Corrige o código incluído na mensagem (usando blocos de código \`\`\`)
- `!settings` - Mostra as configurações atuais do servidor
- `!toggle` - Ativa/desativa respostas automáticas

## Tecnologias

- Node.js
- TypeScript
- Discord.js
- OpenAI API
- Express
- React (interface web)

## Instalação

1. Clone este repositório:
   ```bash
   git clone https://github.com/seu-usuario/SourceHelperBot.git
   cd SourceHelperBot
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente:
   - Crie um arquivo `.env` na raiz do projeto
   - Adicione as seguintes variáveis:
     ```
     DISCORD_TOKEN=seu_token_do_discord
     OPENAI_API_KEY=sua_chave_da_api_openai
     ```

4. Inicie o bot:
   ```bash
   npm run dev
   ```

## Configuração no Discord

1. Certifique-se de que o bot tenha as seguintes permissões:
   - Ler mensagens
   - Enviar mensagens
   - Ler histórico de mensagens
   - Adicionar reações

2. Crie um canal chamado `helperbot-chat` no seu servidor

3. Convide o bot para seu servidor usando o link de convite gerado no [Portal de Desenvolvedores do Discord](https://discord.com/developers/applications)

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).