// const PRODUCT_NO_INFO = "Sản phẩm chưa có thông tin";
export const EDiscountType = {
    DISCOUNT_SHOP_PRICE: {
        name: 'Mã giảm giá của shop trực tiếp trên giá',
        index: 0,
    },
    DISCOUNT_SHOP_PERCENT:{
        name: 'Mã giảm giá của shop trực tiếp trên phần trăm giá',
        index: 1,
    },
    DISCOUNT_BILL_PRICE:{
        name: 'Mã giảm giá của webiste trực tiếp trên giá',
        index: 2,
    },
    DISCOUNT_BILL_PERCENT:{
        name: 'Mã giảm giá của website trực tiếp trên phần trăm giá',
        index: 3,
    },
}

export const EGender = {
    FEMALE: {
        name: 'Chị',
        index: 0,
    },
    MALE: {
        name: 'Anh',
        index: 1,
    },
    UNKNOWN: {
        name: 'Không xác định',
        index: 2,
    },
    getNameFromIndex: (index) =>
        EGender[Object.keys(EGender)[index > EGender.UNKNOWN.index ? EGender.UNKNOWN.index : index]]?.name ||
        EGender.UNKNOWN.name,
    getIndexFromName: (name) =>
        Object.values(EGender).find((item) => item.name === name)?.index || EGender.UNKNOWN.index,
};

export const EOrderStatus = {
    ORDER_PENDING: {
        name: 'Đang chờ xác nhận',
        index: 0,
    },
    ORDER_AWAITING_PAYMENT: {
        name: 'Đang chờ thanh toán',
        index: 1,
    },
    ORDER_COMPLETED: {
        name: 'Đã hoàn thành',
        index: 2,
    },
    ORDER_CANCELLED: {
        name: 'Đã hủy',
        index: 3,
    },
    ORDER_AWAITING_FULFILLMENT: {
        name: '',
        index: 4,
    },
    ORDER_AWAITING_SHIPMENT: {
        name: '',
        index: 5,
    },
    ORDER_AWAITING_PICKUP: {
        name: '',
        index: 6,
    },
    ORDER_PARTIALLY_SHIPPED: {
        name: '',
        index: 7,
    },
    ORDER_SHIPPED: {
        name: '',
        index: 8,
    },
    ORDER_DECLINED: {
        name: '',
        index: 9,
    },
    ORDER_REFUNDED: {
        name: '',
        index: 10,
    },
    ORDER_DISPUTED: {
        name: '',
        index: 11,
    },
    ORDER_MANUAL_VERIFICATION_REQUIRED: {
        name: '',
        index: 12,
    },
    ORDER_PARTIALLY_REFUNDED: {
        name: '',
        index: 13,
    },
    getNameFromIndex: (index) =>
        EOrderStatus[
            Object.keys(EOrderStatus)[
                index > EOrderStatus.ORDER_PENDING.index ? EOrderStatus.ORDER_PENDING.index : index
            ]
        ]?.name || EOrderStatus.ORDER_PENDING.name,
};

export const EPayment = {
    CASH: {
        name: 'Tiền mặt',
        index: 0,
    },
    MOMO: {
        name: 'MoMo',
        index: 1,
    },
    VNPAY: {
        name: 'VNPay',
        index: 2,
    },
    getNameFromIndex: (index) =>
        EPayment[
            Object.keys(EPayment)[
                index > EPayment.CASH.index ? EPayment.CASH.index : index
            ]
        ]?.name || EPayment.CASH.name,
};

export const EProductStatus = {
    PRODUCT_UN_TRADING: {
        name: 'Chưa kinh doanh',
        index: 0,
    },
    PRODUCT_TRADING: {
        name: 'Đang kinh doanh',
        index: 1,
    },
    PRODUCT_TRADED: {
        name: 'Ngưng kinh doanh',
        index: 2,
    },
    getNameFromIndex: (index) =>
        EProductStatus[
            Object.keys(EProductStatus)[
                index > EProductStatus.PRODUCT_UN_TRADING.index ? EProductStatus.PRODUCT_UN_TRADING.index : index
            ]
        ]?.name || EProductStatus.PRODUCT_UN_TRADING.name,
};

export const EShippingMethod = {
    GHN_EXPRESS: {
        name: 'GHN_EXPRESS',
        index: 0,
    },
    GIAOHANGTIETKIEM: {
        name: 'Giao hàng tiết kiệm',
        index: 1,
    },
    getNameFromIndex: (index) =>
        EShippingMethod[
            Object.keys(EShippingMethod)[
                index > EShippingMethod.GHN_EXPRESS.index ? EShippingMethod.GHN_EXPRESS.index : index
            ]
        ]?.name || EShippingMethod.GHN_EXPRESS.name,
};

export const ESortOptions = {
    NO_OPTION: {
        name: 'Không có tùy chọn',
        index: 0,
    },
    POPULAR: {
        name: 'Phổ biến',
        index: 1,
    },
    LATEST: {
        name: 'Mới nhất',
        index: 2,
    },
    TOP_SALES: {
        name: 'Bán chạy',
        index: 3,
    },
};

export const PAGE = {
    CENTER: 3,
    LEFT: 1,
    RIGHT: 1,
};

export const REGEXP = {
    PHONE: new RegExp('^(0|84?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$'),
    EMAIL: new RegExp("/(^(([^<>()[\]\\.,;:\s@\"]+(\[.][^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,4}))$)/"),
    PASSWORD: new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,16}$'),
};

export const GHN_CONFIG = {
    token: '1a54568c-4713-11ed-8a70-52fa25d1292f',
    shopId: '3330973',
    thuduc: 3695,
    truongtho: 90746,
    weight: 250,
    length: 20,
    width: 15,
    height: 0.5,
    totalWeight: 30000,
    totalLength: 150,
    totalWidth: 150,
    totalHeight: 150,
    toName: 'Thái Phương',
    maxInsuranceValue: 5000000,
    provinceId: 202, // HCM
    districtId: 3695, // Thu Duc
    wardCode: '90476', // Truong Tho
};

export const MESSAGE = {
    PRODUCT_NO_INFO: 'Sản phẩm chưa có thông tin',
    ERROR_ACTION: 'Có lỗi xảy ra! Vui lòng thử lại sau',
};

export const DEFAULT_VARIABLE = {
    MIN_DISCONT_CODE_LENGTH: 5,
    MAX_DISCONT_CODE_LENGTH: 10,
}