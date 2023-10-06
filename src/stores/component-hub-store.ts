import { defineStore } from 'pinia';
import CardCarousel from 'src/components/configurator/CardCarousel.vue';
import ImageCard from 'src/components/configurator/cards/ImageCard.vue';
import ArticleSelector from 'src/components/configurator/ArticleSelector.vue';
import InputFieldsCard from 'src/components/configurator/InputFieldsCard.vue';
/* import GroupingComponent from 'src/components/configurator/GroupingComponent.vue'; */
import MitarberiterCard from 'src/components/configurator/cards/MitarbeiterCard.vue';


interface ComponentPairs {
	componentId: string;
	component: any;
}

export const useComponentStore = defineStore('componentHub', {
	state: () => ({
	hub: [
		{
			componentId: '19b85d2c-23f9-443c-878c-c3bb897e59fd',
			component: ImageCard,
		},
		{
			componentId: 'b5213000-e763-4c77-9ec5-a8bafea10646',
			component: ArticleSelector,
		},
		{
			componentId: 'aa0f4aa1-75ef-4002-8bd7-45f82ade4de8',
			component: InputFieldsCard,
		},
		{
			componentId: '04775f1c-135d-410d-bda6-9c234202742d',
			component: CardCarousel,
		},
		{
			componentId: 'c01e6d2c-b540-482d-a5de-e5184dc8598c',
			component: MitarberiterCard,
		},
		{
			componentId: 'ca3f3f67-aafc-4c5d-96a1-9c3ca5d3f299',
			component: CardCarousel,
		}
	] as ComponentPairs[],
	}),

	getters: {
		getComponentById: (state) => (componentId: string) => {
			const componentPair = state.hub.find((pair) => pair.componentId === componentId);
			if (componentPair) {
				return componentPair.component;
			}
			return null;
		},
	},

	actions: {

	},
});
