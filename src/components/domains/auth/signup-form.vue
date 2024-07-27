<script lang="ts" setup>
import { FwbInput, FwbButton } from "flowbite-vue";
import { ref, onMounted } from "vue";
import { useForm, type FieldOptions } from "vue-hooks-form";
import { useStorage } from "~/composables";
import type { Credentials } from "~/types/auth";

const { useField, handleSubmit } = useForm();
const { setStorageValue, getStorageValue } = useStorage();
const rememberMe = ref<boolean>(false);

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
	if (rememberMe) {
		setStorageValue("remember-credentials", formData as Credentials);
	}
});

const checkRememberMe = () => {
	const savedCredentials = getStorageValue<Credentials>("remember-credentials");

  if (savedCredentials) {
    formFields.email.value = savedCredentials.email
    formFields.password.value = savedCredentials.password
  }
};

onMounted(() => {
	checkRememberMe();
});
</script>

<template>
	<form @submit.prevent.once="onFormSubmit" class="flex flex-col gap-y-4">
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
		<FwbButton type="submit">SIGN IN</FwbButton>
	</form>
</template>

<style lang="scss" scoped></style>
