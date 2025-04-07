<script lang="ts">
	export let color: string = "black";

	export const prerender = false;
	let responseMessage: string;

	async function submit(event: SubmitEvent) {
		event.preventDefault();
		const formData = new FormData(event.currentTarget as HTMLFormElement);
		const name = formData.get("name");
		const email = formData.get("email");
		const title = formData.get("title");
		const message = formData.get("message");

		if (!name || !email || !title || !message) {
			responseMessage = "Todos los campos son obligatorios";
		} else {
			try {
				const res = await fetch("/api/send", {
					method: "POST",
					body: formData,
				});
				const { success, message, error } = await res.json();
				if (!success) {
					responseMessage = "Mensaje no enviado: " + error;
				}

				responseMessage = message;
			} catch (err) {
				if (err instanceof Error) {
					console.log("EMAILJS FAILED...", err);
					responseMessage = "Error: " + err;
				}
				console.log("ERROR", err);
			}
		}
	}
</script>

{#if responseMessage}
	<div class="flex items-center justify-center">
		<div class="flex">
			<div class="ml-3">
				<p class="text-sm font-medium text-${color}">
					{responseMessage}
				</p>
			</div>
		</div>
	</div>
{:else}
	<form id="form" class="md:px-4 w-full" on:submit={submit}>
		<div class="border-gray-900/10">
			<h1 class="text-2xl text-${color}">DEJANOS TUS DUDAS</h1>

			<div
				class="mt-10 grid grid-cols-1 gap-x-6 md:gap-x-4 gap-y-8 sm:grid-cols-6"
			>
				<div class="sm:col-span-3">
					<label
						for="name"
						class="block text-sm/6 font-medium text-${color}"
						>Nombre</label
					>
					<div class="mt-2">
						<input
							type="text"
							required
							placeholder="Nombre"
							name="name"
							id="name"
							autocomplete="given-name"
							class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
						/>
					</div>
				</div>

				<div class="sm:col-span-3">
					<label
						for="email"
						class="block text-sm/6 font-medium text-${color}"
						>Email</label
					>
					<div class="mt-2">
						<input
							type="email"
							required
							placeholder="Email"
							name="email"
							id="email"
							autocomplete="email"
							class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
						/>
					</div>
				</div>

				<div class="col-span-full">
					<label
						for="title"
						class="block text-sm/6 font-medium text-${color}"
						>Asunto</label
					>
					<div class="mt-2">
						<input
							type="text"
							required
							placeholder="Asunto"
							name="title"
							id="title"
							class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
						/>
					</div>
				</div>

				<div class="col-span-full">
					<label
						for="message"
						class="block text-sm/6 font-medium text-${color}"
						>Mensaje</label
					>
					<div class="mt-2">
						<textarea
							name="message"
							required
							placeholder="Mensaje"
							id="message"
							rows="3"
							class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
						></textarea>
					</div>
				</div>
			</div>
			<div class="mt-6 flex items-center justify-end">
				<button
					type="submit"
					class="rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-primary-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
					>Enviar</button
				>
			</div>
		</div>
	</form>
{/if}
