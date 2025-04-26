import { toast } from 'vue3-toastify'

const toaster = (type, msg, autoClose = 3000) => {
  const options = {
    autoClose,
    position: 'top-center',
  }

  switch (type) {
    case 'success':
      return toast.success(msg, options)
    case 'warning':
      return toast.warning(msg, options)
    case 'error':
      return toast.error(msg, options)
    case 'info':
      return toast.info(msg, options)
  }
}

export default toaster
