export interface Env {
	DB: D1Database;
}

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		const { pathname } = new URL(request.url);

		// Enable CORS for all responses
		const corsHeaders = {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
			'Access-Control-Allow-Headers': 'Content-Type',
		};

		// Handle CORS Preflight Requests
		if (request.method === 'OPTIONS') {
			return new Response(null, { headers: corsHeaders });
		}

		// 🟢 Handle POST request to store story
		if (pathname === '/api/save-story' && request.method === 'POST') {
			try {
				const body = (await request.json()) as {
					email: string;
					prompt: string;
					ai_response: string;
					model: string;
					temperature: number;
					max_tokens: number;
				};

				const { email, prompt, ai_response, model, temperature, max_tokens } = body;

				if (!email || !prompt || !ai_response) {
					return new Response(JSON.stringify({ error: 'Missing fields' }), {
						status: 400,
						headers: corsHeaders,
					});
				}

				const query = `
          INSERT INTO Stories (email, prompt, ai_response, model, temperature, max_tokens, created_at)
VALUES (?, ?, ?, ?, ?, ?, datetime('now'))
        `;

				await env.DB.prepare(query).bind(email, prompt, ai_response, model, temperature, max_tokens).run();

				return new Response(JSON.stringify({ success: true }), {
					status: 200,
					headers: corsHeaders,
				});
			} catch (error) {
				return new Response(JSON.stringify({ error: String(error) }), {
					status: 500,
					headers: corsHeaders,
				});
			}
		}

		return new Response('Not Found', { status: 404, headers: corsHeaders });
	},
};
