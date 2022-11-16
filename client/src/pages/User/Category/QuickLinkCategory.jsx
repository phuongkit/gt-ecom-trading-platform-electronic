import QuickLink from '~/components/QuickLink';
import './quicklinkphone-module.scss';
import { useSelector, useDispatch } from 'react-redux';

const QuickLinkCategory = (props) => {
    const {brands} = useSelector((state) => state.categories.oneCategory.data);
    return (
        <div className="container__phone">
            <div className="container__quicklink-phone">
                <div className="quicklink">
                    <div>
                        {brands && brands.map((item) => (
                            <QuickLink
                                key={item.id}
                                id={item.id}
                                type={item.name}
                                link={item.img}
                                handleSetChose={props.handleSetChose}
                            ></QuickLink>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuickLinkCategory;
