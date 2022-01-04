const {
  REACT_APP_GOOGLE_DOC_ID,
  REACT_APP_GOOGLE_SHEET_ID,
  REACT_APP_GOOGLE_SERVICE_CLIENT_EMAIL,
  REACT_APP_GOOGLE_SERVICE_PRIVATE_KEY,
} = process.env;
const SHEET_DOC_ID = REACT_APP_GOOGLE_DOC_ID || '';
const SHEET_ID = REACT_APP_GOOGLE_SHEET_ID || '';
const GOOGLE_SERVICE_CLIENT_EMAIL = REACT_APP_GOOGLE_SERVICE_CLIENT_EMAIL;
const GOOGLE_SERVICE_PRIVATE_KEY = REACT_APP_GOOGLE_SERVICE_PRIVATE_KEY;

const SHEET_COLUMN_KEY = {
  owner: '사용자',
  category: '물품',
  modelName: '모델명',
  productId: '일련번호',
  productYear: '출시 연도',
  rentTimestamp: '지급 연도',
  poNumber: 'PO번호',
  note: '비고',
};

export {
  SHEET_DOC_ID,
  SHEET_ID,
  SHEET_COLUMN_KEY,
  GOOGLE_SERVICE_CLIENT_EMAIL,
  GOOGLE_SERVICE_PRIVATE_KEY,
};
