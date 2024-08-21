<script lang="ts" setup>
import { FwbInput, FwbButton } from "flowbite-vue";
import { ref, onMounted } from "vue";
import { useForm, type FieldOptions } from "vue-hooks-form";
import { useStorage } from "~/composables";
import { AuthService } from "~/services";
import { ROUTES } from "~/constants";
import type { Credentials } from "~/types/auth";

const props = defineProps<{
	loginType: "teacher" | "student";
}>();

console.log("props", props);

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

const onGoogleLogin = () => {
	return AuthService.googleLogin();
};

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
		<h1 class="text-center text-xl uppercase">LOGIN AS {{ $props.loginType }}</h1>
		<p class="text-sm text-center text-gray-900">Login to proceed to your dashboard</p>

		<div v-if="props.loginType === 'teacher'" class="flex flex-col gap-y-4">
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
			<!-- <a href="#" class="text-sm text-white text-right underline">Forgot your password?</a> -->

			<FwbButton type="submit" :disabled="loading">{{ loading ? "..." : "LOG IN" }}</FwbButton>
		</div>

		<FwbButton
			v-if="props.loginType === 'student'"
			type="button"
			color="light"
			@click="onGoogleLogin"
		>
			LOGIN VIA GOOGLE
		</FwbButton>
		<RouterLink
			v-if="props.loginType === 'student'"
			:to="ROUTES.AUTH.TEACHER_LOGIN"
			class="text-sm text-blue-600 underline underline-offset-2"
		>
			GO TO TEACHER LOGIN
		</RouterLink>
		<RouterLink
			v-if="props.loginType === 'teacher'"
			:to="ROUTES.AUTH.STUDENT_LOGIN"
			class="text-sm text-blue-600 underline underline-offset-2"
		>
			GO TO STUDENT LOGIN
		</RouterLink>

		<RouterLink v-if="props.loginType === 'teacher'" :to="ROUTES.AUTH.TEACHER_REGISTER">
			<FwbButton color="light" class="w-full">CREATE ACCOUNT</FwbButton>
		</RouterLink>
	</form>
</template>

<style lang="scss" scoped></style>
