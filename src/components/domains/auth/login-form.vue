<script lang="ts" setup>
import { FwbInput, FwbButton } from "flowbite-vue";
import { ref, onMounted } from "vue";
import { useForm, type FieldOptions } from "vue-hooks-form";
import { useStorage } from "~/composables";
import { AuthService } from "~/services";
import type { Credentials } from "~/types/auth";
const { useField, handleSubmit } = useForm();
const { setStorageValue, getStorageValue } = useStorage();
const rememberMe = ref<boolean>(false);
const loading = ref<boolean>(false);

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
};

const onFormSubmit = handleSubmit((formData: unknown) => {
	loading.value = true;

	if (rememberMe) {
		setStorageValue("remember-credentials", formData as Credentials);
	}

	return AuthService.loginToAccount(formData as Credentials).finally(() => (loading.value = false));
});

const checkRememberMe = () => {
	const savedCredentials = getStorageValue<Credentials>("remember-credentials");

	if (savedCredentials) {
		formFields.email.value = savedCredentials.email;
		formFields.password.value = savedCredentials.password;
	}
};

onMounted(() => {
	checkRememberMe();
});
</script>

<template>
	<form @submit="onFormSubmit" class="flex flex-col gap-y-4">
		<h1 class="text-center text-white text-xl">LOGIN TO YOUR ACCOUNT</h1>
		<p class="text-sm text-center text-gray-200">Manage your data</p>
		<FwbInput
			type="email"
			v-model="formFields.email.value"
			:ref="formFields.email.ref"
			placeholder="Enter your e-mail"
			required
		/>
		<FwbInput
			type="password"
			v-model="formFields.password.value"
			:ref="formFields.password.ref"
			placeholder="Enter your password"
			required
		/>
		<a href="#" class="text-sm text-white text-right underline">Forgot your password?</a>

		<FwbButton type="submit" :disabled="loading">{{ loading ? "..." : "LOG IN" }}</FwbButton>
		<RouterLink to="/auth/register">
			<FwbButton color="light" class="w-full">CREATE ACCOUNT</FwbButton>
		</RouterLink>
	</form>
</template>

<style lang="scss" scoped></style>
