import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import qs from 'qs';

import useGoogleSheet from 'hooks/useGoogleSheet';
import RadioButton from 'components/RadioButton/RadioButton';
import { getTodayDate } from 'utils/day';
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
} from './GoogleSheetProxy.styles';

const PRODUCT_STATUS = {
  new: '구입',
  rent: '대여',
  return: '반납',
  damaged: '파손',
  discard: '폐기',
};

const PRODUCT_CATEGORY = {
  macbook: '맥북',
  window: '윈도우 노트북',
  monitor: '모니터',
  printer: '복합기',
};

const DefaultValue = {
  productId: undefined,
  status: undefined,
  category: undefined,
  owner: '',
  manager: 'Rachel',
  note: '',
  timestamp: getTodayDate('YY-MM-DD'),
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

  const createPayload = () => {
    const payload = {
      [SHEET_COLUMN_KEY.owner]: formData.owner,
      [SHEET_COLUMN_KEY.category]: formData.category,
      [SHEET_COLUMN_KEY.modelName]: 'TODO',
      [SHEET_COLUMN_KEY.productId]: formData.productId,
      [SHEET_COLUMN_KEY.productYear]: 'TODO',
      [SHEET_COLUMN_KEY.rentTimestamp]: formData.timestamp,
      [SHEET_COLUMN_KEY.poNumber]: 'TODO',
      [SHEET_COLUMN_KEY.note]: 'TODO',
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

  return (
    <>
      {!isLoading && (
        <WelcomeContainer>
          <Title>Grepp 장비 관리</Title>

          <Row>
            <RadioButton
              title="상태"
              required
              value={formData.status}
              formKey="status"
              onClickRadio={handleFormData}
              radioOptions={PRODUCT_STATUS}
            />
          </Row>
          <Row>
            <Input
              label="소유자"
              required
              value={formData.owner}
              onChange={(e) => {
                handleFormData('owner', e.target.value);
              }}
            />
          </Row>
          <Row>
            <Input
              label="비고"
              value={formData.note}
              onChange={(e) => {
                handleFormData('note', e.target.value);
              }}
            />
          </Row>
          <Row>
            <RadioButton
              title="장비"
              required
              value={formData.category}
              formKey="category"
              onClickRadio={handleFormData}
              radioOptions={PRODUCT_CATEGORY}
            />
          </Row>
          <Row>
            <Input
              label="제품 아이디"
              required
              readonly
              value={formData.productId}
            />
          </Row>
          <Row>
            <Input
              label="담당자"
              required
              readonly
              value={DefaultValue.manager}
            />
          </Row>
          <Row>
            <Input
              label="날짜"
              required
              readonly
              value={DefaultValue.timestamp}
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
