import LoginCard from '@/components/login/logincard';
import background from '@/public/background.jpg'
import Image from 'next/image';

const LoginPage = () => {
  return (
    <div className='relative min-h-screen w-full'>
      <div className='absolute inset-0 z-0 w-full h-full'>
        <Image src={background} alt='background' className='w-full h-full object-cover' />
      </div>
      <div className='relative z-10 flex items-center items-left justify-center min-h-screen'>
        <LoginCard />
      </div>
    </div>
  );
};

export default LoginPage;