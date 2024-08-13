import {
	HiOutlineHome,
	HiOutlinePresentationChartBar,
	HiOutlineBookOpen,
	HiOutlineUserGroup,
	HiOutlineUsers,
} from "vue3-icons/hi";
import { ROUTES } from "~/constants";

const { TEACHER, ADMIN } = ROUTES;

const dashboardOverviewLink = {
	label: "Dashboard Overview",
	url: "/dashboard/overview",
	icon: HiOutlineHome,
};

const TEACHER_LINKS = [
	dashboardOverviewLink,
	{
		label: "Leaderboards",
		url: TEACHER.LEADERBOARDS,
		icon: HiOutlinePresentationChartBar,
	},
	{
		label: "Manage Classes",
		url: TEACHER.CLASSES.MANAGE,
		icon: HiOutlineUserGroup,
	},
	{
		label: "Manage Subjects",
		url: TEACHER.SUBJECTS.MANAGE,
		icon: HiOutlineBookOpen,
	},
];

const ADMIN_LINKS = [
	...TEACHER_LINKS,
	{
		label: "Manage Accounts",
		url: ADMIN.ACCOUNTS.MANAGE,
		icon: HiOutlineUsers,
	},
];

export const SIDEBAR_LINKS = {
	ADMIN: ADMIN_LINKS,
	TEACHER: TEACHER_LINKS,
	STUDENT: [],
};
