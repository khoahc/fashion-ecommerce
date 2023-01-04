export const ADMIN = {
    name: 'Admin',
    permissions: [
        '/category',
        '/product', 
        // '/customer',
        '/order',
        '/delivery', 
        '/statis',
        '/delivery',
        // '/review',
        '/user',
        '/',
    ],
};

export const SALES_PERSON = {
    name: 'Salesperson',
    permissions: [
        '/product', 
        // '/customer', 
        '/order',
        '/statis',
        '/',
    ],
};

export const EDITOR = {
    name: 'Editor',
    permissions: [
        '/category',
        '/product',
    ],
};

export const SHIPPER = {
    name: 'Shipper',
    permissions: [
        '/delivery',
    ],
};

export const ASSISTANT = {
    name: 'Assistant',
    permissions: [
        // '/review',
    ],
};

export const ROLES = [
    ADMIN,
    SALES_PERSON,
    EDITOR,
    SHIPPER,
    ASSISTANT,
]