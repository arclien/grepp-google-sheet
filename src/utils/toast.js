import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './toast.scss';

toast.configure();

const defaultToastOption = {
  position: 'top-center',
  autoClose: 3000,
  closeOnClick: true,
  pauseOnHover: true,
  hideProgressBar: true,
};

export const customToast = (content) => {
  toast(content, {
    className: 'ReactTemplateTODOToast',
    ...defaultToastOption,
  });
};

export const errorToast = (content) => {
  toast.error(`${content}`, {
    className: 'ReactTemplateTODOToastError',
    ...defaultToastOption,
  });
};
