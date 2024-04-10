# 🍥Fuwari

[Astro](https://astro.build)で構築された静的ブログテンプレート

[**🖥️Live Demo (Vercel)**](https://fuwari.vercel.app)&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;[**🌏English README**](https://github.com/saicaca/fuwari)&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;[**🌏中文 README**](https://github.com/saicaca/fuwari/blob/main/README.zh-CN.md)&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;[**📦Old Hexo Version**](https://github.com/saicaca/hexo-theme-vivia)

![Preview Image](https://raw.githubusercontent.com/saicaca/resource/main/fuwari/home.png)

## ✨ 特徴

- [x] [Astro](https://astro.build)及び [Tailwind CSS](https://tailwindcss.com)で構築
- [x] スムーズなアニメーションとページ遷移
- [x] ライト/ダークテーマ対応
- [x] カスタマイズ可能なテーマカラーとバナー
- [x] レスポンシブデザイン
- [ ] コメント機能
- [x] 検索機能
- [ ] 目次

## 🚀 使用方法

1. [テンプレート](https://github.com/saicaca/fuwari/generate)から新しいリポジトリを作成するかCloneをします。
2. ブログをローカルで編集するには、リポジトリをクローンした後、`pnpm install` と `pnpm add sharp` を実行して依存関係をインストールします。  
   - [pnpm](https://pnpm.io)がインストールされていない場合は `npm install -g pnpm` で導入可能です。
3. `src/config.ts`ファイルを編集する事でブログを自分好みにカスタマイズします。
4. `pnpm new-post <filename>`で新しい記事を作成して、`src/content/posts/`.フォルダ内で編集します。
5. 作成したブログをVercel、Netlify、GitHub Pagesなどにデプロイするには[ガイド](https://docs.astro.build/en/guides/deploy/)に従って下さい。

## ⚙️ 記事のフロントマター

```yaml
---
title: My First Blog Post
published: 2023-09-09
description: This is the first post of my new Astro blog.
image: /images/cover.jpg
tags: [Foo, Bar]
category: Front-end
draft: false
---
```

## 🧞 コマンド

すべてのコマンドは、ターミナルでプロジェクトのルートから実行する必要があります:

| Command                             | Action                                           |
|:------------------------------------|:-------------------------------------------------|
| `pnpm install` AND `pnpm add sharp` | 依存関係のインストール                           |
| `pnpm dev`                          | `localhost:4321`で開発用ローカルサーバーを起動      |
| `pnpm build`                        | `./dist/`にビルド内容を出力          |
| `pnpm preview`                      | デプロイ前の内容をローカルでプレビュー     |
| `pnpm new-post <filename>`          | 新しい投稿を作成                                |
| `pnpm astro ...`                    | `astro add`, `astro check`の様なコマンドを実行する際に使用 |
| `pnpm astro --help`                 | Astro CLIのヘルプを表示                     |