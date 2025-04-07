import type { APIRoute } from "astro"
import emailjs, { EmailJSResponseStatus } from "@emailjs/nodejs";
const { EMAILJS_TEMPLATE_ID, EMAILJS_USER_ID, EMAILJS_API_KEY, EMAILJS_PRIVATE_KEY } = import.meta.env

export const POST: APIRoute = async ({ request }) => {
	const data = await request.formData();
	const name = data.get("name");
	const email = data.get("email");
	const message = data.get("message");
	const title = data.get("title");
	const templateParams = {
		name,
		email,
		title,
		message,
	};

	if (!email || !message || !name || !title) return new Response(JSON.stringify({ success: false, message: "Some data is missing" }))

	try {
		const res = await emailjs.send(EMAILJS_USER_ID, EMAILJS_TEMPLATE_ID, templateParams, {
			publicKey: EMAILJS_API_KEY,
			privateKey: EMAILJS_PRIVATE_KEY
		})
		console.log("SUCCESS", res.status, res.text);
		return new Response(JSON.stringify({ success: true, message: "Mensaje enviado correctamente. Nos pondremos en contacto con usted" }))
		
	} catch (err) {
		if (err instanceof EmailJSResponseStatus) {
			console.log("FAILED", err.status, err.text);
			return new Response(JSON.stringify({ success: false, error: "El mensaje no ha podido ser enviado. Intentelo más tarde" }))
		} 
	}
}