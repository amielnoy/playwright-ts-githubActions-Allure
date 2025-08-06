
import { test, expect } from "@playwright/test";
import { HttpCodes } from "../../HttpCodes";

interface Product {
    productName: string;
    price: number;
    Description?: string;
}

const BASE_URL = "http://127.0.0.1:3000";
const PRODUCTS_ENDPOINT = `${BASE_URL}/products`;
const CART_ENDPOINT = `${BASE_URL}/cart`;

// Moved outside the describe block for better reusability
const validateProductStructure = (product: Product) => {
    expect(product).toHaveProperty('productName');
    expect(typeof product.productName).toBe('string');
    expect(product).toHaveProperty('price');
    expect(typeof product.price).toBe('number');
    if (product.Description) {
        expect(typeof product.Description).toBe('string');
    }
};

test.describe('Product API Tests', () => {

    const productTestCases = [
        { expectedCount: 3, description: 'should return three products' },
        { expectedCount: 5, description: 'should return five products' },
        { expectedCount: 10, description: 'should return ten products' }
    ];

    productTestCases.forEach(({ expectedCount, description }) => {
        test(description, async ({ request }) => {
            const response = await request.get(PRODUCTS_ENDPOINT);
            expect(response.status(), 'Expected status code 200').toBe(HttpCodes.OK);

            const products: Product[] = await response.json();
            expect(Array.isArray(products), 'Response should be an array').toBe(true);
            expect(products.length, `Expected ${expectedCount} products`).toBe(expectedCount);

            products.forEach(validateProductStructure);
        });
    });

    test('should add a product to the cart successfully', async ({ request }) => {
        const productToAdd: Product = {
            productName: "Samsung Galaxy A55",
            price: 400,
            Description: "New galaxy A55"
        };

        const response = await request.post(CART_ENDPOINT, { data: productToAdd });
        expect(response.status(), 'Expected status code 201').toBe(HttpCodes.CREATED);

        const responseData = await response.json();
        validateProductStructure(responseData);
        expect(responseData).toMatchObject(productToAdd as unknown as Record<string, unknown>);
    });


});
