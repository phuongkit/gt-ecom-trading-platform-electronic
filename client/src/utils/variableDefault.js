// const PRODUCT_NO_INFO = "Sản phẩm chưa có thông tin";

const PRODUCT_NO_INFO = "Sản phẩm chưa có thông tin";

const EGender = {
    FEMALE: {
        name: 'Chị',
        index: 0
    },
    MALE: {
        name: 'Anh',
        index: 1
    },
    UNKNOWN:{
        name: 'Người dùng' || 'Không xác định',
        index: 2
    },
    getNameFromIndex: (index) => EGender[(Object.keys(EGender)[index > EGender.UNKNOWN.index ? EGender.UNKNOWN.index : index])]?.name || EGender.UNKNOWN.name,
    getIndexFromName: (name) => (Object.values(EGender)).find(item => item.name === name)?.index || EGender.UNKNOWN.index,
}

const ESortOptions = {
    NO_OPTION: {
        name: 'Không có tùy chọn',
        index: 0
    },
    POPULAR: {
        name: 'Phổ biến',
        index: 1
    },
    LATEST: {
        name: 'Mới nhất',
        index: 2
    },
    TOP_SALES: {
        name: 'Bán chạy',
        index: 3
    }
}

const EProductStatus = {
    PRODUCT_UN_TRADING: {
        name: 'Chưa kinh doanh',
        index: 0
    },
    PRODUCT_TRADING: {
        name: 'Đang kinh doanh',
        index: 1,
    },
    PRODUCT_TRADED: {
        name: 'Ngưng kinh doanh',
        index: 2,
    },
    getNameFromIndex: (index) => EProductStatus[(Object.keys(EProductStatus)[index > EProductStatus.PRODUCT_UN_TRADING.index ? EProductStatus.PRODUCT_UN_TRADING.index : index])]?.name || EProductStatus.PRODUCT_UN_TRADING.name,
}

const EPayment = {
    CASH: 0,
    MOMO: 1
}

const EShippingMethod = {
    GHN_EXPRESS: 0,
    GIAOHANGTIETKIEM: 1
};


export const PAGE = {
    CENTER: 3,
    LEFT: 1,
    RIGHT: 1
}

export const MESSAGE = {
    PRODUCT_NO_INFO,
};

export const ENUM = {
    EProductStatus,
    EGender,
    EPayment,
    EShippingMethod
}