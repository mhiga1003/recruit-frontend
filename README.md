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

### 設計思想

1. **API 通信 / UI 編集状態 / 通知 を独立した composable に分離**
    - 理由: 責務を単一化することで、各機能を独立してテスト・差し替えを可能にするため
    - 該当箇所: [usePages.ts](./frontend/app/composables/usePages.ts), [usePageEditing.ts](./frontend/app/composables/usePageEditing.ts), [useNotification.ts](./frontend/app/composables/useNotification.ts)
2. **「作成 / 削除 / タイトル更新 / 詳細更新」の進行中フラグを集約した `isAnyBusy` を導出し、進行中は他操作を無効化**
    - 理由: 要件「連続実行を防ぐ」を1か所で表現することで、各UI側で個別に判定を書かずにすむため
    - 該当箇所: [usePages.ts:46-52](./frontend/app/composables/usePages.ts#L46-L52)
3. **バリデーションは UI に依存しない純粋関数として切り出し、境界値は定数化**
    - 理由: 定数化により「制限値」「エラーメッセージ」「テスト」が同じ値を参照し、変更時の整合性を担保するため
    - 該当箇所: [pageValidation.ts](./frontend/app/utils/pageValidation.ts)
4. **送信中は `persistent: true` の通知を表示し、完了 / 失敗の通知で置き換える**
    - 理由: 非同期処理の状況がユーザーに常に見えるようにするため
    - 該当箇所: [useNotification.ts](./frontend/app/composables/useNotification.ts), [pages/index.vue:34-61](./frontend/app/pages/index.vue#L34-L61)
5. **削除前に確認ダイアログ、編集中の画面遷移にアラート**
    - 理由: 不可逆操作 / 編集内容の消失というユーザー体験上の重大事故を未然に防ぐため
    - 該当箇所: [AppSidebar.vue](./frontend/app/components/AppSidebar.vue)
6. **テスト名を「〇〇の場合、〇〇こと」で揃え、境界値テストは `MIN - 1` / `MAX + 1` のように定数基準で書く**
    - 理由: テストが仕様書として読める形になるため。また、定数値が将来変わってもテストが自動的に追随するため
    - 該当箇所: [tests/utils/pageValidation.spec.ts](./frontend/tests/utils/pageValidation.spec.ts)

### 機能追加

- 「New Page」クリック時に新規ページを作成して表示する。下記の内容を自動的に保存する。
    - タイトル: 「新しいページ」
    - 詳細: 「ページの詳細を入力してください。」