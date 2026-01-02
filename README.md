# n8n-nodes-mailketing

Official Mailketing Email Marketing node for n8n.

[Mailketing](https://mailketing.co.id) is an email marketing platform. This node allows you to automate your subscriber management and email campaigns directly from n8n.

## Features
- **Add Subscriber**: Add a new contact to your mailing list.
- **Send Email**: Send a transactional or campaign email with support for up to 3 attachments.
- **Auto-load Lists**: Automatically fetches your available Mailketing lists for easy selection.

## Credentials
You need a **Mailketing API Token** to use this node.
1. Log in to your Mailketing account.
2. Go to **Integrations** menu.
3. Copy your **API Token**.
4. In n8n, add a new credential type **Mailketing API** and paste the token.

## Installation

To install this node in your n8n instance:

1. **Go to n8n Settings** > **Community Nodes**.
2. Select **Install**.
3. Enter `n8n-nodes-mailketing`.
4. Agree to the risks and install.

Alternatively, for manual installation:
```bash
npm install n8n-nodes-mailketing
```

## License
MIT