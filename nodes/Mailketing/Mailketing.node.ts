import {
	IExecuteFunctions,
	ILoadOptionsFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeOperationError,
} from 'n8n-workflow';

export class Mailketing implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Mailketing',
		name: 'mailketing',
		icon: 'file:Mailketing.png',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"]}}',
		description: 'Mailketing Email Marketing API',
		defaults: {
			name: 'Mailketing',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'mailketingApi',
				required: true,
			},
		],
		properties: [
			/* =========================
			 * OPERATION
			 * ========================= */
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Add Subscriber to List',
						value: 'addSubToList',
					},
					{
						name: 'Send Email',
						value: 'sendEmail',
					},
				],
				default: 'addSubToList',
			},

			/* =========================
			 * ADD SUBSCRIBER
			 * ========================= */
			{
				displayName: 'List',
				name: 'list_id',
				type: 'options',
				typeOptions: {
					loadOptionsMethod: 'getLists',
				},
				displayOptions: {
					show: {
						operation: ['addSubToList'],
					},
				},
				required: true,
				default: '',
			},
			{
				displayName: 'Email',
				name: 'email',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						operation: ['addSubToList'],
					},
				},
				default: '',
			},
			{
				displayName: 'First Name',
				name: 'first_name',
				type: 'string',
				displayOptions: {
					show: {
						operation: ['addSubToList'],
					},
				},
				default: '',
			},
			{
				displayName: 'Last Name',
				name: 'last_name',
				type: 'string',
				displayOptions: {
					show: {
						operation: ['addSubToList'],
					},
				},
				default: '',
			},
			{
				displayName: 'Mobile',
				name: 'mobile',
				type: 'string',
				displayOptions: {
					show: {
						operation: ['addSubToList'],
					},
				},
				default: '',
			},
			{
				displayName: 'Company',
				name: 'company',
				type: 'string',
				displayOptions: {
					show: {
						operation: ['addSubToList'],
					},
				},
				default: '',
			},
			{
				displayName: 'City',
				name: 'city',
				type: 'string',
				displayOptions: {
					show: {
						operation: ['addSubToList'],
					},
				},
				default: '',
			},
			{
				displayName: 'State',
				name: 'state',
				type: 'string',
				displayOptions: {
					show: {
						operation: ['addSubToList'],
					},
				},
				default: '',
			},
			{
				displayName: 'Country',
				name: 'country',
				type: 'string',
				displayOptions: {
					show: {
						operation: ['addSubToList'],
					},
				},
				default: '',
			},

			/* =========================
			 * SEND EMAIL
			 * ========================= */
			{
				displayName: 'From Name',
				name: 'from_name',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						operation: ['sendEmail'],
					},
				},
				default: '',
			},
			{
				displayName: 'From Email',
				name: 'from_email',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						operation: ['sendEmail'],
					},
				},
				default: '',
			},
			{
				displayName: 'Recipient',
				name: 'recipient',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						operation: ['sendEmail'],
					},
				},
				default: '',
			},
			{
				displayName: 'Subject',
				name: 'subject',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						operation: ['sendEmail'],
					},
				},
				default: '',
			},
			{
				displayName: 'Content',
				name: 'content',
				type: 'string',
				typeOptions: {
					rows: 6,
				},
				required: true,
				displayOptions: {
					show: {
						operation: ['sendEmail'],
					},
				},
				default: '',
			},
			{
				displayName: 'Attachment URL 1',
				name: 'attach1',
				type: 'string',
				displayOptions: {
					show: {
						operation: ['sendEmail'],
					},
				},
				default: '',
			},
			{
				displayName: 'Attachment URL 2',
				name: 'attach2',
				type: 'string',
				displayOptions: {
					show: {
						operation: ['sendEmail'],
					},
				},
				default: '',
			},
			{
				displayName: 'Attachment URL 3',
				name: 'attach3',
				type: 'string',
				displayOptions: {
					show: {
						operation: ['sendEmail'],
					},
				},
				default: '',
			},
		],
	};

	/* =========================
	 * LOAD OPTIONS
	 * ========================= */
	methods = {
		loadOptions: {
			async getLists(this: ILoadOptionsFunctions) {
				const credentials = await this.getCredentials('mailketingApi');

				const response = await this.helpers.httpRequest({
					method: 'POST',
					url: 'https://api.mailketing.co.id/api/v1/viewlist',
					body: new URLSearchParams({
						api_token: credentials.apiToken as string,
					}).toString(),
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
					},
					json: true,
				});

				if (response.status !== 'success') {
					throw new NodeOperationError(
						this.getNode(),
						'Gagal mengambil list Mailketing',
					);
				}

				return response.lists.map((list: any) => ({
					name: list.list_name,
					value: list.list_id,
				}));
			},
		},
	};

	/* =========================
	 * EXECUTE
	 * ========================= */
	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const credentials = await this.getCredentials('mailketingApi');
		const operation = this.getNodeParameter('operation', 0) as string;

		const returnData: INodeExecutionData[] = [];
		const promises: Promise<any>[] = [];

		for (let i = 0; i < items.length; i++) {
			if (operation === 'addSubToList') {
				const body = {
					api_token: credentials.apiToken,
					list_id: this.getNodeParameter('list_id', i),
					email: this.getNodeParameter('email', i),
					first_name: this.getNodeParameter('first_name', i),
					last_name: this.getNodeParameter('last_name', i),
					mobile: this.getNodeParameter('mobile', i),
					company: this.getNodeParameter('company', i),
					city: this.getNodeParameter('city', i),
					state: this.getNodeParameter('state', i),
					country: this.getNodeParameter('country', i),
				};

				promises.push(
					this.helpers
						.httpRequest({
							method: 'POST',
							url: 'https://api.mailketing.co.id/api/v1/addsubtolist',
							body: new URLSearchParams(body as any).toString(),
							headers: {
								'Content-Type': 'application/x-www-form-urlencoded',
							},
							json: true,
						})
						.then((response) => {
							return {
								json: response,
								pairedItem: {
									item: i,
								},
							};
						}),
				);
			}

			if (operation === 'sendEmail') {
				const body: any = {
					api_token: credentials.apiToken,
					from_name: this.getNodeParameter('from_name', i),
					from_email: this.getNodeParameter('from_email', i),
					recipient: this.getNodeParameter('recipient', i),
					subject: this.getNodeParameter('subject', i),
					content: this.getNodeParameter('content', i),
				};

				const attach1 = this.getNodeParameter('attach1', i) as string;
				const attach2 = this.getNodeParameter('attach2', i) as string;
				const attach3 = this.getNodeParameter('attach3', i) as string;

				if (attach1) body.attach1 = attach1;
				if (attach2) body.attach2 = attach2;
				if (attach3) body.attach3 = attach3;

				promises.push(
					this.helpers
						.httpRequest({
							method: 'POST',
							url: 'https://api.mailketing.co.id/api/v1/send',
							body: new URLSearchParams(body).toString(),
							headers: {
								'Content-Type': 'application/x-www-form-urlencoded',
							},
							json: true,
						})
						.then((response) => {
							return {
								json: response,
								pairedItem: {
									item: i,
								},
							};
						}),
				);
			}
		}

		const results = await Promise.all(promises);
		returnData.push(...results);

		return [returnData];
	}
}
