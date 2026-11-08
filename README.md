# Calendário 1727

Calendário editorial de novembro de 2026 para a 1727 Coffee Roasters, com **8 fotos, 2 espaços para vídeos**, datas, legendas e revisão de aprovação.

## Acesso

Repositório: https://github.com/ZeroTrinta/calendario-1727

Endereço planejado para GitHub Pages (após ativar em Settings → Pages): https://zerotrinta.github.io/calendario-1727/

## Recursos

- Fotos em `imagens/2026-11/` com links para baixar.
- Legendas e datas em `data/calendario.js`.
- Aprovação por post: Pendente, Aprovado, Ajustar; notas de revisão e edição de legendas.
- Filtros de fotos e vídeos; envio ou download do resumo de feedback.
- Visualização por mês, inclusive `?mes=2026-11`.

**Importante:** as revisões são salvas somente no navegador via `localStorage`. Não são sincronizadas entre pessoas. Use **Enviar feedback**, **Copiar feedback** ou **Baixar avaliação** para encaminhá-las. Como o repositório é público, o conteúdo pode ser visto por qualquer pessoa.

## Publicar no GitHub Pages

1. Abra **Settings → Pages** no repositório.
2. Em **Build and deployment**, escolha **Deploy from a branch**.
3. Selecione **main** e **/(root)**; clique em **Save**.
4. A publicação fica disponível em https://zerotrinta.github.io/calendario-1727/ depois da implantação.

## Próximos meses

Crie uma pasta `imagens/AAAA-MM/` para novas fotos, adicione o mês na lista `months` de `data/calendario.js` e atualize `currentMonth` para apontar ao mês mais recente. Para vídeos, informe `videoUrl` no respectivo post (pode ser um URL público ou arquivo MP4 incluído no repositório).

O projeto é estático, sem dependências ou backend. Os arquivos principais são `index.html`, `assets/app.js`, `assets/style.css` e `data/calendario.js`.
