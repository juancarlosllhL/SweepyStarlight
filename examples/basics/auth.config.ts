import GitHub from '@auth/core/providers/github';

export default {
	providers: [
		// @ts-ignore
		GitHub({
			clientId: 'Iv1.b06992c2f5a715a9',
			clientSecret: 'ed803b05139c194b9ede988caa27c11475b076c9',
		}),
	],
	trustHost: true,
	cookies: {
		pkceCodeVerifier: {
			name: 'next-auth.pkce.code_verifier',
			options: {
				httpOnly: true,
				sameSite: 'none',
				path: '/',
				secure: true,
			},
		},
	},
};
