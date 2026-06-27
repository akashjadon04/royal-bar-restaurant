import Hero from '@/components/home/Hero';
import CategoryCards from '@/components/home/CategoryCards';
import InteractiveChef from '@/components/home/InteractiveChef';
import Featured from '@/components/home/Featured';
import Collections from '@/components/home/Collections';
import Testimonials from '@/components/home/Testimonials';
import DownloadApp from '@/components/home/DownloadApp';
import Story from '@/components/home/Story';

export default function Home() {
  return (
    <div className="min-h-screen bg-white overflow-hidden">
      <Hero />
      <CategoryCards />
      <InteractiveChef />
      <Featured />
      <Collections />
      <Testimonials />
      <DownloadApp />
      <Story />
    </div>
  );
}
