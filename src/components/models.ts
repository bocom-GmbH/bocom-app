export interface Todo {
  id: number;
  content: string;
}

export interface Meta {
  totalCount: number;
}

export interface BottomMenuItem {
	label: string,
	icon: string,
	notification: number;
	navigateToPath: string;
}
