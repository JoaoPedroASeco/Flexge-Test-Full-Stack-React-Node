  # Flexge Teste

  ## Passos iniciais: 
    - git clone https://github.com/JoaoPedroASeco/Flexge-Test-Full-Stack-React-Node.git
    ...
      ou
    ...
    - baixe e extraia o zip em uma pasta local;
    - abra 2 terminais/prompts de comando na raiz do projeto;
  ### Comandos:
  #### Front:
    - no primeiro digite: 
      cd front-end
      npm install
    - dê start no projeto front-end digitando:
      yarn dev
        ou
      npm run dev

  #### back:
    - no segundo terminal digite:
      cd back-end
      npm install 

    - dê start no projeto back-end digitando:
      yarn dev
        ou
      npm run dev

  # Mockups
    - Criei um mockup para usuario acessando no browser localhost:4000/db-create-user-mockup
      - essa rota ira criar um usuario com os seguintes credenciais:
        - email: user@gmail.com
        - senha: 123

  # Login
    - Faça o login com o user criado utilizando as credenciais 
    - o backend retornara um token JWT autenticado que sera guardado nos cookies do browser pelo front-end, o token é valido por 1 hora, após esse tempo, o usuario sera redirecionado para pagina de login
    
  # Pagina de listagem de Students
    - Nesta pagina o usuario consegue pesquisar students pelo nome, deletar students individualmente e ordenalos por ID
    - A opção de criação e edição de Students redirecionará para uma pagina especifica

  # Pagina de Criação e Edição de Students
    - Nesta pagina o usuario ira consegui criar usuario preenchendo os campos 
    - O usuario tambem conseguirá editar o student individualmente clicando no botão de edit na pagina anterior