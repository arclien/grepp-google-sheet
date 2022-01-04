import { useState, useEffect, useCallback } from 'react';
import { GoogleSpreadsheet } from 'google-spreadsheet';

import {
  SHEET_DOC_ID,
  SHEET_ID,
  GOOGLE_SERVICE_CLIENT_EMAIL,
  GOOGLE_SERVICE_PRIVATE_KEY,
} from '../constants/googlesheet';

const CACHE = {
  productData: null,
  aaa: false,
  googleSheet: {
    doc: new GoogleSpreadsheet(SHEET_DOC_ID),
    sheet: null,
    rows: null,
  },
};

export default function useGoogleSheet() {
  const [sheetProductData, setSheetProductData] = useState([]);

  const addNewProductDataToSheet = useCallback(async (productInfo) => {
    const addedRows = [
      {
        ...productInfo,
      },
    ];
    if (CACHE?.googleSheet?.sheet && addedRows.length > 0) {
      return CACHE?.googleSheet?.sheet?.addRows(addedRows);
    }
    return false;
  }, []);

  useEffect(() => {
    (async () => {
      if (!CACHE?.aaa) {
        CACHE.aaa = true;
      } else {
        return;
      }

      if (CACHE?.productData && CACHE?.googleSheet.sheet) return;

      const { doc } = CACHE?.googleSheet;
      await doc.useServiceAccountAuth({
        client_email: GOOGLE_SERVICE_CLIENT_EMAIL || '',
        private_key: GOOGLE_SERVICE_PRIVATE_KEY || '',
      });

      await doc.loadInfo(); // loads document properties and worksheets
      const sheetObj = doc.sheetsById[SHEET_ID];

      if (!sheetObj) return;
      const rowsObj = await sheetObj.getRows();
      CACHE.googleSheet = {
        ...CACHE?.googleSheet,
        sheet: sheetObj,
        rows: rowsObj,
      };

      const productData = CACHE.googleSheet.rows.map(
        ({
          owner,
          category,
          modelName,
          productId,
          productYear,
          rentTimestamp,
          poNumber,
          note,
        }) => {
          return {
            owner,
            category,
            modelName,
            productId,
            productYear,
            rentTimestamp,
            poNumber,
            note,
          };
        }
      );

      CACHE.productData = productData;
      setSheetProductData(productData);
    })();
  }, [sheetProductData]);

  return {
    sheetProductData,
    addNewProductDataToSheet,
  };
}
