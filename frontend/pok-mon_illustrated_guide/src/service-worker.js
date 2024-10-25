self.addEventListener('message', (event) => {
  const {action, key, value} = event.data;

  switch (action) {
    case 'SET':
      self[key] = value;
      break;
    case 'GET':
      event.source.postMessage(self[key]);
      break;
    default:
      // 不明なアクションタイプに対する処理
      console.log(`Unknown action type: ${action}`);
  }
});
