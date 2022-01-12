import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import qs from 'qs';

import useGoogleSheet from 'hooks/useGoogleSheet';
import RadioButton from 'components/RadioButton/RadioButton';
import { getTodayDate, getYear } from 'utils/day';
import { errorToast, customToast } from 'utils/toast';
import { SHEET_COLUMN_KEY } from 'constants/googlesheet';

import {
  WelcomeContainer,
  Title,
  SpinnerContainer,
  SpinnerComponent,
  Row,
  Input,
  ClickButton,
  SelectInput,
} from './GoogleSheetProxy.styles';

const PEOPLE_MANAGER = 'Rachel';

const PRODUCT_STATUS = {
  new: '구입',
  rent: '대여',
  return: '반납',
  sale: '판매',
  repair: '수리',
  damaged: '파손',
  discard: '폐기',
};

const PRODUCT_CATEGORY = {
  macbook: '맥북',
  window: '윈도우 노트북',
  monitor: '모니터',
  printer: '복합기',
  cam: '웹캠',
  mic: '마이크',
  gopro: '고프로',
  phone: '휴대폰',
  ctypegender: 'C-Type Gender',
};

const YearOptions = [
  {
    id: 1,
    label: '2022년',
    value: '2022',
  },
  {
    id: 2,
    label: '2021년',
    value: '2021',
  },
  {
    id: 3,
    label: '2020년',
    value: '2020',
  },
  {
    id: 4,
    label: '2019년',
    value: '2019',
  },
  {
    id: 5,
    label: '2018년',
    value: '2018',
  },
  {
    id: 6,
    label: '2017년',
    value: '2017',
  },
];

const DefaultValue = {
  owner: '',
  status: undefined,
  category: undefined,
  productModelName: '',
  productId: undefined,
  productSpec: '',
  productYear: 1, // YearOptions의 id 값
  productRentYear:  1, // YearOptions의 id 값
  note: '',
  poNumber: 'TODO',
  manager: PEOPLE_MANAGER,
  confirmTimestamp: getTodayDate('YYYY년 M월 D일'),
};

const Landing = () => {
  const { search } = useLocation();
  const { addNewProductDataToSheet } = useGoogleSheet();

  const { productNumber, productCategory } = qs.parse(search, {
    ignoreQueryPrefix: true,
  });

  const [isLoading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ ...DefaultValue });
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(true);

  const handleFormData = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const getYearTextById = (id) => YearOptions.find((el) => el.id === id).label;

  const createPayload = () => {
    const payload = {
      [SHEET_COLUMN_KEY.owner]: formData.owner,
      [SHEET_COLUMN_KEY.status]: PRODUCT_STATUS[formData.status],
      [SHEET_COLUMN_KEY.category]: PRODUCT_CATEGORY[formData.category],
      [SHEET_COLUMN_KEY.productModelName]: formData.productModelName,
      [SHEET_COLUMN_KEY.productId]: formData.productId,
      [SHEET_COLUMN_KEY.productSpec]: formData.productSpec,
      [SHEET_COLUMN_KEY.productYear]: getYearTextById(formData.productYear),
      [SHEET_COLUMN_KEY.productRentYear]: getYearTextById(formData.productRentYear),
      [SHEET_COLUMN_KEY.note]: `[${PRODUCT_STATUS[formData.status]}]: ${
        formData.note
      }`,
      [SHEET_COLUMN_KEY.poNumber]: formData.poNumber,
      [SHEET_COLUMN_KEY.manager]: formData.manager,
      [SHEET_COLUMN_KEY.confirmTimestamp]: formData.confirmTimestamp,
    };

    return payload;
  };

  const onSubmit = async () => {
    if (submitButtonDisabled) return;
    const payload = createPayload();
    try {
      setLoading(true);
      const res = await addNewProductDataToSheet(payload);
      if (res) {
        customToast('생성되었습니다');
      } else {
        throw new Error('실패');
      }
    } catch (e) {
      errorToast(e);
    } finally {
      setFormData({ ...DefaultValue });
      setLoading(false);
    }
  };

  useEffect(() => {
    handleFormData('productId', parseInt(productNumber, 10));
  }, [productNumber]);

  useEffect(() => {
    handleFormData('category', productCategory);
  }, [productCategory]);

  useEffect(() => {
    const { status, owner } = formData;
    if (status && owner) return setSubmitButtonDisabled(false);
    setSubmitButtonDisabled(true);
  }, [formData]);

  useEffect(() => {
    (async () => {
      if (isLoading) {
        setTimeout(() => {
          setLoading(!isLoading);
        }, 1000);
      }
    })();
  }, [isLoading]);

  const { owner, status, category, productModelName, productId, productYear, productSpec, productRentYear, note, poNumber, confirmTimestamp, manager } = SHEET_COLUMN_KEY;
  return (
    
    <>
      {!isLoading && (
        <WelcomeContainer>
          <Title>Grepp 장비 관리</Title>
          <Row>
            <Input
              label={owner}
              required
              value={formData.owner}
              onChange={(e) => {
                handleFormData('owner', e.target.value);
              }}
            />
          </Row>
          <Row>
            <RadioButton
              title={status}
              required
              value={formData.status}
              formKey="status"
              onClickRadio={handleFormData}
              radioOptions={PRODUCT_STATUS}
            />
          </Row>
          <Row>
            <RadioButton
              title={category}
              required
              value={formData.category}
              formKey="category"
              onClickRadio={handleFormData}
              radioOptions={PRODUCT_CATEGORY}
            />
          </Row>
          <Row>
            <Input
              required
              label={productModelName}
              value={formData.productModelName}
              onChange={(e) => {
                handleFormData('productModelName', e.target.value);
              }}
            />
          </Row>
          <Row>
            <Input
              label={productId}
              required
              readonly
              value={formData.productId}
            />
          </Row>
          <Row>
            <Input
              required
              label={productSpec}
              value={formData.productSpec}
              onChange={(e) => {
                handleFormData('productSpec', e.target.value);
              }}
            />
          </Row>
          <Row>
            <SelectInput
              required
              label={productYear}
              value={formData.productYear}
              onChange={(e) => {
                handleFormData('productYear', e);
              }}
              options={YearOptions}
              maxHeight={100}
            />
          </Row>
          <Row>
            <SelectInput
              required
              label={productRentYear}
              value={formData.productRentYear}
              onChange={(e) => {
                handleFormData('productRentYear', e);
              }}
              options={YearOptions}
              maxHeight={100}
            />
          </Row>
          <Row>
            <Input
              label={note}
              value={formData.note}
              onChange={(e) => {
                handleFormData('note', e.target.value);
              }}
            />
          </Row>
          <Row>
            <Input
              label={poNumber}
              value={formData.poNumber}
              onChange={(e) => {
                handleFormData('poNumber', e.target.value);
              }}
            />
          </Row>
          <Row>
            <Input
              label={manager}
              required
              value={DefaultValue.manager}
            />
          </Row>
          <Row>
            <Input
              label={confirmTimestamp}
              required
              readonly
              value={DefaultValue.confirmTimestamp}
            />
          </Row>
          <Row>
            <ClickButton
              disabled={submitButtonDisabled}
              block
              onClick={onSubmit}
            >
              장비 정보 업데이트
            </ClickButton>
          </Row>
        </WelcomeContainer>
      )}

      {isLoading && (
        <SpinnerContainer>
          <SpinnerComponent />
        </SpinnerContainer>
      )}
    </>
  );
};

export default Landing;
