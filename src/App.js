import { useState } from "react";

const { Xumm } = require("xumm");

const xumm = new Xumm("5a3764b9-d8d7-49fb-aa29-a54ce3cae979");

const App = () => {
  const [account, setAccount] = useState(undefined);

  xumm.user.account.then((account) => setAccount(account));

  const connect = async () => {
    // Xummでサインイン
    await xumm.authorize();
  };

  const disconnect = async () => {
    // Xummからサインアウト
    await xumm.logout();
    // アカウント情報を削除
    setAccount(undefined);
  };

  const createTransaction = async () => {
    const payload = await xumm.payload?.create({
      TransactionType: "Payment",
      Destination: "rQQQrUdN1cLdNmxH4dHfKgmX5P4kf3ZrM",
      Amount: "20000000", // 10000000 drops (=10.00000XRP)
    });
    if(!payload?.pushed){
      // Xummへプッシュ通知が届かない場合
      // payload?.refs.qr_png を利用してQRコードを表示することで署名画面を表示することも可能
    }
  };

  return (
    <div>
      {account && (
        <>
          <div>{account}</div>
          <button onClick={disconnect}>Disonnect</button>

          <button onClick={createTransaction}>Payment</button>
        </>
      )}
      {!account && <button onClick={connect}>Connect</button>}
    </div>
  );
};

export default App;