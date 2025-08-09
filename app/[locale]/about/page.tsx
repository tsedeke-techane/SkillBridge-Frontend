import { Navbar } from "@/app/[locale]/components/navbar";
import AboutPage from "@/app/[locale]/components/AboutPage";
import Footer from "@/app/[locale]/components/footer";

const About = () => {
  return (
    <div className='min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300 font-montserrat flex flex-col'>
      <Navbar />
      <main className='flex-1'>
        <section className='container !mx-auto px-4 lg:px-0 '> 
          <AboutPage />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;