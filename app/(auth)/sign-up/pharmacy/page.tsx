import background from '@/public/background.jpg'
import Image from 'next/image';
import dynamic from 'next/dynamic';

const   PharmacyForm = dynamic(() => import("@/components/signup/pharamacy"), { ssr: false });

const PharmacyPage = () => {
  return (
    <div className='relative min-h-screen w-full'>
      <div className='absolute inset-0 z-0 w-full h-full'>
        <Image src={background} alt='background' className='w-full h-full object-cover' />
      </div>
      <div className='relative z-10 flex items-center items-left justify-center min-h-screen'>
        <PharmacyForm />
      </div>
    </div>
  );
};

export default PharmacyPage;