import { Injectable, OnDestroy } from '@angular/core';
import { Subject, BehaviorSubject, fromEvent } from 'rxjs';
import { takeUntil, debounceTime } from 'rxjs/operators';
import { Router } from '@angular/router';

// Menu
export interface Menu {
	headTitle?: string,
	path?: string;
	title?: string;
	icon?: string;
	type?: string;
	badgeType?: string;
	badgeClass?:string;
	badgeValue?: string;
	active?: boolean;
	bookmark?: boolean;
	children?: Menu[];
}

@Injectable({
	providedIn: 'root'
})

export class NavService implements OnDestroy {

	private unsubscriber: Subject<any> = new Subject();
	public  screenWidth: BehaviorSubject<number> = new BehaviorSubject(window.innerWidth);

	// Search Box
	public search: boolean = false;


	// Collapse Sidebar
	public collapseSidebar: boolean = window.innerWidth < 991 ? true : false;


	constructor(private router: Router) {
		this.setScreenWidth(window.innerWidth);
		fromEvent(window, 'resize').pipe(
			debounceTime(1000),
			takeUntil(this.unsubscriber)
		).subscribe((evt: any) => {
			this.setScreenWidth(evt.target.innerWidth);
			if (evt.target.innerWidth < 991) {
				this.collapseSidebar = true;
			}
		});
		if(window.innerWidth < 991) { // Detect Route change sidebar close
			this.router.events.subscribe(() => { 
				this.collapseSidebar = true;
			});
		}
	}

	ngOnDestroy() {
		this.unsubscriber.next(true);
		this.unsubscriber.complete();
	}

	private setScreenWidth(width: number): void {
		this.screenWidth.next(width);
	}

