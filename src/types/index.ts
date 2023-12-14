export interface IFileData {
    Jahr: string;
    TemplateIds: string[];
    id: string;
    label: string;
}

export interface BottomMenuItem {
	label: string,
	icon: string,
    name: string,
	notification: number;
	navigateToPath: string;
}

export interface IData {
    data: IData[];
}

export interface ISingleSelectedData {
    id: string;
    button: boolean;
    wert?: string;
    menge?: string;
    beschreibung?: string;
    group: boolean;
}

export interface ISelectedData {
    selectedData: ISingleSelectedData[];
    updateElementInSelectedData: CallableFunction;
    removeElementFromSelectedData: CallableFunction;
    checkPermission: CallableFunction;
    controlGroupInSelectedData: CallableFunction;
}

export const selectedDataSymbol = Symbol('selectedData');

