<script lang="ts" setup>
import { FwbInput, FwbButton } from "flowbite-vue";
import { onMounted } from "vue";
import { useForm, type FieldOptions } from "vue-hooks-form";
import { AuthService } from "~/services";
import type { Credentials } from "~/types/auth";

const { useField, handleSubmit } = useForm();

const formFields = {
	email: useField("email", {
		rule: {
			required: true,
		},
	} as FieldOptions),
	password: useField("password", {
		rule: {
			required: true,
		},
	} as FieldOptions),
	confirm_password: useField("confirm_password", {
		rule: {
			required: true,
		},
	} as FieldOptions),
	name: useField("name", {
		rule: {
			required: true,
		},
	} as FieldOptions),
};

const onFormSubmit = handleSubmit(async (formData: unknown) => {
	console.log(formData as Credentials);
	return await AuthService.createAccount();
});

onMounted(async () => {
	await AuthService.createAccount();
});
</script>

<template>
	<form @submit.prevent.once="onFormSubmit" class="flex flex-col gap-y-4">
		<h1 class="text-center">JOIN NOW, CREATE YOUR ACCOUNT</h1>
		<FwbInput
			type="text"
			v-model="formFields.name.value"
			:ref="formFields.name.ref"
			placeholder="Enter your fullname"
		/>
		<FwbInput
			type="email"
			v-model="formFields.email.value"
			:ref="formFields.email.ref"
			placeholder="Enter your e-mail"
		/>
		<FwbInput
			type="password"
			v-model="formFields.password.value"
			:ref="formFields.password.ref"
			placeholder="Enter your password"
		/>
		<FwbInput
			type="password"
			v-model="formFields.confirm_password.value"
			:ref="formFields.confirm_password.ref"
			placeholder="Re-Enter your password"
		/>
		<FwbButton type="submit">CREATE ACCOUNT</FwbButton>
		<RouterLink to="/auth/login">
			<FwbButton color="light" class="w-full">BACK TO LOGIN</FwbButton>
		</RouterLink>
	</form>
</template>

<style lang="scss" scoped></style>
