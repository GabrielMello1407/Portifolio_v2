import Image from "next/image"
import LogoFooter from '../../../public/images/logo.svg'

const Footer = () => {
  return (
    <footer className="footer border z-10 border-t-[#33353F] border-l-transparent border-r-transparent text-white">
      <div className="container p-12 flex justify-between">
        
        <span>
          <Image src={LogoFooter} width={300} height={300} alt="logo footer" />
        </span>
        <p className="text-slate-600">Todos direitos reservados. © Gabriel Mello</p>
      </div>
    </footer>
  );
};

export default Footer;