## memo

```bash
# デプロイ
firebase deploy --only functions

# ローカルで試す
## GOOGLE_APPLICATION_CREDENTIALS = 秘密鍵のパス

GOOGLE_APPLICATION_CREDENTIALS=./src/my-app2-bcfdb-firebase-adminsdk-6l97u-c66fd3d0f2.json firebase serve --only functions

## 時間を無視して即時実行
GOOGLE_APPLICATION_CREDENTIALS=./src/my-app2-bcfdb-firebase-adminsdk-6l97u-c66fd3d0f2.json firebase functions:shell
## からの
fetchCalendar()
```


where
1  
and になる

2

そのまま
```
'<' | '<=' | '==' | '>=' | '>' |
```

3
'array-contains' 

"items_array": [
  "fooA",
  "barA"
],

.where('items_array', 'array-contains', 'fooA')


4
'array-contains-any';

  "items_array": [
    "fooA",
    "barA"
  ],

.where('items_array', 'array-contains-any', ['xxx', 'bbb', 'fooA'])


5
'in' 

name: 'hoge'

.where('name', 'in', ['xxx', 'bbb', 'hoge'])

// こんなのもあり
.where('items_array', 'in', [['fooA', 'barA']])


6
"items_object": {
  "fooO": true,
  "barO": true
}
.where('items_object.fooO', '==', true)


---------------
認証
一般的な機能

mysql と firestore 連携
  フロント -> API -> mysql処理 -> API -> firestore更新 -> フロントに来る


push通知
