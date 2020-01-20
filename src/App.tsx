import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { useAsync } from 'react-use';
import * as firebaseui from 'firebaseui';
import { Button1 } from './components/Button';
import 'firebaseui/dist/firebaseui.css';

firebase.initializeApp({
  apiKey: process.env.REACT_APP_apiKey,
  projectId: process.env.REACT_APP_projectId,
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ui = new firebaseui.auth.AuthUI(firebase.auth());

const url = 'http://localhost:5000/my-app2-bcfdb/asia-northeast1';
const fetch1 = () => fetch(`${url}/helloWorld`);
const fetch2 = () => fetch(`${url}/getCollection`);
const fetch3 = () => fetch(`${url}/addData`);

const useAPI1 = () => {
  const [clicked, setClicked] = useState(false);
  const [data, setData] = useState<{ aa: string }>({ aa: '' });

  useAsync(async () => {
    if (!clicked) {
      return;
    }

    const res = await fetch1();
    setData(await res.json());
    setClicked(false);
  }, [clicked]);

  return { setClicked, data };
};

const useAPI2 = () => {
  const [clicked, setClicked] = useState(false);
  const [data, setData] = useState<any>(null);

  useAsync(async () => {
    if (!clicked) {
      return;
    }

    const res = await fetch2();
    setData(await res.json());
    setClicked(false);
  }, [clicked]);

  return { setClicked, data };
};

const useAPI3 = () => {
  const [clicked, setClicked] = useState(false);
  const [data, setData] = useState<any>(null);

  useAsync(async () => {
    if (!clicked) {
      return;
    }

    const res = await fetch3();
    setData(await res.json());
    setClicked(false);
  }, [clicked]);

  return { setClicked, data };
};

const App: React.FC = () => {
  const api1 = useAPI1();
  const api2 = useAPI2();
  const api3 = useAPI3();

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log('-----------------------------------');
        console.log(user);
        console.log('-----------------------------------');

        return;
      }

      ui.start('#firebaseui-auth-container', {
        signInSuccessUrl: '/',
        signInOptions: [
          // firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID,
          firebase.auth.EmailAuthProvider.PROVIDER_ID,
          // firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
          // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
          // firebase.auth.GithubAuthProvider.PROVIDER_ID,
          // firebase.auth.PhoneAuthProvider.PROVIDER_ID,
        ],
      });
    });
  }, []);

  //

  const hoge = () => {
    firebase.auth().signOut();
  };

  return (
    <div className="App">
      <div id="firebaseui-auth-container" />

      <>
        {api1.data.aa}
        <Button1 onClkck={() => api1.setClicked(true)}>レスポンス表示</Button1>
      </>

      <>
        {api2.data?.data?.[0]?.name}
        <Button1 onClkck={() => api2.setClicked(true)}>
          functions経由でfirestore メリット無し
        </Button1>
      </>

      <>
        {api3.data?.data?.randomData}
        <Button1 onClkck={() => api3.setClicked(true)}>
          functions経由でfirestore メリット無し
        </Button1>
      </>

      <>
        <button type="button" onClick={hoge}>
          ろぐあうと
        </button>
      </>
    </div>
  );
};

export default App;
