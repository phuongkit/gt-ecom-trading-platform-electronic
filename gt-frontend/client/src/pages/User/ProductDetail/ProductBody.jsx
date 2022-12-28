import ProductRating from './../../../components/Rating/index';
import { useState, useEffect, useRef } from 'react';
import { productService } from '~/services';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
function ProductBody() {
    const initProductDetail = useSelector((state) => state.products.productDetail.data);
    const { id, price, discount, tag, title, slug, img, colors, brand, category, parameter, info } = initProductDetail;

    const pays = [{ bank: 'vnpay' }, { bank: 'tpbank' }, { bank: 'eximbank' }];
    const [modalShow, setModalShow] = useState(false);

    const [alertMess, setAlertMess] = useState({});

    const onClick = () => {
        setModalShow(!modalShow);
    };

    const dispatch = useDispatch();
    const addToCart = (data) => {
        if (dispatch(addItem(data))) {
            setAlertMess({ type: 'success', mess: 'Thêm thành công' });
        } else {
            setAlertMess({ type: 'failure', mess: 'Change a few things up and try submitting again.' });
        }
        setTimeout(() => setAlertMess({}), 1500);
    };

    const color = colors ? colors[0] : '';
    const handleClickPay = () => {
        addToCart({...initProductDetail, quantity: 1});
    };

    const [products, setProducts] = useState([]);
    useEffect(() => {
        async function getProducts() {
            const res = await productService.queryProduct(
                ['brand', brand],
                ['category', 'dienthoai'],
                ['_start', '1'],
                ['_limit', '10'],
            );
            setProducts(res.data?.content ? res.data?.content : []);
        }
        getProducts();
    }, [brand]);

    const Art = () => {
        return <div dangerouslySetInnerHTML={{ __html: info }} />;
    };

    const tags = ['iPhone', '6 GB', '128 GB', 'Chụp ảnh, quay phim', 'iPhone 13 (Mini, Pro, Pro Max)'];
    return (
        <section className="product__body">
            <div className="grid wide product__body-container">
                <div className="product__body-left-wrap">
                    <div className="product__body-left">
                        <div className="product__details-title-wrap">
                            <h1 className="product__details-title">Thông tin Shop</h1>
                        </div>
                    <div className='product__details-list'>
                            <Link to={`/ShopInfo/${initProductDetail?.shop?.slug}`} >
                                <div className='w-[100px] h-[100px]'>
                                <img src={initProductDetail?.shop?.avatar} alt="" className="home-product-item__img rounded-full w-full h-full"></img>
                                </div>
                            </Link>
                                    <h5 className="home-product-item__name">{initProductDetail?.shop?.name}</h5>
                                    <div className="home-product-item__price">
                                        <div className="flex flex-col gap-8 home-product-item__price-new">
                                            <span>Email: {initProductDetail?.shop?.email}</span>
                                            <span className="home-product-item__price-new-prices">Location: {initProductDetail?.shop?.address?.city}</span>
                                        </div>
                                    </div>
                    </div>
                     

                        <div className="product__desc">
                            <div className="product__details-title-wrap">
                                <h1 className="product__details-title">MÔ TẢ SẢN PHẨM</h1>
                            </div>

                            <div className="product__desc-para-wrap">
                                {info ? (
                                    <Art />
                                ) : (
                                    <p className="product__desc-para">
                                        ⚠️ Có khả năng gấp gọn lại cũng như kéo dãn ra để vừa mọi cỡ đầu. Ngoài
                                        ra phần khung được làm bằng nhựa cao cấp cực bền và không gây mùi khó chịu như
                                        các sản phẩm rẻ tiền khác - Hỗ trợ micro đàm thoại khả năng tương thích với các
                                        smartphone là 100%. Có cổng cắm chuyển đổi thay vì kết nối bluetooth - Nệm tai
                                        cao cấp cực kỳ êm ái và thoáng khí - Chất lượng âm thanh cực tốt. Bass treble
                                        khỏe, mạnh mẽ, thể hiện rõ ràng trong từng nốt âm thanh - Công nghệ Bluetooth
                                        5.0 ổn định tín hiệu và khắc phục vấn đề delay khi chơi game so với các công
                                        nghệ bluetooth cũ * THÔNG SỐ KĨ THUẬT : Tai nghe bluetooth tai nghe mèo không
                                        dây - Bluetooth 5.0, JL chip - Dung lượng pin 400 mAh, thời gian sạc 2 giờ -
                                        Cuộc gọi/Thời gian nghe nhạc: 10 giờ - Thời gian chờ: 200 giờ - Đường kính loa:
                                        40mm - Kích thước: 203*175*80mm; Trọng Lượng: 182g - Tính năng nổi bật: Có thể
                                        dùng bluetooth, dùng dây 3.5, dùng thẻ nhớ đều được - Tai nghe bluetooth tai mèo
                                        dùng được cho mọi dòng điện thoại, máy tính bảng, laptop và PC * CÁCH SỬ DỤNG :
                                        Headphone chống ồn - Nhấn giữ nút nguồn của Headphone 2s cho đèn sáng - Mở
                                        bluetooth ở điện thoại để kết nối với bluetooth của Headphone STN-28 - Nhấn giữ
                                        nút cuộc gọi để tắt đèn khi không muốn dùng đèn led - Thời gian sạc khoảng 1-2h,
                                        sạc xong sẽ tắt đèn báo nhưng bạn vẫn nên để ý thời gian để tắt sạc cho an toàn
                                        - Khi gần hết PIN tai nghe sẽ báo bằng giọng nói của chị ''Gu-gồ'' nên cũng đừng
                                        giật mình - Tai nghe chống nước, nhưng đừng vì thế mà bạn nhúng xuống nước nha
                                        Chúng tôi làm việc chuyên nghiệp và đặt UY TÍN lên hàng đầu! 100% CAM KẾT VỀ
                                        CHẤT LIỆU VÀ CHẤT LƯỢNG 100% SẢN PHẨM ĐÚNG NHƯ MÔ TẢ 👉GIAO TẬN TAY KHÁCH HÀNG
                                        MỚI THU TIỀN 100% Luôn cho khách KIỂM TRA HÀNG trước khi thanh toán 100% MIỄN
                                        PHÍ đổi trả nếu hàng lỗi, không đúng sản phẩm như đã đặt 100% Giao hàng TOÀN
                                        QUỐC, chỉ 3-5 ngày nhận được hàng #tai #nghe #bluetooth #khong #day #headphone
                                        #chup #tai #meo #tainghe #khongday #tainghemeo #tainghekhongday
                                        #tainghebluetooth #dethuong #mini #tainghegiare #tainghedep #cute{' '}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    <ProductRating></ProductRating>
                    {/* <Comment></Comment> */}
                </div>

                <div className="product__body-right">
                    <h2 className="product__best-seller-title">Mô tả sản phẩm</h2>

                    <div className="product__best-seller-list">
                        <a className="home-product-wrap">
                            <div className="home-product-item">
                            {parameter ? (
                            <div className="product__details-list">
                                {Object.entries(parameter).map((param, index) => {
                                    if (index != 0) {
                                        return (
                                            // <tr className={clsx(index % 2 === 0 && 'bg-gray-100')} key={index}>
                                            //     <td colSpan="4">{param[0]}</td>
                                            //     <td colSpan="6">{param[1]}</td>
                                            // </tr>
                                            <div className="product__details-item flex">
                                                <span className="product__details-item-title">{param[0]}</span>
                                                <span className="product__details-item-desc">{param[1]}</span>
                                            </div>
                                        );
                                    }
                                })}
                            </div>
                        ) : (
                            <div className="product__details-list">
                                <div className="product__details-item flex items-center h-full">
                                    <span className="product__details-item-title">Danh Mục</span>
                                    <span className="product__details-item-desc">Tên nhãn hiệu</span>
                                </div>
                                <div className="product__details-item flex items-center">
                                    <span className="product__details-item-title">Kiểu kết nối</span>
                                    <span className="product__details-item-desc">Không dây</span>
                                </div>
                                <div className="product__details-item flex">
                                    <span className="product__details-item-title">Kho hàng</span>
                                    <span className="product__details-item-desc">498</span>
                                </div>
                                <div className="product__details-item flex">
                                    <span className="product__details-item-title">Gửi từ</span>
                                    <span className="product__details-item-desc">Quận Cầu Giấy, Hà Nội</span>
                                </div>
                            </div>
                        )}
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ProductBody;
