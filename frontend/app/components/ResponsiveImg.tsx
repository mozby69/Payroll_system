import Image from "next/image";
import ImgStyle from "@/public/css/ComponentCss/ResponsiveImg.module.css"

interface ResponsiveImageProps{
    src:string;
    alt?:string;
    width?:number;
    height?:number;
    priority?:boolean;
}



const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  src,
  alt = "icon",
  width = 2,
  height = 2,
  priority = false,
}) => {
  const style = {
    width: `${width}rem`,
    height: `${height}rem`,
  };

  return (
    <div className="image-wrapper" style={style}>
      <Image
        src={src}
        alt={alt}
        fill
        className="responsive-img"
        priority={priority}
      />
    </div>
  );
};

export default ResponsiveImage;