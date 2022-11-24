import './bigbanner.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';

const images = [
    'https://png.pngtree.com/thumb_back/fh260/back_our/20200701/ourmid/pngtree-atmospheric-high-end-skin-care-product-advertising-background-image_344527.jpg',
    'https://png.pngtree.com/thumb_back/fh260/back_our/20200701/ourmid/pngtree-atmospheric-high-end-skin-care-product-advertising-background-image_344527.jpg',
    'https://png.pngtree.com/thumb_back/fh260/back_our/20200701/ourmid/pngtree-atmospheric-high-end-skin-care-product-advertising-background-image_344527.jpg',
    'https://png.pngtree.com/thumb_back/fh260/back_our/20200701/ourmid/pngtree-atmospheric-high-end-skin-care-product-advertising-background-image_344527.jpg',
    'https://png.pngtree.com/thumb_back/fh260/back_our/20200701/ourmid/pngtree-atmospheric-high-end-skin-care-product-advertising-background-image_344527.jpg',
];
const BigBanner = () => {
    return (
        <div className="container__bigbanner">
            <div className="containner__body">
                <div className="containner__first-item">
                    <Slider dots={true} slidesToShow={1} slidesToScroll={1} autoplay={true} autoplaySpeed={2000}>
                        {images.map((src, index) => (
                            <div key={index} className="owl-item" style={{ width: 800 }}>
                                <div className="item">
                                    <a href="">
                                        <img src={src} alt="" />
                                    </a>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
                <div className="containner__second-item">
                    <div>
                        <a href="">
                            <img src="https://png.pngtree.com/thumb_back/fh260/back_our/20200701/ourmid/pngtree-atmospheric-high-end-skin-care-product-advertising-background-image_344527.jpg" alt="" />
                        </a>
                    </div>
                    <div>
                        <a href="">
                            <img src="https://png.pngtree.com/thumb_back/fh260/back_our/20200701/ourmid/pngtree-atmospheric-high-end-skin-care-product-advertising-background-image_344527.jpg" alt="" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BigBanner;
