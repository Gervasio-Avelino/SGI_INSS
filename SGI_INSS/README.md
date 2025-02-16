# Sistema de Gerenciamento de Inventário - INSS

## Descrição
Este projeto é um Sistema de Gerenciamento de Inventário para o INSS, desenvolvido para gerenciar e auditar equipamentos de Tecnologia da Informação e Comunicação (TIC). O sistema permite o cadastro, alteração, visualização e remoção de equipamentos, bem como o registro de movimentos de entrada e saída desses itens. Além disso, oferece funcionalidades de pesquisa, visualização de atividades recentes e geração de relatórios em PDF.

## Tecnologias Utilizadas
- **Frontend**: React, Bootstrap
- **Backend**: Firebase (Authentication, Firestore)
- **Outras Bibliotecas**: jsPDF

## Funcionalidades
### Requisitos Funcionais
1. **RF01**: Efetuar o login (DI, DAG, DAI)
2. **RF02**: Efetuar o logout (DI, DAG, DAI)
3. **RF03**: Cadastrar equipamentos de TICs (DI)
4. **RF04**: Alterar dados dos equipamentos cadastrados (DI)
5. **RF05**: Registrar movimentos (Entrada/Saída) de equipamentos de TIC (DI)
6. **RF06**: Fazer pesquisa por equipamento de TIC (DI, DAG, DAI)
7. **RF07**: Visualizar equipamentos de TIC (DI, DAG, DAI)
8. **RF08**: Remover equipamentos de TICs cadastrados (DI)

### Requisitos Não Funcionais
1. **RNF001**: Interface Amigável
2. **RNF002**: Desempenho
3. **RNF003**: Multiplataforma
4. **RNF004**: Segurança

## Atores do Sistema
- **Técnico do Departamento de Informática (DI)**: Responsável pelo sistema de inventário e inserção de informações detalhadas sobre cada equipamento.
- **Técnico do Departamento de Administração Geral (DAG)**: Verifica a precisão das informações e corrige discrepâncias para garantir a integridade do inventário.
- **Técnico do Departamento de Auditoria Interna (DAI)**: Usa o sistema para auditoria interna, verifica a correspondência do inventário físico com o sistema e avalia a eficácia dos controles internos para prevenir fraudes e erros.

## Estrutura do Projeto

## Instalação e Configuração
### Pré-requisitos
- Node.js
- Firebase Project

### Passos para Instalação
1. Clone este repositório:
    ```sh
    git clone https://github.com/seu-usuario/sistema-de-inventario-inss.git
    ```
2. Navegue até o diretório do projeto:
    ```sh
    cd sistema-de-inventario-inss
    ```
3. Instale as dependências:
    ```sh
    npm install
    ```

### Configuração do Firebase
1. Crie um projeto no Firebase.
2. Habilite a autenticação por e-mail/senha.
3. Crie um Firestore Database.
4. Copie as configurações do Firebase para um arquivo `.env.local` no diretório raiz do projeto:
    ```
    REACT_APP_API_KEY=your-api-key
    REACT_APP_AUTH_DOMAIN=your-auth-domain
    REACT_APP_PROJECT_ID=your-project-id
    REACT_APP_STORAGE_BUCKET=your-storage-bucket
    REACT_APP_MESSAGING_SENDER_ID=your-messaging-sender-id
    REACT_APP_APP_ID=your-app-id
    ```

### Execução
1. Inicie o servidor de desenvolvimento:
    ```sh
    npm start
    ```

2. Acesse a aplicação no navegador:
    ```
    http://localhost:3000
    ```

## Uso
### Login e Registro
- Acesse `/login` para efetuar login.
- Acesse `/register` para registrar um novo usuário.

### Dashboard
- O dashboard exibe o resumo das atividades recentes e permite o acesso a várias funcionalidades do sistema.

### Gerenciamento de Equipamentos
- Adicione, edite, remova e visualize equipamentos.

### Movimentos
- Registre movimentos de entrada e saída dos equipamentos.

### Pesquisa
- Pesquise equipamentos no inventário.

### Perfil de Usuário
- Visualize e edite o perfil do usuário.

## Contribuição
1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Faça o push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## Licença
Distribuído sob a licença MIT. Veja `LICENSE` para mais informações.

## Contato
Seu Nome - [@seu-usuario](https://twitter.com/seu-usuario) - seu-email@example.com

Link do Projeto: [https://github.com/seu-usuario/sistema-de-inventario-inss](https://github.com/seu-usuario/sistema-de-inventario-inss)
