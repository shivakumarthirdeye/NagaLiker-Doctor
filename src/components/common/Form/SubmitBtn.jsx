import { useFormikContext } from 'formik';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const SubmitBtn = ({ text, className, isSubmitting }) => {
  const { dirty, isValid, errors } = useFormikContext();
  console.log('🚀 ~ file: SubmitBtn.jsx:6 ~ SubmitBtn ~ errors:', errors);

  return (
    <button
      type='submit'
      className={` flex items-center bg-secondary disabled:opacity-60 disabled:cursor-not-allowed  font-medium py-[18px]  my-6 text-center justify-center text-white w-full rounded-md px-6 ${className}`}
      disabled={!isValid || !!Object.keys(errors).length}
    >
      <>
        {isSubmitting && (
          <AiOutlineLoading3Quarters className='animate-spin w-4 h-4 mr-2' />
        )}
        {text}
      </>
    </button>
  );
};

export default SubmitBtn;
