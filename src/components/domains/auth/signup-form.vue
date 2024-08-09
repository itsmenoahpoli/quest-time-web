<script lang="ts" setup>
import { FwbInput, FwbSelect, FwbButton } from "flowbite-vue";
import { useForm, type FieldOptions } from "vue-hooks-form";
import { AuthService } from "~/services";

const { useField, handleSubmit } = useForm();

const accountTypeOptions = [
	{
		value: "teacher",
		name: "Teacher",
	},
	{
		value: "student",
		name: "Student",
	},
];

const formFields = {
	account_type: useField("account_type", {
		rule: {
			required: true,
		},
	} as FieldOptions),
	email: useField("email", {
		rule: {
			required: true,
		},
	} as FieldOptions),
	contact_number: useField("contact_number", {
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
	first_name: useField("first_name", {
		rule: {
			required: true,
		},
	} as FieldOptions),
	last_name: useField("last_name", {
		rule: {
			required: true,
		},
	} as FieldOptions),
};

const onFormSubmit = handleSubmit(async (formData: unknown) => {
	return await AuthService.createAccount(formData as any);
});
</script>

<template>
	<form @submit.prevent.once="onFormSubmit" class="flex flex-col gap-y-4">
		<h1 class="text-center text-white text-2xl font-medium mb-4">CREATE YOUR ACCOUNT</h1>

		<FwbSelect
			v-model="formFields.account_type.value"
			:ref="formFields.account_type.ref"
			:options="accountTypeOptions"
			placeholder="Enter account type"
		/>
		<FwbInput
			type="text"
			v-model="formFields.first_name.value"
			:ref="formFields.first_name.ref"
			placeholder="Enter your first name"
		/>
		<FwbInput
			type="text"
			v-model="formFields.last_name.value"
			:ref="formFields.last_name.ref"
			placeholder="Enter your last name"
		/>
		<FwbInput
			type="text"
			v-model="formFields.contact_number.value"
			:ref="formFields.contact_number.ref"
			placeholder="Enter your contact number"
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
