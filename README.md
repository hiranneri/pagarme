# Software Engineer - Pagar.me
Serviço API desenvolvido para integração e utilização de serviços de pagamentos.
PSP: Provedor de Serviços de pagamentos.

# O que faz?
 - Cadastro de Usuários
 - Login de usuários usando JWT.
 - Cadastro de Transações
 - Pesquisa de Transações (Débito/Crédito/Todas)
 
 # Serviço REST
Se utilizado locamente deverá ser utilizado a "base_url": "http://localhost:3333" ou a definida no seu arquivo de variáveis de ambiente
<code>
	Todos os content-type tanto para requests quanto para as responses deverão e serão no formato JSON. 
</code>

# Utilização do projeto
- Realizar o clone do projeto (git clone git@github.com:hiranneri/pagarme.git)
- Instalação do banco de dados Postgres

# Banco
- Atualmente no projeto a porta configurada é 5432, mas as configurações poderão ser alteradas conforme a necessidade no arquivo em ( https://github.com/hiranneri/pagarme/blob/main/knexfile.js )

- Para criação das tabelas, no seu terminal digite o comando dentro da pasta do projeto:
<code> npx knex migrate:latest </code>

# Descrição dos endpoints
 <h3>Login</h3>
<code> 
	POST (Cadastro de Usuário) - {{ _.base_url }}/login/cadastro <br>
	Exemplo do body de requisição:
	{
		"nome":"Alberto", <br>
		"sobrenome": "Neri", <br>
		"datanascimento": "1993-06-10", <br>
		"rg": "488879865", <br>
		"cpf": "40110166854", <br>
		"senha":"1234567891" <br>
	}
	- Será retornado o 'usuario.id', e o mesmo deve ser guardado para as demais requisições </p>
</code>
<code>

	POST (Login) - {{ _.base_url }}/login <br>
	Exemplo do body de requisição:
	{
		"cpf": "40110166854",
		"senha":"1234567891"
	}

	- Será retornado um token de acesso válido por 10 minutos, após o tempo, deverá ser feita uma nova requisição de login para geração de um novo token.
</code>
</br>
<h3>Transações</h3>
<code>
	POST (Cadastrar uma transação) - {{ _.base_url }}/transacao/:idUsuario <br>
	Ex.:
	{
		"bandeira": "Elo",
		"numeroCartao": "123485208562",
		"nomePortador": "Hiran Neri",
		"dataValidade": "2021-05-30",
		"codigoVerificacao": "586",
		"descricao": "Celular Asus M1",
		"valor": "980.96",
		"formaPagamento": "CRÉDITO",
		"dataPagamento": "2021-06-20"
	}
	- Em caso de sucesso, será retornado o id da transação.
</code>
</br>
<code>
	GET (Todas as transações para um usuário) - {{ _.base_url }}/transacao/:idUsuario
</code>
</br>
- Todas as requisições, salvo exceção de login, deverão ter no seu header o Content-Type: 'application/json' e x-access-token: '[TOKEN GERADO NO LOGIN]'

# Tecnologias Usadas:
- NodeJS
- Express
- Knex
- Banco de Dados: PostgreSQL
- Jest
- Hospedado no Heroku