	MENUITEMS: Menu[] = [
		{
			headTitle: 'DASHBOARDS'
		},
		{
			title: 'Dashboards', icon: 'home', type:'sub', active: true, children:[
				{
					title: 'HR Dashboard', type: 'sub', badgeType: 'success', badgeValue: '2', active: false, children: [
						{ path: '/hr-dashboard/dashboard', title: 'Dashboard', type: 'link' },
						{ path: '/hr-dashboard/department', title: 'Department', type: 'link' },
						{
							title: 'Employess', type: 'sub', active: false, children: [
								{ path: '/hr-dashboard/employees/employee-list', title: 'Employee List', type: 'link' },
								{ path: '/hr-dashboard/employees/view-employee', title: 'View Employee', type: 'link' },
								{ path: '/hr-dashboard/employees/add-employee', title: 'Add Employee', type: 'link' },
							]
						},
						{
							title: 'Attendance', type: 'sub', active: false, children: [
								{ path: '/hr-dashboard/attendance/attendence-list', title: 'Attendence List', type: 'link' },
								{ path: '/hr-dashboard/attendance/attendence-by-user', title: 'Attendence By User', type: 'link' },
								{ path: '/hr-dashboard/attendance/attendence-view', title: 'Attendence View', type: 'link' },
								{ path: '/hr-dashboard/attendance/overview-calendar', title: 'Overview Calendar', type: 'link' },
								{ path: '/hr-dashboard/attendance/attendence-mark', title: 'Attendence Mark', type: 'link' },
								{ path: '/hr-dashboard/attendance/leave-settings', title: 'Leave Settings', type: 'link' },
								{ path: '/hr-dashboard/attendance/leave-applications', title: 'Leave Applications', type: 'link' },
								{ path: '/hr-dashboard/attendance/recent-leaves', title: 'Recent Leaves', type: 'link' },
							]
						},
						{ path: '/hr-dashboard/awards', title: 'Awards', type: 'link' },
						{ path: '/hr-dashboard/holidays', title: 'Holidays', type: 'link' },
						{ path: '/hr-dashboard/notice-board', title: 'Notice Board', type: 'link' },
						{ path: '/hr-dashboard/expenses', title: 'Expenses', type: 'link' },
						{
							title: 'payroll', type: 'sub', active: false, children: [
								{ path: '/hr-dashboard/payroll/employee-salary', title: 'Employee Salary', type: 'link' },
								{ path: '/hr-dashboard/payroll/add-payroll', title: 'Add Payroll', type: 'link' },
								{ path: '/hr-dashboard/payroll/edit-payroll', title: 'Edit payroll', type: 'link' },
							]
						},
						{ path: '/hr-dashboard/events', title: 'Events', type: 'link' },
						{ path: '/hr-dashboard/settings', title: 'Settings', type: 'link' },
					]
				},
				{
					title: 'Employee Dashboard', type: 'sub', badgeType: 'success', badgeValue: '2', active: false, children: [
						{ path: '/employee-dashboard/dashboard', title: 'Dashboard', type: 'link' },
						{ path: '/employee-dashboard/attendance', title: 'Attendance', type: 'link' },
						{ path: '/employee-dashboard/apply-leaves', title: 'Apply Leaves', type: 'link' },
						{ path: '/employee-dashboard/my-leaves', title: 'My Leaves', type: 'link' },
						{ path: '/employee-dashboard/payslips', title: 'Payslips', type: 'link' },
						{ path: '/employee-dashboard/expenses', title: 'Expenses', type: 'link' },
					]
				},
				{
					title: 'Task Dashboard', type: 'sub', badgeType: 'success', badgeValue: '2', active: false, children: [
						{ path: '/task-dashboard/dashboard', title: 'Dashboard', type: 'link' },
						{ path: '/task-dashboard/task-list', title: 'Task List', type: 'link' },
						{ path: '/task-dashboard/running-tasks', title: 'Running Tasks', type: 'link' },
						{ path: '/task-dashboard/onhold-tasks', title: 'OnHold Tasks', type: 'link' },
						{ path: '/task-dashboard/completed-tasks', title: 'Completed Tasks', type: 'link' },
						{ path: '/task-dashboard/view-tasks', title: 'View Tasks', type: 'link' },
						{ path: '/task-dashboard/overview-calendar', title: 'Overview Calendar', type: 'link' },
						{ path: '/task-dashboard/task-board', title: 'Task Board', type: 'link' },
						{ path: '/task-dashboard/new-task', title: 'New Tasks', type: 'link' },
						{ path: '/task-dashboard/user-profile', title: 'User Profile', type: 'link' },
					]
				},
				{
					title: 'Project Dashboard', type: 'sub', badgeType: 'success', badgeValue: '2', active: false, children: [
						{ path: '/project-dashboard/dashboard', title: 'Dashboard', type: 'link' },
						{ path: '/project-dashboard/project-list', title: 'Project List', type: 'link' },
						{ path: '/project-dashboard/view-project', title: 'View Project', type: 'link' },
						{ path: '/project-dashboard/overview-calendar', title: 'Overview Calendar', type: 'link' },
						{ path: '/project-dashboard/new-project', title: 'New Project', type: 'link' },
					]
				},
				{
					title: 'Client Dashboard', type: 'sub', badgeType: 'success', badgeValue: '2', active: false, children: [
						{ path: '/client-dashboard/dashboard', title: 'Dashboard', type: 'link' },
						{ path: '/client-dashboard/client-list', title: 'Client List', type: 'link' },
						{ path: '/client-dashboard/view-client', title: 'View Client', type: 'link' },
						{ path: '/client-dashboard/new-client', title: 'New Client', type: 'link' },
						{ path: '/client-dashboard/user-profile', title: 'User Profile', type: 'link' },
					]
				},
				{
					title: 'Job Dashboard', type: 'sub', badgeType: 'success', badgeValue: '2', active: false, children: [
						{ path: '/job-dashboard/dashboard', title: 'Dashboard', type: 'link' },
						{ path: '/job-dashboard/job-lists', title: 'Job Lists', type: 'link' },
						{ path: '/job-dashboard/job-view', title: 'Job View', type: 'link' },
						{ path: '/job-dashboard/job-applications', title: 'Job Applications', type: 'link' },
						{ path: '/job-dashboard/apply-job', title: 'Apply Job', type: 'link' },
						{ path: '/job-dashboard/new-job', title: 'New Job', type: 'link' },
						{ path: '/job-dashboard/user-profile', title: 'User Profile', type: 'link' },
					]
				},				
				{
					title: 'Super Admin', type: 'sub', active: false, children: [
						{ path: '/super-admin/dashboard', title: 'Dashboard', type: 'link' },
						{ path: '/super-admin/companies', title: 'Companies', type: 'link' },
						{ path: '/super-admin/subscription-plans', title: 'Subscription Plans', type: 'link' },
						{ path: '/super-admin/invoices', title: 'Invoices', type: 'link' },
						{ path: '/super-admin/super-admins', title: 'Super Admins', type: 'link' },
						{ path: '/super-admin/settings', title: 'Settings', type: 'link' },
						{ path: '/super-admin/role-access', title: 'Role Access', type: 'link' },
					]
				}
			]
		},
		{
			title: 'Support System', icon: 'headphones', type: 'sub', badgeType: 'success', badgeValue: '2', active: false, children: [
				{
					title: 'Landing Pages', type: 'sub', active: false, children: [
						{ path: '/support-system/landing-pages/landing-page', title: 'Landing Page', type: 'external' },
						{ path: '/support-system/landing-pages/knowledge-page', title: 'Knowledge Page', type: 'external' },
						{ path: '/support-system/landing-pages/knowledge-view', title: 'Knowledge View', type: 'external' },
						{ path: '/support-system/landing-pages/support-contact', title: 'Support Contact', type: 'external' },
						{ path: '/support-system/landing-pages/support-open-ticket', title: 'Support Open Ticket', type: 'external' },
					]
				},
				{
					title: 'User Pages', type: 'sub', active: false, children: [
						{ path: '/support-system/user-pages/dashboard', title: 'Dashboard', type: 'external' },
						{ path: '/support-system/user-pages/profile', title: 'Profile', type: 'external' },
						{
							title: 'Tickets', type: 'sub', active: false, children: [
								{ path: '/support-system/user-pages/tickets/ticket-list', title: 'Ticket List', type: 'external' },
								{ path: '/support-system/user-pages/tickets/active-tickets', title: 'Active Tickets', type: 'external' },
								{ path: '/support-system/user-pages/tickets/closed-tickets', title: 'Closed Tickets', type: 'external' },
								{ path: '/support-system/user-pages/tickets/create-tickets', title: 'Create Ticket', type: 'external' },
								{ path: '/support-system/user-pages/tickets/view-ticket', title: 'View Ticket', type: 'external' },
							]
						},
					]
				},
				{
					title: 'Admin', type: 'sub', active: false, children: [
						{ path: '/support-system/admin/dashboard', title: 'Dashboard', type: 'external' },
						{ path: '/support-system/admin/edit-profile', title: 'Edit Profile', type: 'external' },
						{
							title: 'Tickets', type: 'sub', active: false, children: [
								{ path: '/support-system/admin/tickets/ticket-list', title: 'Ticket List', type: 'external' },
								{ path: '/support-system/admin/tickets/active-tickets', title: 'Active Tickets', type: 'external' },
								{ path: '/support-system/admin/tickets/closed-tickets', title: 'Closed Tickets', type: 'external' },
								{ path: '/support-system/admin/tickets/new-tickets', title: 'New Ticket', type: 'external' },
								{ path: '/support-system/admin/tickets/view-ticket', title: 'View Ticket', type: 'external' },
							]
						},
						{ path: '/support-system/admin/customers', title: 'Customers', type: 'external' },
						{ path: '/support-system/admin/categories', title: 'Categories', type: 'external' },
						{ path: '/support-system/admin/articles', title: 'Articles', type: 'external' },
					]
				},
				{
					title: 'Agent', type: 'sub', active: false, children: [
						{ path: '/support-system/agent/dashboard', title: 'Dashboard', type: 'external' },
						{
							title: 'Tickets', type: 'sub', active: false, children: [
								{ path: '/support-system/agent/tickets/ticket-list', title: 'Ticket List', type: 'external' },
								{ path: '/support-system/agent/tickets/active-tickets', title: 'Active Tickets', type: 'external' },
								{ path: '/support-system/agent/tickets/closed-tickets', title: 'Closed Tickets', type: 'external' },
								{ path: '/support-system/agent/tickets/view-ticket', title: 'View Ticket', type: 'external' },
							]
						},
						{ path: '/support-system/agent/assigned-categories', title: 'Assigned Categoreies', type: 'external' },
					]
				},
			]
		},
		{
			path: '/chat', title: 'Chat', icon: 'message-square', type: 'link', bookmark: true
		},
		{
			title: 'Admin', icon: 'airplay', type: 'sub', active: false, children: [
				{ path: '/admin/general-settings', title: 'General Settings', type: 'link' },
				{ path: '/admin/api-settings', title: 'Api Settings', type: 'link' },
				{ path: '/admin/role-access', title: 'Role Access', type: 'link' },
			]
		},
		
		{
			headTitle: 'APPS'
		},
		{
			title: 'Apps', icon: 'codepen', type: 'sub', active: false, children: [
				{
					title: 'Forms', type: 'sub', active: false, children: [
						{ path: '/forms/form-elements', title: 'Form Elements', type: 'link' },
						{ path: '/forms/advanced-forms', title: 'Advanced Elements', type: 'link' },
						{ path: '/forms/form-wizard', title: 'Form Wizard', type: 'link' },
						{ path: '/forms/form-editor', title: 'Form Editor', type: 'link' },
						{ path: '/forms/form-element-sizes', title: 'Form Element-sizes', type: 'link' },
						{ path: '/forms/form-treeview', title: 'Form Treeview', type: 'link' },
					]
				},
				{
					title: 'Charts', type: 'sub', active: false, children: [
						{ path: '/charts/apex-charts', title: 'Apex Charts', type: 'link' },
						{ path: '/charts/echarts', title: 'Echarts', type: 'link' },
						{ path: '/charts/chartist', title: 'Chartist', type: 'link' },
						{ path: '/charts/chartjs', title: 'Chatjs', type: 'link' },
					]
				},
				{
					title: 'Widgets', type: 'sub', active: false, children: [
						{ path: '/widgets/widgets', title: 'Widgets', type: 'link' },
						{ path: '/widgets/chart-widgets', title: 'Chart Widgets', type: 'link' },
					]
				},
				{
					title: 'Maps', type: 'sub', active: false, children: [
						{ path: '/maps/leaflet', title: 'Leaflet', type: 'link' }
					]
				},
				{
					title: 'Tables', type: 'sub', active: false, children: [
						{ path: '/tables/default-table', title: 'Default Table', type: 'link' },
						{ path: '/tables/data-table', title: 'Data Table', type: 'link' },
					]
				},
				{
					title: 'Icons', type: 'sub', active: false, children: [
						{ path: '/icons/font-awsome', title: 'Font Awsome', type: 'link' },
						{ path: '/icons/material-design-icons', title: 'Material Design Icons', type: 'link' },
						{ path: '/icons/simple-line', title: 'Simple Line Icons', type: 'link' },
						{ path: '/icons/feather-icons', title: 'Feather Icons', type: 'link' },
						{ path: '/icons/ionic-icons', title: 'Ionic Icons', type: 'link' },
						{ path: '/icons/flag-icons', title: 'Flag Icons', type: 'link' },
						{ path: '/icons/pe7-icons', title: 'Pe7 Icons', type: 'link' },
						{ path: '/icons/themify-icons', title: 'Themify Icons', type: 'link' },
						{ path: '/icons/typicons', title: 'Typicons Icons', type: 'link' },
						{ path: '/icons/weather-icons', title: 'Weather Icons', type: 'link' },
						{ path: '/icons/material-icons', title: 'Material Icons', type: 'link' },
					]
				},
			]
		},
		{
			title: 'Components', icon: 'server', type: 'sub', active: false, children: [
				{
					title: 'Chat', type: 'sub', active: false, children: [
						{ path: '/components/chat/chat01', title: 'Chat 01', type: 'link' },
						{ path: '/components/chat/chat02', title: 'Chat 02', type: 'link' },
						{ path: '/components/chat/chat03', title: 'Chat 03', type: 'link' },
					]
				},
				{
					title: 'Contact', type: 'sub', active: false, children: [
						{ path: '/components/contact/contact-list01', title: 'Contact List 01', type: 'link' },
						{ path: '/components/contact/contact-list02', title: 'Contact List 02', type: 'link' },
					]
				},
				{
					title: 'File Manager', type: 'sub', active: false, children: [
						{ path: '/components/file-manager/file-manager01', title: 'File Manager 01', type: 'link' },
						{ path: '/components/file-manager/file-manager02', title: 'File Manager 02', type: 'link' },
						{ path: '/components/file-manager/file-details', title: 'File Details', type: 'link' },
						{ path: '/components/file-manager/file-attachments', title: 'File Attachments', type: 'link' },
					]
				},
				{
					title: 'Todo List', type: 'sub', active: false, children: [
						{ path: '/components/todo-list/todo-list01', title: 'Todo List 01', type: 'link' },
						{ path: '/components/todo-list/todo-list02', title: 'Todo List 02', type: 'link' },
						{ path: '/components/todo-list/todo-list03', title: 'Todo List 03', type: 'link' },
					]
				},
				{
					title: 'User List', type: 'sub', active: false, children: [
						{ path: '/components/user-list/user-list01', title: 'User List 01', type: 'link' },
						{ path: '/components/user-list/user-list02', title: 'User List 02', type: 'link' },
						{ path: '/components/user-list/user-list03', title: 'User List 03', type: 'link' },
						{ path: '/components/user-list/user-list04', title: 'User List 04', type: 'link' },
					]
				},
				{ path: '/components/calendar', title: 'Calendar', type: 'link' },
				{ path: '/components/dragula-card', title: 'Dragula Card', type: 'link' },
				{ path: '/components/image-comparsion', title: 'Image Comparsion', type: 'link' },
				{ path: '/components/image-crop', title: 'Image Crop', type: 'link' },
				{ path: '/components/page-sessiontimeout', title: 'Page SessionTimeout', type: 'link' },
				{ path: '/components/notifications', title: 'Notifications', type: 'link' },
				{ path: '/components/sweet-alerts', title: 'Sweet Alerts', type: 'link' },
				{ path: '/components/range-slider', title: 'Range Slider', type: 'link' },
				{ path: '/components/counters', title: 'Counters', type: 'link' },
				{ path: '/components/loaders', title: 'Loaders', type: 'link' },
				{ path: '/components/time-line', title: 'Time Line', type: 'link' },
				{ path: '/components/rating', title: 'Rating', type: 'link' },
			]
		},
		{
			title: 'Elements', icon: 'layers', type: 'sub', active: false, children: [
				{ path: '/elements/accordion', title: 'Accordion', type: 'link' },
				{ path: '/elements/alerts', title: 'Alerts', type: 'link' },
				{ path: '/elements/avatars', title: 'Avatars', type: 'link' },
				{ path: '/elements/badges', title: 'Badges', type: 'link' },
				{ path: '/elements/breadcrumb', title: 'Breadcrumb', type: 'link' },
				{ path: '/elements/buttons', title: 'Buttons', type: 'link' },
				{ path: '/elements/cards', title: 'Cards', type: 'link' },
				{ path: '/elements/card-images', title: 'Card Images', type: 'link' },
				{ path: '/elements/carousel', title: 'Carousel', type: 'link' },
				{ path: '/elements/dropdown', title: 'Dropdown', type: 'link' },
				{ path: '/elements/footers', title: 'Footers', type: 'link' },
				{ path: '/elements/headers', title: 'Headers', type: 'link' },
				{ path: '/elements/lists-listgroup', title: 'Lists & List Group', type: 'link' },
				{ path: '/elements/media-object', title: 'Media Object', type: 'link' },
				{ path: '/elements/modal', title: 'Modal', type: 'link' },
				{ path: '/elements/navigation', title: 'Navigation', type: 'link' },
				{ path: '/elements/pagination', title: 'Pagination', type: 'link' },
				{ path: '/elements/panel', title: 'Panel', type: 'link' },
				{ path: '/elements/popover', title: 'Popover', type: 'link' },
				{ path: '/elements/progress', title: 'Progress', type: 'link' },
				{ path: '/elements/tabs', title: 'Tabs', type: 'link' },
				{ path: '/elements/tags', title: 'Tags', type: 'link' },
				{ path: '/elements/tooltips', title: 'Tooltips', type: 'link' },
			]
		},
		
		
		{
			headTitle: 'PAGES'
		},
		{
			title: 'Pages', icon: 'copy', type: 'sub', badgeType: 'success', badgeValue: '2', active: false, children: [
				{
					title: 'Profile', type: 'sub', active: false, children: [
						{ path: '/pages/profile/profile01', title: 'Profile 01', type: 'link' },
						{ path: '/pages/profile/profile02', title: 'Profile 02 ', type: 'link' },
						{ path: '/pages/profile/profile03', title: 'Profile 03', type: 'link' },
					]
				},
				{ path: '/pages/edit-profile', title: 'Edit Profile', type: 'link' },
				{
					title: 'Email', type: 'sub', active: false, children: [
						{ path: '/pages/email/email-compose', title: 'Email Compose', type: 'link' },
						{ path: '/pages/email/email-inbox', title: 'Email Inbox', type: 'link' },
						{ path: '/pages/email/email-read', title: 'Email Read', type: 'link' },
					]
				},
				{
					title: 'Invoice', type: 'sub', active: false, children: [
						{ path: '/pages/invoice/invoice-list', title: 'Invoice List', type: 'link' },
						{ path: '/pages/invoice/invoice01', title: 'Invoice 01', type: 'link' },
						{ path: '/pages/invoice/invoice02', title: 'Invoice 02', type: 'link' },
						{ path: '/pages/invoice/invoice03', title: 'Invoice 03', type: 'link' },
						{ path: '/pages/invoice/add-invoice', title: 'Add Invoice', type: 'link' },
						{ path: '/pages/invoice/edit-invoice', title: 'Edit Invoice', type: 'link' },
					]
				},
				{
					title: 'Blog', type: 'sub', active: false, children: [
						{ path: '/pages/blog/blog01', title: 'Blog 01', type: 'link' },
						{ path: '/pages/blog/blog02', title: 'Blog 02', type: 'link' },
						{ path: '/pages/blog/blog03', title: 'Blog 03', type: 'link' },
						{ path: '/pages/blog/blog-styles', title: 'Blog Styles', type: 'link' },
					]
				},
				{
					title: 'Pricing', type: 'sub', active: false, children: [
						{ path: '/pages/pricing/pricing01', title: 'pricing 01', type: 'link' },
						{ path: '/pages/pricing/pricing02', title: 'pricing 02', type: 'link' },
						{ path: '/pages/pricing/pricing03', title: 'pricing 03', type: 'link' },
					]
				},
				{ path: '/pages/gallery', title: 'Gallery', type: 'link' },
				{ path: '/pages/faqs', title: 'FAQS', type: 'link' },
				{ path: '/pages/terms', title: 'Terms', type: 'link' },
				{ path: '/pages/empty-pages', title: 'Empty Pages', type: 'link' },
				{ path: '/pages/search', title: 'Search', type: 'link' },
				{ path: '/pages/about', title: 'About', type: 'link' },
				{ path: '/pages/notify-list', title: 'Notify-list', type: 'link' },
				{ path: '/pages/settings', title: 'Settings', type: 'link' },
				{
					title: 'Utils', type: 'sub', badgeType: 'success', badgeValue: '2', active: false, children: [
						{ path: '/utils/colors', title: 'Colors', type: 'link' },
						{ path: '/utils/flex-items', title: 'Flex Items', type: 'link' },
						{ path: '/utils/height', title: 'Height', type: 'link' },
						{ path: '/utils/border', title: 'Border', type: 'link' },
						{ path: '/utils/display', title: 'Display', type: 'link' },
						{ path: '/utils/margin', title: 'Margin', type: 'link' },
						{ path: '/utils/padding', title: 'Padding', type: 'link' },
						{ path: '/utils/typhography', title: 'Typhography', type: 'link' },
						{ path: '/utils/width', title: 'Width', type: 'link' },
					]
				},
			]
		},
		{
			title: 'Submenus', icon: 'sliders', type: 'sub', active: false, children: [
				{ title: 'level-1', type: 'empty' },
				{ title: 'level2', type: 'sub', active:false, children:[
					{ title: 'level-2.1', type: 'empty' },
					{ title: 'level-2.2', type: 'empty' },
					{ title: 'level2.3', type: 'sub', active:false, children:[
						{ title: 'level-2.3.1', type: 'empty' },
						{ title: 'level-2.3.2', type: 'empty' },
					]  },
				]  },
			]
		},
		{
			title: 'Account', icon: 'lock', type: 'sub', badgeType: 'success', badgeValue: '2', active: false, children: [
				{
					title: 'Login', type: 'sub', active: false, children: [
						{ path: '/account/login/login01', title: 'Login 01', type: 'link' },
						{ path: '/account/login/login02', title: 'Login 02 ', type: 'link' },
						{ path: '/account/login/login03', title: 'Login 03', type: 'link' },
					]
				},
				{
					title: 'Register', type: 'sub', active: false, children: [
						{ path: '/account/register/register01', title: 'Register 01', type: 'link' },
						{ path: '/account/register/register02', title: 'Register 02 ', type: 'link' },
						{ path: '/account/register/register03', title: 'Register 03', type: 'link' },
					]
				},
				{
					title: 'Forget Password', type: 'sub', active: false, children: [
						{ path: '/account/forget-password/forget-password01', title: 'Forget Password 01', type: 'link' },
						{ path: '/account/forget-password/forget-password02', title: 'Forget Password 02 ', type: 'link' },
						{ path: '/account/forget-password/forget-password03', title: 'Forget Password 03', type: 'link' },
					]
				},
				{
					title: 'Reset Password', type: 'sub', active: false, children: [
						{ path: '/account/reset-password/reset-password01', title: 'Reset Password 01', type: 'link' },
						{ path: '/account/reset-password/reset-password02', title: 'Reset Password 02 ', type: 'link' },
						{ path: '/account/reset-password/reset-password03', title: 'Reset Password 03', type: 'link' },
					]
				},
				{
					title: 'Lock Screen', type: 'sub', active: false, children: [
						{ path: '/account/lock-screen/lock-screen01', title: 'Lock Screen 01', type: 'link' },
						{ path: '/account/lock-screen/lock-screen02', title: 'Lock Screen 02 ', type: 'link' },
						{ path: '/account/lock-screen/lock-screen03', title: 'Lock Screen 03', type: 'link' },
					]
				},
				{ path: '/account/under-construction', title: 'Under Construction', type: 'link' },
				{ path: '/account/coming-soon', title: 'Comming Soon', type: 'link' },
				{
					title: 'Alert Messages', type: 'sub', badgeType: 'success', badgeValue: '2', active: false, children: [
						{ path: '/alert/success-message', title: 'Success Message', type: 'link' },
						{ path: '/alert/warning-message', title: 'Warning Message', type: 'link' },
						{ path: '/alert/danger-message', title: 'Danger Messages', type: 'link' }, 
					]
				},
				{
					title: 'error-pages', type: 'sub', badgeType: 'success', badgeValue: '2', active: false, children: [
						{ path: '/error-page/error400', title: '400', type: 'link' },
						{ path: '/error-page/error401', title: '401', type: 'link' },
						{ path: '/error-page/error403', title: '403', type: 'link' },
						{ path: '/error-page/error404', title: '404', type: 'link' },
						{ path: '/error-page/error500', title: '500', type: 'link' },
						{ path: '/error-page/error503', title: '503', type: 'link' },
					]
				},
			]
		},
		{
			title: 'Ecommerce', icon: 'shopping-cart', type: 'sub', badgeType: 'success', badgeValue: '2', active: false, children: [
				{ path: '/ecommerce/products', title: 'Products', type: 'link' },
				{ path: '/ecommerce/products-details', title: 'Products Details', type: 'link' },
				{ path: '/ecommerce/shopping-cart', title: 'Shopping Cart', type: 'link' },
			]
		},
		
	];


	// Array
	items = new BehaviorSubject<Menu[]>(this.MENUITEMS);

}
