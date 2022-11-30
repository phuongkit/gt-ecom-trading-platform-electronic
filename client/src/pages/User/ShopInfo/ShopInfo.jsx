import ProductCard from '../../../components/ProductCard';
import Paging from '../../../components/Paging';
import './shopinfo.scss';

import { SearchHeartFill } from 'react-bootstrap-icons';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getAllProductApi } from '../../../redux/product/productsApi';
import { useEffect, useState } from 'react';
import { getShopBySlugApi } from '../../../redux/shop/shopApi';

function ShopInfo() {
    const { slug } = useParams();
    const dispatch = useDispatch();
    const [keySearch, setKeySearch] = useState(null);
    useEffect(() => {
        getShopBySlugApi(dispatch, slug);
    }, []);
    const shop = useSelector((state) => state.shops.oneShop.data);
    const [numberPage, setNumberPage] = useState(1);
    useEffect(() => {
        if (shop?.id) {
            getAllProductApi(dispatch, { keyword: keySearch, shopId: shop?.id, page: numberPage, limit: 6 });
        }
    }, [shop, numberPage, keySearch]);
    const { content: productList = [], ...page } = useSelector((state) => state.products.pageProductShop.data);
    console.log(page);
    return (
        <div
            className="container mt-8"
            style={{
                width: '86%',
                maxWidth: '1240px',
                margin: '50px auto',
            }}
        >
            <div className="row grid grid-cols-12">
                <div className="col-span-4">
                    <div className="flex items-center my-4">
                        <div className="flex gap-8">
                            <div className="list-group-item h-[150px] w-[150px] ">
                                <img
                                    className="h-full w-full rounded-full"
                                    src={
                                        shop?.avatar ||
                                        'data:image/png;base64,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'
                                    }
                                ></img>
                            </div>
                            <div className="flex flex-col gap-3 flex-1">
                                <div
                                    href="#"
                                    className="mb-2 w-full list-group-item text-orange-500 font-semibold"
                                >
                                    Thông tin Shop
                                </div>
                                <span className="list-group-item">
                                    {shop.name}
                                </span>
                                <span className="list-group-item">
                                    {shop.phone}
                                </span>
                                <span className="list-group-item">
                                    {shop.email}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-8">
                    <div class="seller-info-list h-[170px]">
                        <div class="seller-info-item seller-info-item---clickable">
                            <div class="seller-info-item-icon-wrapper">
                                <svg
                                    enable-background="new 0 0 15 15"
                                    viewBox="0 0 15 15"
                                    x="0"
                                    y="0"
                                    stroke-width="0"
                                    class="shopee-svg-icon"
                                >
                                    <path d="m13 1.9c-.2-.5-.8-1-1.4-1h-8.4c-.6.1-1.2.5-1.4 1l-1.4 4.3c0 .8.3 1.6.9 2.1v4.8c0 .6.5 1 1.1 1h10.2c.6 0 1.1-.5 1.1-1v-4.6c.6-.4.9-1.2.9-2.3zm-11.4 3.4 1-3c .1-.2.4-.4.6-.4h8.3c.3 0 .5.2.6.4l1 3zm .6 3.5h.4c.7 0 1.4-.3 1.8-.8.4.5.9.8 1.5.8.7 0 1.3-.5 1.5-.8.2.3.8.8 1.5.8.6 0 1.1-.3 1.5-.8.4.5 1.1.8 1.7.8h.4v3.9c0 .1 0 .2-.1.3s-.2.1-.3.1h-9.5c-.1 0-.2 0-.3-.1s-.1-.2-.1-.3zm8.8-1.7h-1v .1s0 .3-.2.6c-.2.1-.5.2-.9.2-.3 0-.6-.1-.8-.3-.2-.3-.2-.6-.2-.6v-.1h-1v .1s0 .3-.2.5c-.2.3-.5.4-.8.4-1 0-1-.8-1-.8h-1c0 .8-.7.8-1.3.8s-1.1-1-1.2-1.7h12.1c0 .2-.1.9-.5 1.4-.2.2-.5.3-.8.3-1.2 0-1.2-.8-1.2-.9z"></path>
                                </svg>
                            </div>
                            <div class="seller-info-item-text">
                                <div class="seller-info-item-text-name">Sản phẩm:&nbsp;</div>
                                <div class="seller-info-item-text-value">{page.totalElements}</div>
                            </div>
                        </div>
                        <div class="seller-info-item">
                            <div class="seller-info-item-icon-wrapper">
                                <svg
                                    enable-background="new 0 0 15 15"
                                    viewBox="0 0 15 15"
                                    x="0"
                                    y="0"
                                    class="shopee-svg-icon"
                                >
                                    <g>
                                        <circle cx="7" cy="4.5" fill="none" r="3.8" stroke-miterlimit="10"></circle>
                                        <line
                                            fill="none"
                                            stroke-linecap="round"
                                            stroke-miterlimit="10"
                                            x1="12"
                                            x2="12"
                                            y1="11.2"
                                            y2="14.2"
                                        ></line>
                                        <line
                                            fill="none"
                                            stroke-linecap="round"
                                            stroke-miterlimit="10"
                                            x1="10.5"
                                            x2="13.5"
                                            y1="12.8"
                                            y2="12.8"
                                        ></line>
                                        <path
                                            d="m1.5 13.8c0-3 2.5-5.5 5.5-5.5 1.5 0 2.9.6 3.9 1.6"
                                            fill="none"
                                            stroke-linecap="round"
                                            stroke-miterlimit="10"
                                        ></path>
                                    </g>
                                </svg>
                            </div>
                            <div class="seller-info-item-text">
                                <div class="seller-info-item-text-name">Đang Theo:&nbsp;</div>
                                <div class="seller-info-item-text-value">17</div>
                            </div>
                        </div>
                        <div class="seller-info-item">
                            <div class="seller-info-item-icon-wrapper">
                                <svg
                                    enable-background="new 0 0 15 15"
                                    viewBox="0 0 15 15"
                                    x="0"
                                    y="0"
                                    class="shopee-svg-icon"
                                >
                                    <g>
                                        <polygon
                                            fill="none"
                                            points="14 10.8 7 10.8 3 13.8 3 10.8 1 10.8 1 1.2 14 1.2"
                                            stroke-linejoin="round"
                                            stroke-miterlimit="10"
                                        ></polygon>
                                        <circle cx="4" cy="5.8" r="1" stroke="none"></circle>
                                        <circle cx="7.5" cy="5.8" r="1" stroke="none"></circle>
                                        <circle cx="11" cy="5.8" r="1" stroke="none"></circle>
                                    </g>
                                </svg>
                            </div>
                            <div class="seller-info-item-text">
                                <div class="seller-info-item-text-name">Tỉ lệ phản hồi Chat:&nbsp;</div>
                                <div class="seller-info-item-text-value">
                                    96% (trong vài giờ)
                                    <div class="section-seller-overview__inline-icon section-seller-overview__inline-icon--help">
                                        <svg width="10" height="10">
                                            <g
                                                fill="currentColor"
                                                fill-rule="nonzero"
                                                color="currentColor"
                                                stroke-width="0"
                                            >
                                                <path d="M5 10A5 5 0 1 1 5 0a5 5 0 0 1 0 10zM5 .675a4.325 4.325 0 1 0 0 8.65 4.325 4.325 0 0 0 0-8.65z"></path>
                                                <path d="M6.235 5.073c.334-.335.519-.79.514-1.264a1.715 1.715 0 0 0-.14-.684 1.814 1.814 0 0 0-.933-.951A1.623 1.623 0 0 0 5 2.03a1.66 1.66 0 0 0-.676.14 1.772 1.772 0 0 0-.934.948c-.093.219-.14.454-.138.691a.381.381 0 0 0 .106.276c.07.073.168.113.27.11a.37.37 0 0 0 .348-.235c.02-.047.031-.099.03-.15a1.006 1.006 0 0 1 .607-.933.954.954 0 0 1 .772.002 1.032 1.032 0 0 1 .61.93c.003.267-.1.525-.288.716l-.567.537c-.343.35-.514.746-.514 1.187a.37.37 0 0 0 .379.382c.1.002.195-.037.265-.108a.375.375 0 0 0 .106-.274c0-.232.097-.446.29-.642l.568-.534zM5 6.927a.491.491 0 0 0-.363.152.53.53 0 0 0 0 .74.508.508 0 0 0 .726 0 .53.53 0 0 0 0-.74A.491.491 0 0 0 5 6.927z"></path>
                                            </g>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="seller-info-item">
                            <div class="seller-info-item-icon-wrapper">
                                <svg
                                    enable-background="new 0 0 15 15"
                                    viewBox="0 0 15 15"
                                    x="0"
                                    y="0"
                                    class="shopee-svg-icon"
                                >
                                    <g>
                                        <circle cx="5.5" cy="5" fill="none" r="4" stroke-miterlimit="10"></circle>
                                        <path
                                            d="m8.4 7.5c.7 0 1.1.7 1.1 1.6v4.9h-8v-4.9c0-.9.4-1.6 1.1-1.6"
                                            fill="none"
                                            stroke-linejoin="round"
                                            stroke-miterlimit="10"
                                        ></path>
                                        <path
                                            d="m12.6 6.9c.7 0 .9.6.9 1.2v5.7h-2"
                                            fill="none"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-miterlimit="10"
                                        ></path>
                                        <path
                                            d="m9.5 1.2c1.9 0 3.5 1.6 3.5 3.5 0 1.4-.9 2.7-2.1 3.2"
                                            fill="none"
                                            stroke-linecap="round"
                                            stroke-miterlimit="10"
                                        ></path>
                                    </g>
                                </svg>
                            </div>
                            <div class="seller-info-item-text">
                                <div class="seller-info-item-text-name">Người theo dõi:&nbsp;</div>
                                <div class="seller-info-item-text-value">59,9k</div>
                            </div>
                        </div>
                        <div class="seller-info-item seller-info-item---clickable">
                            <div class="seller-info-item-icon-wrapper">
                                <svg
                                    enable-background="new 0 0 15 15"
                                    viewBox="0 0 15 15"
                                    x="0"
                                    y="0"
                                    class="shopee-svg-icon icon-rating"
                                >
                                    <polygon
                                        fill="none"
                                        points="7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-miterlimit="10"
                                    ></polygon>
                                </svg>
                            </div>
                            <div class="seller-info-item-text">
                                <div class="seller-info-item-text-name">đánh giá:&nbsp;</div>
                                <div class="seller-info-item-text-value">4.8 (19,5k đánh giá)</div>
                            </div>
                        </div>
                        <div class="seller-info-item">
                            <div class="seller-info-item-icon-wrapper">
                                <svg
                                    enable-background="new 0 0 15 15"
                                    viewBox="0 0 15 15"
                                    x="0"
                                    y="0"
                                    class="shopee-svg-icon"
                                >
                                    <g>
                                        <circle cx="6.8" cy="4.2" fill="none" r="3.8" stroke-miterlimit="10"></circle>
                                        <polyline
                                            fill="none"
                                            points="9.2 12.5 11.2 14.5 14.2 11"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-miterlimit="10"
                                        ></polyline>
                                        <path
                                            d="m .8 14c0-3.3 2.7-6 6-6 2.1 0 3.9 1 5 2.6"
                                            fill="none"
                                            stroke-linecap="round"
                                            stroke-miterlimit="10"
                                        ></path>
                                    </g>
                                </svg>
                            </div>
                            <div class="seller-info-item-text">
                                <div class="seller-info-item-text-name">tham gia:&nbsp;</div>
                                <div class="seller-info-item-text-value">13 tháng trước</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row grid grid-cols-12">
                <div className="col-span-3">
                    <form>
                        <div className="well">
                            <div className="row">
                                <div className="col-span-12">
                                    <div className="input-group">
                                        <span className="input-group-btn">
                                            <button className="btn btn-primary" type="submit">
                                                <i className="fa fa-search"></i>
                                            </button>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>

                    <form className="shop__filter mt-4">
                        <h3 className="headline">
                            <span>Brand</span>
                        </h3>
                        <div className="checkbox">
                            <input type="checkbox" value="" id="shop-filter-checkbox_1" checked={true}></input>
                            <label htmlFor="shop-filter-checkbox_1">Adidas</label>
                        </div>
                        <div className="checkbox">
                            <input type="checkbox" value="" id="shop-filter-checkbox_2"></input>
                            <label htmlFor="shop-filter-checkbox_2">Calvin Klein</label>
                        </div>
                        <div className="checkbox">
                            <input type="checkbox" value="" id="shop-filter-checkbox_3"></input>
                            <label htmlFor="shop-filter-checkbox_3">Columbia</label>
                        </div>
                        <div className="checkbox">
                            <input type="checkbox" value="" id="shop-filter-checkbox_4"></input>
                            <label htmlFor="shop-filter-checkbox_4">Tommy Hilfiger</label>
                        </div>
                        <div className="checkbox">
                            <input type="checkbox" value="" id="shop-filter-checkbox_5"></input>
                            <label htmlFor="shop-filter-checkbox_5">Not specified</label>
                        </div>

                        <h3 className="headline">
                            <span>Material</span>
                        </h3>
                        <div className="radio">
                            <input
                                type="radio"
                                name="shop-filter__radio"
                                id="shop-filter-radio_1"
                                value=""
                                checked={true}
                            ></input>
                            <label htmlFor="shop-filter-radio_1">100% Cotton</label>
                        </div>
                        <div className="radio">
                            <input type="radio" name="shop-filter__radio" id="shop-filter-radio_2" value=""></input>
                            <label htmlFor="shop-filter-radio_2">Bamboo</label>
                        </div>
                        <div className="radio">
                            <input type="radio" name="shop-filter__radio" id="shop-filter-radio_3" value=""></input>
                            <label htmlFor="shop-filter-radio_3">Leather</label>
                        </div>
                        <div className="radio">
                            <input type="radio" name="shop-filter__radio" id="shop-filter-radio_4" value=""></input>
                            <label htmlFor="shop-filter-radio_4">Polyester</label>
                        </div>
                        <div className="radio">
                            <input type="radio" name="shop-filter__radio" id="shop-filter-radio_5" value=""></input>
                            <label htmlFor="shop-filter-radio_5">Not specified</label>
                        </div>

                        <h3 className="headline">
                            <span>Colors</span>
                        </h3>
                        <div className="shop-filter__color">
                            <input type="text" id="shop-filter-color_1" value="" data-input-color="black"></input>
                            <label htmlFor="shop-filter-color_1"></label>
                        </div>
                    </form>
                </div>

                <div className="col-span-9">
                    <ul className="shop__sorting">
                        <li className="active">
                            <a href="#">Popular</a>
                        </li>
                        <li>
                            <a href="#">Newest</a>
                        </li>
                        <li>
                            <a href="#">Bestselling</a>
                        </li>
                        <li>
                            <a href="#">Price (low)</a>
                        </li>
                        <li>
                            <a href="#">Price (high)</a>
                        </li>
                    </ul>
                    <div>
                        <input
                            type="text"
                            className="mb-[15px] w-[180px] pl-6 form-control border-none rounded-2xl p-4"
                            placeholder="Search products..."
                            onChange={(e) => setKeySearch(e.target.value)}
                        ></input>
                        <SearchHeartFill className=" ml-4 font-light text-[16px] cursor-pointer text-gray-300"></SearchHeartFill>
                    </div>

                    <div className="row flex flex-wrap gap-4">
                        {productList.map((item) => (
                            <ProductCard {...item}></ProductCard>
                        ))}
                    </div>
                    <div className="row">
                        <Paging
                            currentPage={page.number}
                            totalPages={page.totalPages}
                            onClick={(e) => setNumberPage(Number.parseInt(e.target.innerText))}
                        />
                        <div className="col-span-12">
                            <ul className="pagination pull-right flex gap-4 absolute bottom-0 right-12">
                                <li className="disabled">
                                    <a href="#">«</a>
                                </li>
                                {/* <li className="active"><a href="#">1 <span className="sr-only">(current)</span></a></li>
            <li><a href="#">2</a></li>
            <li><a href="#">3</a></li>
            <li><a href="#">4</a></li>
            <li><a href="#">5</a></li>
            <li><a href="#">»</a></li> */}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShopInfo;
