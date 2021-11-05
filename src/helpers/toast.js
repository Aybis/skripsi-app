import toast from 'react-hot-toast';

export default function ToastHandler(type, message, time = 2000) {
  if (type === 'success') {
    toast.success(message, {
      position: 'top-center',
    });
  } else if (type === 'error') {
    toast.error(message, {
      position: 'top-center',
    });
  }
}
