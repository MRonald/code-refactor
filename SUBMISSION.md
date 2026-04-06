# Submissao

## Link do Repositorio no GitHub

- [[https://github.com/MRonald/code-refactor](https://github.com/MRonald/code-refactor)]

## Resumo

- Iniciei analizando o código base enviado e os requisitos do README.md. Entendi o contexto do projeto e usei as ferramentas de IA para me ajudar a planejar a execução e consolidar o resumo do teste. Montei uma estratégia de implementação e fui desenvolvendo passo a passo testando em cada fase e usando versionamento de código para garantir a qualidade das evoluções e entregas.
- Fiquei satisfeito com a implementação que alcancei, consegui melhorar a estrutura do código implementando todos os pontos do plano que montei inicialmente com a inclusão de testes que auxiliaram muito nos ajustes posteriores.

## Premissas e Prioridades

### Ordem de prioridade

- [✓] Montar a estrutura de um projeto React e rodar no navegador para acompanhar visualmente
- [✓] Análise do mockData e criação da pasta /types onde estão os tipos do projeto para referencia
- [✓] Normalização: normalizar um payload desconhecido para o formato interno da aplicação, sempre retornando um objeto compatível com PageData
- [✓] Componentização: separação de cada seção em componentes e renderização de acordo com tipo
- [✓] Renderização: registry dinâmico com descoberta automática por convenção de pastas

### Extras

- [✓] Implementação da renderização de "fixtures" com testes adicionais
- [✓] Testes automatizados

### Com mais tempo (proximas 2-3 melhorias)

- Performance para grande volume de seções, com virtualização e estratégia de preload/prefetch dos tipos mais frequentes.
- Qualidade contínua no CI (lint, typecheck, testes, cobertura, acessibilidade)
- Observabilidade em produção (telemetria e monitoramento de erros por tipo de seção)

## Perguntas de Reflexao

### 1. O que voce mudou e por que?

- Mexi na estrutura inteira do projeto mantendo intacta apenas o mockData. Imaginando que seja um retorno de api e que não tenhamos controle sobre isso, a única alternativa seria realmente tratar no front.

### 2. O que voce melhoraria em seguida?

- Analisaria a performance e segurança geral da página fazendo as melhorias necessárias. Ao dar F5 ele mostra um "loading section..." por meio segundo, verificaria o que poderia ser feito para melhorar isso.

### 3. Como voce escalaria isso se o numero de tipos de secao crescesse ~10x?

- A estrutura foi construída pensando justamente nesse caso. Caso houvessem novos tipos bastaria a implementação dentro de components/sections e implementar testes do seu uso.

### 4. Como voce tratou dados desconhecidos/invalidos e payloads ambiguos (chaves legadas, itens de lista mistos etc.)?

- Centralizei o tratamento na camada de normalização com validação runtime, convertendo a entrada para um formato interno consistente antes da renderização. Campos legados como body foram mapeados para content, listas mistas (string e objeto) foram aceitas com filtro de itens inválidos, valores nulos viraram fallback seguro e tipos desconhecidos foram direcionados para uma seção unknown para evitar quebra da interface.

### 5. Como voce testaria isso (casos e camadas: unitario vs integracao)?

- Implementei uma estratégia de testes em camadas usando Vitest e React Testing Library, cobrindo desde regras de negócio até comportamento da interface. Nos testes unitários validei normalização de payload, tratamento de ambiguidades e fallback seguro, além da resolução dinâmica do registry (cache, tipos desconhecidos e falhas de loader); nos testes de componentes validei cada tipo de seção isoladamente, e nos testes de integração validei o fluxo completo com payload padrão e fixtures para garantir robustez sem regressões. Como resultado, a suíte ficou com cobertura prática dos cenários críticos e 21 testes passando como rede de segurança para futuras mudanças.

### 6. Qual decisao voce revisitaria primeiro se isso fosse para producao amanha, e por que?

- Acredito que a questão da observabilidade em produção faria diferença, e também revisar todos os testes para ver se faltou testar algum ponto crítico.

### 7. Voce usou ferramentas de IA?

- Sim, eu uso o copilot para desenvolvimento integrado no próprio VS Code. Atualmente estou testando o modelo GPT-5.3-Codex e estou bastante satisfeito com ele.
