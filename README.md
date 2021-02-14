# JaclaKeySharedApi

## 概要

Lineの鍵管理グループに投稿された他の情報も含むメッセージやスタンプ,etc...から鍵の状態を抜き出しTwitter,Discord,Slackに鍵の状態を投稿するAPI

## 使用技術

- TypeScript
- ESList
- Heroku
- node
- yarn
- express
- 他相談...

## Apiアーキテクチャ
![](https://user-images.githubusercontent.com/48125577/107884767-22595c00-6f3a-11eb-81f3-4cbd8267b505.png)

## DBに関して

### DBの使用用途

今回のDBは鍵の履歴を保存して置く物ではなく、鍵情報の情報パターンの保存に使います。

TableはplaceとTableの2つを用意し、それぞれ場所、鍵の状態パターンを保存して置く。(このDBのダータ追加APIも作成予定)

ex） 部室の鍵を借りました。-> 部室(place) , 借り(status)

### Tableについて
- table

| id  | place      | abbreviation |
| :-: | :--------: | :----------: |
| 1   | 部室       | 部室         |
| 2   | 部室       | 研A301       |
| 3   | 研究棟A302 | 研A302       |

- status

| id  | status | string |
| :-: | :----: | :----: |
| 1   | 0      | 借り   |
| 2   | 0      | かり   |
| 3   | 1      | 開け   | 



