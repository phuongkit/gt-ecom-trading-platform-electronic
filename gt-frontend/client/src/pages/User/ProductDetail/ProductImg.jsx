import { useState } from 'react';
import { CounterQuantity } from '~/components/Selector';
import { numberWithCommas } from '~/utils';
import { Modal, Button, Alert } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '~/redux/shopping-cart/cartItemsSlide';
function ProductImg({item,mess}) {
    const initProductDetail = useSelector((state) => state.products.productDetail.data);
    const [stateQuantity,setStateQuantity]= useState(parseInt(item.availableQuantity) - 1)
    const [mount,setMount] = useState(1)

    const { id, price, discount, tag, title, slug, img, colors, brand, category } = initProductDetail;

    const pays = [{ bank: 'vnpay' }, { bank: 'tpbank' }, { bank: 'eximbank' }];

    const dispatch = useDispatch();
    const addToCart = (data) => {
        if (dispatch(addItem(data))) {
            alert("Thêm thành công")
        } else {
            alert("Vui lòng thử lại sau")
        }
    };

    const color = colors ? colors[0] : '';
    let productForCart = { ...initProductDetail, quantity: 1 };
    const handleClickPay = () => {
        addToCart(productForCart);
    };
    return (  
    <section className="product">
        <div className="grid wide product__container">
            <div className="product__left">
                <div className="product__img-wrap">
                    <img src={item.img} alt="" className="product__img"></img>
                </div>
                
                {/* <div className="product__list slick flex">
                    <div className='w-[200px] h-[100px]'><img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAHsAewMBIgACEQEDEQH/xAAcAAACAgMBAQAAAAAAAAAAAAAEBQMGAAIHAQj/xAA8EAACAQIFAQcCAwcDAwUAAAABAgMEEQAFEiExQQYTIlFhcYEUkTKhsRUjQlLB0fBi4fEHM3IkJUNjov/EABgBAQEBAQEAAAAAAAAAAAAAAAABAgME/8QAHBEBAQEAAwADAAAAAAAAAAAAAAERAhIhAzFh/9oADAMBAAIRAxEAPwDhuMxmMwGYzGYzAZjMZjMAfR5PXVlNLVQw2pof+5PIwSNTcC2piAT4hsN7b2tj2lyzv30yVtJT7Egys2/p4QSPnnpfDrJK+o/YZpRMEhind1BjvpJUXYHm+w8+ML4GrZVLZdQXQBn7wxd4xCgsxJO3APTpguHNH/017S1UTTRU0BgMPexTmde6nHQI4utz6keWx2xT5EKMQRYjYjyx2z/pf2izRa/Luz+adzPRVcff05juhpnC94AbWuDbjjHM+1WTzU3abNaaKMlI6uQKT5aicJ6WYrmMwc2XTKFMmlQ3GN/2XKPxbD+a22LlQuxmGH7PAveQEjkDGxoFV9IOprcWt+d8OtC3GYZ/SRIpaQMB/pI/tiLuIzwstvSx/ph1Afdv/KcSLTSsdlwVHT+O6cD0vgwUxmiEgaw6FWtfDGsLkoJ3jeQBdKEBvELi/Hh5PHQY2ShLOAS3uIzb88NoqViwVVYgc6ibW/ridU8YUxISxtpO239Bi4YWRZVGwNnZrc2AxLFk4YqWQxqzWvJf9OR84bU9ECrySIhUNpGk3F7ced8FEqkCyywMEHBCNpxcUDHDDRRqhsquS7eXl9zv9sRzZhX0NP8ASv3sdKyGMlRZWBX7fHkx88OUypaubvLfu0OlV6L1+++J6FJu6qIYqiZZYlvFHCLl+bAj4xjlJVmm3/TiiVc6i7QZpTzUNDQrriZr6brFpCi+9tN+fLrzgjtf2eM9bV59Baohqai8oAKmFm4BUng+Y9tuMSQfXUopokmlmjckSRybst13AFuvHTrh32er45ad8s7qaeGo1xTKEuihib2Pn138sTjcWzXNZaApfull1EbqgP8AfA3cPG6xgzleLggjF7zPKaWhqZaK5EkTFXAIJtbkbja1j54SVWWMxtFVdybcLc/ncY7uWkRooo28aEE/z6ST6W5xoYIUGuSnjCg36AEdefTDQ9ni0haTMahj/EAmm49+vxjRez9GkrFg0kgP4nlBI9gTf1wCmWSBmjENILk3PjXw/niRaGNhcsATvuFP54dCig0lEuinYHVa3zfEQgp08JieQjbWXO/3OArMAhDBpLJboB09f+cT/Sd4miGcDfkm5IHthumUpOrEU2tCP5hYfe2ChlMdOU7pbceFTYC4674w0RUdDolBqCdIPJPP2thzHS0T3MwRjwgKXN99zfBiZbEdqfQhPLNEdNup2PPz1wVFR6lQBIpdQuSELLbja5G3pimoqWhV4WEc7O1t0eMbD0thfJSZgKl0BsCbK8gIHO3T/NsWagy0FUWppotZJuyyA+dt/bB65If3muRzFpLGHReNgN+mx67E4JqsUrOuXSsSNQB1ML+I35vhL9TUxQxGgkljnqmGiZLbC52J6XN9xxbFlyrLvqaKaEybTAghD+E2J/2wiqKGR6iniaJlhptJiMco0A7XPncEn4HxjjvtdPxrNU1sVWIO/KyIdckr7m/8t+o8zz6jHV6KmWmyulmlp2pvqFDIG2JtY4Q5BlNPUz0r1SpVfvSy6UtbqBfqbge/lYYuuawCupaORpJ+7gdlCAKu5C2v5WsbHCZyuJyuKlmqQ1ueST2RKmVVJO6s4UBN9rE+Hz2x5LlkWgrHHMwZf4n2+54w9qaFJVRKwR9QQsltR8gdt8RaqIhlejlhCeFRK4YMPP8AETt8HHeXHG1VJooaRxBTwJU1OkydzTuBJpvYE3bcevGIlgq55AqZLVUmkbyP3RHzZj+VuMWpcxpo5Tqkjj0rdgHVr26gjf4OEdR2w7NRsscua63BLFkilGnzBABYHzvbF09Ry0NYYH7mNzVFPBFINI+Tv5YUfsjM28VRQ1olO7CKaPSD6bYtMGZiYg0/72FwNBRWufvz6m2C0rjpF4nB97YJtUKlaZ3Eck8KNuSeSB5+uDI6gpOkEcIqWBI7x5VUE/mTirUmYpTZoP2sYBoUAhdvF0up2PN9hgyLs5Q5lUnMoHdondiTHMLXHltf/DjDqstJWmZj9ZTrBMPbxfPPI5tiarr6WGVYzMSsjhFRmFr/ACL4DpKGAGHvqiQKDoVSjEgX2vyAfj7YezZTBVQEM0SdNboGG3nf58sE8K6/N6nJMwjifLqieKU3DxPcEnkGwPQE/bzxHH2qjlSpqf3lDZtDxqkbvx+I8dbi1zx8YIzbIaVrVj5nDHPGmkExqLgdL7fmftgCenyNQmqspZHCWLJTOG+bG2AR9iM1ajzvXVvPIphkjsWPhJtYb+2LJlNAUMZmd3c7uwO3xgenyeiaF5zDNqU+EpGVVLbg9b++HeRxmWaFWdyrsqiy8Xxz5/Tpx+1ijyWeOmpJKRhKiqWKk72I29+uG+UOKiOeBnOoi5W223kb32/riuUfaalpu0MerNNEbVTRvDMukMjHQAvNrHSdrX+cMYaj9l9ohSySRB5ZCFjDAtZja4F+LnEszKx7fDSLKliEvdoSkrlmQt4bnkgdLncjzJ88Ry5PHKbmPQGNjYkXHx1+cU+v7fz0LSxNJEZUdldCN0INrdMGZf2+Srh1imk1dRxsTzc7EfOOuufWtc57I1VTLfJq2noZASWY05bUpHVyOdvPGS5fPRC1RWxsQSddNSqo4/1MST67YskElLUK0sjIrt+LRaw2632wxWOKSMWcfh2tpBtz0xU2udVORgRnQ1SRckuzm63NzdzuOeAcBnJ8zQ6V70gf/Yj/AP6axPzjolRSUpAinWJjbbvbG/542SkSNAkbBVAsAoW2KndwaPI8kpGZJmNRYENd7njoRsD8Xwe+YR00rKtOkNIAAW7uNmYjz8N/nFdEUs8XdQhG0kERowW3rYDfrhrA6UVEAsKs7KO8QnVq4vYXHW/N+MYdsMaTPsvWpjBlWRb7WvGV24AA2/znFgWnoKhWaWFGRujSjb9MIoKanlPeQvAjG1w0en72BIwRT03cnW0g0rsTHrDN7X/riqPnyWkkcBHdvIaibDyuMRZfkcHfnVEwiVt5ddyfddrYsOW11KtMk1VIkalb6HjJY7nkA7cfrjau7T5JEhIhk4K38RN/Qc/piJoH6DM6acChghhowp1vI+wW22xFx149MDZBO8ubUlRSVDmlBEhQAWKje4uLjFe7SdtqGaaeKjWdj3OhVaMNF3m/ADA29Tf2OFvZqhqxTPJPQvWPIndwwO8iLGL7ttbf0P8Ae0vqyrB2xlyvK3BOVzL9R+GojkVbrfdvC1wb9Tbnr1mq+2FDPWU2Zmmq1qzGIhLMdOrTtrAJ5PU8+fTAxqKHLwq1+ZU8Dkm8P/elPkSFvc++FeYZdN2jnjFHC1PErXNRWx91rH+lRu3N+PLfEvonrmirc3mrlWY/VN36toBZw2+2/I4Ntr39haez9PM6CKGhqg2sMzGJYtuu5IvhfkeSzZblk1LHmWpX1/8AqIodDqrAAgckEWNj5k7cYsbZvNFGqxNR99uHeddTNsbH+Hr641Eo+SgqEKqlYIZd7FQSbc23Y268bDbBk0MVkc0xnN76ozv7m2K7UZ+wh7yaCIHo7O2kEXt4QTbFfq+0Gdx1Qko/oREo2AF735te3rti6z1rocM8pj0Q0zRsBc96pAJv5gb43E9Qo0lXuNti39sUCPtNmXdRh6RYjtcpqsW9zsPm9vXEYqu1DC8dTMUPGlVIt7hhf7Yup0UvVraN1JLncEAX46eWPJ61INSzVDLPouEtdm34G1vM7noPTCwZj9MEU0uvULqS+4/XDfLZTW0BhNKO8ZwOSbHkW6X3P39cYb1vR1SyRKiVDrISPEBbUNvXnf8Aph/k+WSZvDHaapikUklmgaQbHw2AAO9jv6HFTzeJ8nrXopYhDJbUHkXw368Dex8vLAVV2gqFYpRN3aiwV1ve3OwPG5J++GmnmbZ9VZZX1VPVSy1U8VhEJmLBL7m5vuP74RyZrnGdEQzVczRJ/ADpjQew/wCcLo6arrRNUrHLKEu0spBIHJJZj1/XGprJu5MKFUjIsyooGr3PJ+cRNWNKzLciH/t1U89S8ZVpY1HhvwQ17W/023641oFz3tZMsEtey0y+F5JDoiQddlG5t0t9sIMujgmq0SoZxH17tbk4ujGnyiGOpgFRHEHClo3aycfwkbH288Uhnl2WRdmgj05yvMAzMq1lPG5lU+ocbdPwnz5wU2cVjATCOkVyo0zCIXJ8zqG/tbrgvKu00WlZVZ56eT/54mvIv/kp59j8erlqGkrYGkh7qVW3ZqeMqxPsCBf33xGlMqu0VVRNIJYFaI3GqK4setwrdTf7YWr2kp5ZWjnp5I+CGjbjfqAP1Hn54ttTkE0cZU0ZYEDw94PALW3um21tgSPI4Dbs3S1z2lh0ANtYgXPUHqdidjigegrKSpqlg7wxSWBI7zTqHF7WPp5c4bPRNl/ePEspWZQSxay7ebXF1t0N+mF47KmmhBholk0G4aMk6Dc9V4O/QYdQTsI+5E1VTaxZhLUGWO/oH499sDWUtXA0ndPNHHOBayMA5P8A4/7dcFPUzxsV7tjY/wAC7Y8oS9bmMNH9Oz96bXN+7sD+LqMdHg7L5TFEqfRwtYcsu/64zeXuRMfMaRQZsFgpqnuahBqYubC3vbngf5sfBUZF2djj0VdRNWxtcrCqul9gdQbw+e39cU2adpRawVRwqiwGIrnzxWR+cZrU5rVd9VSNIVGlCx3C/wB8aUVEs8Uk09THTQID4nuS7beFVG5O/oLA74Cxt4iBvsNhvxgM1HSFJNgbgX/zyxvFoBvILqDuoNifnpgnK1o2qLZhr7rST4fPbm3TnFq7ijqSzUsMDCLSG0063G229vXnqR03wUkpKqoeVpMvy6ygD8F/DYW3YW2IOGVR21zL6gGqgoZmAAdHjjkRuLdDuN97+Xkb+ZjT1NTEqrKFjuNTMxv7Afbm2BqfK54wIkqoAjbeKEeL0vhi+wRTdqqMFjUZHAoOwFHK0Q6/zax5dPnDCi7VQRioMEslN4LwiSFX1PfhiLAXHXfqPLFfzSlehmjljppIpVO7NGpQkX3sb22sbH3w0k7SQZhTRRVyRmWG4LrHpEgJ4AHFubcX392GtB2xzEuZGaIIwHgBF+b8gX34twMMIe16PokzHLEkLDwO07LcA7jUyNqF+m9sDoMrlgaWCKhefSdUMr6WI3v1Bv8A78YAnocvZWjanr6Sa/7u86PEtwT1AO/v54IudP29yIp3Vq6FQdhIrEDpsyvf8vtguLtL2dq0CnOJ4p3K6nLuuk79HJ9vxG2Oep2WqJYzJBVQHa6hwyE26X4Bv0wPmPZ7OMuLyy0rtCoLGeE60A55HHziovGZZqtDmtJJl+aRz6VIDBlLId73AtuQByB6cA47hlVWldl1PVPVtqkjBPhUb+2PkLvX1atZ1E31X3vhunajOIlCQZjUJGPwqJOMef5Pjt5bHWcpmUixNSwNUSiNCNR8ziHEtOxWTUuxAuMd3Jacm7MUde5LStZATJGZFDLbn3Hr69TsbFRdmMoyyoMtT3T0/dsClVGXZiNwyjSDwCPI+TXxScxnmoK8PRTSwPp1ao3IN98PTW1VUYZJ6iV3aJHZtRuSyAn9BiiCupsnmzCeqyqMTw6lOk3RVLeSkce/PkOBJ9LK9M60shYXFrWJQ34IO+4PA26e4+Z1EktLWyvp7yCSNY3CAEKQNiQNxueb43rYoxSR1SoqzvEjs6i12JAv+eDUApmlbQzlK0oRIpN+7Bvueot64aQyR1cBmpFIcKdpCAw2HwfS56YF7QwxntJUgoLRwwlR0BMSsfzJONKarntRw6h3csIkddA3YyEHp5AbYI2rKeaSNqUBQ0lipiJZWt6cf8jAI7P1jxd6ugE8AEafa49+uJgAZngO8TKZCp41eI/a4G3GMrUWFImiUIzSSqxUWLDXpsfPbAoWLJsxVg4hIKkXP+/B29cF/SMgZamCEoSVZE/EvkVI3t6Ye1NNHJRCVtetGAUiRhYX9DhPNK8IVo2IN1G+9wSPP3OCyI6OWelZvop2XYWBUXt7kG3x84IznOJ5MolpmFR+8Kh3eT1vaw2/LHs7ECoAtZLBduBhLXyu8Lamv4gPywKWnnHmMxmIy//Z" alt="" className=" w-full h-full"></img></div>
                    <img src="data:image/jpeg;base64,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"></img>
                    <img src="data:image/jpeg;base64,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"></img>
                    <img src="data:image/jpeg;base64,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" alt="" className="product__list-img"></img>
                    <img src="~/assets/imgs/Shoes/sh7.jpg" alt="" className="product__list-img"></img>
                    <img src="~/assets/imgs/Shoes/sh7.jpg" alt="" className="product__list-img"></img>
                </div> */}
            </div>

            <div className="product__right">
                <span className="product__like ml-[18px]">Yêu Thích</span>
                <h2 className="product__title text-9xl ">{item.title}</h2>
                
                <div className="product__react px-[5px]">
                    <div className="react__rate">
                        <span className="react__star-point">{parseFloat(item.star).toFixed(1)}</span>
                        <div className="react__rate-star">
                            <i className="home-product-item__star--orange fas fa-star"></i>
                            <i className="home-product-item__star--orange fas fa-star"></i>
                            <i className="home-product-item__star--orange fas fa-star"></i>
                            <i className="home-product-item__star--orange fas fa-star"></i>
                            <i className="fas fa-star"></i>
                        </div>
                    </div>
                    
                    <div className="react__vote">
                        <span className="react__vote-point">{item.totalVote}</span>
                        <span className="react__vote-desc">Đánh Giá</span>
                    </div>

                    <div className="react__sold">
                        <span className="react__sold-quantity">{item.soldQuantity}</span>
                        <span className="react__sold-desc">Đã Bán</span>
                    </div>
                </div>

                <div className="product__price">
                    <span className="product__price-original">₫{numberWithCommas(item.originPrice)}</span>
                    <span className="product__price-discount">₫{numberWithCommas(item.price)}</span>
                    <span className="product__discount">{item.discount*100}% GIẢM</span>
                </div>

                <div className="product__transport">
                    <span className="product__transport-title">Vận chuyển</span>
                    <img src="./assets/imgs/product-details/transport.png" alt="" className="product__transport-icon"></img>
                    <span className="product__transport-desc">Miễn phí vận chuyển</span>
                </div>

                <div className="product__color">
                    <span className="product__color-title">Màu Sắc</span>
                    <span className="product__color-desc">Hồng</span>
                </div>

                <div className="product__insurance">
                    <span className="product__insurance-title">Bảo Hành</span>
                    <span className="product__insurance-desc">12 tháng</span>
                </div>

                <div className="product__quantity-container">
                    <span className="product__quantity-title">Số Lượng</span>
                    {/* <div className="product__quantity-input">
                        <button className="minus" onClick={(e)=>setMount(mount-1)}>-</button>
                        <input type="text" className="product__quantity-input-desc" value={mount} onChange={e=>setMount(parseInt(e.target.value))}></input>
                        <button className="plus" onClick={(e)=>setMount(mount+1)}>+</button>
                    </div> */}
                   <CounterQuantity
                                sphientai = {item.availableQuantity}
                                value={1}
                                onChange={(quantity) => {
                                    
                                    setStateQuantity(item.availableQuantity - quantity)
                                    productForCart = { ...productForCart, quantity: quantity };
                                }}
                    />
                    {/* <p className="product__quantity-desc">{stateQuantity==item.availableQuantity ? '0':(stateQuantity ? stateQuantity : item.availableQuantity)} sản phẩm có sẵn</p> */}
                </div>

                <div className="product__buy">
                    <div className="modal__add-to-cart">
                        <div className="modal_add-to-cart-body">
                            <i className="fas fa-check-circle"></i>

                            <p className="modal_add-to-cart-body-title">Sản phẩm đã được thêm vào Giỏ Hàng</p>
                        </div>
                    </div> 
                    <button className="btn btn__add" onClick={handleClickPay}>
                        <i className="fas fa-cart-plus btn__add-icon">Thêm vào giỏ</i>
                    </button>
                    <Link to="/cart" className="btn btn--primary btn__buy">
                        Xem giỏ hàng
                    </Link>
                </div>
            </div>
        </div>
    </section>
    );
}

export default ProductImg;