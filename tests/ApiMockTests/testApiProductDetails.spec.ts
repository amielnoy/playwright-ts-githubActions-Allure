import { test, expect } from "@playwright/test";
import { HttpCodes } from "../../HttpCodes";

interface Product {
    productName: string;
    price: number;
    Description?: string;
}

const BASE_URL = "http://127.0.0.1:3000";
const PRODUCTS_ENDPOINT = `${BASE_URL}/products`;

const validateProductStructure = (product: Product) => {
    expect(product).toHaveProperty('productName');
    expect(typeof product.productName).toBe('string');
    expect(product).toHaveProperty('price');
    expect(typeof product.price).toBe('number');
    if (product.Description) {
        expect(typeof product.Description).toBe('string');
    }
};

const productDetailsTestCases = [
    {
        description: 'should validate product details for Samsung Galaxy S21"',
        expectedProduct: {
            "productName": "Samsung Galaxy S21",
            "price": 500,
            "id": "61d0"
        }
    },
    {
        description: 'should validate product details for iPhone 12',
        expectedProduct: {
            "productName": "iPhone 12",
            "price": 600,
            "Description": "The iPhone 12 is a powerful smartphone with a large screen and a high-resolution camera.",
            "id": "2ef8"
        }
    },
    // Add more test cases as needed
];

test.describe('Product Details API Tests', () => {
    productDetailsTestCases.forEach(({ description, expectedProduct }) => {
        test(description, async ({ request }) => {
            const response = await request.get(PRODUCTS_ENDPOINT);
            expect(response.status(), 'Expected status code 200').toBe(HttpCodes.OK);

            const products: Product[] = await response.json();
            expect(Array.isArray(products), 'Response should be an array').toBe(true);

            const product = products.find(p => p.productName === expectedProduct.productName);
            expect(product, `Product ${expectedProduct.productName} should exist`).toBeDefined();

            if (product) {
                validateProductStructure(product);
                expect(product).toMatchObject(expectedProduct);
            }
        });
    });
});
