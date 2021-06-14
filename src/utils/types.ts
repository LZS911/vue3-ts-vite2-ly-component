import { App } from 'vue';

export type SFCWithInstall<T> = T & { install(app: App): void };
export type RefElement = Nullable<HTMLElement>;
