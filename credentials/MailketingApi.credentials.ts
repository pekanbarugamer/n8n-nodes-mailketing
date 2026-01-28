import {
    ICredentialTestRequest,
    ICredentialType,
    INodeProperties,
} from 'n8n-workflow';

export class MailketingApi implements ICredentialType {
    name = 'mailketingApi';
    displayName = 'Mailketing API';

    properties: INodeProperties[] = [
        {
            displayName: 'API Token',
            name: 'apiToken',
            type: 'string',
            typeOptions: { password: true },
            default: '',
            required: true,
            description: 'API Token dari menu Integration Mailketing',
        },
    ];

    test: ICredentialTestRequest = {
        request: {
            baseURL: 'https://api.mailketing.co.id/api/v1',
            url: '/viewlist',
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'api_token={{$credentials.apiToken}}',
        },
    };
}
