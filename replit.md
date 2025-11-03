# うちらのイケメン - スタッフ紹介アプリケーション

## プロジェクト概要
Next.js 15とGoogle Maps APIを使用したスタッフ紹介アプリ。地図上に店舗マーカーを表示し、クリックで左スライドパネルにスタッフ詳細を表示します。

## 現在の状態
- ✅ **Next.js 15.5.6** ポート5000で稼働中
- ✅ **データベース** PostgreSQL + Drizzle ORM
- ✅ **シードデータ** 8店舗（東京エリア、日本語）
- ✅ **地図ページ** Google Maps統合、検索機能付き
- ✅ **掲載一覧ページ** 投稿日順（新しい順）
- ✅ **ナビゲーションバー** 地図・掲載一覧の切り替え
- ✅ **URL連携** ?storeId=xxxで詳細パネル自動表示
- ✅ **日本語UI** すべてのテキストが日本語
- ✅ **data-testid** 全インタラクティブ要素に追加済み

## プロジェクトアーキテクチャ

### 技術スタック
- **フレームワーク**: Next.js 15.5.6 (App Router)
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS 3.x + Shadcn UI
- **データベース**: PostgreSQL (Neon Serverless)
- **ORM**: Drizzle ORM
- **地図**: @vis.gl/react-google-maps
- **日付フォーマット**: date-fns（日本語ロケール）

### ディレクトリ構成
```
├── app/                    # Next.js App Router
│   ├── page.tsx           # 地図ページ（ホーム）
│   ├── listings/page.tsx  # 掲載一覧ページ
│   ├── layout.tsx         # ルートレイアウト
│   └── globals.css        # グローバルスタイル
├── components/            # Reactコンポーネント
│   ├── navbar.tsx         # ナビゲーションバー
│   ├── map-view.tsx       # Google Maps + 検索バー
│   ├── staff-panel.tsx    # 左スライドパネル（Sheet）
│   └── ui/                # Shadcnコンポーネント
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       ├── sheet.tsx
│       └── separator.tsx
├── lib/                   # ユーティリティ
│   ├── actions.ts         # サーバーアクション
│   ├── seed.ts            # DBシードスクリプト
│   └── utils.ts           # ヘルパー関数
├── server/                # サーバーコード
│   └── db.ts              # DB接続
└── shared/                # 共有コード
    └── schema.ts          # DBスキーマ
```

### データベーススキーマ
**テーブル: stores**
- `id` (varchar) - プライマリキー（UUID）
- `companyName` (text) - 会社名
- `storeName` (text) - 店舗名
- `address` (text) - 住所
- `tel` (text) - 電話番号
- `sns` (text) - SNSハンドル
- `staffName` (text) - スタッフ名
- `latitude` (text) - 緯度
- `longitude` (text) - 経度
- `postedAt` (timestamp) - 投稿日（自動設定）

## 環境変数

### 必須
- ✅ `DATABASE_URL` - PostgreSQL接続文字列（設定済み）
- ✅ `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` - Google Maps APIキー（設定済み）

## 主要機能

### 1. 地図ページ (/)
- Google Mapsに8店舗のマーカー表示
- 検索バー：会社名、店舗名、住所、スタッフ名でリアルタイム検索
- マーカークリック → 左スライドパネルで詳細表示
- URLパラメータ対応：`/?storeId=xxx`で該当スタッフを自動表示
- ナビゲーションバー：「地図」「掲載一覧」ボタン

### 2. 掲載一覧ページ (/listings)
- 投稿日順（新しい順）にカード表示
- 日付フォーマット：「yyyy年MM月dd日」（date-fns + 日本語ロケール）
- カードクリック → `/?storeId=xxx`に遷移 → 地図ページで詳細パネル自動表示
- Separator使用、hover/activeエフェクト

### 3. スタッフ詳細パネル（Sheet）
- 左側からスライド表示（Shadcn UI Sheet）
- レスポンシブ幅：モバイル75%、デスクトップ384px
- 表示内容：スタッフ名、会社名、店舗名、住所、電話、SNS
- 「ルートを検索」ボタン → Google Maps方向案内
- data-testid属性完備

### 4. ナビゲーション
- 全ページ共通のナビゲーションバー
- アクティブページをハイライト表示
- アプリ名「うちらのイケメン」表示

## データベース操作

### コマンド
```bash
# スキーマ変更をプッシュ
npm run db:push

# Drizzle Studio起動
npm run db:studio

# シードデータ投入
npx tsx lib/seed.ts
```

### シードデータ（8店舗）
東京エリアの店舗を日付順に配置：
1. 中村颯太 - 恵比寿ガーデンプレイス店（2025-10-28）
2. 渡辺颯 - 池袋西口店（2025-10-27）
3. 伊藤陽太 - 表参道本店（2025-10-25）
4. 高橋蓮 - 銀座中央店（2025-10-22）
5. 鈴木優 - 六本木ヒルズ店（2025-10-20）
6. 田中翔 - 原宿本店（2025-10-18）
7. 佐藤健 - 新宿東口店（2025-10-15）
8. 山田太郎 - 渋谷センター店（2025-10-12）

## 最近の変更（2025年11月3日）

### 実装完了内容
1. ✅ データベーススキーマ変更（UUID + varchar、drizzle-zod統合）
2. ✅ 8店舗の日本語シードデータ作成
3. ✅ ナビゲーションバー実装（地図・掲載一覧ボタン）
4. ✅ 検索バー機能（会社名、店舗名、住所、スタッフ名でフィルタリング）
5. ✅ Shadcn UI Sheet使用の左スライドパネル
6. ✅ URL連携機能（?storeId=xxx → 詳細パネル自動表示）
7. ✅ 掲載一覧ページの日本語UI化、日付フォーマット
8. ✅ カードクリック時のURL遷移実装
9. ✅ 全UIを日本語に変換
10. ✅ data-testid属性追加
11. ✅ Google Maps API設定完了
12. ✅ Next.js allowedDevOrigins設定（Replit環境対応）

### 技術的な改善
- date-fns日本語ロケール統合
- hover-elevate/active-elevate-2クラス追加
- TypeScript型安全性向上
- エラーハンドリング改善（検索機能）
- Next.js 15クロスオリジン警告解決

## ユーザー設定
- **言語**: 日本語（全UI）
- **コーディングスタイル**: 関数型コンポーネント、TypeScript
- **UIライブラリ**: Shadcn UI + Tailwind CSS
- **データベース**: PostgreSQL + Drizzle ORM

## デプロイメントチェックリスト
- [x] Google Maps APIキー設定
- [x] データベース作成・マイグレーション
- [x] シードデータ投入
- [x] Next.js開発サーバー動作確認
- [x] 地図表示確認
- [x] 掲載一覧表示確認
- [x] URL連携動作確認
- [ ] 本番ビルド確認（`npm run build`）
- [ ] Replitへデプロイ

## コマンドリファレンス
```bash
# 開発
npm run dev          # 開発サーバー起動（ポート5000）

# データベース
npm run db:push      # スキーマ変更をプッシュ
npm run db:studio    # Drizzle Studio起動
npx tsx lib/seed.ts  # シードデータ投入

# 本番
npm run build        # 本番ビルド
npm run start        # 本番サーバー起動
```

## 既知の問題と注意点
- LSPエラーは既存だが、動作には影響なし（型推論の警告）
- Replit環境では`allowedDevOrigins`設定が必須
- Google Maps APIキーは環境変数として管理
- データベースは開発環境のみ（本番DBは別途設定）

## 最終更新日
2025年11月3日 - Next.js 15への完全移植完了
