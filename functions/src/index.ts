import * as functions from 'firebase-functions';
import admin from 'firebase-admin';
// import { collectionName } from './services/mangarel/constants';
import { collection, get, where, query, ref } from 'typesaurus';

admin.initializeApp();

const cors = require('cors')({ origin: true });
const region = 'asia-northeast1';
const f = functions.region(region);
const db = admin.firestore;
const fandomeId = () =>
  Math.random()
    .toString(36)
    .slice(-8);

const nameList = ['foo', 'bar', 'hoge'];

const dataObj = {
  randomData: fandomeId(),
  name: nameList[Math.floor(Math.random() * nameList.length)],
};

/**
 * ただのレスポンス
 */
export const helloWorld = f.https.onRequest((request, response) => {
  cors(request, response, () => {
    response.status(200).send({ aa: 'bb' });
  });
});

/**
 * 追加
 */
export const addData = f.https.onRequest(async (request, response) => {
  const snap = await db()
    .collection('myCollection1')
    .add({
      ...dataObj,
      type: 'addData',
      items_array: ['fooA', 'barA'],
      items_object: {
        fooO: true,
        barO: true,
      },
    });

  const r = await snap.get();

  cors(request, response, () => {
    response.send({ data: r.data() });
  });
});

/**
 * set
 * add と似た感じ
 */
export const setData = f.https.onRequest(async (request, response) => {
  await db()
    .collection('myCollection1')
    .doc('myDoc1')
    .set({ ...dataObj, type: 'setData' });

  cors(request, response, () => {
    response.send({ data: 'ok' });
  });
});

/**
 * 全件取得
 */
export const getCollection = f.https.onRequest(async (request, response) => {
  const snap = await db()
    .collection('myCollection1')
    .get();
  const data = snap.docs.map(doc => doc.data());

  cors(request, response, () => {
    response.send({ data });
  });
});

/**
 * name === foo
 */
export const getCollectionFoo = f.https.onRequest(async (request, response) => {
  const snap = await db()
    .collection('myCollection1')
    .where('name', '==', 'foo')
    .get();
  const data = snap.docs.map(doc => doc.data());

  cors(request, response, () => {
    response.send({ data });
  });
});

export const getDocument = f.https.onRequest(async (request, response) => {
  const snap = await db()
    .collection('myCollection1')
    .doc('myDoc1')
    .get();

  cors(request, response, () => {
    response.send({ data: snap.data() });
  });
});

export const updateData = f.https.onRequest(async (request, response) => {
  const id = 'jjjjjjjjjjjjjj';
  // 追加
  await db()
    .collection('myCollection1')
    .doc(id)
    .set({ ...dataObj, type: 'updateData' });

  await db()
    .collection('myCollection1')
    .doc(id)
    .update({
      ...dataObj,
      name: 'uupuupuhupup',
    });

  cors(request, response, () => {
    response.send({ data: 'ok' });
  });
});

export const getDocumentTypesaurus = f.https.onRequest(
  async (request, response) => {
    class Some2 {
      randomData!: string;
      name!: string;
      hoge!: {
        some: string;
      };
    }

    const co = collection<Some2>('myCollection1');
    const r = await get(co, 'myDoc1');

    // これもOK
    // r?.data.hoge.some

    cors(request, response, () => {
      response.send({ data: r?.data.randomData });
    });
  },
);

/**
 * こんな感じのとこから取得
 *     type: 'addData',
      "items_array": [
        "fooA",
        "barA"
      ],

 */
export const getCollectionA = f.https.onRequest(async (request, response) => {
  const snap = await db()
    .collection('myCollection1')
    // 第三引数は string のみ
    .where('items_array', 'array-contains', 'fooA')
    .get();
  const data = snap.docs.map(doc => doc.data());

  cors(request, response, () => {
    response.send({ data });
  });
});

/**
 * こんな感じのとこから取得
 *     type: 'addData',
      "items_object": {
        "fooO": true,
        "barO": true
      }
 */
export const getCollectionB = f.https.onRequest(async (request, response) => {
  const snap = await db()
    .collection('myCollection1')
    .where('items_object.fooO', '==', true)
    .get();
  const data = snap.docs.map(doc => doc.data());

  cors(request, response, () => {
    response.send({ data });
  });
});

export const getCollectionBType = f.https.onRequest(
  async (request, response) => {
    class Some2 {
      pp!: boolean;
      items_object!: {
        fooO: boolean;
        barO: boolean;
      };
      items_objec2t!: {
        hoge: boolean;
        fuga: boolean;
      };
    }

    const co = collection<Some2>('myCollection1');
    const r = await query(co, [where(['items_object', 'fooO'], '==', true)]);

    cors(request, response, () => {
      response.send({ data: r[0].data });
    });
  },
);

/**
 * こんな感じのとこから どれか が入っていたら -> array-contains-any
 *     type: 'addData',
      "items_array": [
        "fooA",
        "barA"
      ],

 */
export const getCollectionC = f.https.onRequest(async (request, response) => {
  const snap = await db()
    .collection('myCollection1')
    .where('items_array', 'array-contains-any', ['xxx', 'bbb', 'fooA'])
    .get();
  const data = snap.docs.map(doc => doc.data());

  cors(request, response, () => {
    response.send({ data });
  });
});

export const getCollectionD = f.https.onRequest(async (request, response) => {
  const snap = await db()
    .collection('myCollection1')
    .where('name', 'in', ['xxx', 'bbb', 'hoge'])
    .get();

  const data = snap.docs.map(doc => doc.data());

  cors(request, response, () => {
    response.send({ data });
  });
});

export const getCollectionE = f.https.onRequest(async (request, response) => {
  const snap = await db()
    .collection('myCollection1')
    .where('items_array', 'in', [['fooA', 'barA']])
    .get();

  const data = snap.docs.map(doc => doc.data());

  cors(request, response, () => {
    response.send({ data });
  });
});

export const arrayUnionRemove = f.https.onRequest(async (request, response) => {
  await db()
    .collection('myCollection1')
    .doc('myDoc1')
    .set({ ...dataObj, items_array: ['a', 'b', 'c'] });

  await db()
    .collection('myCollection1')
    .doc('myDoc1')
    .update({
      items_array: admin.firestore.FieldValue.arrayUnion('x', 'y'),
    });

  await db()
    .collection('myCollection1')
    .doc('myDoc1')
    .update({
      items_array: admin.firestore.FieldValue.arrayRemove('y'),
    });
  cors(request, response, () => {
    response.send({ data: 'ok' });
  });
});

// トランザクション
export const transaction = f.https.onRequest(async (request, response) => {
  const myRef = db()
    .collection('myCollection1')
    .doc('myDocTran');

  await db().runTransaction(async t => {
    await t.get(myRef);
    try {
      t.set(myRef, { data: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxx' });
      throw new Error('-----------------dameyo--------------------');
    } catch (e) {
      console.log(e);
    } finally {
      // 握りつぶすだけ
    }
  });

  cors(request, response, () => {
    response.send({ data: 'ok' });
  });
});
