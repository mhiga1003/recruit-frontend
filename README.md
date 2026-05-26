## Description

NCDC フロント課題のバックエンドリポジトリ
![](./Design/画面/20220615/03_title_edit.png)

## Installation & exec

```bash
# install
$ npm install
# migration
$ npm run migration:run
# start build
$ npm run build
# 実行
$ npm run start
```

## API

API の Document は、  
アプリを起動後、`http://localhost:3000/api` にて Swagger で確認できる。  
![](./doc/images/swagger.png)

## DB を初期状態に戻す

```bash
$ cp ./data/bk-dev.sqlite ./data/dev.sqlite
```

## フロントエンド

フロントエンドは Nuxt 4 で実装し、`frontend/` ディレクトリに配置している。
`http://localhost:8000` で起動する（バックエンドが起動している前提）。

```bash
$ cd frontend
$ npm install
$ npm run dev
```

ポートは [frontend/nuxt.config.ts](./frontend/nuxt.config.ts) の `devServer.port` で設定している。

### Lint / Format

```bash
$ npm run lint         # ESLint チェック
$ npm run lint:fix     # ESLint 自動修正
$ npm run format       # Prettier 整形
```

### ビルド / プレビュー

```bash
$ npm run build        # 本番ビルド
$ npm run preview      # ビルド結果をローカルで確認
```

### 機能追加

- 「New Page」作成・「タイトル」「詳細」更新・削除の連続実行を防ぐ。
- 「New Page」クリック時に新規ページを作成して表示する。下記の内容を自動的に保存する。
    - タイトル: 「新しいページ」
    - 詳細: 「ページの詳細を入力してください。」
- 削除前に確認モーダルを表示する。
- 編集中に他の画面へ遷移しようとした際にアラートを表示する。