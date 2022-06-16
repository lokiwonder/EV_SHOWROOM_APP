// react-library
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// screens | components
import { VehicleMainView } from '@screen';
// stores
import { useSettingStore } from '@store';

// etc
import data from '@data';
import './App.css';

import { v4 as uuidv4 } from 'uuid';
import * as JSZip from 'jszip';
import axios from 'axios';
import * as fs from 'fs';

function App() {
  //  variable
  const { setting, setSetting } = useSettingStore();
  //  variable

  personalSetting();

  console.log(process.env.PATH);

  // todo 라우터 삭제 및 state에 따른 조건 출력으로 변경
  return (
    <Router>
      {/* // description: 초기 설정 화면 */}
      <></>
      {/* // description: vehicles view */}
      <VehicleMainView />
      {/* // todo: powertrain view */}
      <></>
      {/* // todo: connectivity view */}
      <></>
    </Router>
  );
}

export default App;

//        function        //
// todo: 런쳐 프로그램 만들면 옮길 함수
// description: 앱 실행 시 동작하는 함수
const personalSetting = async () => {
  if (!data.setting.app_id) {
    await axios({
      url: 'http://localhost:4000/check/initialize',
      method: 'POST',
      data: { uuid: uuidv4(), nation: 'it' },
      responseType: 'arraybuffer',
    }).then((response) => unzip(response?.data));
  }
};

// description: Response로 받은 파일 압축 해제 처리
const unzip = (data: any) => {
  // description: blob file 생성
  const blob_file = new Blob([data], { type: 'application/octet-stream' });
  // description: blob file 압축 해제
  JSZip.loadAsync(blob_file).then(async (zip) => decompressionByType(zip));
};

// description: 타입별 압축 해제 처리
const decompressionByType = (zip: JSZip) => {
  // description:
  Object.keys(zip.files).forEach(async function (file_name) {
    // description: 만약 파일명이 data.json 이면 텍스트 파일로 async, 아니면 버퍼로 async
    const content = file_name === 'data.json' ? await zip.files[file_name].async('string') : await zip.files[file_name].async('nodebuffer');

    // description: Is directory
    zip.files[file_name].dir && !fs.existsSync(file_name) && fs.mkdirSync(file_name);
    // description: Is not directory
    !zip.files[file_name].dir && fs.writeFileSync(file_name, content);
  });
};
//        function        //
