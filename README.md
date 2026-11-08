# 1727 — Calendário Editorial

Site estático de planejamento e aprovação mensal de conteúdo da 1727 Coffee Roasters, pronto para publicar gratuitamente no GitHub Pages.

## O que o site oferece

- Calendário mensal com **8 fotos e 2 espaços para vídeos** em novembro/2026.
- Imagens reais do acervo, tratadas (cor/contraste/luz) e exportadas separadamente, com botão **Baixar foto**.
- Legendas dos posts, datas e sugestões de vídeos.
- Modo de revisão: **Pendente / Aprovado / Ajustar**, campo de observações, edição local de legendas.
- Botão **Enviar feedback**: abre o compartilhamento do aparelho ou o WhatsApp com o resumo. Também pode **Copiar feedback** ou **Baixar avaliação (.json)**.
- Organização reutilizável por mês; a URL principal sempre aponta para o `currentMonth`.

> **Privacidade e sincronização:** um repositório público no GitHub Pages é acessível a qualquer pessoa com o endereço e pode aparecer em buscadores. Aprovações, observações e legendas editadas ficam apenas no navegador do visitante (`localStorage`). **Não são sincronizadas nem enviadas automaticamente para o GitHub.** Para receber a avaliação, o cliente precisa enviar o feedback pelo botão de compartilhamento ou copiar o texto. Para privacidade real ou aprovação centralizada, será necessário login e um backend mais adiante.

## Publicação inicial — GitHub Desktop (recomendado)

1. Abra o **GitHub Desktop** e use **File → New Repository**. Digite **1727-calendario**, descrição `Calendário editorial 1727`, e escolha uma pasta no computador.
2. Abra a pasta que o GitHub Desktop criou para o repositório. **Copie para dentro dela o CONTEÚDO deste pacote** (`index.html`, `assets`, `data`, `imagens`, `videos`, `README.md`, `.nojekyll`, `.gitignore`). **Não coloque tudo dentro de uma pasta extra**, porque o `index.html` precisa ficar na raiz.
3. No GitHub Desktop, escreva o resumo do commit (ex.: `Primeiro calendário — novembro 2026`), clique em **Commit to main** e em **Publish repository**.
4. No GitHub, abra o repositório e vá em **Settings → Pages → Build and deployment**.
5. Selecione **Deploy from a branch**, depois **Branch: main**, **Folder: /(root)** e salve.
6. O endereço ficará no formato **https://zerotrinta.github.io/1727-calendario/** (use este endereço apenas depois de confirmar que o Pages publicou o site).

Alternativa: criar o repositório em https://github.com/new e subir os arquivos pela interface do GitHub; o `index.html` deve ficar na raiz.

## Como atualizar os próximos meses

A estrutura foi feita para você continuar usando **o mesmo repositório e a mesma URL**.

1. Crie `imagens/AAAA-MM/` e adicione as fotos do próximo mês.
2. Abra `data/calendario.js` e adicione outro objeto na lista `months`, seguindo o exemplo do mês `2026-11` (com `id`, `label`, `summary` e `posts`).
3. Ajuste `currentMonth` para o mês mais recente, por exemplo `"2026-12"`.
4. Cada post tem `id`, `date`, `type`, `title`, `category`, `caption`. Posts com foto usam `image`. Posts em vídeo usam `brief` e `videoUrl`.
5. Faça **Commit** e **Push** pelo GitHub Desktop. O GitHub Pages atualizará o site automaticamente com a nova versão.

A URL de um mês específico pode ser compartilhada assim:

```
https://zerotrinta.github.io/1727-calendario/?mes=2026-11
```

## Como adicionar os vídeos

No arquivo `data/calendario.js`, localize o post com `"type": "video"` e preencha o campo `"videoUrl"`:

- Para um vídeo hospedado publicamente (por exemplo, uma URL de página do YouTube): `"videoUrl": "https://www.youtube.com/watch?v=..."` — aparece o botão **Assistir ao vídeo**.
- Para MP4 hospedado no próprio repositório: coloque um vídeo comprimido em `videos/2026-11/` e use `"videoUrl": "videos/2026-11/cappuccino.mp4"` — aparece o player na página.

Atenção ao limite de tamanho de arquivos do GitHub e ao consumo de banda do GitHub Pages. Vídeos grandes são melhores em plataforma própria e com link externo.

## Estrutura

```text
1727-calendario/
├── index.html             # página inicial
├── assets/
│   ├── app.js             # interface, filtros e aprovação local
│   └── style.css          # identidade visual
├── data/
│   └── calendario.js      # posts e meses
├── imagens/
│   └── 2026-11/           # oito fotos editadas
├── videos/
│   └── 2026-11/           # espaço para vídeos futuros
├── .nojekyll              # GitHub Pages serve arquivos diretamente
├── .gitignore
└── README.md
```

## Uso local

O site foi montado sem dependências: abra `index.html` no navegador para pré-visualizar. Não precisa de npm, backend ou serviço pago.
