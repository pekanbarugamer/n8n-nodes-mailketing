import { ICredentialType, INodeProperties } from 'n8n-workflow';

export class MailketingApi implements ICredentialType {
	name = 'mailketingApi';
	displayName = 'Mailketing API';

	properties: INodeProperties[] = [
		{
			displayName: 'API Token',
			name: 'apiToken',
			type: 'string',
			default: '',
			required: true,
			description: 'API Token dari menu Integration Mailketing',
		},
	];
}
