# Screenshots dos projetos

Coloque as capturas de tela de cada projeto na pasta com o `id` correspondente:

| Projeto                         | id              | pasta                          |
| ------------------------------- | --------------- | ------------------------------ |
| FlunexApp                       | `flunexapp`     | `public/projects/flunexapp/`   |
| Gerador de ETP                  | `etp`           | `public/projects/etp/`         |
| Migração AITEC                  | `aitec`         | `public/projects/aitec/`       |
| Totem TV Box × Receita Federal  | `totem`         | `public/projects/totem/`       |
| Fazenda Escola                  | `fazenda-escola`| `public/projects/fazenda-escola/` |
| Integrações SUAP               | `suap`          | `public/projects/suap/`        |
| Care4You                        | `care4you`      | `public/projects/care4you/`    |

## Como aparecem no site

Depois de soltar as imagens (ex.: `etp/1.png`, `etp/2.png`), liste-as no array
`images` do projeto em `src/data/projects.js`:

```js
images: ['/projects/etp/1.png', '/projects/etp/2.png'],
```

Elas aparecem na galeria do **modal de detalhes** (clique no card do projeto).
Enquanto `images` estiver vazio, a galeria mostra "Capturas em breve" e não quebra nada.

> Formatos: PNG/JPG/WebP. Proporção livre. Sugerido ~1280px de largura.
