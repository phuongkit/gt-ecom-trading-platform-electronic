import ProductCard from '../../../components/ProductCard';
import './shopinfo.scss'

import{SearchHeartFill} from 'react-bootstrap-icons'
function ShopInfo() {
    return ( 
<div className="container mt-8">
  <div className="row grid grid-cols-12">
    <div className="col-span-4">
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
      <div className="flex items-center my-4">
                
                <div className='flex gap-8'>
                      <div href="#" className="list-group-item h-[150px] w-[150px] ">
                          <img className='h-full w-full rounded-full' src='data:image/png;base64,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'></img>
                      </div>
                      <div className='flex flex-col gap-3 flex-1'>
                      <div href="#" className="mb-2 w-full list-group-item text-orange-500 font-semibold text-center">Thông tin Shop</div>
                          <a href="#" className="list-group-item">Name</a>
                          <a href="#" className="list-group-item">Email</a>
                          <a href="#" className="list-group-item">Số lượng bán</a>
                      </div>
                </div>
                  
              </div>
  
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
          <input type="radio" name="shop-filter__radio" id="shop-filter-radio_1" value="" checked={true}></input>
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
    
    <div className="col-span-8">
    
      <ul className="shop__sorting">
        {/* <li className="active"><a href="#">Popular</a></li>
        <li><a href="#">Newest</a></li>
        <li><a href="#">Bestselling</a></li>
        <li><a href="#">Price (low)</a></li>
        <li><a href="#">Price (high)</a></li> */}
      </ul>
      <div>
        <input type="text" className="mb-[15px] w-[180px] pl-6 form-control border-none rounded-2xl p-4" placeholder="Search products..."></input>
        <SearchHeartFill className=' ml-4 font-light text-[16px] cursor-pointer text-gray-300'></SearchHeartFill>
      </div>
      
      <div className="row flex flex-wrap gap-4">
     
        <ProductCard></ProductCard>
      </div> 
      <div className="row">
        <div className="col-span-12">

          <ul className="pagination pull-right flex gap-4 absolute bottom-0 right-12">
            <li className="disabled"><a href="#">«</a></li>
            <li className="active"><a href="#">1 <span className="sr-only">(current)</span></a></li>
            <li><a href="#">2</a></li>
            <li><a href="#">3</a></li>
            <li><a href="#">4</a></li>
            <li><a href="#">5</a></li>
            <li><a href="#">»</a></li>
          </ul>
          
        </div>
      </div> 
      
    </div> 
</div>
</div>
     );
}

export default ShopInfo;