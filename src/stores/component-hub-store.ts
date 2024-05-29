import { defineStore } from 'pinia';

//every used components are imported here
import CardCarousel from 'src/components/configurator/CardCarousel.vue';
import ImageCard from 'src/components/configurator/cards/ImageCard.vue';
import ArticleSelector from 'src/components/configurator/ArticleSelector.vue';
import InputFieldsCard from 'src/components/configurator/InputFieldsCard.vue';
import GroupingComponent from 'src/components/configurator/GroupingComponent.vue';
import MitarberiterCard from 'src/components/configurator/cards/MitarbeiterCard.vue';
import ProductCard from 'src/components/configurator/cards/ProductCard.vue';
import PromotionCard from 'src/components/configurator/cards/PromotionCard.vue';
import GroupingComponentSimple from 'src/components/configurator/GroupingComponentSimple.vue';

interface ComponentPairs {
	componentId: string;
	component: any;
    requireMainConfigurator: boolean;
}

export const useComponentStore = defineStore('componentHub', {
	state: () => ({
        //this hub contains the components the front end should use by the component id
        //it also contains if the component need to use the main configurator or not
        hub: [
            {
                componentId: '19b85d2c-23f9-443c-878c-c3bb897e59fd',
                component: ImageCard,
                requireMainConfigurator: true
            },
            {
                componentId: 'b5213000-e763-4c77-9ec5-a8bafea10646',
                component: ArticleSelector,
                requireMainConfigurator: true
            },
            {
                componentId: 'aa0f4aa1-75ef-4002-8bd7-45f82ade4de8',
                component: InputFieldsCard,
                requireMainConfigurator: true
            },
            {
                componentId: '633e8656-3db5-46fc-99f6-e02bf6a16183',
                component: InputFieldsCard,
                requireMainConfigurator: true
            },
            {
                componentId: '04775f1c-135d-410d-bda6-9c234202742d',
                component: CardCarousel,
                requireMainConfigurator: true
            },
            {
                componentId: 'c01e6d2c-b540-482d-a5de-e5184dc8598c',
                component: MitarberiterCard,
                requireMainConfigurator: true
            },
            {
                componentId: 'ca3f3f67-aafc-4c5d-96a1-9c3ca5d3f299',
                component: CardCarousel,
                requireMainConfigurator: true
            },
            {
                componentId: 'b98ab93f-06fb-4bad-bd6d-217eadc20d3c',
                component: GroupingComponent,
                requireMainConfigurator: false
            },
            {
                componentId: 'da0cea85-1eaf-425d-9ae2-9a3cf64ccbac',
                component: ProductCard,
                requireMainConfigurator: true
            },
            {
                componentId: 'f1d28863-d476-4fa1-856c-4640765a4807',
                component: PromotionCard,
                requireMainConfigurator: true
            },
            {
                componentId: '2349f10e-bbba-4931-9f3c-6e99346f3e16',
                component: GroupingComponentSimple,
                requireMainConfigurator: true
            },
            {
                componentId: '91725a43-4193-4423-973b-982d8f9c8511',
                component: CardCarousel,
                requireMainConfigurator: true
            },
        ] as ComponentPairs[],
	}),

	getters: {
        //returns the component by the component id
		getComponentById: (state) => (componentId: string) => {
			const componentPair = state.hub.find((pair) => pair.componentId === componentId);
			if (componentPair) {
				return componentPair.component;
			}
			return null;
		},
        //returns if the component needs the main configurator or not
        getRequireMainConfigurator: (state) => (componentId: string) => {
            const componentPair = state.hub.find((pair) => pair.componentId === componentId);
            if (componentPair) {
                return componentPair.requireMainConfigurator;
            }
            return false;
        }
	}
});
