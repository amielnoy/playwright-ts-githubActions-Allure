import { APIRequestContext } from '@playwright/test';

export class UserApiClient {
    constructor(
        private request: APIRequestContext,
        private baseUrl: string = 'http://automationexercise.com/api'
    ) {}

    async registerInitialDetails(name: string, email: string) {
        const response = await this.request.post(`${this.baseUrl}/signup`, {
            data: {
                name,
                email
            },
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response;
    }
}
